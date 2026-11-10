"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { STATIONS } from "@/lib/network";
import { T, localePrefix, type Locale } from "@/lib/i18n";

/** Selecteur d'axe : deux listes de gares, navigation vers la page du trajet. */
export default function StationPicker({ locale }: { locale: Locale }) {
  const router = useRouter();
  const t = T[locale].picker;
  const p = localePrefix(locale);
  const [origin, setOrigin] = useState("aeroport");
  const [destination, setDestination] = useState("marrakech");

  const stations = Object.values(STATIONS);
  const selectClass =
    "flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <form
      className="glass rounded-[24px] p-4 md:p-5 flex flex-col sm:flex-row items-stretch gap-3 max-w-2xl mx-auto card-in"
      onSubmit={(e) => {
        e.preventDefault();
        if (origin !== destination) router.push(`${p}/train/${origin}/${destination}`);
      }}
    >
      <label className="flex-1 flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.from}</span>
        <select value={origin} onChange={(e) => setOrigin(e.target.value)} className={selectClass} aria-label={t.from}>
          {stations.map((s) => (
            <option key={s.key} value={s.key} disabled={s.key === destination}>
              {s.name}{s.kind === "hub_connecteur" ? ` ${t.coach}` : ""}
            </option>
          ))}
        </select>
      </label>

      <label className="flex-1 flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.to}</span>
        <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClass} aria-label={t.to}>
          {stations.map((s) => (
            <option key={s.key} value={s.key} disabled={s.key === origin}>
              {s.name}{s.kind === "hub_connecteur" ? ` ${t.coach}` : ""}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="self-end sm:self-stretch flex items-center justify-center gap-1.5 rounded-2xl bg-accent text-white font-semibold text-sm px-6 py-3 spring hover:scale-[1.03] hover:brightness-105"
      >
        {t.submit}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </form>
  );
}
