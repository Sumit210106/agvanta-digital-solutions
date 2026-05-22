"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";

const POINTS = [
  "Partnered with leading agri-input brands and research institutions",
  "Across India and growing",
] as const;

export function AboutBlock() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden ring-1 ring-border shadow-elegant">
            <img
              src="/assets/about-farmer.jpg"
              alt="A farmer's hands holding fresh seedlings in rich dark soil"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-4 md:-right-8 rounded-2xl bg-card ring-1 ring-border shadow-glow p-5 w-56">
            <div className="text-3xl font-semibold text-gradient-green">25+</div>
            <div className="text-xs text-muted-foreground mt-1">
              Years of agronomy experience powering Agvanta
            </div>
          </div>
        </motion.div>

        <div>
          <span className="eyebrow">About Agvanta</span>

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
            A modern AgriTech company
            built on <span className="text-gradient-brand">trust & innovation</span>.
          </h2>

          <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
            Agvanta is a brand of Aham Krishi Care Pvt Ltd, a forward-looking AgriTech company committed to empowering India's farmers through knowledge, quality inputs, and integrated services. We operate at the intersection of agriculture and technology, delivering end-to-end crop care solutions that enhance productivity, profitability, and sustainability.
          </p>

          <ul className="mt-7 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-green pl-6 pr-2 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
            >
              Our Story
              <span className="h-9 w-9 rounded-full bg-white/20 grid place-items-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-primary/40 bg-transparent pl-6 pr-2 py-2 text-sm font-semibold text-primary-deep hover:border-primary transition-colors"
            >
              Become a Partner
              <span className="h-9 w-9 rounded-full bg-primary/15 grid place-items-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}