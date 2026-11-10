import type { Metadata } from "next";
import WC2030View from "@/components/views/WC2030View";

export const metadata: Metadata = {
  title: "2030 World Cup in Morocco: moving between cities by train",
  description:
    "Morocco co-hosts the 2030 World Cup. Tangier, Casablanca, Rabat, Fes, Marrakech: the real rail links between the announced Moroccan host cities, durations and transfers.",
  alternates: { languages: { fr: "/2030", en: "/en/2030" } },
};

export default function Supporter2030PageEn() {
  return <WC2030View locale="en" />;
}
