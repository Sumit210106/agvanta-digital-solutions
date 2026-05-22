"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Soil & Crop Diagnosis", desc: "We assess your soil health, crop stage, and field conditions to build a precise crop care baseline." },
  { n: "02", title: "Personalised Crop Plan", desc: "Our agronomists design a customised input and nutrition plan — matched to your crop, region, and season." },
  { n: "03", title: "Inputs & On-Field Support", desc: "We supply premium seeds, nutrients, and protection products — with field-level guidance for best results." },
  { n: "04", title: "Track, Monitor & Improve", desc: "Digital advisory tools track crop health and yield outcomes, helping you make smarter decisions every season." },
] as const;

export function Process() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-surface">
      {/* Background image */}
      <img
        src="/assets/hero-wave.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Overlay — softens the image so text stays readable */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 container-wide">
        <div className="max-w-2xl mb-14">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
            From soil to <span className="text-gradient-green">harvest</span>, we walk every step with you.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative rounded-3xl bg-card/80 backdrop-blur-sm border border-border p-7 hover:shadow-elegant hover:bg-card transition-all"
            >
              <div className="text-5xl font-semibold text-gradient-brand leading-none">{s.n}</div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}