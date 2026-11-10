import type { Metadata } from "next";
import MissionView from "@/components/views/MissionView";

export const metadata: Metadata = {
  title: "Mission: a public-interest project",
  description: "Trekr is free, ad-free, tracker-free, open and correctable. What it commits to be, and what it is not.",
  alternates: { languages: { fr: "/mission", en: "/en/mission" } },
};

export default function Page() {
  return <MissionView locale="en" />;
}
