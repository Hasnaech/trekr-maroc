import type { Metadata } from "next";
import "../globals.css";
import { Chrome } from "@/components/Chrome";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: "Trekr: Morocco by train, a free and open guide",
    template: "%s | Trekr Morocco",
  },
  description:
    "Morocco by train, end to end: ONCF itineraries (Al Boraq, Al Atlas), last mile, local culture and carbon impact. Free, no ads, no trackers, open data.",
  keywords: ["Morocco", "train", "ONCF", "Al Boraq", "travel", "itinerary", "Marrakech", "Fes", "Tangier", "Rabat", "Casablanca"],
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Chrome locale="en">{children}</Chrome>
      </body>
    </html>
  );
}
