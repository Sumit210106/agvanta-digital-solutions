"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/solutions", label: "Solutions" },
  { to: "/digital", label: "Digital" },
  // { to: "/partners", label: "Partners" },
  // { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/70"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-18 py-3">
        <Link href="/" aria-label="Agvanta home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.to;

            return (
              <Link
                key={item.to}
                href={item.to}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-green pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
          >
            Explore Products
            <span className="h-8 w-8 rounded-full bg-white/20 grid place-items-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="container-wide py-4 flex flex-col gap-1">
              {NAV.map((item) => {
                const active = pathname === item.to;

                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    className={`rounded-xl px-4 py-3 text-base font-medium hover:bg-accent ${
                      active
                        ? "rounded-xl px-4 py-3 text-base font-semibold bg-accent text-primary-deep"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/solutions"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-green px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}