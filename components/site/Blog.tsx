"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getPosts, NormalisedPost } from "@/lib/wp-api";

interface BlogProps {
  initialPosts: NormalisedPost[];
  totalPages: number;
}

export function Blog({ initialPosts, totalPages }: BlogProps) {
  const [posts, setPosts] = useState<NormalisedPost[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [lastRequestTime, setLastRequestTime] = useState(0);

  const handlePageChange = async (newPage: number) => {
    const now = Date.now();
    if (newPage < 1 || newPage > totalPages || isLoading || (now - lastRequestTime < 500)) return;
    
    setLastRequestTime(now);
    setIsLoading(true);
    try {
      const data = await getPosts({ page: newPage, perPage: 3 });
      setPosts(data.posts);
      setCurrentPage(newPage);
      // Scroll to component top
      const element = document.getElementById("insights");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="insights" className="relative py-20 md:py-28 bg-surface/50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="eyebrow">Latest Insights</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              Field-tested <span className="text-gradient-green">knowledge</span>.
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            Visit Full Blog <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className={`grid md:grid-cols-3 gap-8 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
            >
              {posts.map((post, i) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500"
                >
                  <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-accent flex items-center justify-center text-muted-foreground/20 font-bold text-4xl">
                        Agvanta
                      </div>
                    )}
                    
                    {post.categories[0] && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[0.6rem] font-bold uppercase tracking-wider text-primary shadow-sm">
                          {post.categories[0].name}
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/60">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <div 
                      className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed flex-1"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />

                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary group/btn"
                    >
                      Read More
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Home Page Mini-Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-20 disabled:pointer-events-none shadow-sm"
              aria-label="Previous page"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="text-sm font-bold text-muted-foreground">
              <span className="text-foreground">{currentPage}</span> / {totalPages}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-20 disabled:pointer-events-none shadow-sm"
              aria-label="Next page"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}