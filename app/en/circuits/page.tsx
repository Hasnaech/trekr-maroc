import type { Metadata } from "next";
import CircuitsView from "@/components/views/CircuitsView";

export const metadata: Metadata = {
  title: "Morocco train circuits: imperial cities, great north, desert gates",
  description:
    "Three multi-city circuits computed on the real ONCF network and eco-connectors: the Imperial Cities in 7 days, the Great North and Chefchaouen, Marrakech to Essaouira and Ouarzazate.",
  alternates: { languages: { fr: "/circuits", en: "/en/circuits" } },
};

export default function CircuitsPageEn() {
  return <CircuitsView locale="en" />;
}
