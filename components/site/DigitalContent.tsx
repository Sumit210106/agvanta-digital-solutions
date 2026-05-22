"use client";

import { motion } from "framer-motion";
import { 
  Smartphone, 
  Settings, 
  PieChart, 
  Cpu, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  Database 
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";

const OFFERINGS = [
  { 
    icon: MapPin, 
    title: "Digital Agri Consultancy", 
    desc: "Crop-specific, region-wise advisory helping farmers make informed decisions across the entire crop lifecycle—from seed selection to harvest." 
  },
  { 
    icon: Database, 
    title: "SaaS for Agri Business", 
    desc: "Farmer, Dealer & distributor management systems, crop advisory engines, and sales tracking analytics dashboards." 
  },
  { 
    icon: Settings, 
    title: "Value-Added Services", 
    desc: "Crop planning, input optimization (seeds, nutrition, crop protection), and field-level agronomy support." 
  },
  { 
    icon: TrendingUp, 
    title: "Market Linkage", 
    desc: "Market linkage insights to help farmers achieve better profitability and productivity." 
  },
] as const;

const OBJECTIVES = [
  "Develop a robust SaaS ecosystem for agri enterprises",
  "Introduce AI-driven precision advisory",
  "Implement predictive analytics for crop health",
  "Expand integrated services for channel partners"
];

export default function DigitalContent() {
  return (
    <>
      <PageHero
        eyebrow="Agvanta Digital"
        title="Innovation in the Field"
        highlight=""
        description="Agvanta operates at the intersection of agriculture and technology, delivering end-to-end solutions that enhance farmer productivity and sustainability."
      />

      <section className="container-wide py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden ring-1 ring-border shadow-glow aspect-video">
              <img
                src="/assets/digital-platform.jpg"
                alt="Agvanta digital platform"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative stats card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-elegant ring-1 ring-border max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Live Advisory</span>
              </div>
              <div className="text-xl font-bold">Real-time Data</div>
              <div className="text-xs text-muted-foreground mt-1">Satellite & Weather Analysis</div>
            </div>
          </motion.div>

          <div>
            <span className="eyebrow">Our Offerings</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight">
              A One-Stop Solution for <span className="text-gradient-blue">Modern Farming</span>.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Agvanta aims to become a leading integrated AgriTech platform in India, serving as a vital bridge between technology and the soil.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {OFFERINGS.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="group rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-all duration-300"
                  >
                    <div className="h-12 w-12 rounded-xl grid place-items-center bg-gradient-blue text-white mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg">{f.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Growth Objectives Section */}
        <div className="bg-surface rounded-[3rem] p-8 md:p-16 border border-border">
          <div className="max-w-3xl">
            <span className="eyebrow">The Future</span>
            <h2 className="mt-4 text-3xl font-semibold">Key Growth Objectives</h2>
            <p className="mt-4 text-muted-foreground mb-10">
              We are constantly evolving to provide the most advanced tools for the agricultural ecosystem.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {OBJECTIVES.map((obj, i) => (
                <motion.div 
                  key={obj}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white ring-1 ring-border shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium text-sm">{obj}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
