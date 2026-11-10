import type { Metadata } from "next";
import WC2030View from "@/components/views/WC2030View";

export const metadata: Metadata = {
  title: "Coupe du Monde 2030 au Maroc : circuler entre les villes en train",
  description:
    "Le Maroc co-organise la Coupe du Monde 2030. Tanger, Casablanca, Rabat, Fès, Marrakech : les liaisons ferroviaires réelles entre les villes marocaines annoncées comme hôtes, durées et correspondances.",
  alternates: { languages: { fr: "/2030", en: "/en/2030" } },
};

export default function Supporter2030Page() {
  return <WC2030View locale="fr" />;
}
