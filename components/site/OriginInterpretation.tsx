"use client";

import { motion } from "framer-motion";
import { Info, Leaf, Microscope, Sparkles } from "lucide-react";

export function OriginInterpretation() {
  return (
    <section className="py-20 md:py-28 bg-surface relative">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="bg-white rounded-[3rem] p-12 shadow-elegant ring-1 ring-border flex flex-col items-center text-center">
              <img src="/Header.png" alt="Agvanta Logo" className="h-24 md:h-32 mb-10 object-contain" />
              
              <div className="grid sm:grid-cols-2 gap-8 w-full text-left">
                <div className="p-6 rounded-2xl bg-surface ring-1 ring-border">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center mb-4">
                    <Leaf className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-primary mb-2">Ag</h4>
                  <p className="text-sm text-muted-foreground">Short form of Agriculture / Agro — representing our roots in the soil.</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-surface ring-1 ring-border">
                  <div className="h-8 w-8 rounded-lg bg-secondary/10 grid place-items-center mb-4">
                    <Sparkles className="h-4 w-4 text-secondary" />
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-secondary mb-2">Vanta</h4>
                  <p className="text-sm text-muted-foreground">Inspired by "-vanta" (Sanskrit/Hindi) meaning possessing or full of.</p>
                </div>
              </div>

              <div className="mt-10 p-6 w-full rounded-2xl bg-gradient-brand text-white shadow-glow">
                <h4 className="font-semibold text-lg mb-1">Interpretation</h4>
                <p className="text-sm opacity-90">"Agvanta" = One that is endowed with agriculture / agricultural strength.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="eyebrow">The Agvanta Identity</span>
            <h2 className="mt-6 text-3xl md:text-4xl font-semibold leading-tight">
              A company empowering agriculture with <span className="text-gradient-green">knowledge, inputs and services</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              The Agvanta logo is a synthesis of our ideals. The elegant 'A' represents both Agvanta and Aham. The sweeping green represents nature and the deep knowledge of the soil that we cherish. The gradient flows into a vibrant blue, symbolising technology, water, clarity, and data-driven solutions.
            </p>
            
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-white shadow-sm ring-1 ring-border grid place-items-center">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-semibold">Nature & Growth</h5>
                  <p className="text-sm text-muted-foreground">The sweeping green represents nature and the deep knowledge of the soil that we cherish.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-white shadow-sm ring-1 ring-border grid place-items-center">
                  <Microscope className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h5 className="font-semibold">Technology & Science</h5>
                  <p className="text-sm text-muted-foreground">The gradient flows into vibrant blue, symbolizing technology, water, clarity, and data-driven solutions.</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 p-5 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4">
              <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 grid place-items-center">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-primary-deep">
                Agvanta: A combination of Ag (Agriculture) and Vanta (Advantage).
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
