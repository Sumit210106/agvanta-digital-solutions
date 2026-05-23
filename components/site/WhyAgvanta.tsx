"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  Award,
  Cpu,
  Sparkles,
  Heart,
  BarChart3,
  Layers,
  UserCheck,
  Trophy,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const ITEMS = [
  {
    icon: Sprout,
    title: "Deep Agriculture Understanding",
    desc: "A rich understanding of the agriculture ecosystem and its unique challenges.",
    tone: "green"
  },
  {
    icon: Award,
    title: "25+ Years of Industry Experience",
    desc: "Led by professionals with decades of domain knowledge and success.",
    tone: "blue"
  },
  {
    icon: Cpu,
    title: "Digital Transformation & Automation",
    desc: "Expertise in digitizing processes, optimizing operations, and automating tasks.",
    tone: "green"
  },
  {
    icon: Sparkles,
    title: "AI-driven Business Solutions",
    desc: "Leveraging state-of-the-art AI technology for smart decision support.",
    tone: "blue"
  },
  {
    icon: Heart,
    title: "CRM & Loyalty Program Expertise",
    desc: "Proven capabilities in establishing distributor networks and dealer loyalty programs.",
    tone: "green"
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Business Intelligence",
    desc: "Transforming complex agri-business datasets into actionable insights.",
    tone: "blue"
  },
  {
    icon: Layers,
    title: "Customized & Scalable Tech",
    desc: "Tailor-made software architectures built to scale with your enterprise growth.",
    tone: "green"
  },
  {
    icon: UserCheck,
    title: "Farmer & Channel-Centric Approach",
    desc: "Tailored engagement strategies for farmers, distributors, retailers, and field teams.",
    tone: "blue"
  },
  {
    icon: Trophy,
    title: "Strategic Consulting & Execution",
    desc: "Bridging the gap between corporate planning and practical, result-driven execution.",
    tone: "green"
  },
] as const;

export function WhyAgvanta() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      if (typeof window !== "undefined") {
        let count = 3;
        if (window.innerWidth < 640) {
          count = 1;
        } else if (window.innerWidth < 1024) {
          count = 2;
        }
        setVisibleCount(count);
        setCurrentIndex((prev) => Math.min(prev, ITEMS.length - count));
      }
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const maxIndex = ITEMS.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [visibleCount, currentIndex, isPaused]);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">

      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
          alt="Farm background"
          className="w-full h-full object-cover opacity-[0.08]"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container-wide">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              Why Choose <span className="text-gradient-green">Agvanta</span>?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center lg:items-end justify-between gap-6 lg:max-w-2xl w-full">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base flex-1">
              We combine deep agricultural expertise with practical digital execution to deliver business-oriented, scalable, and result-driven solutions.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={prevSlide}
                className="h-11 w-11 rounded-full border border-border bg-white flex items-center justify-center text-foreground hover:bg-gradient-green hover:text-green-400 transition-all cursor-pointer shadow-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="h-11 w-11 rounded-full border border-border bg-white flex items-center justify-center text-foreground hover:bg-gradient-green hover:text-green-400 transition-all cursor-pointer shadow-sm"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="overflow-hidden -mx-3 px-3 py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out items-stretch"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="px-3 shrink-0 flex-none"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: i * 0.05 }}
                    className="group relative h-full rounded-3xl border border-border bg-card/60 backdrop-blur-xs p-6 hover:shadow-elegant hover:bg-card hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className={`h-12 w-12 rounded-2xl grid place-items-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform ${
                          item.tone === "green" ? "bg-gradient-green" : "bg-gradient-blue"
                        }`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">{item.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="absolute inset-x-6 bottom-3 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}