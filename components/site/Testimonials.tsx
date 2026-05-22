"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ITEMS = [
  {
    quote:
      "Agvanta's seeds and nutrition program lifted my paddy yield by nearly 22% — and the field team is always a call away.",
    name: "Arjun Yadav",
    role: "Govindgarh, Rajasthan",
  },
  {
    quote:
      "The digital advisory tells me exactly when to spray and irrigate. It feels like having an agronomist in my pocket.",
    name: "Hitesh Yadav",
    role: "Bobas-Jaipur, Rajasthan",
  },
  {
    quote:
      "Their biologicals genuinely improved our soil over two seasons. Healthier plants, fewer chemicals.",
    name: "Mohit Yadav",
    role: "Khawaspura, Rajasthan",
  },
] as const;

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <span className="eyebrow">Trusted by Farmers</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              Real fields, real <span className="text-gradient-brand">results</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-center gap-4">
            <div className="text-5xl font-semibold text-gradient-green">4.8</div>
            <div>
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl bg-card border border-border p-7 flex flex-col gap-5 hover:shadow-elegant transition-all"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <blockquote className="text-base leading-relaxed">
                "{t.quote}"
              </blockquote>

              <figcaption className="mt-auto pt-4 border-t border-border">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}