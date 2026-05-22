import { SiteLayout } from "@/components/site/SiteLayout";
import { PartnersContent } from "@/components/site/PartnersContent";

export const metadata = {
  title: "Our Partners — Agvanta | Growing Together",
  description:
    "Agvanta runs structured loyalty programs for dealers, distributors, and farmers, aimed at building long-term partnerships and driving business growth.",
  openGraph: {
    title: "Our Partners — Agvanta | Growing Together",
    description:
      "Join the Agvanta network and empower farmers with integrated agritech solutions and engagement programs.",
  },
};

export default function PartnersPage() {
  return (
    <SiteLayout>
      <PartnersContent />
    </SiteLayout>
  );
}
