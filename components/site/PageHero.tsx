"use client"
import { motion } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-soft" />
      <div
        aria-hidden
        className="absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-green)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-blue)" }}
      />
      <div className="container-wide relative pt-36 pb-20 md:pt-44 md:pb-28 max-w-4xl text-center mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 flex flex-col items-center"
        >
          {highlight && (
            <div className="mb-2 text-sm md:text-base font-bold uppercase tracking-widest text-gradient-brand">
              {highlight}
            </div>
          )}
          <h1 className="text-4xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-foreground">
            {title}
          </h1>
        </motion.div>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}