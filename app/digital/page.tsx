import { SiteLayout } from "@/components/site/SiteLayout";
import DigitalContent from "@/components/site/DigitalContent";

export const metadata = {
  title: "Digital Advisory — Smart farming in your pocket | Agvanta",
  description:
    "The Agvanta digital advisory delivers personalised, weather-aware recommendations on sowing, irrigation, nutrition and protection — in your language.",
  openGraph: {
    title: "Agvanta Digital Advisory",
    description:
      "An agronomist in your pocket — personalised, weather-aware crop guidance for every Indian farmer.",
  },
};

export default function DigitalPage() {
  return (
    <SiteLayout>
      <DigitalContent />
    </SiteLayout>
  );
}