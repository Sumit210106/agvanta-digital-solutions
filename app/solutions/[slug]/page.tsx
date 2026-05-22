/**
 * app/solutions/[slug]/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Server component — individual product detail page.
 * Data fetched from WordPress by slug.
 * Consistent with the tone/gradient system in Solutions.tsx.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Leaf,
  ChevronRight
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";
import { getProductBySlug, getAllProducts, getCategoryTree } from "@/lib/wp-api";
import { ProductGallery } from "@/components/site/ProductGallery";

// ─── Props & Static Generation ────────────────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-generate all product pages at build time.
 */
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

/**
 * Dynamic metadata using SEO data from AIOSEO in WordPress.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: `https://agvanta.in/solutions/${product.slug}`,
    },
    openGraph: {
      title: product.seo.ogTitle,
      description: product.seo.ogDescription,
      images: product.images.slice(0, 1).map(url => ({ url })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.twitterTitle,
      description: product.seo.twitterDescription,
    },
  };
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch product data and the category tree to determine visual 'tone'
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategoryTree()
  ]);

  if (!product) notFound();

  // Find the category node to determine the tone (green/blue) for consistency with Solutions.tsx
  const categoryNode = categories.find(c => c.slug === product.categorySlug);
  const tone = categoryNode?.tone ?? "green";
  const gradientClass = tone === "green" ? "bg-gradient-green" : "bg-gradient-blue";
  const themeClass = tone === "green" ? "text-primary-deep" : "text-secondary";
  const bgClass = tone === "green" ? "bg-primary/5" : "bg-secondary/5";

  // Check if product has any images
  const hasImages = product.images && product.images.length > 0;

  // Related products from the same category
  const relatedProducts = categoryNode
    ? (categoryNode.subcategories
      ? categoryNode.subcategories.flatMap(s => s.products)
      : categoryNode.products
    ).filter(p => p.slug !== product.slug).slice(0, 4)
    : [];

  return (
    <SiteLayout>
      <PageHero
        eyebrow={product.category ?? "Our Products"}
        title={product.name}
        highlight={product.subcategory ?? ""}
        description=""
      />

      <section className="container-wide py-16 md:py-24">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Catalog
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {hasImages ? (
            <>
              {/* ── Left: Product Gallery (when images exist) ── */}
              <div className="lg:sticky lg:top-24">
                <ProductGallery
                  images={product.images}
                  name={product.name}
                  category={product.category ?? ""}
                  gradientClass={gradientClass}
                />
              </div>

              {/* ── Right: All content ── */}
              <div className="space-y-12">
                {/* Ingredients */}
                {product.ingredients && (
                  <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
                    <div className={`px-6 py-4 ${gradientClass}`}>
                      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary-foreground/70">Formulation</p>
                      <p className="text-sm font-bold text-primary-foreground">Key Ingredients & Composition</p>
                    </div>
                    <div className="p-6">
                      <div 
                        className="text-sm leading-relaxed text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: product.ingredients }}
                      />
                    </div>
                  </div>
                )}

                {/* Overview */}
                <div className="space-y-4">
                  <SectionLabel label="Product Overview" gradientClass={gradientClass} themeClass={themeClass} />
                  <div
                    className="text-base leading-relaxed text-muted-foreground prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                {/* Key Benefits */}
                {product.keyBenefits && (
                  <div className="space-y-4">
                    <SectionLabel label="Key Benefits" gradientClass={gradientClass} themeClass={themeClass} />
                    <div className={`p-6 rounded-2xl ${bgClass} border border-border/60`}>
                      <div className="space-y-4">
                        {product.keyBenefits
                          .replace(/<\/?ul>|<\/?ol>/g, "")
                          .split(/<li[^>]*>|<\/li>|\r?\n/)
                          .map(b => b.replace(/<[^>]*>/g, "").trim())
                          .map(b => b.replace(/^[^a-zA-Z0-9]+/, "").trim())
                          .filter(b => b.length > 0)
                          .map((benefit, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                              <div className={`h-5 w-5 shrink-0 rounded-full ${gradientClass} grid place-items-center mt-0.5 shadow-sm`}>
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                              </div>
                              <div className="text-sm leading-relaxed text-foreground/80">
                                {benefit}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Specifications Table (above CTAs) */}
                {product.specificationsTableHtml && (
                  <div className="space-y-4">
                    <SectionLabel label="Specifications" gradientClass={gradientClass} themeClass={themeClass} />
                    <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto shadow-sm">
                      <div
                        className="product-spec-table-container 
                          [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
                          [&_td]:p-4 [&_td]:border [&_td]:border-border [&_td]:text-muted-foreground
                          [&_th]:p-4 [&_th]:border [&_th]:border-border [&_th]:bg-accent [&_th]:text-left [&_th]:font-semibold
                          [&_tr:nth-child(even)]:bg-accent/30
                          [&_tr:hover]:bg-primary/5 [&_tr]:transition-colors"
                        dangerouslySetInnerHTML={{ __html: product.specificationsTableHtml }}
                      />
                    </div>
                  </div>
                )}

                {/* Advisory Section */}
                <div className={`p-8 rounded-3xl ${bgClass} border border-border/80 flex flex-col md:flex-row gap-6 items-start`}>
                  <div className={`h-12 w-12 shrink-0 rounded-2xl ${gradientClass} grid place-items-center shadow-lg`}>
                    <FlaskConical className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Usage Guidance</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      For optimal performance, apply as per recommended agronomic practices.
                      Dosage and timing vary by crop stage and regional soil conditions.
                      Consult our digital advisory for a tailored application schedule.
                    </p>
                    <Link
                      href="/contact"
                      className={`mt-4 inline-flex items-center gap-2 text-sm font-bold ${themeClass} hover:underline`}
                    >
                      Request expert advice <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Main CTA */}
                <div className={`relative p-8 rounded-3xl ${gradientClass} overflow-hidden shadow-xl text-primary-foreground`}>
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
                    <Leaf className="h-64 w-64 rotate-45" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Maximise your harvest potential</h3>
                    <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 max-w-md">
                      Our agronomy team is ready to help you choose the right program for your fields.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-deep font-bold text-sm shadow-lg hover:shadow-2xl transition-all"
                    >
                      Speak with an expert <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* ── No images: keep current layout ── */}
              {/* Left: Ingredients & Specs */}
              <div className="lg:sticky lg:top-24 space-y-10">
                {product.ingredients && (
                  <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
                    <div className={`px-6 py-4 ${gradientClass}`}>
                      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary-foreground/70">Formulation</p>
                      <p className="text-sm font-bold text-primary-foreground">Key Ingredients & Composition</p>
                    </div>
                    <div className="p-6">
                      <div 
                        className="text-sm leading-relaxed text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: product.ingredients }}
                      />
                    </div>
                  </div>
                )}

                {product.specificationsTableHtml && (
                  <div className="space-y-4">
                    <SectionLabel label="Specifications" gradientClass={gradientClass} themeClass={themeClass} />
                    <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto shadow-sm">
                      <div
                        className="product-spec-table-container 
                          [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
                          [&_td]:p-4 [&_td]:border [&_td]:border-border [&_td]:text-muted-foreground
                          [&_th]:p-4 [&_th]:border [&_th]:border-border [&_th]:bg-accent [&_th]:text-left [&_th]:font-semibold
                          [&_tr:nth-child(even)]:bg-accent/30
                          [&_tr:hover]:bg-primary/5 [&_tr]:transition-colors"
                        dangerouslySetInnerHTML={{ __html: product.specificationsTableHtml }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Description & Benefits */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <SectionLabel label="Product Overview" gradientClass={gradientClass} themeClass={themeClass} />
                  <div
                    className="text-base leading-relaxed text-muted-foreground prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                {product.keyBenefits && (
                  <div className="space-y-4">
                    <SectionLabel label="Key Benefits" gradientClass={gradientClass} themeClass={themeClass} />
                    <div className={`p-6 rounded-2xl ${bgClass} border border-border/60`}>
                      <div className="space-y-4">
                        {product.keyBenefits
                          .replace(/<\/?ul>|<\/?ol>/g, "")
                          .split(/<li[^>]*>|<\/li>|\r?\n/)
                          .map(b => b.replace(/<[^>]*>/g, "").trim())
                          .map(b => b.replace(/^[^a-zA-Z0-9]+/, "").trim())
                          .filter(b => b.length > 0)
                          .map((benefit, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                              <div className={`h-5 w-5 shrink-0 rounded-full ${gradientClass} grid place-items-center mt-0.5 shadow-sm`}>
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                              </div>
                              <div className="text-sm leading-relaxed text-foreground/80">
                                {benefit}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Advisory Section */}
                <div className={`p-8 rounded-3xl ${bgClass} border border-border/80 flex flex-col md:flex-row gap-6 items-start`}>
                  <div className={`h-12 w-12 shrink-0 rounded-2xl ${gradientClass} grid place-items-center shadow-lg`}>
                    <FlaskConical className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Usage Guidance</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      For optimal performance, apply as per recommended agronomic practices.
                      Dosage and timing vary by crop stage and regional soil conditions.
                      Consult our digital advisory for a tailored application schedule.
                    </p>
                    <Link
                      href="/contact"
                      className={`mt-4 inline-flex items-center gap-2 text-sm font-bold ${themeClass} hover:underline`}
                    >
                      Request expert advice <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Main CTA */}
                <div className={`relative p-8 rounded-3xl ${gradientClass} overflow-hidden shadow-xl text-primary-foreground`}>
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
                    <Leaf className="h-64 w-64 rotate-45" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Maximise your harvest potential</h3>
                    <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 max-w-md">
                      Our agronomy team is ready to help you choose the right program for your fields.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-deep font-bold text-sm shadow-lg hover:shadow-2xl transition-all"
                    >
                      Speak with an expert <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border">
            <h3 className="text-2xl font-semibold mb-10">More from {product.category}</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/solutions/${p.slug}`}
                  className="group block rounded-2xl bg-card ring-1 ring-border overflow-hidden hover:shadow-elegant transition-all"
                >
                  {/* <div className="relative aspect-video overflow-hidden bg-accent">
                    {p.images[0] ? (
                      <Image src={p.images[0]} alt={p.name} fill className="object-contain transition-transform group-hover:scale-105" />
                    ) : (
                      <div className={`h-full w-full ${gradientClass} opacity-10 flex items-center justify-center`}>
                        <Leaf className="h-8 w-8 text-primary-deep opacity-30" />
                      </div>
                    )}
                  </div> */}
                  <div className="p-4">
                    <h4 className="font-semibold text-sm group-hover:text-primary-deep transition-colors truncate">{p.name}</h4>
                    <p className="text-[0.65rem] text-muted-foreground mt-1 uppercase tracking-wider">{p.subcategory ?? p.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <CtaBanner />
    </SiteLayout>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ label, gradientClass, themeClass }: { label: string; gradientClass: string; themeClass: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-1.5 w-8 rounded-full ${gradientClass}`} />
      <h5 className={`text-[0.7rem] font-bold uppercase tracking-widest ${themeClass}`}>
        {label}
      </h5>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .52-.88l7.5-4.42a1 1 0 0 1 .96 0l7.5 4.42A1 1 0 0 1 20 6v7z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}