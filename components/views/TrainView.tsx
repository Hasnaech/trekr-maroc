import Link from "next/link";
import { TrainFront, Bus, Leaf, MapPin, Clock, ArrowRight, Landmark, ExternalLink } from "lucide-react";
import { formatMin, type Trip, type Leg } from "@/lib/router";
import {
  STATIONS,
  HIGHLIGHTS,
  HIGHLIGHTS_EN,
  LAST_MILE,
  LAST_MILE_EN,
  BLUE_FLAG,
  DISCLAIMER,
  DISCLAIMER_EN,
  FREQUENCY_EN,
  type MoroccoMode,
} from "@/lib/network";
import { immersionFor, type ImmersionItem } from "@/lib/immersion";
import { visitTipsForCity } from "@/lib/visitTips";
import { experiencesUrl, staysUrl, hasAffiliation, affiliateDisclosure } from "@/lib/affiliates";
import { T, localePrefix, type Locale } from "@/lib/i18n";
import CityImage from "@/components/CityImage";

/** Page trajet localisee : feuille de route, immersion, carbone, dernier km. */

const MODE_STYLE: Record<MoroccoMode, { color: string; fr: string; en: string }> = {
  train_grande_vitesse: { color: "#f39200", fr: "Grande vitesse", en: "High speed" },
  train_grandes_lignes: { color: "#1e3a5f", fr: "Grandes lignes", en: "Main line" },
  navette_rapide: { color: "#3c91dc", fr: "Navette", en: "Shuttle" },
  eco_connecteur: { color: "#16a34a", fr: "Éco-connecteur", en: "Eco-connector" },
};

export default function TrainView({ trip, locale }: { trip: Trip; locale: Locale }) {
  const t = T[locale].train;
  const p = localePrefix(locale);
  const en = locale === "en";

  const highlight = (en ? HIGHLIGHTS_EN : HIGHLIGHTS)[trip.destination.key] ?? null;
  const lastMile = (en ? LAST_MILE_EN : LAST_MILE)[trip.destination.city] ?? [];
  const disclaimer = en ? DISCLAIMER_EN : DISCLAIMER;
  const immersion = immersionFor(trip.destination.city, locale);
  const transferWord = trip.transfers > 1 ? T[locale].home.transfers : T[locale].home.transfer;

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <nav className="text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link href={p || "/"} className="hover:text-foreground">{t.breadcrumbHome}</Link>
        {" / "}
        <span className="text-foreground font-medium">
          {trip.origin.city} → {trip.destination.city} {t.byTrain}
        </span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
        {trip.origin.city} → {trip.destination.city} {t.byTrain}
      </h1>
      <p className="text-muted-foreground mb-8">
        {formatMin(trip.totalMin)} · {trip.transfers === 0 ? T[locale].home.direct : `${trip.transfers} ${transferWord}`} · {trip.totalDistanceKm} {t.estimatedKm}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Colonne gauche */}
        <div className="md:col-span-2 space-y-4 self-start">
          <div className="glass rounded-[24px] p-6 card-in card-in-1">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <p className="font-bold text-lg">
                {trip.origin.name} <ArrowRight className="w-4 h-4 inline text-accent" aria-hidden="true" /> {trip.destination.name}
              </p>
              <span className="text-sm font-semibold glass rounded-full px-3 py-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" aria-hidden="true" />
                {formatMin(trip.totalMin)}
                <span className="text-muted-foreground font-normal">
                  {locale === "fr" ? "dont" : "incl."} {formatMin(trip.totalInVehicleMin)} {t.inVehicle}
                </span>
              </span>
            </div>

            <ol className="relative border-l-2 border-accent/30 ml-3 space-y-4">
              {trip.legs.map((leg, i) => (
                <LegItem key={i} leg={leg} locale={locale} />
              ))}
            </ol>
            <p className="text-[11px] text-muted-foreground mt-4">{disclaimer}</p>
          </div>

          {/* Hebergement */}
          <div className="glass rounded-[24px] p-5 card-in card-in-2">
            <p className="font-bold text-sm mb-2">🏨 {t.sleepAt} {trip.destination.city}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.sleepBody}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
              <a href="https://www.greenkey.global" target="_blank" rel="noopener noreferrer" className="text-xs text-accent font-medium hover:underline">
                {t.greenKeyDirectory}
              </a>
              <a href={staysUrl(trip.destination.city)} target="_blank" rel="noopener noreferrer" className="text-xs text-accent font-medium hover:underline">
                {t.seeStays} {trip.destination.city}
              </a>
            </div>
            {BLUE_FLAG[trip.destination.city] && (
              <p className="text-xs text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border/60">
                🏖️ {BLUE_FLAG[trip.destination.city][locale]}
              </p>
            )}
            {hasAffiliation() && <p className="text-[9px] text-muted-foreground mt-2">{affiliateDisclosure}</p>}
          </div>

          {/* Immersion */}
          {immersion && (
            <div className="rounded-[24px] bg-muted/60 border border-border p-5 card-in card-in-3 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-base flex-shrink-0" aria-hidden="true">
                  🧭
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">{t.immersionTitle}</p>
                  <p className="text-[10px] text-muted-foreground">{immersion.tagline}</p>
                </div>
              </div>

              <ImmersionSection emoji="🏛️" heading={t.cultureHeading} items={immersion.culture} />
              <div className="border-t border-border" />
              <ImmersionSection emoji="🍽️" heading={`${t.flavorsHeading} ${trip.destination.city}`} items={immersion.saveurs} />

              {/* Quand y aller : conseils anti-foule fondes sur des faits structurels */}
              {visitTipsForCity(trip.destination.city).length > 0 && (
                <>
                  <div className="border-t border-border" />
                  <div>
                    <p className="text-xs font-bold flex items-center gap-1.5 mb-3">
                      <span aria-hidden="true">🕐</span>
                      {t.whenToGo}
                    </p>
                    <ul className="space-y-3">
                      {visitTipsForCity(trip.destination.city).map((v) => (
                        <li key={v.place.fr} className="flex gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" aria-hidden="true" />
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-semibold text-foreground">{v.place[locale]} : </span>
                            {v.tip[locale]}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[9px] text-muted-foreground italic mt-3">{t.crowdDisclaimer}</p>
                  </div>
                </>
              )}

              <div className="pt-1 border-t border-border space-y-1.5">
                <a
                  href={experiencesUrl(trip.destination.city)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent font-semibold hover:underline inline-flex items-center gap-1"
                >
                  {t.bookExperiences} {trip.destination.city}
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
                {hasAffiliation() && <p className="text-[9px] text-muted-foreground">{affiliateDisclosure}</p>}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-[9px] text-muted-foreground italic">{t.verifiedData}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colonne droite */}
        <div className="space-y-4 self-start">
          <div className="glass rounded-[24px] p-5 card-in card-in-2">
            <p className="font-semibold flex items-center gap-1.5 mb-3">
              <Leaf className="w-4 h-4 text-green-600" aria-hidden="true" />
              {t.carbonTitle}
            </p>
            <CarbonBar label={t.thisTrip} kg={trip.carbon.tripKg} max={trip.carbon.planeKg ?? trip.carbon.carKg} color="#16a34a" />
            <CarbonBar label={t.car} kg={trip.carbon.carKg} max={trip.carbon.planeKg ?? trip.carbon.carKg} color="#94a3b8" />
            {trip.carbon.planeKg !== null && (
              <CarbonBar label={t.plane} kg={trip.carbon.planeKg} max={trip.carbon.planeKg} color="#64748b" />
            )}
            <p className="text-center font-semibold text-green-700 dark:text-green-400 text-sm mt-3">
              -{trip.carbon.savedVsCarKg} {t.savedVsCar}
            </p>
            <p className="text-[10px] text-muted-foreground mt-2">
              {en
                ? "Orders of magnitude, generic average factors (not specific to Morocco's electricity mix)."
                : trip.carbon.note}
            </p>
          </div>

          {highlight && (
            <div className="glass rounded-[24px] overflow-hidden card-in card-in-3 border-l-4 border-l-accent">
              <CityImage cityKey={trip.destination.key} city={trip.destination.city} />
              <div className="p-5">
                <p className="font-semibold flex items-center gap-1.5 mb-1.5">
                  <Landmark className="w-4 h-4 text-accent" aria-hidden="true" />
                  {highlight.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                <p className="text-xs mt-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  {highlight.access}
                </p>
              </div>
            </div>
          )}

          {lastMile.length > 0 && (
            <div className="glass rounded-[24px] p-5 card-in card-in-3">
              <p className="font-semibold flex items-center gap-1.5 mb-2">
                <Bus className="w-4 h-4 text-marine dark:text-blue-300" aria-hidden="true" />
                {t.lastMileTitle} {trip.destination.city}
              </p>
              <ul className="space-y-2">
                {lastMile.map((hub) => (
                  <li key={hub.name} className="text-sm">
                    <span className="font-medium">{hub.name}</span>
                    {hub.certifiedLowCarbon ? (
                      <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">{t.electric}</span>
                    ) : (
                      <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{t.notCertified}</span>
                    )}
                    <p className="text-xs text-muted-foreground">{hub.coverage} · {hub.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="glass rounded-[24px] p-5 card-in card-in-3 space-y-2">
            <a
              href="https://www.oncf-voyages.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 rounded-xl bg-accent text-white text-sm font-semibold spring hover:brightness-105"
            >
              {t.buyTicket}
            </a>
            <Link
              href={`${p}/train/${trip.destination.key}/${trip.origin.key}`}
              className="block w-full text-center py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.returnTrip} {STATIONS[trip.destination.key].city} → {STATIONS[trip.origin.key].city}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Sous-composants ────────────────────────────────────────────────────── */

function LegItem({ leg, locale }: { leg: Leg; locale: Locale }) {
  const t = T[locale].train;
  const style = MODE_STYLE[leg.mode];
  const Icon = leg.mode === "eco_connecteur" ? Bus : TrainFront;
  const frequency = locale === "en" ? FREQUENCY_EN[leg.line] ?? leg.frequency : leg.frequency;
  return (
    <>
      {leg.transferBeforeMin > 0 && (
        <li className="relative pl-6 text-xs text-muted-foreground">
          <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-muted-foreground/40" aria-hidden="true" />
          {t.transferLabel} : {leg.transferBeforeMin} min
        </li>
      )}
      <li className="relative pl-6">
        <span
          className="absolute -left-[11px] top-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: style.color }}
        >
          <Icon className="w-3 h-3 text-white" aria-hidden="true" />
        </span>
        <div className="rounded-2xl border border-border p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-sm">{leg.line}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: style.color }}>
              {locale === "en" ? style.en : style.fr}
            </span>
            <span className="text-xs text-muted-foreground">{leg.operator}</span>
          </div>
          <p className="text-sm mt-1">
            {leg.fromName} → {leg.toName}
            <span className="text-muted-foreground"> · {formatMin(leg.durationMin)} · {leg.distanceKm} {t.estimatedKm}</span>
          </p>
          {leg.sampleDepartures.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {t.theoreticalDepartures} : {leg.sampleDepartures.join(", ")} · {frequency}
            </p>
          )}
          {leg.stops.length > 2 && (
            <ol className="mt-3 ml-1 border-l border-dashed border-muted-foreground/30 space-y-1.5">
              {leg.stops.map((stop) => (
                <li key={`${stop.station}-${stop.time}`} className="relative pl-4 flex items-baseline gap-2 text-xs">
                  <span
                    className={`absolute -left-[4.5px] top-1 w-2 h-2 rounded-full ${
                      stop.kind === "arret" ? "bg-muted-foreground/40" : "bg-marine dark:bg-blue-400"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-medium tabular-nums">{stop.time}</span>
                  <span className={stop.kind === "arret" ? "text-muted-foreground" : "font-medium"}>
                    {stop.station}
                    {stop.kind === "depart" && ` · ${t.departure}`}
                    {stop.kind === "arrivee" && ` · ${t.arrival}`}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </li>
    </>
  );
}

function ImmersionSection({ emoji, heading, items }: { emoji: string; heading: string; items: ImmersionItem[] }) {
  return (
    <div>
      <p className="text-xs font-bold flex items-center gap-1.5 mb-3">
        <span aria-hidden="true">{emoji}</span>
        {heading}
      </p>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-sm flex-shrink-0 mt-0.5" aria-hidden="true">
              {item.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-snug mb-0.5">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CarbonBar({ label, kg, max, color }: { label: string; kg: number; max: number; color: string }) {
  const pct = max > 0 ? Math.max((kg / max) * 100, 3) : 3;
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-0.5">
        <span>{label}</span>
        <span className="font-semibold">{kg} kg</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden" role="presentation">
        <div className="h-full rounded-full gauge-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
