"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Settings,
  PieChart,
  Cpu,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Database,
  ArrowRight,
  ShieldCheck,
  CloudLightning,
  ArrowUpRight,
  Leaf
} from "lucide-react";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Faq } from "./Faq";
import { Testimonials } from "./Testimonials";
import { type NormalisedProduct } from "@/lib/wp-api";

const OFFERINGS = [
  {
    icon: MapPin,
    title: "Digital Agri Consultancy",
    desc: "Crop-specific, region-wise advisory helping farmers make informed decisions across the entire crop lifecycle—from seed selection to harvest.",
    tone: "green"
  },
  {
    icon: Database,
    title: "SaaS for Agri Business",
    desc: "Farmer, Dealer & distributor management systems, crop advisory engines, and sales tracking analytics dashboards.",
    tone: "blue"
  },
  {
    icon: Settings,
    title: "Value-Added Services",
    desc: "Crop planning, input optimization (seeds, nutrition, crop protection), and field-level agronomy support.",
    tone: "green"
  },
  {
    icon: TrendingUp,
    title: "Market Linkage",
    desc: "Market linkage insights to help farmers achieve better profitability and productivity.",
    tone: "blue"
  },
] as const;

const FUTURE_ROADMAP = [
  {
    phase: "Phase 01",
    title: "Enterprise SaaS Ecosystem",
    desc: "Empowering agri-input and channel companies with custom dealer networks, loyalty schemes, and automated sales dashboards.",
    icon: Database,
    color: "green"
  },
  {
    phase: "Phase 02",
    title: "AI-Driven Precision Advisory",
    desc: "Deploying machine learning models to analyze multi-spectral satellite imagery and localized weather patterns for high-precision advice.",
    icon: Cpu,
    color: "blue"
  },
  {
    phase: "Phase 03",
    title: "Predictive Analytics for Health",
    desc: "Developing early detection algorithms to map pest infestation risks and crop disease outbreaks before they impact yields.",
    icon: TrendingUp,
    color: "green"
  },
  {
    phase: "Phase 04",
    title: "Integrated Channel Services",
    desc: "Fostering seamless collaboration between corporate teams, field agronomy officers, and dealers on a single unified platform.",
    icon: Settings,
    color: "blue"
  }
] as const;


interface DigitalContentProps {
  products: NormalisedProduct[];
}

export default function DigitalContent({ products }: DigitalContentProps) {
  return (
    <>
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 bg-linear-to-b from-surface via-background to-background">
        {/* Ambient Glow Blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-48 -right-36 h-[32rem] w-[32rem] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-green)" }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-36 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-blue)" }}
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="eyebrow">Agvanta Digital</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground"
              >
                Innovation in the <span className="text-gradient-green">Field</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Agvanta operates at the intersection of agriculture and technology, delivering end-to-end solutions that enhance farmer productivity, efficiency, and sustainability.
              </motion.p>

              {/* Bullet Features */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="grid sm:grid-cols-2 gap-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 grid place-items-center text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">Precision Advisory</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 grid place-items-center text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">Weather-Aware Alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 grid place-items-center text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">SaaS Enterprise Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 grid place-items-center text-secondary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">Real-time Analytics</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.24 }}
                className="flex items-center gap-4 pt-4"
              >
                <a
                  href="#mini-about"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-green pl-5 pr-2 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elegant transition-all"
                >
                  Explore Offerings
                  <span className="h-7 w-7 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-blue pl-5 pr-2 py-2 text-sm font-semibold text-secondary-foreground shadow-glow-blue hover:shadow-elegant transition-all"
                >
                  Contact Us
                  <span className="h-7 w-7 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Dynamic Visual Showcase */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
              {/* Layered background blurs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
              <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-secondary/15 blur-3xl rounded-full" />

              {/* Floating Phone Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative z-10  sm:w-[320px] md:w-[480px] lg:w-[500px] xl:w-[540px] h-auto animate-float-slow"
              >
                <img
                  src="/assets/hero-phone.png"
                  alt="Agvanta Digital Platform"
                  className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.15)]"
                />
              </motion.div>

              {/* Orbiting Stats Card 1 (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-4 left-2 sm:-left-4 md:-left-10 z-20 bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-xl md:rounded-2xl shadow-elegant border border-border/80 max-w-[110px] sm:max-w-[150px] md:max-w-[190px] hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-1.5">
                  <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Live Advisory</span>
                </div>
                <p className="text-[10px] md:text-xs font-semibold text-foreground leading-snug">Optimal Sowing: 24-28 May</p>
                <p className="text-[8px] md:text-[9px] text-muted-foreground mt-0.5 md:mt-1">Satellite &amp; Weather Analysis</p>
              </motion.div>

              {/* Orbiting Stats Card 2 (Middle Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-1/2 right-2 sm:-right-4 md:-right-8 z-20 bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-xl md:rounded-2xl shadow-elegant border border-border/80 max-w-[105px] sm:max-w-[145px] md:max-w-[180px] hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
                  <span className="h-3.5 w-3.5 md:h-4.5 md:w-4.5 rounded-full bg-primary/10 grid place-items-center text-primary">
                    <CheckCircle2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </span>
                  <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Crop Health</span>
                </div>
                <p className="text-[10px] md:text-xs font-semibold text-foreground">94% Health Rating</p>
                <p className="text-[8px] md:text-[9px] text-muted-foreground mt-0.5">No fungal disease alert</p>
              </motion.div>

              {/* Orbiting Stats Card 3 (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-2 left-2 sm:-left-6 md:-left-8 z-20 bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-xl md:rounded-2xl shadow-elegant border border-border/80 max-w-[110px] sm:max-w-[150px] md:max-w-[190px] hover:scale-105 transition-transform"
              >
                <p className="text-[10px] md:text-xs font-semibold text-foreground flex items-center gap-1 md:gap-1.5">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-blue-500 shrink-0" />
                  Soil Moisture: 38%
                </p>
                <p className="text-[8px] md:text-[9px] text-muted-foreground mt-0.5 md:mt-1">Sensor &amp; Radar verification optimal</p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. MINI ABOUT & OFFERINGS SECTION ─── */}
      <section id="mini-about" className="container-wide py-20 border-t border-border/60">

        {/* Split Grid: Left Image, Right Header & Two Paras */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Side: Mockup Image + Stats Card */}
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
              <div className="text-xs text-muted-foreground mt-1">Satellite &amp; Weather Analysis</div>
            </div>
          </motion.div>

          {/* Right Side: Header + Two Paragraphs */}
          <div className="space-y-6">
            <span className="eyebrow">Our Offerings</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
              A One-Stop Solution for <span className="text-gradient-green">Modern Farming</span>
            </h2>

            <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Agvanta aims to become a leading integrated AgriTech platform in India, serving as a vital bridge between technology and the soil. Our solutions connect field operations, dealer channels, and digital crop care advisory into a seamless ecosystem.
              </p>
              <p>
                By integrating real-time weather analytics, satellite observations, and custom CRM systems, we empower agribusinesses to optimize resources, automate workflows, and build strong relationships with channel partners and farmers alike.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Grid: Offerings Cards (As originally requested at the bottom) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFERINGS.map((f, i) => {
            const Icon = f.icon;
            const isGreen = f.tone === "green";
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="group rounded-3xl border border-border bg-card p-6 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`h-12 w-12 rounded-2xl grid place-items-center text-white mb-5 group-hover:scale-105 transition-transform ${isGreen ? "bg-gradient-green" : "bg-gradient-blue"
                    }`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary-deep transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {f.desc}
                  </p>
                </div>


              </motion.div>
            );
          })}
        </div>

        {/* ─── 3. DIGITAL PRODUCT CATALOG SECTION ─── */}
        {products && products.length > 0 && (
          <div className="mt-24 pt-20 border-t border-border/60">
            <div className="max-w-3xl mb-14">
              <span className="eyebrow">Digital Solutions Catalog</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                Our <span className="text-gradient-green">Digital Products</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                Discover our specialized crop advisory systems, farmer applications, and SaaS dashboard platforms developed to scale agribusiness execution.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => {
                const primaryImage = p.images[0];
                const subcategoryText = p.subcategory ?? "Digital Solution";

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="group flex flex-col h-full rounded-[2rem] bg-card ring-1 ring-border overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link href={`/solutions/${p.slug}`} className="flex flex-col h-full w-full">
                      {/* Image/Visual Container */}
                      {/* <div className="relative h-48 w-full overflow-hidden bg-accent shrink-0">
                        {primaryImage ? (
                          <Image
                            src={primaryImage}
                            alt={p.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-green/10 flex items-center justify-center relative">
                            <Leaf className="h-10 w-10 text-primary opacity-40 group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-radial-to-t from-transparent to-white/10" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="text-[10px] font-semibold tracking-wider uppercase text-primary-deep bg-primary/10 rounded-full px-3 py-1">
                            {subcategoryText}
                          </span>
                        </div>
                      </div> */}

                      {/* Info Container */}
                      <div className="flex flex-col flex-1 p-6">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-deep transition-colors leading-snug">
                          {p.name}
                        </h3>

                        {p.description && (
                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                            {p.description}
                          </p>
                        )}

                        <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                          <span className="text-xs font-semibold text-primary-deep group-hover:text-primary transition-colors">
                            View Details
                          </span>
                          <span
                            className="h-8 w-8 rounded-full bg-accent grid place-items-center transition-all duration-300 group-hover:bg-gradient-green group-hover:text-green-400"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Growth Objectives / Future Section */}
        <div className="mt-24 bg-surface rounded-[3rem] p-8 md:p-16 border border-border relative overflow-hidden">
          {/* Decorative glows */}
          <div aria-hidden="true" className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
            {/* Left Column: Heading Content */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div>
                <span className="eyebrow">The Future</span>
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                  Key Growth <span className="text-gradient-green">Objectives</span>
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                We are constantly evolving to provide the most advanced tools for the agricultural ecosystem, focusing on deep tech integrations and enterprise scalability.
              </p>

              {/* Subtle stats/metrics mock visual card */}
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm max-w-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">R&amp;D Target</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-semibold tracking-tight text-gradient-green">2027</span>
                  <span className="text-sm font-semibold text-muted-foreground">Ecosystem Launch</span>
                </div>
                <div className="h-1.5 w-full bg-accent rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-green w-3/4 rounded-full" />
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">75% of development roadmap completed</p>
              </div>
            </div>

            {/* Right Column: Roadmap Phase Cards */}
            <div className="lg:col-span-7 space-y-6">
              {FUTURE_ROADMAP.map((item, i) => {
                const Icon = item.icon;
                const isGreen = item.color === "green";

                return (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-white border border-border/80 shadow-sm hover:shadow-elegant transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Icon Container */}
                    <div className={`h-12 w-12 rounded-xl shrink-0 grid place-items-center text-white ${isGreen ? "bg-gradient-green" : "bg-gradient-blue"
                      }`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Text content */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${isGreen ? "bg-primary/10 text-primary-deep" : "bg-secondary/10 text-secondary"
                          }`}>
                          {item.phase}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary-deep transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <Faq />

      <CtaBanner />

    </>
  );
}
