import type { Metadata } from "next";
import "../globals.css";
import { Chrome } from "@/components/Chrome";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: "Trekr : le Maroc en train, guide libre et gratuit",
    template: "%s | Trekr Maroc",
  },
  description:
    "Le Maroc en train, de bout en bout : itinéraires ONCF (Al Boraq, Al Atlas), dernier kilomètre, culture locale et impact carbone. Gratuit, sans publicité, sans traceur, données ouvertes.",
  keywords: ["Maroc", "train", "ONCF", "Al Boraq", "voyage", "itinéraire", "Marrakech", "Fès", "Tanger", "Rabat", "Casablanca"],
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Chrome locale="fr">{children}</Chrome>
      </body>
    </html>
  );
}
