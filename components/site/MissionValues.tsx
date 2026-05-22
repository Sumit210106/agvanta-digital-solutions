"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Lightbulb, 
  Leaf, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Heart, 
  Handshake, 
  Zap 
} from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We maintain the highest level of integrity in all our interactions. Honesty, transparency, and ethical practices are the cornerstones of our relationships.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "We believe in the power of collaboration and seek partnerships with farmers, researchers, and experts to collectively address agricultural challenges.",
  },
  {
    icon: Heart,
    title: "Passion for Agriculture",
    desc: "We have a deep passion for agriculture and a genuine desire to make a positive impact. It is the driving force behind everything we do.",
  },
  {
    icon: Handshake,
    title: "Customer Centric",
    desc: "Our customers' success is our success. We listen to their needs, provide personalized support, and deliver exceptional value.",
  },
  {
    icon: Zap,
    title: "Empowerment",
    desc: "We empower farmers with knowledge and tools that enable them to make informed decisions about crop care.",
  },
];

const MISSION_POINTS = [
  {
    title: "Sustainability",
    desc: "Promoting sustainable farming practices that protect the environment and conserve resources.",
    icon: Leaf,
  },
  {
    title: "Education",
    desc: "Providing farmers with knowledge and tools for informed decisions and best practices.",
    icon: BookOpen,
  },
];

export function MissionValues() {
  return (
    <section className="pt-16 pb-20 md:pb-32 bg-surface overflow-hidden">
      <div className="container-wide">
        
        {/* VISION & MISSION */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-green grid place-items-center mb-6 shadow-glow">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Vision: <span className="text-gradient-green">Empowering Agriculture</span></h2>
              <p className="text-muted-foreground leading-relaxed">
                At agvanta, we envision a world where agriculture thrives, where every crop grows to its fullest potential, and where the earth's resources are used sustainably. Our vision is to be the catalyst for this change, leading the way in providing innovative, eco-friendly, and sustainable crop care solutions that nurture agriculture from the root to the shoot.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <div className="h-12 w-12 rounded-2xl bg-gradient-blue grid place-items-center mb-6 shadow-glow-blue">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Mission: <span className="text-gradient-brand">Revolutionizing Crop Care</span></h2>
              <p className="text-muted-foreground leading-relaxed">
                At agvanta, our mission is to be at the forefront of the agricultural industry, delivering comprehensive crop care solutions from root to shoot. We are dedicated to supporting farmers in their pursuit of bountiful and sustainable harvests.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                {MISSION_POINTS.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <div className="h-8 w-8 shrink-0 rounded-lg bg-primary/10 grid place-items-center">
                      <point.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{point.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-elegant ring-1 ring-border relative z-10">
              <span className="eyebrow mb-6">Our Values</span>
              <h3 className="text-2xl font-semibold mb-8">Rooted in Integrity, Growing with Collaboration</h3>
              
              <div className="space-y-6">
                {VALUES.map((v, i) => (
                  <motion.div 
                    key={v.title} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-surface grid place-items-center ring-1 ring-border">
                      <v.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{v.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-gradient-green opacity-20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
