import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ContactContent } from "@/components/site/ContactContent";

export const metadata = {
  title: "Contact Us — Agvanta | Let's Grow Together",
  description:
    "Have questions about our digital advisory or products? Get in touch with the Agvanta team today.",
  openGraph: {
    title: "Contact Us — Agvanta | Let's Grow Together",
    description:
      "Reach out to us for expert agricultural advice, partnership inquiries, or support.",
  },
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Us"
        title="We're here to help"
        highlight=""
        description="Connect with our team of experts and let's work together towards a more sustainable and productive future for agriculture."
      />

      <ContactContent />
    </SiteLayout>
  );
}
