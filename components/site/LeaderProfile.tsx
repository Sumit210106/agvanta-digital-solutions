"use client";

import { motion } from "framer-motion";
import { CheckCircle2, User, Award, ShieldCheck, Briefcase } from "lucide-react";

const INITIATIVES = [
  "CRM & Customer Engagement Platforms",
  "Retailer Loyalty & Reward Programs",
  "Track & Trace Solutions with Analytics",
  "Mobile Applications & Digital Platforms",
  "AI-driven Business Productivity Systems",
  "Business Intelligence Dashboards",
  "Farmer Engagement Ecosystems",
  "Predictive Analytics & Decision Support Tools",
  "Digital Reporting & Automation Systems",
];

export function LeaderProfile() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 lg:sticky lg:top-24"
          >
            <div className="relative rounded-[2.5rem] bg-gradient-soft p-8 border border-border/80 shadow-elegant overflow-hidden group">
              {/* Background gradient blur */}
              <div className="absolute -top-16 -left-16 h-36 w-36 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
              <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-secondary/10 blur-2xl group-hover:bg-secondary/20 transition-all duration-500" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Profile Placeholder Avatar */}
                <div className="h-28 w-28 rounded-full bg-gradient-green p-1 shadow-glow mb-6 flex items-center justify-center">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                    <User className="h-14 w-14 text-primary-deep" />
                  </div>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-deep bg-primary/10 rounded-full px-3.5 py-1 mb-3">
                  Leadership
                </span>

                <h3 className="text-2xl font-semibold text-foreground">Rajeev Raval</h3>
                <p className="text-sm font-semibold text-muted-foreground mt-1">
                  Agritech Consultant &amp; Digital Transformation Strategist
                </p>

                <div className="w-full h-px bg-border/60 my-6" />

                <div className="space-y-4 w-full text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Award className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-foreground">25+ Years of Agri-Input Experience</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4.5 w-4.5 text-secondary" />
                    </div>
                    <span className="text-xs font-semibold text-foreground">Proven Digital Execution Track Record</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-foreground">Expert in Sales, CRM &amp; Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Experience & Initiatives Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 space-y-6"
          >
            <span className="eyebrow">Agri-Input Industry Expert</span>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Led by Agri-Input Industry Expert, <span className="text-gradient-green">Rajeev Raval</span>
            </h2>

            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Agvanta&rsquo;s consulting services are led by Rajeev Raval, a highly accomplished Agritech Consultant and Digital Transformation Strategist with over 25 years of extensive experience in the Agri-Input Industry. His expertise spans Sales, Marketing, CRM, Loyalty Programs, Digital Productivity, Business Excellence Tools, Data Analytics, Channel Engagement, and Digital Transformation initiatives across leading agriculture organizations.
              </p>
              <p>
                Rajeev has successfully led and implemented several high-impact digital initiatives with renowned organizations, where he played pivotal roles in developing:
              </p>
            </div>

            {/* Initiatives Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {INITIATIVES.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-surface ring-1 ring-border shadow-sm hover:shadow-md hover:ring-primary/20 transition-all duration-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-semibold text-sm text-foreground/90">{item}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed pt-4 border-t border-border/60">
              His proven track record in combining agricultural expertise with practical digital execution enables Agvanta to deliver business-oriented, scalable, and result-driven technology solutions for the agriculture sector.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
