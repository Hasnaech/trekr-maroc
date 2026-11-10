"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { STATIONS } from "@/lib/network";
import { findRoute, formatMin } from "@/lib/router";
import { localePrefix, type Locale } from "@/lib/i18n";

/**
 * Comparateur carbone : l'idee d'origine de Trekr (mesurer puis agir),
 * calculee dans le navigateur a partir du moteur. Les gestes viennent du
 * catalogue d'habitudes d'origine, sans aucun pourcentage invente.
 */

const TEXT = {
  fr: {
    kicker: "Carbone",
    title: "Comparer train, voiture et avion",
    intro: "Choisissez un trajet : Trekr estime les émissions par voyageur pour chaque mode. Ce sont des ordres de grandeur, pas une mesure certifiée.",
    from: "Départ",
    to: "Destination",
    coach: "(autocar)",
    train: "Train et autocar (cet itinéraire)",
    car: "Voiture thermique, seul à bord",
    plane: "Avion court-courrier",
    noPlane: "Avion non comparé : trajet de moins de 400 km à vol d'oiseau.",
    saved: "kg de CO2 évités par rapport à la voiture",
    see: "Voir l'itinéraire détaillé",
    method: "Méthode",
    methodBody:
      "Train et autocar : 0,03 kg de CO2e par km et par voyageur, sur les km estimés de l'itinéraire. Voiture : 0,218 kg par km (voiture thermique moyenne, facteur ADEME), sur la distance à vol d'oiseau majorée de 30 %. Avion : 0,26 kg par km (court-courrier, ordre de grandeur ADEME), sur la distance à vol d'oiseau. Facteurs moyens génériques, non spécifiques au mix électrique marocain.",
    gesturesTitle: "Les gestes du voyageur",
    gestures: [
      ["Rejoindre la gare à pied, en tramway ou à vélo", "Le premier kilomètre compte aussi."],
      ["Emporter sa gourde", "Aucune bouteille achetée en gare."],
      ["Prévoir un pique-nique maison", "Meilleur, moins cher, sans emballage."],
      ["Voyager léger", "Un seul bagage : moins de poids transporté, plus de liberté à l'arrivée."],
      ["Choisir un hébergement labellisé", "Au Maroc, le label Clef Verte est déployé par la Fondation Mohammed VI pour la Protection de l'Environnement."],
    ],
    personal: "Pour calculer votre empreinte carbone personnelle complète, l'outil public et gratuit de l'ADEME fait référence :",
  },
  en: {
    kicker: "Carbon",
    title: "Compare train, car and plane",
    intro: "Pick a journey: Trekr estimates emissions per traveller for each mode. These are orders of magnitude, not a certified measurement.",
    from: "From",
    to: "To",
    coach: "(coach)",
    train: "Train and coach (this itinerary)",
    car: "Petrol car, driving alone",
    plane: "Short-haul flight",
    noPlane: "Plane not compared: less than 400 km as the crow flies.",
    saved: "kg of CO2 avoided compared with the car",
    see: "See the detailed itinerary",
    method: "Method",
    methodBody:
      "Train and coach: 0.03 kg CO2e per km per traveller, over the itinerary's estimated km. Car: 0.218 kg per km (average petrol car, ADEME factor), over the straight-line distance plus 30%. Plane: 0.26 kg per km (short-haul, ADEME order of magnitude), over the straight-line distance. Generic average factors, not specific to Morocco's electricity mix.",
    gesturesTitle: "The traveller's habits",
    gestures: [
      ["Reach the station on foot, by tram or by bike", "The first kilometre counts too."],
      ["Bring your own water bottle", "No bottle bought at the station."],
      ["Pack a homemade picnic", "Better, cheaper, no packaging."],
      ["Travel light", "A single bag: less weight carried, more freedom on arrival."],
      ["Choose labelled accommodation", "In Morocco, the Green Key label is run by the Mohammed VI Foundation for Environmental Protection."],
    ],
    personal: "To calculate your full personal carbon footprint, the free public tool from ADEME (the French ecological transition agency) is the reference:",
  },
};

export default function CarbonView({ locale }: { locale: Locale }) {
  const t = TEXT[locale];
  const p = localePrefix(locale);
  const [origin, setOrigin] = useState("casa");
  const [destination, setDestination] = useState("marrakech");
  const trip = findRoute(origin, destination);
  const stations = Object.values(STATIONS);
  const selectClass =
    "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/50";

  const rows = trip
    ? [
        { label: t.train, kg: trip.carbon.tripKg, color: "#16a34a" },
        { label: t.car, kg: trip.carbon.carKg, color: "#94a3b8" },
        ...(trip.carbon.planeKg !== null ? [{ label: t.plane, kg: trip.carbon.planeKg, color: "#64748b" }] : []),
      ]
    : [];
  const max = Math.max(...rows.map((r) => r.kg), 1);

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <p className="text-sm font-medium text-accent tracking-wide uppercase mb-2 flex items-center gap-1.5">
        <Leaf className="w-4 h-4" aria-hidden="true" />
        {t.kicker}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed">{t.intro}</p>

      <div className="glass rounded-[24px] p-5 mt-8 card-in">
        <div className="grid sm:grid-cols-2 gap-3">
          {(
            [
              [t.from, origin, setOrigin, destination],
              [t.to, destination, setDestination, origin],
            ] as const
          ).map(([label, value, set, other]) => (
            <label key={label} className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
              <select value={value} onChange={(e) => set(e.target.value)} className={selectClass}>
                {stations.map((s) => (
                  <option key={s.key} value={s.key} disabled={s.key === other}>
                    {s.name}
                    {s.kind === "hub_connecteur" ? ` ${t.coach}` : ""}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        {trip && (
          <div className="mt-6" aria-live="polite">
            <p className="text-sm text-muted-foreground mb-3">
              {trip.origin.name} → {trip.destination.name} · {formatMin(trip.totalMin)}
            </p>
            {rows.map((r) => (
              <div key={r.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{r.label}</span>
                  <span className="font-semibold tabular-nums">{r.kg} kg CO2e</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden" role="presentation">
                  <div className="h-full rounded-full gauge-fill" style={{ width: `${Math.max((r.kg / max) * 100, 3)}%`, backgroundColor: r.color }} />
                </div>
              </div>
            ))}
            {trip.carbon.planeKg === null && <p className="text-xs text-muted-foreground">{t.noPlane}</p>}
            <p className="font-semibold text-green-700 dark:text-green-400 mt-4">
              {trip.carbon.savedVsCarKg} {t.saved}
            </p>
            <Link href={`${p}/train/${origin}/${destination}`} className="inline-block mt-3 text-sm text-accent font-semibold hover:underline">
              {t.see}
            </Link>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-2">{t.method}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{t.methodBody}</p>

      <h2 className="text-xl font-bold mt-10 mb-3">{t.gesturesTitle}</h2>
      <ul className="space-y-3">
        {t.gestures.map(([title, body]) => (
          <li key={title} className="flex gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" aria-hidden="true" />
            <p className="text-sm">
              <span className="font-semibold">{title}.</span> <span className="text-muted-foreground">{body}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted-foreground mt-10 leading-relaxed">
        {t.personal}{" "}
        <a href="https://nosgestesclimat.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          nosgestesclimat.fr
        </a>
        .
      </p>
    </main>
  );
}
