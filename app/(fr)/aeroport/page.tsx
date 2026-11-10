import type { Metadata } from "next";
import AirportView from "@/components/views/AirportView";

export const metadata: Metadata = {
  title: "De l'aéroport Mohammed V à tout le Maroc en train",
  description:
    "Vous atterrissez à Casablanca ? La gare est sous le terminal 1. Navette TNR puis Al Boraq et Al Atlas : Marrakech, Rabat, Fès ou Tanger sans voiture, avec durées réelles et impact carbone.",
  alternates: { languages: { fr: "/aeroport", en: "/en/aeroport" } },
};

export default function AeroportPage() {
  return <AirportView locale="fr" />;
}
