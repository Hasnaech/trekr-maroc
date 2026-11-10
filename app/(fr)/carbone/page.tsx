import type { Metadata } from "next";
import CarbonView from "@/components/views/CarbonView";

export const metadata: Metadata = {
  title: "Comparateur carbone : train, voiture, avion au Maroc",
  description: "Estimez les émissions de CO2 par voyageur d'un trajet au Maroc en train, en voiture et en avion. Méthode et facteurs ADEME affichés.",
  alternates: { languages: { fr: "/carbone", en: "/en/carbone" } },
};

export default function Page() {
  return <CarbonView locale="fr" />;
}
