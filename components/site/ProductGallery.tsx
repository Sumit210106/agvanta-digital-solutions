"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  category: string;
  gradientClass: string;
}

export function ProductGallery({ images, name, category, gradientClass }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play logic for carousel feel
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, images.length, isPaused]);

  if (!images || images.length === 0) {
    return (
      <div className={`relative aspect-4/3 rounded-3xl overflow-hidden ${gradientClass} opacity-20 flex items-center justify-center ring-1 ring-border`}>
        <Leaf className="h-20 w-20 text-primary-deep opacity-40" />
      </div>
    );
  }

  return (
    <div 
      className="space-y-6" 
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Image Container */}
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* TODO: Uncomment to add product image */}
            <Image
              src={images[activeIdx]}
              alt={`${name} agricultural solution - view ${activeIdx + 1} of ${images.length}`}
              title={`${name} - ${category}`}
              fill
              priority={activeIdx === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
            
            {/* Placeholder while images are hidden */}
            <div className={`h-full w-full ${gradientClass} opacity-10 flex items-center justify-center`}>
              <Leaf className="h-20 w-20 text-primary-deep opacity-20" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Overlay Gradients for Depth */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:opacity-100 outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:opacity-100 outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === activeIdx ? "w-8 bg-white shadow-md" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Label & Grid */}
      {images.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">Product Gallery</span>
            <span className="text-[0.65rem] font-medium text-muted-foreground/60">{activeIdx + 1} / {images.length}</span>
          </div>
          <div className="flex gap-5 overflow-x-auto p-2 pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {images.map((img, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative h-20 w-28 shrink-0 rounded-2xl transition-all duration-500 ${
                    isActive 
                      ? `ring-2 ring-offset-2 ${gradientClass.replace('bg-', 'ring-')} shadow-xl scale-105 z-20` 
                      : "ring-1 ring-border opacity-60 hover:opacity-100 hover:scale-[1.02] z-10"
                  }`}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {/* TODO: Uncomment to add product image */}
                    {/* <Image
                      src={img}
                      alt={`${name} thumbnail view ${i + 1}`}
                      fill
                      sizes="140px"
                      className={`object-contain transition-all duration-500 ${isActive ? "scale-110" : "grayscale-[0.5]"}`}
                    /> */}
                    <div className={`h-full w-full ${gradientClass} opacity-10 flex items-center justify-center`}>
                      <Leaf className="h-6 w-6 text-primary-deep opacity-20" />
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
