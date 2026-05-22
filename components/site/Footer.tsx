"use client";

import { useState } from "react";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Logo } from "./Logo";

// import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to subscribe");
      
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
      
      // Reset success message after 5s
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <footer className="relative mt-24">
      {/* Contact accent band — uses brand secondary blue (replacing Ecoland's yellow) */}
      <div className="bg-gradient-blue text-secondary-foreground">
        <div className="container-wide py-10 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Phone,
              label: "Phone No:",
              v1: { text: "+91 9833727693", href: "tel:+919833727693" },
              v2: { text: "Mon – Sat : 09.00 to 18.00" },
            },
            {
              icon: Mail,
              label: "Email Address:",
              v1: { text: "info@agvanta.in", href: "mailto:info@agvanta.in" },
            },
            {
              icon: MapPin,
              label: "Location:",
              v1: { 
                text: `Aham Krishi Care Pvt Ltd 
                16, Aslali Sewa Sahkari Mandli Godown,
                Near Ishwar Krupa Society,
                Behind Janki Hotel,
                Aslali, Ahmedabad - 382427` 
              },
              v2: { text: "India" },
            },
          ].map(({ icon: Icon, label, v1, v2 }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-secondary-foreground/15 grid place-items-center shrink-0">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-base font-semibold">{label}</div>
                <div className="mt-1 text-sm opacity-95 whitespace-pre-line">
                  {v1.href ? (
                    <a href={v1.href} className="hover:underline underline-offset-4">{v1.text}</a>
                  ) : (
                    v1.text
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark green main footer */}
      <div
        className="text-white"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.32 0.09 148) 0%, oklch(0.22 0.06 148) 100%)",
        }}
      >
        <div className="container-wide py-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 space-y-5">
            <div className="bg-white text-black rounded-2xl px-4 py-3 inline-block">
              <Logo />
            </div>
             <p className="text-sm text-white/75 max-w-sm leading-relaxed">
              Agvanta is a brand of Aham Krishi Care Pvt Ltd
            </p>
            <p className="text-sm text-white/75 max-w-sm leading-relaxed">
              Agvanta empowers agriculture with smart, sustainable solutions —
              from premium seeds to agri services for the modern farmer.
            </p>

            {/* <div className="flex gap-3 pt-2">
              {[
                { icon: FaTwitter, label: 'Twitter' },
                { icon: FaLinkedin, label: 'LinkedIn' },
                { icon: FaInstagram, label: 'Instagram' },
                { icon: FaYoutube, label: 'YouTube' }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 grid place-items-center hover:bg-primary/20 hover:ring-primary/40 transition-all"
                >
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="h-4 w-4 text-white/80" />
                </a>
              ))}
            </div> */}
          </div>

          <div className="md:col-span-2">
            <h4 className="text-base font-semibold mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              {/* <li>
                <Link href="/digital" className="hover:text-white transition-colors">
                  Digital
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-base font-semibold mb-5">Solutions</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>Seeds</li>
              <li>Crop Nutrition</li>
              <li>Crop Protection</li>
              <li>Biologicals</li>
              <li>Agri Services</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-base font-semibold mb-5">
              Subscribe Newsletter
            </h4>

            <p className="text-sm text-white/75 mb-4">
              Sign up to get the latest updates from the field.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                placeholder="Email address"
                aria-label="Email address"
                className="w-full rounded-full bg-white/10 border border-white/20 pl-5 pr-14 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-gradient-green grid place-items-center text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>

            {status !== "idle" && (
              <p className={`mt-3 text-xs font-medium ${
                status === "success" ? "text-primary" : "text-red-400"
              }`}>
                {status === "success" ? "✓ " : "✕ "}{message}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <p>© {new Date().getFullYear()} Agvanta Agritech. All rights reserved.</p>
            <p>Empowering Agriculture with Smart Solutions.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}