/**
 * lib/wp-api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all WordPress REST API interactions.
 * Nothing outside this module should call the WP endpoint directly.
 *
 * Category / subcategory resolution strategy
 * ──────────────────────────────────────────
 * We derive category + optional subcategory from `aioseo_breadcrumb_json`
 * which is already parsed JSON on every product response.
 *
 * Breadcrumb pattern (indices):
 *   0: Home
 *   1: Products
 *   2: Category          (e.g. "Crop Protection")
 *   3: Subcategory | n/a (e.g. "Fungicides")  ← absent on flat products
 *   last: Product name   (always the last item)
 *
 * This is robust: it doesn't require a separate /categories fetch and correctly
 * handles products with no subcategory.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Config ───────────────────────────────────────────────────────────────────

export const WP_BASE =
  process.env.NEXT_PUBLIC_WP_API_URL ??
  "https://cms.agvanta.in/wp-json/wp/v2";

export const PRODUCTS_PER_PAGE = 12;

const REVALIDATE = 60 * 5; // 5 min ISR

export const CATEGORY_ORDER = [
  "Seeds",
  "Crop Nutrition",
  "Crop Protection",
  "Biologicals",
  "Agri Services",
];

function standardiseCategoryName(name: string | null): string | null {
  if (!name) return null;
  const n = name.trim();
  if (/seed/i.test(n)) return "Seeds";
  if (/nutrition/i.test(n)) return "Crop Nutrition";
  if (/protection/i.test(n)) return "Crop Protection";
  if (/biological/i.test(n)) return "Biologicals";
  if (/advisory|service/i.test(n)) return "Agri Services";
  return n;
}

// ─── Raw WP shapes ───────────────────────────────────────────────────────────

interface WpAcf {
  description?: string;
  ingredients?: string;
  key_benefits?: string;
  product_images?: string[];      // array of absolute image URLs
  specifications_table?: string;  // raw HTML string
}

interface WpAioseoHeadJson {
  title?: string;
  description?: string;
  keywords?: string;
  canonical_url?: string;
  "og:title"?: string;
  "og:description"?: string;
  "og:type"?: string;
  "og:locale"?: string;
  "og:site_name"?: string;
  "twitter:card"?: string;
  "twitter:title"?: string;
  "twitter:description"?: string;
}

interface WpBreadcrumb {
  label: string;
  link: string;
}

interface WpRawProduct {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  categories: number[];
  acf: WpAcf;
  aioseo_head_json?: WpAioseoHeadJson;
  aioseo_breadcrumb_json?: WpBreadcrumb[];
}

// ─── Public normalised shapes ─────────────────────────────────────────────────

export interface ProductSeo {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
}

export interface NormalisedProduct {
  id: number;
  slug: string;
  name: string;
  description: string;
  ingredients: string;
  keyBenefits: string;
  images: string[];                // may be empty
  specificationsTableHtml: string; // may be empty string
  /** e.g. "Crop Protection" */
  category: string | null;
  categorySlug: string | null;
  /** e.g. "Fungicides" — null when product has no subcategory */
  subcategory: string | null;
  subcategorySlug: string | null;
  /** Full breadcrumb chain from AIOSEO */
  breadcrumbs: WpBreadcrumb[];
  seo: ProductSeo;
  publishedAt: string;
  modifiedAt: string;
}

export interface PaginatedProducts {
  products: NormalisedProduct[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// ─── Post Raw Shapes ──────────────────────────────────────────────────────────

interface WpRawTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface WpRawPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  aioseo_head_json?: WpAioseoHeadJson;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    "wp:term"?: Array<
      Array<{
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}

// ─── Post Normalised Shapes ───────────────────────────────────────────────────

export interface NormalisedPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
  categories: Array<{ name: string; slug: string }>;
  seo: ProductSeo; // reusing SEO shape
}

export interface PaginatedPosts {
  posts: NormalisedPost[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// ─── Category index (derived from all products, used by Solutions component) ──

export interface CategoryTree {
  name: string;
  slug: string;
  /** tone drives the UI colour scheme – heuristic: first cat = green, rest = blue */
  tone: "green" | "blue";
  /** null means this category has no subcategories (flat product list) */
  subcategories: SubcategoryNode[] | null;
  /** products that belong directly to this category (only when subcategories===null) */
  products: NormalisedProduct[];
}

export interface SubcategoryNode {
  name: string;
  slug: string;
  products: NormalisedProduct[];
}

// ─── Request Deduplicator & Cache ───────────────────────────────────────────

const requestCache = new Map<string, Promise<{ data: any; headers: Headers }>>();

/**
 * Enhanced fetcher with deduplication, retries, and timeouts.
 */
async function wpFetch<T>(
  path: string,
  init?: RequestInit,
  retries = 3
): Promise<{ data: T; headers: Headers }> {
  const url = `${WP_BASE}${path}`;
  
  const cacheKey = JSON.stringify({ path, init });
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    let lastError: any;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const res = await fetch(url, {
          ...init,
          headers: {
            ...init?.headers,
            "User-Agent": "Mozilla/5.0 (compatible; AgvantaBot/1.0; +https://agvanta.in)",
          },
          signal: controller.signal,
          next: { 
            revalidate: REVALIDATE, 
            tags: ["wp-data"] 
          },
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text().catch(() => "Unknown error");
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        const data = (await res.json()) as T;
        return { data, headers: res.headers };

      } catch (err: any) {
        clearTimeout(timeoutId);
        lastError = err;
        if (err.name === "AbortError" || attempt === retries) break;
        const backoff = Math.pow(2, attempt) * 500;
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }

    throw new Error(`[wp-api] Failed to fetch ${url} after ${retries} retries. Original error: ${lastError?.message}`);
  })();

  requestCache.set(cacheKey, fetchPromise);
  try {
    return await fetchPromise;
  } finally {
    requestCache.delete(cacheKey);
  }
}

// ─── Normalisation ────────────────────────────────────────────────────────────
function decodeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&[a-z]+;/gi, (match) => {
      const entities: Record<string, string> = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'",
        "&nbsp;": " ",
        "&ndash;": "–",
        "&mdash;": "—",
        "&ldquo;": "“",
        "&rdquo;": "”",
        "&lsquo;": "‘",
        "&rsquo;": "’",
        "&bull;": "•",
      };
      return entities[match.toLowerCase()] || match;
    });
}

function parseCategoryFromBreadcrumbs(breadcrumbs: WpBreadcrumb[]): {
  category: string | null;
  categorySlug: string | null;
  subcategory: string | null;
  subcategorySlug: string | null;
} {
  const taxonomyItems = breadcrumbs.filter((b) => {
    const lc = b.link.toLowerCase();
    return (
      lc.includes("/category/") 
    );
  });

  const category = taxonomyItems[0]?.label ?? null;
  const categorySlug = taxonomyItems[0]
    ? extractSlugFromUrl(taxonomyItems[0].link)
    : null;

  const subcategory = taxonomyItems[1]?.label ?? null;
  const subcategorySlug = taxonomyItems[1]
    ? extractSlugFromUrl(taxonomyItems[1].link)
    : null;

  return { category, categorySlug, subcategory, subcategorySlug };
}

function extractSlugFromUrl(url: string): string {
  const parts = url.replace(/\/$/, "").split("/");
  return parts[parts.length - 1] ?? "";
}

function normalise(raw: WpRawProduct): NormalisedProduct {
  const breadcrumbs: WpBreadcrumb[] = raw.aioseo_breadcrumb_json ?? [];
  let { category, categorySlug, subcategory, subcategorySlug } =
    parseCategoryFromBreadcrumbs(breadcrumbs);

  category = standardiseCategoryName(category);

  const seoRaw = raw.aioseo_head_json ?? {};
  const productName = decodeHtml(raw.title.rendered);

  return {
    id: raw.id,
    slug: raw.slug,
    name: productName,
    description: raw.acf.description ?? "",
    ingredients: raw.acf.ingredients ?? "",
    keyBenefits: raw.acf.key_benefits ?? "",
    images: Array.isArray(raw.acf.product_images)
      ? raw.acf.product_images.filter(Boolean)
      : [],
    specificationsTableHtml: raw.acf.specifications_table ?? "",
    category: decodeHtml(category) || null,
    categorySlug,
    subcategory: decodeHtml(subcategory) || null,
    subcategorySlug,
    breadcrumbs,
    seo: {
      title: decodeHtml(seoRaw.title ?? productName),
      description: decodeHtml(seoRaw.description ?? raw.acf.description ?? ""),
      keywords: seoRaw.keywords ?? "",
      canonicalUrl: seoRaw.canonical_url ?? "",
      ogTitle: decodeHtml(seoRaw["og:title"] ?? seoRaw.title ?? productName),
      ogDescription: decodeHtml(
        seoRaw["og:description"] ?? seoRaw.description ?? raw.acf.description ?? ""
      ),
      twitterCard: seoRaw["twitter:card"] ?? "summary_large_image",
      twitterTitle: decodeHtml(seoRaw["twitter:title"] ?? seoRaw.title ?? productName),
      twitterDescription: decodeHtml(
        seoRaw["twitter:description"] ?? seoRaw.description ?? ""
      ),
    },
    publishedAt: raw.date,
    modifiedAt: raw.modified,
  };
}

function normalisePost(raw: WpRawPost): NormalisedPost {
  const seoRaw = raw.aioseo_head_json ?? {};
  const title = decodeHtml(raw.title.rendered);

  const featuredMedia = raw._embedded?.["wp:featuredmedia"]?.[0];
  const featuredImage = featuredMedia
    ? { url: featuredMedia.source_url, alt: featuredMedia.alt_text || title }
    : null;

  const categories =
    raw._embedded?.["wp:term"]?.[0]
      ?.filter((t) => t.taxonomy === "category")
      .map((t) => ({ name: decodeHtml(t.name), slug: t.slug })) ?? [];

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    content: raw.content.rendered,
    excerpt: raw.excerpt.rendered,
    date: raw.date,
    modified: raw.modified,
    featuredImage,
    categories,
    seo: {
      title: decodeHtml(seoRaw.title ?? title),
      description: decodeHtml(seoRaw.description ?? ""),
      keywords: seoRaw.keywords ?? "",
      canonicalUrl: seoRaw.canonical_url ?? "",
      ogTitle: decodeHtml(seoRaw["og:title"] ?? seoRaw.title ?? title),
      ogDescription: decodeHtml(seoRaw["og:description"] ?? seoRaw.description ?? ""),
      twitterCard: seoRaw["twitter:card"] ?? "summary_large_image",
      twitterTitle: decodeHtml(seoRaw["twitter:title"] ?? seoRaw.title ?? title),
      twitterDescription: decodeHtml(seoRaw["twitter:description"] ?? seoRaw.description ?? ""),
    },
  };
}

// ─── Public API: Products ─────────────────────────────────────────────────────

export async function getProducts(opts: {
  page?: number;
  perPage?: number;
  categorySlug?: string; 
} = {}): Promise<PaginatedProducts> {
  const page = opts.page ?? 1;
  const perPage = opts.perPage ?? PRODUCTS_PER_PAGE;

  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    _fields: [
      "id", "slug", "date", "modified", "title", "categories", "acf", "aioseo_head_json", "aioseo_breadcrumb_json",
    ].join(","),
  });

  const { data, headers } = await wpFetch<WpRawProduct[]>(
    `/products?${params.toString()}`
  );

  const total = parseInt(headers.get("X-WP-Total") ?? "0", 10);
  const totalPages = parseInt(headers.get("X-WP-TotalPages") ?? "1", 10);

  return {
    products: data.map(normalise),
    total,
    totalPages,
    currentPage: page,
  };
}

export async function getAllProducts(): Promise<NormalisedProduct[]> {
  const first = await getProducts({ page: 1, perPage: 100 });
  if (first.totalPages <= 1) return first.products;

  const rest = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, i) =>
      getProducts({ page: i + 2, perPage: 100 })
    )
  );

  return [first.products, ...rest.map((r) => r.products)].flat();
}

export async function getProductBySlug(slug: string): Promise<NormalisedProduct | null> {
  const { data } = await wpFetch<WpRawProduct[]>(
    `/products?slug=${encodeURIComponent(slug)}&_fields=id,slug,date,modified,title,categories,acf,aioseo_head_json,aioseo_breadcrumb_json`
  );

  if (!data.length) return null;
  return normalise(data[0]);
}

// ─── Public API: Posts ────────────────────────────────────────────────────────

export async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  // Disabling post fetches for now
  return null;
}

export async function getAllCategories(): Promise<Array<{ name: string; slug: string; count: number }>> {
  // Disabling post fetches for now
  return [];
}

export async function getPosts(opts: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
} = {}): Promise<PaginatedPosts> {
  // Disabling post fetches for now to fix build issues
  return {
    posts: [],
    total: 0,
    totalPages: 0,
    currentPage: opts.page ?? 1,
  };
}


export async function getPostBySlug(slug: string): Promise<NormalisedPost | null> {
  // Disabling post fetches for now
  return null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  // Disabling post fetches for now
  return [];
}


/**
 * Build a hierarchical category tree from all products.
 * Sorted according to CATEGORY_ORDER.
 */
export async function getCategoryTree(): Promise<CategoryTree[]> {
  const products = await getAllProducts();

  const treeMap = new Map<string, CategoryTree>();
  
  const TONE_MAP: Record<string, "green" | "blue"> = {
    "Seeds": "green",
    "Crop Nutrition": "blue",
    "Crop Protection": "green",
    "Biologicals": "blue",
    "Agri Services": "green",
  };

  for (const p of products) {
    if (!p.category || !p.categorySlug) continue;

    if (!treeMap.has(p.categorySlug)) {
      treeMap.set(p.categorySlug, {
        name: p.category,
        slug: p.categorySlug,
        tone: TONE_MAP[p.category] ?? "green",
        subcategories: null,
        products: [],
      });
    }

    const catNode = treeMap.get(p.categorySlug)!;

    if (!p.subcategory || !p.subcategorySlug) {
      catNode.products.push(p);
    } else {
      if (catNode.subcategories === null) {
        catNode.subcategories = [];
      }

      let subNode = catNode.subcategories.find(
        (s) => s.slug === p.subcategorySlug
      );
      if (!subNode) {
        subNode = { name: p.subcategory, slug: p.subcategorySlug, products: [] };
        catNode.subcategories.push(subNode);
      }
      subNode.products.push(p);
    }
  }

  // Sort subcategories alphabetically within each category
  treeMap.forEach((cat) => {
    if (cat.subcategories) {
      cat.subcategories.sort((a, b) => a.name.localeCompare(b.name));
    }
  });

  return Array.from(treeMap.values()).sort((a, b) => {
    const idxA = CATEGORY_ORDER.indexOf(a.name);
    const idxB = CATEGORY_ORDER.indexOf(b.name);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });
}