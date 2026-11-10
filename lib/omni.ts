/**
 * Omni-saisie Trekr Maroc : comprend une phrase en francais, anglais
 * ou darija (latin et arabe) et en extrait un axe origine/destination.
 * Parseur heuristique deterministe, execute dans le navigateur,
 * sans serveur ni cle API. Etiquete honnetement comme tel.
 */

import { STATIONS } from "./network";

/** Variantes reconnues par gare : francais, anglais, darija latin, arabe. */
const CITY_ALIASES: Record<string, string[]> = {
  casa: ["casablanca", "casa", "kaza", "casablanka", "الدار البيضاء", "الدارالبيضاء", "كازا", "كازابلانكا"],
  aeroport: ["aeroport", "aéroport", "airport", "mohammed v", "mohamed v", "cmn", "matar", "المطار", "مطار", "مطار محمد الخامس"],
  rabat: ["rabat", "الرباط", "رباط"],
  marrakech: ["marrakech", "marrakesh", "kech", "merrakch", "مراكش"],
  tanger: ["tanger", "tangier", "tanja", "طنجة"],
  fes: ["fes", "fès", "fez", "فاس"],
  meknes: ["meknes", "meknès", "مكناس"],
  kenitra: ["kenitra", "kénitra", "القنيطرة", "قنيطرة"],
  oujda: ["oujda", "وجدة"],
  essaouira: ["essaouira", "swira", "الصويرة", "صويرة"],
  ouarzazate: ["ouarzazate", "warzazat", "ورزازات"],
  chefchaouen: ["chefchaouen", "chaouen", "chefchawen", "شفشاون", "الشاون"],
};

/** Marqueurs de destination : "a", "vers", "to", "l" (darija), "ila" (arabe). */
const DEST_MARKERS = ["a", "à", "vers", "to", "l", "li", "ila", "الى", "إلى", "ل"];
/** Marqueurs d'origine : "de", "depuis", "from", "men" (darija), "من". */
const ORIGIN_MARKERS = ["de", "depuis", "from", "men", "mn", "من"];

interface Mention {
  key: string;
  index: number;
  marker: "origin" | "destination" | null;
}

export interface OmniResult {
  origin: string;
  destination: string;
}

/** Normalise : minuscules, accents latins reduits, ponctuation en espaces. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    // Elisions francaises (l'aeroport, d'essaouira) : l'article disparait,
    // sinon le "l" isole serait confondu avec le marqueur darija "l".
    .replace(/\b[ldjmnstc]'/g, "")
    .normalize("NFD")
    // Retire uniquement les diacritiques latins (garde l'arabe intact)
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,;:!?'"()\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Mots transparents entre le marqueur et la ville ("vers la ville de Fes"). */
const FILLERS = ["la", "le", "les", "ville", "gare", "train", "el", "al", "مدينة", "محطة"];

/**
 * Remonte les mots precedant la ville pour trouver son marqueur.
 * "vers la ville de fes" : le "de" de "ville de" est transparent,
 * le vrai marqueur est "vers". S'arrete au premier mot porteur de sens.
 */
function detectMarker(before: string): Mention["marker"] {
  const words = before.trim().split(" ").filter(Boolean);
  for (let i = words.length - 1; i >= 0 && i >= words.length - 5; i--) {
    const w = words[i];
    // "de" precede de "ville"/"gare" : simple complement du nom, on continue.
    if (ORIGIN_MARKERS.includes(w)) {
      const prev = words[i - 1];
      if (prev && (prev === "ville" || prev === "gare" || prev === "مدينة" || prev === "محطة")) continue;
      return "origin";
    }
    if (DEST_MARKERS.includes(w)) return "destination";
    if (!FILLERS.includes(w)) return null;
  }
  return null;
}

/**
 * Extrait origine et destination d'une phrase libre.
 * Strategie : reperer les villes mentionnees et leur marqueur
 * ("de casa a fes", "men tanja l kech", "from rabat to marrakech"),
 * sinon ordre d'apparition. Retourne null si moins de deux villes.
 */
export function parseOmni(text: string): OmniResult | null {
  const norm = normalize(text);
  if (!norm) return null;
  const padded = ` ${norm} `;

  const mentions: Mention[] = [];
  for (const [key, aliases] of Object.entries(CITY_ALIASES)) {
    let bestIndex = -1;
    let marker: Mention["marker"] = null;
    for (const alias of aliases) {
      const aliasNorm = normalize(alias);
      const idx = padded.indexOf(` ${aliasNorm} `) >= 0 ? padded.indexOf(` ${aliasNorm} `) : padded.indexOf(aliasNorm);
      if (idx < 0) continue;
      if (bestIndex < 0 || idx < bestIndex) {
        bestIndex = idx;
        marker = detectMarker(padded.slice(0, idx));
      }
    }
    if (bestIndex >= 0) mentions.push({ key, index: bestIndex, marker });
  }

  if (mentions.length < 2) return null;
  mentions.sort((a, b) => a.index - b.index);

  const explicitOrigin = mentions.find((m) => m.marker === "origin");
  const explicitDest = mentions.find((m) => m.marker === "destination");

  let origin = explicitOrigin?.key;
  let destination = explicitDest?.key;

  // Complete avec l'ordre d'apparition pour ce qui manque.
  const remaining = mentions.filter((m) => m.key !== origin && m.key !== destination);
  if (!origin) origin = remaining.shift()?.key;
  const remaining2 = remaining.filter((m) => m.key !== origin);
  if (!destination) destination = remaining2.shift()?.key;

  if (!origin || !destination || origin === destination) return null;
  if (!(origin in STATIONS) || !(destination in STATIONS)) return null;
  return { origin, destination };
}

/** Exemples proposes sous le champ, dans les trois langues. */
export const OMNI_EXAMPLES = [
  "De l'aéroport Mohammed V à Marrakech",
  "From Tangier to Fes",
  "Men kaza l swira",
  "من طنجة إلى مراكش",
];
