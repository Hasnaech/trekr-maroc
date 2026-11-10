import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const metadata: Metadata = {
  alternates: { languages: { fr: "/", en: "/en" } },
};

export default function Home() {
  return <HomeView locale="fr" />;
}
