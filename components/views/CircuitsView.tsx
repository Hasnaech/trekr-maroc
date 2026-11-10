import Link from "next/link";
import { ArrowRight, Clock, Leaf, Route } from "lucide-react";
import { allComputedCircuits } from "@/lib/circuits";
import { formatMin } from "@/lib/router";
import { T, localePrefix, type Locale } from "@/lib/i18n";

/** Circuits multi-villes localises. */
export default function CircuitsView({ locale }: { locale: Locale }) {
  const t = T[locale].circuits;
  const p = localePrefix(locale);
  const circuits = allComputedCircuits();
  const en = locale === "en";

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-accent tracking-wide uppercase mb-2">{t.kicker}</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        {circuits.map((c, ci) => (
          <article key={c.slug} className={`glass rounded-[24px] p-6 card-in card-in-${(ci % 3) + 1}`}>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="font-bold text-lg">
                  <span aria-hidden="true">{c.emoji}</span> {en ? c.titleEn : c.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">{en ? c.pitchEn : c.pitch}</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                <span className="glass rounded-full px-3 py-1 font-medium">{en ? c.daysEn : c.days}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  {formatMin(c.totalMin)} {t.totalTransport}
                </span>
                <span className="flex items-center gap-1 text-green-700 dark:text-green-400 font-medium">
                  <Leaf className="w-3.5 h-3.5" aria-hidden="true" />
                  -{c.totalSavedKg} {t.savedVsCar}
                </span>
              </div>
            </div>

            <ol className="space-y-2">
              {c.steps.map((step, i) => (
                <li key={i}>
                  <Link
                    href={`${p}/train/${step.trip.origin.key}/${step.trip.destination.key}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border p-3 spring hover:scale-[1.01] hover:border-accent/50 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {step.fromCity} <ArrowRight className="w-3 h-3 inline text-accent" aria-hidden="true" /> {step.toCity}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatMin(step.trip.totalMin)} · {step.trip.legs.map((l) => l.line).join(" + ")}
                        </p>
                      </div>
                    </div>
                    <Route className="w-4 h-4 text-muted-foreground group-hover:text-accent flex-shrink-0 transition-colors" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">{t.footnote}</p>
    </main>
  );
}
