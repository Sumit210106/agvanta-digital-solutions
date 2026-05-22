"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useEffect } from "react";

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-[3rem] shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 h-10 w-10 rounded-full bg-white/80 backdrop-blur shadow-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <ContactForm 
                title="Partner with Agvanta" 
                defaultSubject="Partnership Opportunity"
                defaultIdentity="Channel Partner"
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
