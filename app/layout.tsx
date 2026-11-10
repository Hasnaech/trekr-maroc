import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trekr : le compagnon de voyage IA du Maroc",
    template: "%s | Trekr Maroc",
  },
  description:
    "Le Maroc en train, de bout en bout : itinéraires réels ONCF (Al Boraq, Al Atlas), expériences locales authentiques et impact carbone mesuré.",
  keywords: ["Maroc", "train", "ONCF", "Al Boraq", "voyage", "itinéraire", "Marrakech", "Fès", "Tanger", "Rabat", "Casablanca", "Morocco", "travel"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
