import { HeartHandshake, EyeOff, Scale, Wrench } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { REPO_URL, REPORT_URL } from "@/lib/site";

/** Page mission : ce que Trekr s'engage a etre, et ce qu'il n'est pas. */

const TEXT = {
  fr: {
    kicker: "Mission",
    title: "Un bien commun pour voyager au Maroc en train",
    intro:
      "Trekr est un projet d'utilité publique. Il aide chacun, habitant ou visiteur, à traverser le Maroc en train et en autocar plutôt qu'en voiture ou en avion, et à répartir les visites au-delà des lieux saturés.",
    pillars: [
      { title: "Gratuit, pour tous", body: "Aucun compte, aucun abonnement, aucune publicité, aucun lien commissionné. Trekr ne vend rien et ne touche rien sur vos réservations." },
      { title: "Aucun traceur", body: "Pas de cookie, pas de mesure d'audience, pas de collecte d'email. Le site est fait de pages statiques : il fonctionne même avec une connexion faible." },
      { title: "Honnête sur ses limites", body: "Les durées sont indicatives, les distances estimées, les fréquences approximatives, le carbone en ordres de grandeur. Trekr n'affiche aucune heure de départ : les horaires réels et les billets sont sur oncf-voyages.ma." },
      { title: "Ouvert et corrigeable", body: "Le code et les données sont publics. Si vous constatez sur place une erreur (durée, tramway, lieu, accès), signalez-la : c'est le terrain qui rend ce guide fiable." },
    ],
    notTitle: "Ce que Trekr n'est pas",
    not: [
      "Ce n'est pas un service officiel de l'ONCF, de CTM ou de Supratours.",
      "Ce n'est pas un vendeur de billets ni une agence de voyage.",
      "Ce n'est pas un horaire en temps réel : aucun retard, aucune perturbation n'est affiché.",
    ],
    report: "Signaler une erreur",
    source: "Voir le code et les données",
    origin:
      "Trekr est né en 2026 comme calculateur d'empreinte carbone, puis comme planificateur de voyages en train. Cette version garde l'essentiel : mesurer, comparer, et rendre le trajet bas carbone simple.",
  },
  en: {
    kicker: "Mission",
    title: "A commons for travelling Morocco by train",
    intro:
      "Trekr is a public-interest project. It helps everyone, resident or visitor, cross Morocco by train and coach rather than by car or plane, and spread visits beyond saturated places.",
    pillars: [
      { title: "Free, for everyone", body: "No account, no subscription, no ads, no commissioned links. Trekr sells nothing and earns nothing on your bookings." },
      { title: "No trackers", body: "No cookies, no analytics, no email collection. The site is made of static pages: it works even on a weak connection." },
      { title: "Honest about its limits", body: "Durations are indicative, distances estimated, frequencies approximate, carbon figures orders of magnitude. Trekr shows no departure times: real timetables and tickets are on oncf-voyages.ma." },
      { title: "Open and correctable", body: "Code and data are public. If you notice an error on the ground (duration, tramway, place, access), report it: field knowledge is what makes this guide reliable." },
    ],
    notTitle: "What Trekr is not",
    not: [
      "It is not an official service of ONCF, CTM or Supratours.",
      "It is not a ticket seller or a travel agency.",
      "It is not a real-time timetable: no delays or disruptions are shown.",
    ],
    report: "Report an error",
    source: "See the code and data",
    origin:
      "Trekr started in 2026 as a carbon footprint calculator, then as a train trip planner. This version keeps the essentials: measure, compare, and make the low-carbon journey simple.",
  },
};

const ICONS = [HeartHandshake, EyeOff, Scale, Wrench];

export default function MissionView({ locale }: { locale: Locale }) {
  const t = TEXT[locale];
  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <p className="text-sm font-medium text-accent tracking-wide uppercase mb-2">{t.kicker}</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed">{t.intro}</p>

      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        {t.pillars.map((pillar, i) => {
          const Icon = ICONS[i];
          return (
            <div key={pillar.title} className={`glass rounded-[24px] p-5 card-in card-in-${(i % 3) + 1}`}>
              <p className="font-semibold flex items-center gap-2 mb-1.5">
                <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                {pillar.title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-3">{t.notTitle}</h2>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
        {t.not.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mt-8">
        <a href={REPORT_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-accent text-white font-semibold text-sm px-5 py-3 spring hover:brightness-105">
          {t.report}
        </a>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border font-semibold text-sm px-5 py-3 hover:bg-muted transition-colors">
          {t.source}
        </a>
      </div>

      <p className="text-xs text-muted-foreground mt-8 leading-relaxed">{t.origin}</p>
    </main>
  );
}
