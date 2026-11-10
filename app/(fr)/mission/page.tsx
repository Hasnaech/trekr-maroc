import type { Metadata } from "next";
import MissionView from "@/components/views/MissionView";

export const metadata: Metadata = {
  title: "Mission : un projet d'utilité publique",
  description: "Trekr est gratuit, sans publicité, sans traceur, ouvert et corrigeable. Ce qu'il s'engage à être, et ce qu'il n'est pas.",
  alternates: { languages: { fr: "/mission", en: "/en/mission" } },
};

export default function Page() {
  return <MissionView locale="fr" />;
}
