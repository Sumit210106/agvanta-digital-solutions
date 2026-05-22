"use client";

import { motion } from "framer-motion";
import { Sprout, FlaskConical, ShieldCheck, Leaf, Smartphone } from "lucide-react";

const ITEMS = [
  { icon: Sprout, title: "Seeds", desc: "High-yield, climate-resilient varieties.", tone: "green" },
  { icon: FlaskConical, title: "Crop Nutrition", desc: "Balanced, science-backed nutrition.", tone: "blue" },
  { icon: ShieldCheck, title: "Crop Protection", desc: "Effective, responsible plant protection.", tone: "green" },
  { icon: Leaf, title: "Biologicals", desc: "Sustainable, eco-friendly bio inputs.", tone: "blue" },
  { icon: Smartphone, title: "Agri Services", desc: "Personalised crop guidance, in-app.", tone: "green" },
] as const;

export function WhyAgvanta() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      
      {/* 🌾 Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
          alt="Farm background"
          className="w-full h-full object-cover opacity-[0.20]"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Agvanta</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              A complete partner for the <span className="text-gradient-green">modern farmer</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
           Agvanta delivers everything a modern farmer needs under one roof. Backed by 25+ years of combined agri expertise and trusted by farmers across India.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group relative rounded-3xl border border-border bg-card p-6 hover:shadow-elegant transition-all"
              >
                <div
                  className={`h-12 w-12 rounded-2xl grid place-items-center text-primary-foreground shadow-elegant ${
                    item.tone === "green" ? "bg-gradient-green" : "bg-gradient-blue"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="absolute inset-x-6 bottom-3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}