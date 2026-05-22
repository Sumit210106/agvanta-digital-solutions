/**
 * app/blog/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Blog listing page with category filtering and pagination.
 */

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { getPosts, getAllCategories } from "@/lib/wp-api";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Agriculture Insights & Blog | Agvanta",
  description: "Stay updated with the latest trends, tips, and innovations in sustainable agriculture and crop care.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page, category: categorySlug } = await searchParams;
  const currentPage = parseInt(page ?? "1", 10);
  
  const [postsData, categories] = await Promise.all([
    getPosts({
      page: currentPage,
      perPage: 9,
      categorySlug,
    }),
    getAllCategories(),
  ]);

  const { posts, totalPages } = postsData;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Agvanta Insights"
        title={categorySlug ? `Topics: ${categorySlug.replace(/-/g, ' ')}` : "Nurturing Knowledge"}
        highlight="Rooted in Research"
        description="Explore our latest articles on sustainable farming, crop protection strategies, and agricultural innovation."
      />

      <section className="container-wide py-12">
        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <Link
            href="/blog"
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
              !categorySlug
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "bg-white text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            All Insights
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                categorySlug === cat.slug
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {cat.name}
              <span className="ml-2 opacity-50 text-[0.7em]">{cat.count}</span>
            </Link>
          ))}
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-accent rounded-[3rem] border border-dashed border-border/60">
            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Tag className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found in this category</h3>
            <p className="text-muted-foreground mb-8">We haven't published anything under this topic yet.</p>
            <Link href="/blog" className="text-primary font-bold hover:underline">
              View all articles
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ""}`}
                className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                  p === currentPage
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white border border-border hover:border-primary/40"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <article className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-border/60 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-accent">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
            <Tag className="h-10 w-10 text-primary/20" />
          </div>
        )}
        
        {/* Category Badge */}
        {post.categories[0] && (
          <div className="absolute top-5 left-5 z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[0.65rem] font-bold uppercase tracking-wider text-primary shadow-sm border border-white/20">
              {post.categories[0].name}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-5 text-[0.7rem] font-bold uppercase tracking-widest text-muted-foreground/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </div>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-[1.3]">
            {post.title}
          </h2>
        </Link>

        <div 
          className="text-sm md:text-base text-muted-foreground line-clamp-3 mb-8 leading-relaxed flex-1"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />

        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary group/btn"
        >
          Read Full Article
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </article>
  );
}
