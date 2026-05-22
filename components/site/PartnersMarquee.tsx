"use client";

import Image from "next/image";

const PARTNERS = [
  { name: "Geolife", src: "/clients/geolife.png" },
  { name: "Greenland Agri", src: "/clients/greenland.png" },
  { name: "Karnavati Seeds", src: "/clients/karnavatiSeeds.png" },
  { name: "Aham Krishi Care", src: "/clients/ahamKrishiCare.png" },
] as const;

// 4 copies so we animate -25% (one full set width).
// The reset from -25% → 0% lands on an identical frame → zero visible jump.
const TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

export function PartnersMarquee() {
  const speed = "28s"; // adjust: smaller = faster

  return (
    <section
      className="border-y border-border bg-card py-8 md:py-12 overflow-hidden"
      aria-label="Our Trusted Partners"
    >
      <div className="container-wide flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12">
        <p className="text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground shrink-0 text-center lg:text-left">
          Trusted by Industry Leaders
        </p>

        <div className="relative flex-1 overflow-hidden">
          {/* 
            Key fixes:
            1. 4 copies + translate -25% so the loop resets on an identical frame.
            2. animation-timing-function: linear — no easing that could cause micro-stutter.
            3. animation-fill-mode: none + animation-iteration-count: infinite.
            4. translateZ(0) forces GPU compositing — keeps it off the main thread.
            5. No will-change on the wrapper; set it only on the moving element.
          */}
          <div
            className="flex items-center py-2"
            style={{
              display: "flex",
              gap: "clamp(3rem, 5vw, 5rem)",
              width: "max-content",
              animation: `marquee-scroll ${speed} linear infinite`,
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            {TRACK.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 transition-opacity duration-300 hover:opacity-70"
              >
                <Image
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  width={140}
                  height={60}
                  className="h-14 md:h-20 w-auto object-contain"
                  loading="eager"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Fade masks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-card to-transparent z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-card to-transparent z-10"
          />
        </div>
      </div>

      {/*
        Keyframe: moves exactly -25% of the total track width.
        Because track = 4× the original set, -25% = exactly 1 set width.
        The frame at 0% and the frame at -25% look identical → seamless loop.
      */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0) translateZ(0); }
          100% { transform: translateX(-25%) translateZ(0); }
        }
      `}</style>
    </section>
  );
}