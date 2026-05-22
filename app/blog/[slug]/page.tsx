/**
 * app/blog/[slug]/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium blog post detail page with sidebar and related content.
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  Tag, 
  Share2, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Search,
  MessageSquare
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { getPostBySlug, getAllPostSlugs, getPosts, getAllCategories } from "@/lib/wp-api";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Agvanta Insights`,
    description: post.seo.description,
    alternates: {
      canonical: `https://agvanta.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      images: post.featuredImage ? [{ url: post.featuredImage.url }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  const [post, recentPostsData, categories] = await Promise.all([
    getPostBySlug(slug),
    getPosts({ perPage: 6 }),
    getAllCategories(),
  ]);

  if (!post) notFound();

  return (
    <SiteLayout>
      <PageHero
        eyebrow={post.categories[0]?.name ?? "Insights"}
        title={post.title}
        description=""
      />

      <section className="container-wide py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            {/* Breadcrumbs & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-12 bg-surface p-6 rounded-[2rem] border border-border/40 shadow-sm">
              <nav className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/60">
                <Link href="/blog" className="hover:text-primary transition-colors">Insights</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-primary truncate max-w-[150px] md:max-w-[300px]">{post.title}</span>
              </nav>

              <div className="flex items-center gap-6 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  5 Min Read
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl ring-1 ring-border/60">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <article className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[1.15rem]
              prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:border prose-img:border-border
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              [&_table]:w-full [&_table]:border-collapse [&_table]:my-12 [&_table]:rounded-3xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-border
              [&_td]:p-6 [&_td]:border [&_td]:border-border [&_td]:text-base
              [&_th]:bg-accent/50 [&_th]:p-6 [&_th]:border [&_th]:border-border [&_th]:text-left [&_th]:text-[0.7rem] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wider
            ">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Post Footer */}
            <div className="mt-24 pt-12 border-t border-border/60">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <Link 
                      key={cat.slug} 
                      href={`/blog?category=${cat.slug}`}
                      className="px-4 py-2 rounded-xl bg-accent text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground border border-border/60 hover:bg-white hover:text-primary hover:border-primary/20 transition-all"
                    >
                      # {cat.name}
                    </Link>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Share:</span>
                  <div className="flex gap-2">
                    <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Author/About Agvanta Card */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10">
              <h4 className="text-lg font-bold mb-4">Agvanta Insights</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Bridging the gap between agricultural tradition and modern innovation. Our experts share field-tested strategies for sustainable growth.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold text-primary group">
                Learn our story <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Popular Topics */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-l-4 border-primary pl-4">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/blog?category=${cat.slug}`}
                    className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    {cat.name} ({cat.count})
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts List */}
            <div className="space-y-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-l-4 border-primary pl-4">Recent Stories</h4>
              <div className="space-y-6">
                {recentPostsData.posts.filter(p => p.slug !== slug).slice(0, 4).map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-4">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 bg-accent border border-border/60">
                      {rp.featuredImage && (
                        <Image src={rp.featuredImage.url} alt={rp.title} fill className="object-cover transition-transform group-hover:scale-110" />
                      )}
                    </div>
                    <div>
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1 block">
                        {formatDate(rp.date)}
                      </span>
                      <h5 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {rp.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Support/Advisory Callout */}
            <div className="relative overflow-hidden p-8 rounded-[2.5rem] bg-slate-900 text-white group">
              <div className="relative z-10">
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">Expert Advisory</h4>
                <p className="text-sm text-slate-400 mb-6">Need specific advice for your soil? Talk to our specialists.</p>
                <Link href="/contact" className="inline-flex h-12 px-6 items-center justify-center rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-primary hover:text-white transition-all">
                  Contact Us
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all" />
            </div>

          </aside>
        </div>
      </section>

    </SiteLayout>
  );
}
