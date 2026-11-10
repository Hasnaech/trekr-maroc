import type { Metadata } from "next";
import CarbonView from "@/components/views/CarbonView";

export const metadata: Metadata = {
  title: "Carbon comparator: train, car, plane in Morocco",
  description: "Estimate CO2 emissions per traveller for a journey in Morocco by train, car and plane. Method and ADEME factors shown.",
  alternates: { languages: { fr: "/carbone", en: "/en/carbone" } },
};

export default function Page() {
  return <CarbonView locale="en" />;
}
