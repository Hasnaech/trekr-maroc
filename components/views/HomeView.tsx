import Link from "next/link";
import { Plane, Trophy, Landmark, Leaf, Gem, Sparkles, ArrowRight } from "lucide-react";
import StationPicker from "@/components/StationPicker";
import OmniSearch from "@/components/OmniSearch";
import { STATIONS } from "@/lib/network";
import { findRoute, formatMin } from "@/lib/router";
import { T, localePrefix, type Locale } from "@/lib/i18n";

/** Homepage localisee : hero, omni-saisie, scenarios, promesses, axes SEO. */

const SCENARIO_META = [
  { key: "ram", icon: Plane, path: "/train/aeroport/marrakech" },
  { key: "supporter2030", icon: Trophy, path: "/train/tanger/marrakech" },
  { key: "culture", icon: Landmark, path: "/train/casa/fes" },
];

const POPULAR_AXES: [string, string][] = [
  ["casa", "marrakech"],
  ["tanger", "casa"],
  ["rabat", "fes"],
  ["casa", "fes"],
  ["marrakech", "essaouira"],
  ["tanger", "chefchaouen"],
];

export default function HomeView({ locale }: { locale: Locale }) {
  const t = T[locale].home;
  const p = localePrefix(locale);

  return (
    <main className="container mx-auto px-4">
      <section className="pt-16 md:pt-24 pb-10 text-center">
        <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">{t.kicker}</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          {t.title1}
          <br className="hidden md:block" /> {t.title2}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">{t.subtitle}</p>
        <OmniSearch locale={locale} />
        <StationPicker locale={locale} />
      </section>

      <section className="pb-12" aria-label="Scenarios">
        <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {SCENARIO_META.map((s, i) => (
            <Link
              key={s.key}
              href={`${p}${s.path}`}
              className={`glass rounded-2xl p-4 spring hover:scale-[1.02] group card-in card-in-${i + 1}`}
            >
              <s.icon className="w-5 h-5 text-accent mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <p className="font-semibold text-sm">{t.scenarios[i].label}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.scenarios[i].detail}</p>
            </Link>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {t.facts.map((fact) => (
            <span key={fact} className="text-[11px] px-3 py-1 rounded-full glass text-muted-foreground">
              {fact}
            </span>
          ))}
        </div>
      </section>

      <section className="py-14 border-t border-border">
        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto text-center">
          <div>
            <Sparkles className="w-6 h-6 mx-auto mb-3 text-accent" aria-hidden="true" />
            <h2 className="font-semibold mb-1.5">{t.promiseNetworkTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.promiseNetworkBody}</p>
          </div>
          <div>
            <Gem className="w-6 h-6 mx-auto mb-3 text-accent" aria-hidden="true" />
            <h2 className="font-semibold mb-1.5">{t.promiseImmersionTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.promiseImmersionBody}</p>
          </div>
          <div>
            <Leaf className="w-6 h-6 mx-auto mb-3 text-green-600" aria-hidden="true" />
            <h2 className="font-semibold mb-1.5">{t.promiseCarbonTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.promiseCarbonBody}</p>
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-border" aria-label={t.axesTitle}>
        <h2 className="text-xl font-bold text-center mb-6">{t.axesTitle}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {POPULAR_AXES.map(([o, d]) => {
            const trip = findRoute(o, d);
            if (!trip) return null;
            return (
              <Link
                key={`${o}-${d}`}
                href={`${p}/train/${o}/${d}`}
                className="glass rounded-2xl p-4 spring hover:scale-[1.02] group flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-semibold text-sm">
                    {trip.origin.city} <ArrowRight className="w-3.5 h-3.5 inline text-accent" aria-hidden="true" /> {trip.destination.city}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatMin(trip.totalMin)} · {trip.transfers === 0 ? t.direct : `${trip.transfers} ${trip.transfers > 1 ? t.transfers : t.transfer}`}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          {Object.keys(STATIONS).length} {t.stationsCovered}
        </p>
      </section>
    </main>
  );
}
