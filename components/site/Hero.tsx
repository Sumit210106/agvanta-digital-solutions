"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background */}
      {/* <img
        src="/assets/hero-wave.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      /> */}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-l from-white via-white/70 to-transparent" />

      <div className="container-wide relative grid lg:grid-cols-12 gap-8 items-center pt-32 pb-20 md:pt-36 md:pb-28 min-h-170 md:min-h-190">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-6 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold leading-[1.05] tracking-tight text-foreground"
          >
            Empowering <span className="text-gradient-green">Agriculture </span>
            with Smart Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 text-base md:text-lg text-foreground/70 max-w-4xl flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span>Seeds</span>
            <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.68_0.18_142_/_0.4)]" />
            <span>Crop Nutrition</span>
            <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.68_0.18_142_/_0.4)]" />
            <span>Crop Protection</span>
            <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.68_0.18_142_/_0.4)]" />
            <span>Biologicals</span>
            <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.68_0.18_142_/_0.4)]" />
            <span>Agri Services</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-green pl-6 pr-2 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elegant transition-all"
            >
              Explore Products
              <span className="h-9 w-9 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/partners"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-blue pl-6 pr-2 py-2 text-sm font-semibold text-secondary-foreground shadow-glow-blue hover:shadow-elegant transition-all"
            >
              Become a Partner
              <span className="h-9 w-9 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:col-span-6 relative flex items-end justify-end pr-6 md:pr-12">
          <motion.img
            src="/bottle.png"
            alt="Agvanta product and app"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="w-[320px] md:w-100 lg:w-100 object-cover drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}