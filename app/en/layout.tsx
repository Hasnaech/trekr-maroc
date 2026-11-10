import type { Metadata } from "next";
import { Chrome } from "@/components/Chrome";

export const metadata: Metadata = {
  title: {
    default: "Trekr: Morocco's AI travel companion",
    template: "%s | Trekr Morocco",
  },
  description:
    "Morocco by train, end to end: real ONCF itineraries (Al Boraq, Al Atlas), authentic local experiences and measured carbon impact.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <Chrome locale="en">{children}</Chrome>;
}
