"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sprout,
  FlaskConical,
  ShieldCheck,
  Leaf,
  Smartphone,
  Monitor,
} from "lucide-react";
import { PartnerModal } from "./PartnerModal";

/* =========================
   DATA
========================= */
const ITEMS = [
  {
    icon: Sprout,
    title: "Seeds",
    desc: "High-yield, climate-resilient varieties.",
    tone: "green",
  },
  {
    icon: FlaskConical,
    title: "Crop Nutrition",
    desc: "Balanced, science-backed nutrition.",
    tone: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Crop Protection",
    desc: "Effective, responsible plant protection.",
    tone: "green",
  },
  {
    icon: Leaf,
    title: "Biologicals",
    desc: "Sustainable, eco-friendly bio inputs.",
    tone: "blue",
  },
  {
    icon: Smartphone,
    title: "Agri Services",
    desc: "Personalised crop guidance, in-app.",
    tone: "green",
  },
  {
    icon: Monitor,
    title: "Digital Solutions",
    desc: "Smart farm management & data insights.",
    tone: "blue",
  },
] as const;

/* =========================
   COMPONENT
========================= */
export default function HeroWithWhy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getCardWidth = useCallback(() => {
    const el = carouselRef.current;
    if (!el || !el.firstElementChild) return 300;
    return (el.firstElementChild as HTMLElement).offsetWidth + 16;
  }, []);

  const scroll = useCallback((dir: "prev" | "next") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? getCardWidth() : -getCardWidth(), behavior: "smooth" });
  }, [getCardWidth]);

  // Track active card from scroll position
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cw = getCardWidth();
        if (cw > 0) setActiveIdx(Math.round(el.scrollLeft / cw));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [getCardWidth]);

  // Auto-slide logic
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const cw = getCardWidth();
      if (!cw) return;
      
      const maxScroll = el.scrollWidth - el.clientWidth;
      
      // If we're at or near the end, wrap back to the start
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cw, behavior: "smooth" });
      }
    }, 2000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [getCardWidth]);

  return (
    <div className="relative overflow-hidden">

      {/* SINGLE GLOBAL BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
          alt="Farm background"
          className="w-full h-full object-cover opacity-[0.5]"
        />
      </div>

      {/* Optional gradient overlay for readability */}
      <div className="absolute inset-0 bg-white/70 z-0" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">

        {/* ================= HERO ================= */}
        <section className="container-wide grid lg:grid-cols-12 gap-8 items-center pt-32 pb-20 md:pt-36 md:pb-28 min-h-170 md:min-h-190">

          {/* LEFT */}
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold leading-[1.05] tracking-tight text-foreground"
            >
              Empowering{" "}
              <span className="text-gradient-green">Agriculture </span>
              with Smart Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-6 text-xs text-foreground/70 max-w-4xl flex flex-wrap items-center gap-x-2 gap-y-2"
            >
              <span>Seeds</span>
              <span className="size-2 rounded-full bg-primary" />
              <span>Crop Nutrition</span>
              <span className="size-2 rounded-full bg-primary" />
              <span>Crop Protection</span>
              <span className="size-2 rounded-full bg-primary" />
              <span>Biologicals</span>
              <span className="size-2 rounded-full bg-primary" />
              <span>Agri Services</span>
              <span className="size-2 rounded-full bg-primary" />
              <span>Digital Solutions</span>
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-9 flex items-center gap-2 md:gap-4"
            >
              <Link
                href="/solutions"
                className="group flex-1 sm:flex-initial inline-flex items-center justify-between sm:justify-start gap-2 md:gap-3 rounded-full bg-gradient-green pl-4 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 text-[13px] md:text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elegant transition-all whitespace-nowrap"
              >
                Explore Products
                <span className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-0.5 transition-transform shrink-0">
                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
              </Link>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex-1 sm:flex-initial inline-flex items-center justify-between sm:justify-start gap-2 md:gap-3 rounded-full bg-gradient-blue pl-4 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 text-[13px] md:text-sm font-semibold text-secondary-foreground shadow-glow-blue hover:shadow-elegant transition-all whitespace-nowrap"
              >
                Become a Partner
                <span className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-0.5 transition-transform shrink-0">
                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT IMAGE — bigger, styled with layered glow & floating effect */}
          <div className="lg:col-span-6 relative flex items-end justify-end pr-4 md:pr-8">
            {/* Decorative glow blob behind image */}
            <div
              className="absolute bottom-0 right-4 md:right-8 w-[340px] md:w-[460px] lg:w-[500px] h-[360px] md:h-[480px] rounded-full
                          bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-3xl -z-10"
            />
            {/* Secondary accent blob */}
            <div
              className="absolute top-8 right-20 md:right-28 w-[180px] md:w-[240px] h-[180px] md:h-[240px] rounded-full
                          bg-secondary/20 blur-2xl -z-10"
            />

            <motion.img
              src="/home.png"
              alt="Agvanta product"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              /* subtle perpetual float */
              whileInView={{ opacity: 1 }}
              style={{
                animation: "heroFloat 5s ease-in-out infinite",
              }}
              className="relative w-[360px] md:w-[460px] lg:w-[520px] object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,0.18)]"
            />

            {/* Inline keyframes for the float animation */}
            <style>{`
              @keyframes heroFloat {
                0%, 100% { transform: translateY(0px); }
                50%       { transform: translateY(-14px); }
              }
            `}</style>
          </div>
        </section>

        {/* ================= WHY AGVANTA ================= */}
        <section className="container-wide pb-20 md:pb-28">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">Why Agvanta</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                A complete partner for the{" "}
                <span className="text-gradient-green">
                  modern farmer
                </span>.
              </h2>
            </div>

            <p className="text-muted-foreground max-w-md">
              Agvanta delivers everything a modern farmer needs under one roof. Backed by 25+ years of combined agri expertise and trusted by farmers across India.
            </p>
          </div>

          {/* Carousel wrapper — relative so nav buttons can sit inside */}
          <div className="relative">

            {/* ── TRACK ───────────────────────────────────────────────── */}
            <div
              ref={carouselRef}
              className="
                flex gap-4 overflow-x-auto pb-6
                -mx-4 px-4
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              "
              style={{
                cursor: "grab",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
              onMouseDown={(e) => {
                const el = e.currentTarget;
                let isDragging = false;
                const startX = e.pageX;
                const startScroll = el.scrollLeft;

                const onMove = (ev: MouseEvent) => {
                  const dx = ev.pageX - startX;
                  if (!isDragging && Math.abs(dx) > 4) isDragging = true;
                  if (isDragging) {
                    el.style.cursor = "grabbing";
                    el.style.userSelect = "none";
                    el.scrollLeft = startScroll - dx;
                  }
                };

                const onUp = () => {
                  el.style.cursor = "grab";
                  el.style.userSelect = "";
                  window.removeEventListener("mousemove", onMove);
                  window.removeEventListener("mouseup", onUp);
                };

                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
            >
              {ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                    style={{ scrollSnapAlign: "start" }}
                    className="
                      group relative rounded-3xl border border-border bg-white/80 backdrop-blur p-6
                      hover:shadow-elegant transition-all flex-shrink-0
                      w-[72vw] sm:w-[44vw] md:w-[32vw] lg:w-[22vw] xl:w-[18vw]
                    "
                  >
                    <div
                      className={`h-12 w-12 rounded-2xl grid place-items-center text-primary-foreground shadow-elegant ${
                        item.tone === "green"
                          ? "bg-gradient-green"
                          : "bg-gradient-blue"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="absolute inset-x-6 bottom-3 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                  </motion.div>
                );
              })}
            </div>

            {/* Manual navigation buttons removed for auto-slide mode */}
          </div>
        </section>

      </div>

      <PartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}