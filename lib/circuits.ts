/**
 * Circuits multi-villes Trekr Maroc.
 * Reponse produit a la dispersion territoriale de la feuille de route
 * Tourisme 2030 : repartir les visiteurs au-dela de Marrakech, en train.
 * Chaque etape est calculee par le moteur reel (lib/router.ts) :
 * si un axe n'existe pas, le circuit ne s'affiche pas.
 */

import { findRoute, type Trip } from "./router";
import { STATIONS } from "./network";

export interface Circuit {
  slug: string;
  emoji: string;
  title: string;
  pitch: string;
  days: string;
  titleEn: string;
  pitchEn: string;
  daysEn: string;
  stops: string[]; // cles de gares, dans l'ordre
}

export const CIRCUITS: Circuit[] = [
  {
    slug: "villes-imperiales",
    emoji: "👑",
    title: "Les Villes Impériales",
    pitch:
      "Le grand classique du Royaume, entierement en train : Casablanca, Rabat la capitale, Meknès l'impériale, Fès la spirituelle, puis Marrakech la ville ocre.",
    days: "7 jours suggérés",
    titleEn: "The Imperial Cities",
    pitchEn:
      "The Kingdom's great classic, entirely by train: Casablanca, Rabat the capital, imperial Meknes, spiritual Fes, then Marrakech the ochre city.",
    daysEn: "7 days suggested",
    stops: ["casa", "rabat", "meknes", "fes", "casa", "marrakech"],
  },
  {
    slug: "le-grand-nord",
    emoji: "🌊",
    title: "Le Grand Nord et la perle bleue",
    pitch:
      "Casablanca vers Tanger en grande vitesse Al Boraq, la ville du détroit, puis Chefchaouen la médina bleue du Rif en éco-connecteur CTM.",
    days: "4 jours suggérés",
    titleEn: "The Great North and the blue pearl",
    pitchEn:
      "Casablanca to Tangier on the Al Boraq high-speed line, the city of the strait, then Chefchaouen, the blue medina of the Rif, by CTM eco-connector.",
    daysEn: "4 days suggested",
    stops: ["casa", "tanger", "chefchaouen"],
  },
  {
    slug: "marrakech-et-ses-portes",
    emoji: "🏜️",
    title: "Marrakech et ses portes",
    pitch:
      "Depuis la ville ocre, deux escapades en éco-connecteur : Essaouira la cité fortifiée face à l'Atlantique, et Ouarzazate aux portes du désert avec la kasbah d'Aït-ben-Haddou.",
    days: "5 jours suggérés",
    titleEn: "Marrakech and its gates",
    pitchEn:
      "From the ochre city, two eco-connector escapes: Essaouira, the fortified city facing the Atlantic, and Ouarzazate at the desert's gates with the kasbah of Aït-ben-Haddou.",
    daysEn: "5 days suggested",
    stops: ["casa", "marrakech", "essaouira", "marrakech", "ouarzazate"],
  },
];

export interface CircuitStep {
  trip: Trip;
  fromCity: string;
  toCity: string;
}

export interface ComputedCircuit extends Circuit {
  steps: CircuitStep[];
  totalMin: number;
  totalKm: number;
  totalSavedKg: number;
}

/** Calcule toutes les etapes d'un circuit; null si un axe manque. */
export function computeCircuit(circuit: Circuit): ComputedCircuit | null {
  const steps: CircuitStep[] = [];
  for (let i = 0; i < circuit.stops.length - 1; i++) {
    const trip = findRoute(circuit.stops[i], circuit.stops[i + 1]);
    if (!trip) return null;
    steps.push({
      trip,
      fromCity: STATIONS[circuit.stops[i]].city,
      toCity: STATIONS[circuit.stops[i + 1]].city,
    });
  }
  const round1 = (n: number) => Math.round(n * 10) / 10;
  return {
    ...circuit,
    steps,
    totalMin: steps.reduce((s, x) => s + x.trip.totalMin, 0),
    totalKm: steps.reduce((s, x) => s + x.trip.totalDistanceKm, 0),
    totalSavedKg: round1(steps.reduce((s, x) => s + x.trip.carbon.savedVsCarKg, 0)),
  };
}

export function allComputedCircuits(): ComputedCircuit[] {
  return CIRCUITS.map(computeCircuit).filter((c): c is ComputedCircuit => c !== null);
}
