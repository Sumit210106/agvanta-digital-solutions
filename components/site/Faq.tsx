"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What products does Agvanta offer?",
    a: "Agvanta offers a comprehensive range of agricultural inputs including certified seeds, crop nutrition products, crop protection solutions, and biological alternatives. All products are available through authorised dealer networks across India.",
  },
  {
    q: "Where can I buy Agvanta inputs?",
    a: "Agvanta products are available through a growing network of authorised dealers and distributors across India. Visit our Dealer Locator page or contact us to find your nearest stockist.",
  },
  {
    q: "How does the digital advisory work?",
    a: "Agvanta's digital advisory platform provides crop-specific, region-wise guidance across the full crop lifecycle from seed selection to harvest. Farmers receive personalised recommendations on inputs, irrigation, and pest management through the app or via agronomist calls.",
  },
  {
    q: "Are Agvanta's biological products safe for soil and environment?",
    a: "Yes. Agvanta's biological products are formulated to be safe for soil microbiome health, non-target organisms, and the surrounding environment. They are part of our commitment to sustainable and eco-friendly crop care practices.",
  },
  {
    q: "Can Agvanta help my dealership or agri-business grow?",
    a: "Agvanta offers structured loyalty programmes, business growth tools, and SaaS solutions designed for dealers, distributors, and agri-input companies. Contact our partnership team to learn more.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 md:py-28 bg-surface">
      <div className="container-wide grid lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-5">
          <span className="eyebrow">FAQ</span>

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
            How can we <span className="text-gradient-green">help</span>?
          </h2>

          <p className="mt-5 text-muted-foreground max-w-md">
            Everything you need to know about Agvanta inputs, advisory and our
            on-ground network. Still curious? We're a call away.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={item.q}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-6 p-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base md:text-lg">
                    {item.q}
                  </span>

                  <span
                    className={`h-9 w-9 shrink-0 rounded-full grid place-items-center transition-all ${
                      isOpen
                        ? "bg-gradient-green text-primary-foreground rotate-45"
                        : "bg-accent text-primary-deep"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}