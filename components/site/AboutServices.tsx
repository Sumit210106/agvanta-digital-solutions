"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Smartphone,
  Cpu,
  MessageSquare,
  QrCode,
  Gift,
  GraduationCap,
  Target,
  Cloud,
  ChevronRight
} from "lucide-react";

const SERVICES = [
  {
    icon: Smartphone,
    title: "Digital Platform Development",
    desc: "We design and develop intelligent digital platforms that improve operational efficiency and customer experience:",
    features: [
      "Mobile Applications for Farmers, Dealers & Sales Teams",
      "Corporate & Product Websites",
      "Dealer & Distributor Management Portals",
      "Customer Engagement Platforms",
      "Sales Force Automation Systems",
      "Service & Support Platforms",
    ],
    tone: "green",
  },
  {
    icon: Cpu,
    title: "AI Bot Development & Business Automation",
    desc: "Leverage Artificial Intelligence to automate workflows, enhance productivity, and improve customer interaction:",
    features: [
      "AI Chatbots for Customer Support",
      "WhatsApp AI Assistants",
      "Farmer Advisory Bots",
      "AI-enabled CRM Automation",
      "Lead Qualification & Follow-up Automation",
      "Smart Knowledge Assistants",
      "Workflow Automation Solutions",
      "AI-powered Business Productivity Tools",
    ],
    tone: "blue",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Business Solutions",
    desc: "Create seamless communication channels and improve customer engagement:",
    features: [
      "WhatsApp Business API Integration",
      "Automated Notifications & Campaigns",
      "Product Promotion & Advisory Services",
      "Lead Capture & Conversion Automation",
      "Customer Support Solutions",
    ],
    tone: "green",
  },
  {
    icon: QrCode,
    title: "Track & Trace Solutions with Analytics",
    desc: "Improve supply chain transparency and product authentication:",
    features: [
      "QR/Barcode-based Product Authentication",
      "Anti-Counterfeit Systems",
      "Secondary Sales Visibility",
      "Product Traceability Platforms",
      "Real-Time Analytics & Dashboard Reporting",
    ],
    tone: "blue",
  },
  {
    icon: Gift,
    title: "Loyalty & Engagement Programs",
    desc: "Develop customized engagement ecosystems to improve customer retention and channel loyalty:",
    features: [
      "Retailer Loyalty Programs",
      "Distributor Engagement Initiatives",
      "Reward & Recognition Platforms",
      "Gamification Solutions",
      "Incentive Program Management",
    ],
    tone: "green",
  },
  {
    icon: GraduationCap,
    title: "Learning Management Systems (LMS)",
    desc: "Build digital learning ecosystems for employees, channel partners, and farmers:",
    features: [
      "Employee Training Platforms",
      "Dealer Learning Modules",
      "Farmer Education Programs",
      "Certification & Assessment Systems",
      "Knowledge Management Solutions",
    ],
    tone: "blue",
  },
  {
    icon: Target,
    title: "Lead Generation & Conversion Tracking",
    desc: "Improve sales performance with intelligent lead management systems:",
    features: [
      "Lead Capture Platforms",
      "Sales Funnel Tracking",
      "CRM Integration",
      "Campaign Performance Analytics",
      "Customer Lifecycle Management",
    ],
    tone: "green",
  },
  {
    icon: Cloud,
    title: "Customized SaaS Solutions for Agri",
    desc: "Develop scalable and business-specific software solutions:",
    features: [
      "Agri CRM Platforms",
      "Sales & Distribution Management Systems",
      "Digital Productivity Platforms",
      "Analytics & Reporting Dashboards",
      "Farmer Engagement Applications",
      "Business Intelligence Tools",
    ],
    tone: "blue",
  },
];

interface ServiceCardProps {
  service: typeof SERVICES[number];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;
  const isGreen = service.tone === "green";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group relative rounded-3xl border border-border bg-card p-6 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex-1 flex flex-col">
        {/* Icon Box */}
        <div className={`h-12 w-12 rounded-2xl grid place-items-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform ${
          isGreen ? "bg-gradient-green" : "bg-gradient-blue"
        }`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Title & Description */}
        <h3 className="mt-5 text-lg font-semibold leading-snug group-hover:text-primary-deep transition-colors">
          {service.title}
        </h3>
        <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
          {service.desc}
        </p>

        {/* Features List */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-border/50 pt-4">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold text-foreground/80 leading-snug">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-2 flex items-center justify-between z-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-primary hover:text-primary-deep flex items-center gap-1 transition-colors cursor-pointer group/btn"
        >
          <span>{isExpanded ? "Read Less" : "Read More"}</span>
          <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover/btn:translate-x-0.5"}`} />
        </button>
      </div>

      <div className="absolute inset-x-6 bottom-3 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </motion.div>
  );
}

export function AboutServices() {
  return (
    <section className="py-20 md:py-28 bg-surface overflow-hidden">
      <div className="container-wide">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="eyebrow">Our Offerings</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
            Our <span className="text-gradient-green">Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We provide a comprehensive range of customized technology solutions to accelerate growth and digitize the agriculture ecosystem.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
