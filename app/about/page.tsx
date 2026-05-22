import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { MissionValues } from "@/components/site/MissionValues";
import { BrandStory } from "@/components/site/BrandStory";
import { OriginInterpretation } from "@/components/site/OriginInterpretation";
import { Testimonials } from "@/components/site/Testimonials";
import { CtaBanner } from "@/components/site/CtaBanner";

export const metadata = {
  title: "About Us — Agvanta | Empowering Agriculture",
  description:
    "At agvanta, we envision a world where agriculture thrives. Our mission is to deliver comprehensive crop care solutions from root to shoot.",
  openGraph: {
    title: "About Us — Agvanta | Empowering Agriculture",
    description:
      "Nurturing agriculture from the root to the shoot with innovative, eco-friendly, and sustainable crop care solutions.",
  },
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Welcome to Agvanta"
        highlight=""
        description="A forward-looking AgriTech company committed to empowering agriculture through knowledge, inputs, and integrated services."
      />

      <BrandStory />
      <OriginInterpretation />
      <MissionValues />
      <Testimonials />
      <CtaBanner />
    </SiteLayout>
  );
}