/**
 * app/solutions/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Server component — fully paginated products catalogue page.
 * URL shape:  /solutions?page=2&category=crop-protection&sub=fungicides
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import {
  getAllProducts,
  getCategoryTree,
  PRODUCTS_PER_PAGE,
  type NormalisedProduct,
  type CategoryTree,
} from "@/lib/wp-api";

// ─── Static metadata ──────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Products — Agvanta",
  description:
    "Browse our complete range of agricultural solutions — crop protection, nutrients, and more.",
};

// ─── Page props ───────────────────────────────────────────────────────────────

type SearchParams = {
  page?: string;
  category?: string;
  sub?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const currentPage = Math.max(1, parseInt(sp.page ?? "1", 10));
  const activeCategorySlug = sp.category ?? null;
  const activeSubSlug = sp.sub ?? null;

  // Fetch all products + category tree server-side
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getCategoryTree(),
  ]);

  // Filter by category / subcategory
  const filtered = allProducts.filter((p) => {
    if (activeCategorySlug && p.categorySlug !== activeCategorySlug) return false;
    if (activeSubSlug && p.subcategorySlug !== activeSubSlug) return false;
    return true;
  });

  // Paginate
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const products = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  // Active category/sub labels for display
  const activeCat = categories.find((c) => c.slug === activeCategorySlug) ?? null;
  const activeSub =
    activeCat?.subcategories?.find((s) => s.slug === activeSubSlug) ?? null;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Solutions"
        title="Complete Product Catalogue"
        highlight="Every crop, every season"
        description="Browse our full range of scientifically formulated agricultural solutions."
      />

      <section id="catalogue" className="container-wide py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-12">

          {/* ── Sidebar: category filters ── */}
          <aside className="lg:col-span-3">
            <CategorySidebar
              categories={categories}
              activeCategorySlug={activeCategorySlug}
              activeSubSlug={activeSubSlug}
            />
          </aside>

          {/* ── Main: product grid + pagination ── */}
          <main className="lg:col-span-9">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  {activeCat
                    ? `${activeCat.name}${activeSub ? ` / ${activeSub.name}` : ""}`
                    : "All Products"}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {total} {total === 1 ? "product" : "products"}
                  {totalPages > 1 && ` — page ${safePage} of ${totalPages}`}
                </p>
              </div>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Leaf className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No products found in this category.</p>
                <Link href="/solutions#catalogue" className="mt-4 inline-block text-sm font-semibold text-primary-deep underline underline-offset-2">
                  Clear filters
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                categorySlug={activeCategorySlug}
                subSlug={activeSubSlug}
              />
            )}
          </main>
        </div>
      </section>

      <CtaBanner />
    </SiteLayout>
  );
}

// ─── Category Sidebar ─────────────────────────────────────────────────────────

function CategorySidebar({
  categories,
  activeCategorySlug,
  activeSubSlug,
}: {
  categories: CategoryTree[];
  activeCategorySlug: string | null;
  activeSubSlug: string | null;
}) {
  return (
    <div className="rounded-3xl bg-card ring-1 ring-border overflow-hidden sticky top-24">
      <div className="px-5 py-4 bg-gradient-green">
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary-foreground/70">
          Filter by
        </p>
        <p className="mt-0.5 text-sm font-semibold text-primary-foreground">Category</p>
      </div>

      <div className="p-3 space-y-1">
        {/* "All" option */}
        <Link
          href="/solutions#catalogue"
          className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
            !activeCategorySlug
              ? "bg-gradient-green text-primary-foreground font-semibold shadow-sm"
              : "text-foreground/70 hover:bg-accent hover:text-foreground"
          }`}
        >
          <span>All Products</span>
        </Link>

        {categories.map((cat) => {
          const isCatActive = activeCategorySlug === cat.slug;
          const catGradient = cat.tone === "green" ? "bg-gradient-green" : "bg-gradient-blue";

          return (
            <div key={cat.slug}>
              <Link
                href={`/solutions?category=${cat.slug}#catalogue`}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isCatActive && !activeSubSlug
                    ? `${catGradient} text-primary-foreground font-semibold shadow-sm`
                    : "text-foreground/70 hover:bg-accent hover:text-foreground"
                }`}
              >
                <span className="font-medium">{cat.name}</span>
                <ChevronRight className="h-3 w-3 opacity-50" />
              </Link>

              {/* Subcategory list — shown when this category is active */}
              {isCatActive && cat.subcategories && cat.subcategories.length > 0 && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-border/60 pl-3">
                  {cat.subcategories.map((sub) => {
                    const isSubActive = activeSubSlug === sub.slug;
                    return (
                      <Link
                        key={sub.slug}
                        href={`/solutions?category=${cat.slug}&sub=${sub.slug}#catalogue`}
                        className={`block rounded-lg px-3 py-2 text-xs transition-colors ${
                          isSubActive
                            ? `${catGradient} text-primary-foreground font-semibold`
                            : "text-foreground/60 hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {sub.name}
                        <span className={`ml-1.5 ${isSubActive ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                          ({sub.products.length})
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: NormalisedProduct }) {
  const primaryImage = product.images[0];
  const label = product.subcategory ?? product.category ?? "Product";

  return (
    <Link
      href={`/solutions/${product.slug}`}
      aria-label={`View details of ${product.name}`}
      className="group flex flex-col h-full rounded-2xl bg-card ring-1 ring-border overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-44 w-full overflow-hidden bg-accent shrink-0">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-green opacity-20 flex items-center justify-center">
            <Leaf className="h-10 w-10 text-primary-deep opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h4 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary-deep transition-colors">
          {product.name}
        </h4>

        {product.description && (
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {product.description}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary-deep group-hover:text-primary transition-colors">
            View details
          </span>
          <span className="h-7 w-7 rounded-full grid place-items-center bg-accent transition-all duration-300 group-hover:bg-gradient-green group-hover:text-green-600">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function buildPageUrl(
  page: number,
  categorySlug: string | null,
  subSlug: string | null
): string {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (categorySlug) params.set("category", categorySlug);
  if (subSlug) params.set("sub", subSlug);
  const qs = params.toString();
  return `/solutions${qs ? `?${qs}` : ""}#catalogue`;
}

function Pagination({
  currentPage,
  totalPages,
  categorySlug,
  subSlug,
}: {
  currentPage: number;
  totalPages: number;
  categorySlug: string | null;
  subSlug: string | null;
}) {
  // Generate page numbers with ellipsis
  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-1"
    >
      <Link
        href={buildPageUrl(currentPage - 1, categorySlug, subSlug)}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
        className={`h-9 w-9 rounded-full grid place-items-center ring-1 ring-border transition-colors ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-accent text-foreground/70"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="h-9 w-9 grid place-items-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildPageUrl(p, categorySlug, subSlug)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`h-9 w-9 rounded-full grid place-items-center text-sm font-semibold transition-all ${
              p === currentPage
                ? "bg-gradient-green text-primary-foreground shadow-sm"
                : "ring-1 ring-border hover:bg-accent text-foreground/70"
            }`}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={buildPageUrl(currentPage + 1, categorySlug, subSlug)}
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`h-9 w-9 rounded-full grid place-items-center ring-1 ring-border transition-colors ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-accent text-foreground/70"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}