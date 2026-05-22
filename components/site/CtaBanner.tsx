"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartnerModal } from "./PartnerModal";

export function CtaBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="container-wide py-16">
      <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 bg-gradient-brand text-primary-foreground shadow-glow">
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8">
            <h3 className="text-5xl md:text-6xl font-semibold leading-tight">
              Ready to grow with Agvanta?
            </h3>

            <p className="mt-3 text-base md:text-xl text-primary-foreground/85 max-w-2xl">
              Join thousands of farmers using smarter inputs, sustainable practices, and digital advisory to lift every harvest. Your best season starts here.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end gap-3 flex-wrap">
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-3 rounded-full bg-background pl-6 pr-2 py-2 text-sm font-semibold text-primary-deep shadow-elegant hover:bg-background/90 transition-all"
            >
              Explore Products
              <span className="h-9 w-9 rounded-full bg-primary/15 grid place-items-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur pl-6 pr-2 py-2 text-sm font-semibold text-primary-foreground border border-white/30 hover:bg-white/20 transition-all"
            >
              Become a Partner
              <span className="h-9 w-9 rounded-full bg-white/20 grid place-items-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl"
        />
      </div>

      <PartnerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}