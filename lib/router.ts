/**
 * Moteur d'itineraires Trekr Maroc.
 * Dijkstra avec penalite de correspondance quand on change de ligne,
 * agregation des segments consecutifs d'une meme ligne, horaires
 * theoriques cumules, comparaison carbone en ordres de grandeur.
 * Portage TypeScript fidele du moteur Python d'origine.
 */

import {
  STATIONS,
  COORDS,
  SEGMENTS,
  SCHEDULES,
  HIGHLIGHTS,
  LAST_MILE,
  DISCLAIMER,
  type MoroccoMode,
  type Highlight,
  type TransportHub,
} from "./network";

const TRANSFER_MIN = 25;

// Facteurs d'emission generiques (kgCO2e / km / passager), ordres de grandeur
const FACTOR_BY_MODE: Record<MoroccoMode, number> = {
  train_grande_vitesse: 0.03,
  train_grandes_lignes: 0.03,
  navette_rapide: 0.03,
  eco_connecteur: 0.03,
};
const CAR_FACTOR = 0.218; // voiture thermique moyenne (ADEME)
const PLANE_FACTOR = 0.26; // avion court-courrier (ADEME, ordre de grandeur)
const PLANE_MIN_KM = 400;
const ROAD_DETOUR = 1.3; // la route est en moyenne 30 % plus longue que le vol d'oiseau

/** Distance a vol d'oiseau entre deux gares (haversine), en km. */
export function crowKm(a: string, b: string): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const [la1, lo1] = COORDS[a];
  const [la2, lo2] = COORDS[b];
  const h = Math.sin(rad(la2 - la1) / 2) ** 2 + Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(rad(lo2 - lo1) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export interface LegStop {
  station: string;
  time: string;
  kind: "depart" | "arret" | "arrivee";
}

export interface Leg {
  line: string;
  mode: MoroccoMode;
  operator: string;
  fromName: string;
  toName: string;
  durationMin: number;
  distanceKm: number;
  transferBeforeMin: number;
  frequency: string;
  stops: LegStop[];
}

export interface CarbonCompare {
  tripKg: number;
  carKg: number;
  savedVsCarKg: number;
  planeKg: number | null;
  note: string;
}

export interface Trip {
  origin: { key: string; name: string; city: string };
  destination: { key: string; name: string; city: string };
  legs: Leg[];
  transfers: number;
  totalInVehicleMin: number;
  totalMin: number;
  totalDistanceKm: number;
  carbon: CarbonCompare;
  lastMile: TransportHub[];
  destinationHighlight: Highlight | null;
  disclaimer: string;
}

interface Edge {
  to: string;
  line: string;
  mode: MoroccoMode;
  durationMin: number;
  distanceKm: number;
  operator: string;
}

interface PathSeg extends Edge {
  from: string;
  transferBeforeMin: number;
}

function buildGraph(): Record<string, Edge[]> {
  const g: Record<string, Edge[]> = {};
  for (const key of Object.keys(STATIONS)) g[key] = [];
  for (const [a, b, line, mode, durationMin, distanceKm, operator] of SEGMENTS) {
    g[a].push({ to: b, line, mode, durationMin, distanceKm, operator });
    g[b].push({ to: a, line, mode, durationMin, distanceKm, operator });
  }
  return g;
}

/** Itineraire le plus rapide entre deux gares, ou null. */
export function findRoute(origin: string, destination: string): Trip | null {
  if (!(origin in STATIONS) || !(destination in STATIONS) || origin === destination) return null;

  const graph = buildGraph();
  // File de priorite minimaliste : tableau trie par cout (reseau de 12 noeuds).
  type State = { cost: number; station: string; line: string | null; path: PathSeg[] };
  const heap: State[] = [{ cost: 0, station: origin, line: null, path: [] }];
  const best = new Map<string, number>();

  while (heap.length > 0) {
    heap.sort((x, y) => x.cost - y.cost);
    const { cost, station, line, path } = heap.shift()!;
    if (station === destination) return buildTrip(origin, destination, path);
    const key = `${station}|${line ?? ""}`;
    if ((best.get(key) ?? Infinity) <= cost) continue;
    best.set(key, cost);
    for (const edge of graph[station]) {
      const transfer = line !== null && edge.line !== line ? TRANSFER_MIN : 0;
      heap.push({
        cost: cost + edge.durationMin + transfer,
        station: edge.to,
        line: edge.line,
        path: [...path, { ...edge, from: station, transferBeforeMin: transfer }],
      });
    }
  }
  return null;
}

function buildTrip(origin: string, destination: string, path: PathSeg[]): Trip {
  // Agrege les segments consecutifs d'une meme ligne en jambes lisibles.
  interface RawLeg {
    line: string;
    mode: MoroccoMode;
    operator: string;
    fromKey: string;
    toKey: string;
    durationMin: number;
    distanceKm: number;
    transferBeforeMin: number;
    segments: [string, string, number][];
  }
  const raw: RawLeg[] = [];
  for (const seg of path) {
    const last = raw[raw.length - 1];
    if (last && last.line === seg.line) {
      last.toKey = seg.to;
      last.durationMin += seg.durationMin;
      last.distanceKm += seg.distanceKm;
      last.segments.push([seg.from, seg.to, seg.durationMin]);
    } else {
      raw.push({
        line: seg.line,
        mode: seg.mode,
        operator: seg.operator,
        fromKey: seg.from,
        toKey: seg.to,
        durationMin: seg.durationMin,
        distanceKm: seg.distanceKm,
        transferBeforeMin: seg.transferBeforeMin,
        segments: [[seg.from, seg.to, seg.durationMin]],
      });
    }
  }

  // Fil d'ariane en temps ecoule depuis le depart (+0h50), correspondances
  // comprises. Pas d'heure d'horloge : les horaires reels sont sur oncf.ma.
  let cursor = 0;
  const legs: Leg[] = raw.map((leg) => {
    const sched = SCHEDULES[leg.line] ?? { frequency: "", departures: [] };
    cursor += leg.transferBeforeMin;
    const stops: LegStop[] = [{ station: STATIONS[leg.segments[0][0]].name, time: `+${formatMin(cursor)}`, kind: "depart" }];
    for (const [, segTo, dur] of leg.segments) {
      cursor += dur;
      stops.push({ station: STATIONS[segTo].name, time: `+${formatMin(cursor)}`, kind: "arret" });
    }
    stops[stops.length - 1].kind = "arrivee";
    return {
      line: leg.line,
      mode: leg.mode,
      operator: leg.operator,
      fromName: STATIONS[leg.fromKey].name,
      toName: STATIONS[leg.toKey].name,
      durationMin: leg.durationMin,
      distanceKm: leg.distanceKm,
      transferBeforeMin: leg.transferBeforeMin,
      frequency: sched.frequency,
      stops,
    };
  });

  const totalInVehicle = legs.reduce((s, l) => s + l.durationMin, 0);
  const totalTransfers = legs.reduce((s, l) => s + l.transferBeforeMin, 0);
  const totalKm = legs.reduce((s, l) => s + l.distanceKm, 0);

  return {
    origin: { key: origin, name: STATIONS[origin].name, city: STATIONS[origin].city },
    destination: { key: destination, name: STATIONS[destination].name, city: STATIONS[destination].city },
    legs,
    transfers: legs.filter((l) => l.transferBeforeMin > 0).length,
    totalInVehicleMin: totalInVehicle,
    totalMin: totalInVehicle + totalTransfers,
    totalDistanceKm: totalKm,
    carbon: carbonComparison(crowKm(origin, destination), legs),
    lastMile: LAST_MILE[STATIONS[destination].city] ?? [],
    destinationHighlight: HIGHLIGHTS[destination] ?? null,
    disclaimer: DISCLAIMER,
  };
}

/** Voiture et avion sont compares sur LEUR distance, pas sur les km du rail. */
function carbonComparison(crow: number, legs: Leg[]): CarbonCompare {
  const round1 = (n: number) => Math.round(n * 10) / 10;
  const tripKg = legs.reduce((s, l) => s + l.distanceKm * (FACTOR_BY_MODE[l.mode] ?? 0.03), 0);
  const carKg = crow * ROAD_DETOUR * CAR_FACTOR;
  return {
    tripKg: round1(tripKg),
    carKg: round1(carKg),
    savedVsCarKg: round1(Math.max(carKg - tripKg, 0)),
    planeKg: crow >= PLANE_MIN_KM ? round1(crow * PLANE_FACTOR) : null,
    note: "Ordres de grandeur, facteurs moyens génériques (non spécifiques au mix électrique marocain). Voiture : distance à vol d'oiseau majorée de 30 %. Avion : distance à vol d'oiseau.",
  };
}

/** Toutes les paires origine/destination qui ont un itineraire (pour le SSG). */
export function allRoutePairs(): { origin: string; destination: string }[] {
  const keys = Object.keys(STATIONS);
  const pairs: { origin: string; destination: string }[] = [];
  for (const o of keys) {
    for (const d of keys) {
      if (o !== d && findRoute(o, d)) pairs.push({ origin: o, destination: d });
    }
  }
  return pairs;
}

export function formatMin(min: number): string {
  return `${Math.floor(min / 60)}h${String(min % 60).padStart(2, "0")}`;
}
