/**
 * Quand y aller : conseils d'affluence par monument.
 * REGLE D'HONNETETE : aucune fausse courbe d'affluence. Chaque conseil
 * repose sur un fait structurel verifiable (visites guidees a creneaux
 * fixes, jour de la grande priere, arrivee des groupes en journee,
 * moment emblematique du lieu) et l'interface affiche l'etiquette
 * "conseils indicatifs, pas de mesure en temps reel".
 * Passer a une donnee mesuree (API type BestTime) plus tard : niveau 3
 * de la feuille de route validee par Hasnae.
 */

export interface VisitTip {
  place: { fr: string; en: string };
  tip: { fr: string; en: string };
}

export const VISIT_TIPS: Record<string, VisitTip[]> = {
  Casablanca: [
    {
      place: { fr: "Mosquée Hassan II", en: "Hassan II Mosque" },
      tip: {
        fr: "Visite uniquement guidée, à créneaux fixes : le premier créneau du matin est le plus tranquille. Le vendredi, jour de la grande prière, les horaires de visite sont réduits.",
        en: "Guided tours only, at fixed times: the first morning slot is the quietest. On Fridays, the day of the main prayer, visiting hours are reduced.",
      },
    },
    {
      place: { fr: "Quartier des Habous", en: "Habous district" },
      tip: {
        fr: "Les boutiques ouvrent vers 9h : en semaine le matin, le quartier se visite au calme; l'animation monte en fin de journée et le week-end.",
        en: "Shops open around 9am: on weekday mornings the district is calm; it gets livelier late in the day and on weekends.",
      },
    },
  ],
  Rabat: [
    {
      place: { fr: "Kasbah des Oudaïas", en: "Kasbah of the Udayas" },
      tip: {
        fr: "Site ouvert et gratuit : tôt le matin pour les ruelles vides et la belle lumière. Le week-end, les familles rbaties s'y promènent, l'ambiance est plus animée.",
        en: "Open, free site: go early morning for empty lanes and beautiful light. On weekends local families stroll here and it gets livelier.",
      },
    },
    {
      place: { fr: "Rue des Consuls", en: "Rue des Consuls" },
      tip: {
        fr: "En semaine le matin, les ateliers travaillent sous vos yeux. Le vendredi en milieu de journée, beaucoup d'échoppes ferment pour la prière.",
        en: "On weekday mornings the workshops are at work before your eyes. On Friday midday many stalls close for prayer.",
      },
    },
  ],
  Marrakech: [
    {
      place: { fr: "Place Jemaa el-Fna", en: "Jemaa el-Fna square" },
      tip: {
        fr: "Deux places en une : avant 10h pour le calme et les photos, au crépuscule pour le spectacle, qui est aussi le moment le plus dense.",
        en: "Two squares in one: before 10am for calm and photos, at dusk for the show, which is also the busiest moment.",
      },
    },
    {
      place: { fr: "Médersa Ben Youssef", en: "Ben Youssef Madrasa" },
      tip: {
        fr: "Visez l'ouverture du matin ou la fin d'après-midi : les groupes guidés occupent le cœur de la journée.",
        en: "Aim for morning opening or late afternoon: guided groups fill the middle of the day.",
      },
    },
  ],
  "Fès": [
    {
      place: { fr: "Médina de Fès el-Bali", en: "Fes el-Bali medina" },
      tip: {
        fr: "Le matin avant l'arrivée des excursions à la journée, la médina appartient à ses habitants. Le vendredi, de nombreuses échoppes ferment autour de la prière : plus calme, mais moins vivant.",
        en: "In the morning, before day trips arrive, the medina belongs to its residents. On Fridays many stalls close around prayer time: quieter, but less lively.",
      },
    },
    {
      place: { fr: "Tanneries Chouara", en: "Chouara tanneries" },
      tip: {
        fr: "Tôt le matin : les artisans sont en plein travail, la chaleur et les odeurs sont moindres, et les terrasses d'observation sont encore dégagées.",
        en: "Early morning: artisans are hard at work, heat and smells are milder, and the viewing terraces are still clear.",
      },
    },
  ],
  Tanger: [
    {
      place: { fr: "Kasbah et médina", en: "Kasbah and medina" },
      tip: {
        fr: "Tôt le matin pour flâner dans des ruelles calmes; les visiteurs des ferries et croisières arrivent plutôt en milieu de journée.",
        en: "Early morning for quiet lanes; ferry and cruise visitors tend to arrive mid-day.",
      },
    },
    {
      place: { fr: "Café Hafa", en: "Café Hafa" },
      tip: {
        fr: "Le coucher de soleil est le moment le plus couru : pour une table tranquille face à la mer, venez en matinée.",
        en: "Sunset is the most sought-after moment: for a quiet table facing the sea, come in the morning.",
      },
    },
  ],
};

export function visitTipsForCity(city: string): VisitTip[] {
  return VISIT_TIPS[city] ?? [];
}
