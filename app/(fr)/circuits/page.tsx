import type { Metadata } from "next";
import CircuitsView from "@/components/views/CircuitsView";

export const metadata: Metadata = {
  title: "Circuits du Maroc en train : villes impériales, grand nord, portes du désert",
  description:
    "Trois circuits multi-villes calculés sur le réseau réel ONCF et éco-connecteurs : les Villes Impériales en 7 jours, le Grand Nord et Chefchaouen, Marrakech vers Essaouira et Ouarzazate.",
  alternates: { languages: { fr: "/circuits", en: "/en/circuits" } },
};

export default function CircuitsPage() {
  return <CircuitsView locale="fr" />;
}
