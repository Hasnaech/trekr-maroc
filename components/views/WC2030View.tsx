import Link from "next/link";
import { Trophy, ArrowRight, Clock, TrainFront } from "lucide-react";
import { findRoute, formatMin } from "@/lib/router";
import { T, localePrefix, type Locale } from "@/lib/i18n";

/** Page supporter 2030 localisee. */

const AXES: [string, string][] = [
  ["tanger", "casa"],
  ["tanger", "marrakech"],
  ["casa", "rabat"],
  ["casa", "marrakech"],
  ["rabat", "fes"],
  ["casa", "fes"],
];

export default function WC2030View({ locale }: { locale: Locale }) {
  const t = T[locale].wc2030;
  const p = localePrefix(locale);
  const trips = AXES.map(([o, d]) => findRoute(o, d)).filter((x) => x !== null);

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-accent tracking-wide uppercase mb-2 flex items-center justify-center gap-1.5">
          <Trophy className="w-4 h-4" aria-hidden="true" />
          {t.kicker}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {trips.map((trip, i) => (
          <Link
            key={`${trip.origin.key}-${trip.destination.key}`}
            href={`${p}/train/${trip.origin.key}/${trip.destination.key}`}
            className={`glass rounded-[24px] p-5 spring hover:scale-[1.02] group card-in card-in-${(i % 3) + 1}`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="font-bold">
                {trip.origin.city} <ArrowRight className="w-3.5 h-3.5 inline text-accent" aria-hidden="true" /> {trip.destination.city}
              </p>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                {formatMin(trip.totalMin)}
              </span>
              <span className="flex items-center gap-1">
                <TrainFront className="w-3.5 h-3.5 text-marine dark:text-blue-300" aria-hidden="true" />
                {trip.transfers === 0 ? t.direct : `${trip.transfers} ${trip.transfers > 1 ? t.transfers : t.transfer}`}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto">{t.footnote}</p>
    </main>
  );
}
