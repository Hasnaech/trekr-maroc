import Link from "next/link";
import { Plane, ArrowRight, Clock, Leaf, TrainFront } from "lucide-react";
import { findRoute, formatMin } from "@/lib/router";
import { T, localePrefix, type Locale } from "@/lib/i18n";

/** Page hub aeroport localisee : intermodalite air-rail (contrat-programme RAM). */

const DESTINATIONS = ["marrakech", "rabat", "fes", "tanger", "meknes"];

export default function AirportView({ locale }: { locale: Locale }) {
  const t = T[locale].airport;
  const p = localePrefix(locale);
  const trips = DESTINATIONS.map((d) => findRoute("aeroport", d)).filter((x) => x !== null);
  const airportWord = locale === "en" ? "Airport" : "Aéroport";

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-accent tracking-wide uppercase mb-2 flex items-center justify-center gap-1.5">
          <Plane className="w-4 h-4" aria-hidden="true" />
          {t.kicker}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.title1}
          <br className="hidden md:block" /> {t.title2}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {trips.map((trip, i) => (
          <Link
            key={trip.destination.key}
            href={`${p}/train/aeroport/${trip.destination.key}`}
            className={`glass rounded-[24px] p-5 spring hover:scale-[1.02] group card-in card-in-${(i % 3) + 1}`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="font-bold">
                {airportWord} <ArrowRight className="w-3.5 h-3.5 inline text-accent" aria-hidden="true" /> {trip.destination.city}
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
                {trip.legs.map((l) => l.line).join(" + ")}
              </span>
              <span className="flex items-center gap-1 text-green-700 dark:text-green-400 font-medium">
                <Leaf className="w-3.5 h-3.5" aria-hidden="true" />
                -{trip.carbon.savedVsCarKg} {T[locale].train.savedVsCar}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="glass rounded-[24px] p-5 mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t.tip}{" "}
          <a href="https://www.oncf-voyages.ma" target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
            oncf-voyages.ma
          </a>
          {t.verify}
        </p>
      </div>
    </main>
  );
}
