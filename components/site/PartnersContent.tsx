"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Trophy, 
  Globe, 
  Handshake, 
  ArrowRight, 
  BarChart, 
  Briefcase 
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaBanner } from "@/components/site/CtaBanner";

const PROGRAMS = [
  {
    icon: Trophy,
    title: "Incentive-Based Rewards",
    desc: "Structured loyalty programs for dealers and distributors designed to drive consistent business growth.",
  },
  {
    icon: Globe,
    title: "Exposure Trips",
    desc: "International and domestic exposure trips for top-performing partners to foster global agricultural knowledge.",
  },
  {
    icon: Handshake,
    title: "Long-term Partnerships",
    desc: "Building lasting relationships through transparency, support, and shared success.",
  },
  {
    icon: BarChart,
    title: "Sales Tracking & Tools",
    desc: "Customized dashboards and systems for efficient dealer and distributor management.",
  },
];

export function PartnersContent() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Growing Together"
        highlight=""
        description="Agvanta serves as a one-stop solution for agri-input companies and channel partners, driving mutual growth through innovation."
      />

      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow">Engagement</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                Management of <br />
                <span className="text-gradient-brand">Loyalty & Engagement</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We run structured loyalty programs for dealers, distributors, and farmers, aimed at building long-term partnerships and driving business growth for our clients and organizations.
              </p>
              
              <div className="mt-10 space-y-4">
                <div className="p-6 rounded-2xl bg-surface border border-border flex gap-5">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-white shadow-sm grid place-items-center">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Integrated Services</h4>
                    <p className="text-sm text-muted-foreground mt-1">Providing end-to-end solutions that enhance partner productivity and profitability.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button className="group inline-flex items-center gap-3 rounded-full bg-gradient-green px-8 py-4 text-sm font-semibold text-white shadow-glow hover:shadow-elegant transition-all">
                  Join our Network
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {PROGRAMS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-surface ring-1 ring-border hover:ring-primary/30 transition-all group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                    <p.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-xl mb-3">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="container-wide text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">A Shared Vision for Prosperity</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Our channel partners are the backbone of our distribution network. We empower them with the tools and knowledge needed to serve farmers better and grow their own enterprises.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Dealers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">50+</div>
                <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Distributors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">12+</div>
                <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">States</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">200k+</div>
                <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Farmers Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
