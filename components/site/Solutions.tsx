"use client";

/**
 * components/site/Solutions.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Homepage "Our Products" section.
 * Identical UI to the original — data now comes from WordPress via the
 * CategoryTree prop (fetched server-side in the parent page).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Leaf } from "lucide-react";
import type { CategoryTree, NormalisedProduct } from "@/lib/wp-api";

// ─── Props ────────────────────────────────────────────────────────────────────

interface SolutionsProps {
  categories: CategoryTree[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isFlatCategory(cat: CategoryTree): boolean {
  return !cat.subcategories || cat.subcategories.length === 0;
}

// ─── Mobile Dropdown ─────────────────────────────────────────────────────────

type DropdownOption = { label: string; count?: number };

function MobileDropdown({
  options,
  activeIdx,
  onChange,
  gradientClass,
  placeholder,
}: {
  options: DropdownOption[];
  activeIdx: number;
  onChange: (i: number) => void;
  gradientClass: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const active = options[activeIdx];

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 rounded-full bg-card ring-1 ring-border px-5 py-3 text-sm font-semibold shadow-sm"
      >
        <span>{active?.label ?? placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full rounded-2xl bg-card ring-1 ring-border shadow-elegant overflow-hidden"
          >
            {options.map((opt, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={opt.label}>
                  <button
                    onClick={() => { onChange(i); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm text-left transition-colors ${
                      isActive
                        ? `${gradientClass} text-primary-foreground font-semibold`
                        : "hover:bg-accent text-foreground/80"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.count !== undefined && (
                      <span className={`text-[0.65rem] font-medium ${
                        isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {opt.count} {opt.count === 1 ? "product" : "products"}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Solutions({ categories }: SolutionsProps) {
  const [activeCatIdx, setActiveCatIdx] = useState(0);

  if (!categories || categories.length === 0) {
    return (
      <section id="products" className="py-20 bg-surface">
        <div className="container-wide text-center">
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  const activeCat = categories[activeCatIdx] || categories[0];
  const isFlat = isFlatCategory(activeCat);

  const [activeSubIdx, setActiveSubIdx] = useState(0);
  const activeSub = isFlat ? null : (activeCat.subcategories?.[activeSubIdx] || null);

  const products = useMemo<NormalisedProduct[]>(() => {
    if (isFlat) return activeCat.products || [];
    return activeSub?.products ?? [];
  }, [activeCat, activeSub, isFlat]);

  const tone = activeCat.tone || "green";
  const gradientClass = tone === "green" ? "bg-gradient-green" : "bg-gradient-blue";

  const catOptions: DropdownOption[] = categories.map((c) => ({ label: c.name }));
  const subOptions: DropdownOption[] = !isFlat && activeCat.subcategories
    ? activeCat.subcategories.map((s) => ({ label: s.name, count: s.products.length }))
    : [];

  return (
    <section id="products" className="relative py-20 md:py-28 bg-surface">
      <div className="container-wide">

        {/* ── Section Header ── */}
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">Our Products</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              A complete portfolio for{" "}
              <span className="text-gradient-brand">every crop, every season</span>.
            </h2>
          </div>
        </div>

        {/* ── Category Tabs — Desktop / Dropdown — Mobile ── */}
        <div className="flex justify-center">
          {/* Desktop tabs */}
          <div
            role="tablist"
            aria-label="Product categories"
            className="hidden sm:inline-flex p-2 items-center gap-1 rounded-full bg-card ring-1 ring-border shadow-sm"
          >
            {categories.map((c, i) => {
              const active = i === activeCatIdx;
              const cGradient = c.tone === "green" ? "bg-gradient-green" : "bg-gradient-blue";
              return (
                <button
                  key={c.slug}
                  role="tab"
                  aria-selected={active}
                  onClick={() => { setActiveCatIdx(i); setActiveSubIdx(0); }}
                  className={`relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                    active ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="cat-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className={`absolute inset-0 rounded-full ${cGradient}`}
                    />
                  )}
                  <span className="relative z-10">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile dropdown */}
          <div className="sm:hidden w-full">
            <MobileDropdown
              options={catOptions}
              activeIdx={activeCatIdx}
              onChange={(i) => { setActiveCatIdx(i); setActiveSubIdx(0); }}
              gradientClass={gradientClass}
              placeholder="Select category"
            />
          </div>
        </div>

        {/* ── Catalog Body ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-8 ${isFlat ? "" : "grid gap-6 lg:grid-cols-12"}`}
          >
            {/* ── Subcategory Sidebar / Mobile Dropdown ── */}
            {!isFlat && (
              <aside className="lg:col-span-3">
                {/* Mobile subcategory dropdown */}
                <div className="lg:hidden mb-4">
                  <MobileDropdown
                    options={subOptions}
                    activeIdx={activeSubIdx}
                    onChange={setActiveSubIdx}
                    gradientClass={gradientClass}
                    placeholder="Select sub-category"
                  />
                </div>

                {/* Desktop sidebar */}
                <div className="hidden lg:block rounded-3xl bg-card ring-1 ring-border overflow-hidden sticky top-24">
                  <div className={`px-5 py-4 ${gradientClass}`}>
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary-foreground/70">
                      Sub-categories
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-primary-foreground leading-snug">
                      {activeCat.name}
                    </p>
                  </div>

                  <ul className="p-2 space-y-1">
                    {activeCat.subcategories!.map((s, i) => {
                      const active = i === activeSubIdx;
                      return (
                        <li key={s.slug}>
                          <button
                            onClick={() => setActiveSubIdx(i)}
                            className={`group w-full flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-left text-sm transition-all ${
                              active
                                ? `${gradientClass} text-primary-foreground shadow-elegant`
                                : "hover:bg-accent text-foreground/80"
                            }`}
                            aria-current={active ? "true" : undefined}
                          >
                            <span className="flex-1 min-w-0">
                              <span className="block font-semibold leading-tight truncate">{s.name}</span>
                              <span className={`block text-[0.68rem] mt-0.5 ${
                                active ? "text-primary-foreground/75" : "text-muted-foreground"
                              }`}>
                                {s.products.length}{" "}
                                {s.products.length === 1 ? "product" : "products"}
                              </span>
                            </span>
                            <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                              active ? "translate-x-0" : "group-hover:translate-x-0.5"
                            }`} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            )}

            {/* ── Product Grid ── */}
            <div className={isFlat ? "w-full" : "lg:col-span-9"}>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    {activeCat.name}
                    {!isFlat && activeSub ? ` / ${activeSub.name}` : ""}
                  </p>
                  <h3 className="mt-1 text-xl md:text-2xl font-semibold">
                    {isFlat ? activeCat.name : activeSub?.name}
                  </h3>
                </div>
                <Link
                  href="/solutions"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep hover:text-primary transition-colors"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCat.slug}-${activeSub?.slug ?? "flat"}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`grid gap-5 ${
                    isFlat
                      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "sm:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {products.map((p, i) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      index={i}
                      label={isFlat ? activeCat.name : (activeSub?.name ?? "")}
                      gradientClass={gradientClass}
                    />
                  ))}

                  {products.length === 0 && (
                    <p className="text-sm text-muted-foreground col-span-full py-8 text-center">
                      No products found in this category.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 sm:hidden">
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep"
                >
                  View full catalog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
  label,
  gradientClass,
}: {
  product: NormalisedProduct;
  index: number;
  label: string;
  gradientClass: string;
}) {
  const primaryImage = product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/solutions/${product.slug}`}
        aria-label={`View details of ${product.name}`}
        className="group flex flex-col h-full rounded-2xl bg-card ring-1 ring-border overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
      >
        {/* uncomment for image */}

        {/* Image header */}

        <div className="relative h-44 w-full overflow-hidden bg-accent shrink-0">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`h-full w-full ${gradientClass} opacity-20 flex items-center justify-center`}>
              <Leaf className="h-10 w-10 text-primary-deep opacity-40" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

        </div>


        {/* Card body */}
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
            <span className={`h-7 w-7 rounded-full grid place-items-center bg-accent transition-all duration-300 group-hover:${gradientClass} group-hover:text-green-600`}>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}