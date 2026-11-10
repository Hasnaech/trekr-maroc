import { Chrome } from "@/components/Chrome";

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <Chrome locale="fr">{children}</Chrome>;
}
