"use client";

import { motion } from "framer-motion";
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdAccessTime, 
  MdCheckCircle 
} from "react-icons/md";
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { ContactForm } from "./ContactForm";

export function ContactContent() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow">Get in touch</span>
              <h2 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
                Let's talk about <br />
                <span className="text-gradient-green">your agricultural needs.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Whether you're a farmer looking for advisory or a partner interested in collaboration, we're here to help.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-surface ring-1 ring-border grid place-items-center">
                  <MdEmail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-xl">Email Us</h4>
                  <p className="text-muted-foreground mt-1">info@agvanta.in</p>
                </div>
              </div>

              <div className="flex gap-6">
  <div className="h-14 w-14 shrink-0 rounded-2xl bg-surface ring-1 ring-border grid place-items-center">
    <MdPhone className="h-6 w-6 text-secondary" />
  </div>
  <div>
    <h4 className="font-semibold text-xl">Call Us</h4>
    <p className="text-muted-foreground mt-1">
      <a href="tel:+919833727693" className="hover:underline">
        +91 9833727693
      </a>
    </p>
    <p className="text-muted-foreground">Mon - Sat, 9am - 6pm</p>
  </div>
</div>

              <div className="flex gap-6">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-surface ring-1 ring-border grid place-items-center">
                  <MdLocationOn className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-xl">Visit Us</h4>
                  <p className="text-muted-foreground mt-1">
                    Aham Krishi Care Pvt Ltd 
                    <br />16, Aslali Sewa Sahkari Mandli Godown,
                    <br /> Near Ishwar Krupa Society,
                    <br /> Behind Janki Hotel, 
                    Aslali,<br /> Ahmedabad - 382427 , India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Placeholder */}
            {/* <div className="pt-8 border-t border-border">
              <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Follow Our Journey</h5>
              <div className="flex gap-4">
                {[
                  { icon: FaTwitter, label: 'Twitter' },
                  { icon: FaLinkedin, label: 'LinkedIn' },
                  { icon: FaInstagram, label: 'Instagram' },
                  { icon: FaYoutube, label: 'YouTube' }
                ].map((social) => (
                  <a key={social.label} href="#" className="h-10 w-10 rounded-full bg-surface ring-1 ring-border grid place-items-center hover:bg-primary/10 hover:ring-primary/40 transition-all">
                    <span className="sr-only">{social.label}</span>
                    <social.icon className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div> */}
          </div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <ContactForm />

          </motion.div>

        </div>
      </div>
    </section>
  );
}
