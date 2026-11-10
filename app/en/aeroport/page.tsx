import type { Metadata } from "next";
import AirportView from "@/components/views/AirportView";

export const metadata: Metadata = {
  title: "From Mohammed V airport to all of Morocco by train",
  description:
    "Landing in Casablanca? The station sits under terminal 1. TNR shuttle then Al Boraq and Al Atlas: Marrakech, Rabat, Fes or Tangier without a car, with real durations and carbon impact.",
  alternates: { languages: { fr: "/aeroport", en: "/en/aeroport" } },
};

export default function AirportPageEn() {
  return <AirportView locale="en" />;
}
