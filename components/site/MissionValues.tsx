"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, ArrowRight, ShieldCheck, Sprout } from "lucide-react";

export function MissionValues() {
  return (
    <section className="pt-16 pb-20 md:pb-32 bg-surface overflow-hidden">
      <div className="container-wide">

        {/* VISION, MISSION & FUTURE */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* Left Column: Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-12 h-full"
          >
            <div className="flex flex-col max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-green grid place-items-center shadow-glow shrink-0">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                  Our Vision
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                To empower agriculture businesses with intelligent, connected, and data-driven digital ecosystems that improve efficiency, strengthen stakeholder relationships, and accelerate sustainable growth.
              </p>
            </div>

            <div className="pt-8 border-t border-border/80 flex flex-col max-w-xl w-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-blue grid place-items-center shadow-glow-blue shrink-0">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                  Our Mission
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                To bridge agriculture and technology by delivering practical, innovative, and scalable digital transformation solutions tailored specifically for agri businesses and enterprises.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Building the Future of Agriculture Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative flex"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-elegant ring-1 ring-border relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="eyebrow mb-6 block">Future of Farming</span>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
                  Building the Future of Agriculture
                </h3>

                <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    At Agvanta, we believe the future of agriculture lies in intelligent automation, connected platforms, actionable analytics, and customer-centric digital ecosystems. Our mission is to help organizations modernize their business processes, improve decision-making, enhance customer engagement, and unlock new growth opportunities through technology.
                  </p>
                  <p>
                    Whether you are an agri-input company, agritech startup, agri-enterprise, or corporate organization, Agvanta serves as your trusted partner in digital transformation and agribusiness innovation.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 flex items-center gap-3 text-primary-deep font-semibold text-sm">
                <span>Shaping digital agricultural ecosystems</span>
              </div>
            </div>

            {/* Decorative background blur */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-gradient-green opacity-20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
