"use client";

import { IoLogoWhatsapp } from "react-icons/io5";

export function WhatsAppButton() {
  const whatsappNumber = "+919833727693"; 
  const message = "Hello Agvanta! I'd like to learn more about your services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba5a] transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <IoLogoWhatsapp size={36} />
    </a>
  );
}
