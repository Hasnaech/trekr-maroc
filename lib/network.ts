/**
 * Reseau ferroviaire marocain (ONCF) et eco-connecteurs routiers.
 * Donnees publiques verifiables, portees du moteur Python d'origine.
 *
 * HONNETETE : durees commerciales indicatives, distances estimees,
 * horaires theoriques a verifier sur oncf.ma. Tout est etiquete.
 */

export type MoroccoMode = "train_grande_vitesse" | "train_grandes_lignes" | "navette_rapide" | "eco_connecteur";

export interface Station {
  key: string;
  name: string;
  city: string;
  kind: "gare" | "hub_connecteur";
}

/** key -> (nom, ville, type) */
export const STATIONS: Record<string, Station> = {
  tanger: { key: "tanger", name: "Tanger Ville", city: "Tanger", kind: "gare" },
  kenitra: { key: "kenitra", name: "Kénitra", city: "Kénitra", kind: "gare" },
  rabat: { key: "rabat", name: "Rabat Agdal", city: "Rabat", kind: "gare" },
  casa: { key: "casa", name: "Casa Voyageurs", city: "Casablanca", kind: "gare" },
  aeroport: { key: "aeroport", name: "Aéroport Mohammed V", city: "Casablanca", kind: "gare" },
  marrakech: { key: "marrakech", name: "Marrakech", city: "Marrakech", kind: "gare" },
  meknes: { key: "meknes", name: "Meknès", city: "Meknès", kind: "gare" },
  fes: { key: "fes", name: "Fès", city: "Fès", kind: "gare" },
  oujda: { key: "oujda", name: "Oujda", city: "Oujda", kind: "gare" },
  essaouira: { key: "essaouira", name: "Essaouira", city: "Essaouira", kind: "hub_connecteur" },
  ouarzazate: { key: "ouarzazate", name: "Ouarzazate", city: "Ouarzazate", kind: "hub_connecteur" },
  chefchaouen: { key: "chefchaouen", name: "Chefchaouen", city: "Chefchaouen", kind: "hub_connecteur" },
};

/** Coordonnees approximatives des gares (latitude, longitude), pour les distances a vol d'oiseau. */
export const COORDS: Record<string, [number, number]> = {
  tanger: [35.77, -5.79],
  kenitra: [34.26, -6.58],
  rabat: [34.0, -6.85],
  casa: [33.59, -7.59],
  aeroport: [33.37, -7.59],
  marrakech: [31.63, -8.02],
  meknes: [33.89, -5.55],
  fes: [34.05, -5.0],
  oujda: [34.68, -1.91],
  essaouira: [31.51, -9.77],
  ouarzazate: [30.92, -6.9],
  chefchaouen: [35.17, -5.27],
};

/** (depart, arrivee, ligne, mode, duree_min, distance_km_estimee, operateur), bidirectionnel */
export const SEGMENTS: [string, string, string, MoroccoMode, number, number, string][] = [
  // Al Boraq : LGV Tanger - Casablanca, 320 km/h
  ["tanger", "kenitra", "Al Boraq", "train_grande_vitesse", 50, 200, "ONCF"],
  ["kenitra", "rabat", "Al Boraq", "train_grande_vitesse", 25, 40, "ONCF"],
  ["rabat", "casa", "Al Boraq", "train_grande_vitesse", 55, 95, "ONCF"],
  // Al Atlas : grandes lignes
  ["casa", "marrakech", "Al Atlas (Marrakech)", "train_grandes_lignes", 160, 240, "ONCF"],
  ["casa", "meknes", "Al Atlas (Fès - Oujda)", "train_grandes_lignes", 170, 210, "ONCF"],
  ["meknes", "fes", "Al Atlas (Fès - Oujda)", "train_grandes_lignes", 40, 60, "ONCF"],
  ["fes", "oujda", "Al Atlas (Fès - Oujda)", "train_grandes_lignes", 300, 350, "ONCF"],
  // TNR : navette rapide aeroport
  ["casa", "aeroport", "TNR Aéroport", "navette_rapide", 35, 30, "ONCF"],
  // Eco-connecteurs : autocars interurbains reels
  ["marrakech", "essaouira", "Connecteur Essaouira", "eco_connecteur", 175, 190, "Supratours"],
  ["marrakech", "ouarzazate", "Connecteur Ouarzazate", "eco_connecteur", 240, 200, "CTM"],
  ["tanger", "chefchaouen", "Connecteur Chefchaouen", "eco_connecteur", 135, 115, "CTM"],
];

/** Horaires theoriques indicatifs par ligne, a verifier sur oncf.ma. */
export const SCHEDULES: Record<string, { frequency: string; departures: string[] }> = {
  "Al Boraq": {
    frequency: "environ 1 train par heure en journée",
    departures: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
  },
  "TNR Aéroport": {
    frequency: "environ 1 navette par heure",
    departures: ["05:30", "06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"],
  },
  "Al Atlas (Marrakech)": {
    frequency: "environ 1 train toutes les 2 heures",
    departures: ["06:15", "08:15", "10:15", "12:15", "14:15", "16:15", "18:15", "20:15"],
  },
  "Al Atlas (Fès - Oujda)": {
    frequency: "environ 1 train toutes les 2 heures",
    departures: ["06:15", "08:15", "10:15", "12:15", "14:15", "16:15", "18:15", "20:15"],
  },
  "Connecteur Essaouira": {
    frequency: "plusieurs départs quotidiens Supratours",
    departures: ["08:00", "11:00", "15:00", "17:30"],
  },
  "Connecteur Ouarzazate": {
    frequency: "plusieurs départs quotidiens CTM",
    departures: ["07:30", "12:00", "16:30"],
  },
  "Connecteur Chefchaouen": {
    frequency: "plusieurs départs quotidiens CTM",
    departures: ["08:15", "12:45", "17:15"],
  },
};

export interface Highlight {
  title: string;
  description: string;
  access: string;
}

/** Lieux phares reels et celebres, accessibles depuis la gare. */
export const HIGHLIGHTS: Record<string, Highlight> = {
  marrakech: {
    title: "Médina de Marrakech et vallée de l'Ourika",
    description: "Place Jemaa el-Fna et souks classés UNESCO. Les éco-lodges de la vallée de l'Ourika sont accessibles en connecteur routier depuis la gare.",
    access: "Médina à 15 min de la gare, Ourika via connecteur routier",
  },
  rabat: {
    title: "Tour Hassan et berges du Bouregreg",
    description: "Le minaret inachevé du XIIe siècle et le mausolée Mohammed V, puis les berges réaménagées du Bouregreg.",
    access: "Tramway de Rabat-Salé depuis la gare",
  },
  chefchaouen: {
    title: "Chefchaouen, la perle bleue",
    description: "La médina aux murs bleus du Rif, l'une des plus photogéniques du monde.",
    access: "Liaison autocar CTM depuis la gare de Tanger Ville",
  },
  fes: {
    title: "Médina de Fès el-Bali",
    description: "La plus grande zone piétonne urbaine du monde et l'une des plus anciennes médinas, classée UNESCO, avec l'université Al Quaraouiyine.",
    access: "Petit taxi ou 25 min à pied depuis la gare",
  },
  tanger: {
    title: "Médina de Tanger et cap Spartel",
    description: "La ville du détroit, sa kasbah et le cap où Méditerranée et Atlantique se rencontrent.",
    access: "Médina à 10 min de la gare Tanger Ville",
  },
  casa: {
    title: "Mosquée Hassan II",
    description: "L'un des plus grands édifices religieux du monde, posé sur l'océan, minaret de 200 mètres.",
    access: "Tramway T1 depuis la gare Casa Voyageurs",
  },
  essaouira: {
    title: "Médina et port d'Essaouira",
    description: "Cité fortifiée UNESCO face à l'Atlantique, remparts de la Skala et port de pêche aux barques bleues.",
    access: "Arrivée du connecteur en centre-ville",
  },
  ouarzazate: {
    title: "Kasbah d'Aït-ben-Haddou",
    description: "Ksar classé UNESCO aux portes du désert, décor de cinéma mondialement connu, à 30 km de Ouarzazate.",
    access: "Connecteur routier puis taxi local",
  },
  meknes: {
    title: "Bab Mansour et médina de Meknès",
    description: "La monumentale porte de la ville impériale et son héritage UNESCO.",
    access: "15 min depuis la gare",
  },
  oujda: {
    title: "Médina d'Oujda et parc Lalla Aïcha",
    description: "La capitale de l'Oriental, sa médina et sa place Bab Sidi Abdelwahab.",
    access: "10 min depuis la gare",
  },
  kenitra: {
    title: "Plage de Mehdia et réserve de Sidi Boughaba",
    description: "Lac et réserve ornithologique protégée à quelques kilomètres de la gare LGV.",
    access: "Taxi depuis la gare de Kénitra",
  },
  aeroport: {
    title: "Hub aérien Mohammed V",
    description: "Connexion directe au réseau ferré national par la navette TNR.",
    access: "Gare sous le terminal 1",
  },
};

export interface TransportHub {
  name: string;
  kind: "tramway" | "taxi_collectif" | "navette";
  coverage: string;
  website: string | null;
  certifiedLowCarbon: boolean;
  note: string;
}

/** Dernier kilometre : reseaux urbains reels, certification etiquetee honnetement. */
export const LAST_MILE: Record<string, TransportHub[]> = {
  Casablanca: [
    { name: "Tramway de Casablanca", kind: "tramway", coverage: "Lignes T1, T2, T3, T4", website: "https://www.casatramway.ma", certifiedLowCarbon: true, note: "Tramway électrique depuis Casa Voyageurs" },
    { name: "Grands taxis collectifs", kind: "taxi_collectif", coverage: "Agglomération et liaisons régionales", website: null, certifiedLowCarbon: false, note: "Partage de course, aucune certification carbone officielle" },
  ],
  Rabat: [
    { name: "Tramway de Rabat-Salé", kind: "tramway", coverage: "Lignes L1, L2", website: "https://www.tram-way.ma", certifiedLowCarbon: true, note: "Dessert la Tour Hassan et les berges du Bouregreg" },
    { name: "Grands taxis collectifs", kind: "taxi_collectif", coverage: "Rabat-Salé-Témara", website: null, certifiedLowCarbon: false, note: "Partage de course, aucune certification carbone officielle" },
  ],
  Marrakech: [
    { name: "Grands taxis collectifs", kind: "taxi_collectif", coverage: "Gare vers Hivernage, médina, Ourika", website: null, certifiedLowCarbon: false, note: "Partage de course, aucune certification éco officielle" },
    { name: "Navettes hôtelières", kind: "navette", coverage: "Zone hôtelière de l'Hivernage et palmeraie", website: null, certifiedLowCarbon: false, note: "À réserver auprès de l'hébergement" },
  ],
  Tanger: [
    { name: "Grands taxis collectifs", kind: "taxi_collectif", coverage: "Gare Tanger Ville vers médina et zone franche", website: null, certifiedLowCarbon: false, note: "Partage de course" },
  ],
};

export const DISCLAIMER = "Durées commerciales indicatives ONCF, distances estimées, fréquences approximatives. Horaires réels sur oncf.ma.";

/* ── Traductions anglaises (i18n /en) ────────────────────────────────── */

/** English versions of the destination highlights. Same real places. */
export const HIGHLIGHTS_EN: Record<string, Highlight> = {
  marrakech: {
    title: "Marrakech medina and the Ourika valley",
    description: "Jemaa el-Fna square and UNESCO-listed souks. The eco-lodges of the Ourika valley are reachable by road connector from the station.",
    access: "Medina 15 min from the station, Ourika via road connector",
  },
  rabat: {
    title: "Hassan Tower and the Bouregreg banks",
    description: "The unfinished 12th-century minaret and the Mohammed V mausoleum, then the redeveloped banks of the Bouregreg.",
    access: "Rabat-Salé tramway from the station",
  },
  chefchaouen: {
    title: "Chefchaouen, the blue pearl",
    description: "The blue-walled medina of the Rif, one of the most photogenic in the world.",
    access: "CTM coach link from Tanger Ville station",
  },
  fes: {
    title: "Medina of Fes el-Bali",
    description: "The world's largest urban pedestrian zone and one of the oldest medinas, UNESCO-listed, home to Al Quaraouiyine university.",
    access: "Petit taxi or a 25 min walk from the station",
  },
  tanger: {
    title: "Tangier medina and Cape Spartel",
    description: "The city of the strait, its kasbah and the cape where the Mediterranean meets the Atlantic.",
    access: "Medina 10 min from Tanger Ville station",
  },
  casa: {
    title: "Hassan II Mosque",
    description: "One of the largest religious buildings in the world, set over the ocean, with a 200-metre minaret.",
    access: "T1 tramway from Casa Voyageurs station",
  },
  essaouira: {
    title: "Essaouira medina and port",
    description: "UNESCO-listed fortified city facing the Atlantic, the Skala ramparts and a fishing port of blue boats.",
    access: "Connector arrives in the city centre",
  },
  ouarzazate: {
    title: "Kasbah of Aït-ben-Haddou",
    description: "UNESCO-listed ksar at the gates of the desert, a world-famous film set, 30 km from Ouarzazate.",
    access: "Road connector then local taxi",
  },
  meknes: {
    title: "Bab Mansour and the Meknes medina",
    description: "The monumental gate of the imperial city and its UNESCO heritage.",
    access: "15 min from the station",
  },
  oujda: {
    title: "Oujda medina and Lalla Aïcha park",
    description: "The capital of the Oriental region, its medina and Bab Sidi Abdelwahab square.",
    access: "10 min from the station",
  },
  kenitra: {
    title: "Mehdia beach and Sidi Boughaba reserve",
    description: "A protected lake and bird reserve a few kilometres from the high-speed station.",
    access: "Taxi from Kénitra station",
  },
  aeroport: {
    title: "Mohammed V air hub",
    description: "Direct connection to the national rail network via the TNR shuttle.",
    access: "Station under terminal 1",
  },
};

/** English last-mile notes. Same real operators, honest labelling. */
export const LAST_MILE_EN: Record<string, TransportHub[]> = {
  Casablanca: [
    { name: "Casablanca Tramway", kind: "tramway", coverage: "Lines T1, T2, T3, T4", website: "https://www.casatramway.ma", certifiedLowCarbon: true, note: "Electric tramway from Casa Voyageurs" },
    { name: "Shared grand taxis", kind: "taxi_collectif", coverage: "Metropolitan area and regional links", website: null, certifiedLowCarbon: false, note: "Shared rides, no official carbon certification" },
  ],
  Rabat: [
    { name: "Rabat-Salé Tramway", kind: "tramway", coverage: "Lines L1, L2", website: "https://www.tram-way.ma", certifiedLowCarbon: true, note: "Serves the Hassan Tower and the Bouregreg banks" },
    { name: "Shared grand taxis", kind: "taxi_collectif", coverage: "Rabat-Salé-Témara", website: null, certifiedLowCarbon: false, note: "Shared rides, no official carbon certification" },
  ],
  Marrakech: [
    { name: "Shared grand taxis", kind: "taxi_collectif", coverage: "Station to Hivernage, medina, Ourika", website: null, certifiedLowCarbon: false, note: "Shared rides, no official eco certification" },
    { name: "Hotel shuttles", kind: "navette", coverage: "Hivernage hotel district and palm grove", website: null, certifiedLowCarbon: false, note: "Book through your accommodation" },
  ],
  Tanger: [
    { name: "Shared grand taxis", kind: "taxi_collectif", coverage: "Tanger Ville station to medina and free zone", website: null, certifiedLowCarbon: false, note: "Shared rides" },
  ],
};

export const DISCLAIMER_EN = "Indicative ONCF commercial durations, estimated distances, approximate frequencies. Real timetables on oncf.ma.";

/** English line frequencies (display only). */
export const FREQUENCY_EN: Record<string, string> = {
  "Al Boraq": "about 1 train per hour during the day",
  "TNR Aéroport": "about 1 shuttle per hour",
  "Al Atlas (Marrakech)": "about 1 train every 2 hours",
  "Al Atlas (Fès - Oujda)": "about 1 train every 2 hours",
  "Connecteur Essaouira": "several Supratours departures daily",
  "Connecteur Ouarzazate": "several CTM departures daily",
  "Connecteur Chefchaouen": "several CTM departures daily",
};

/**
 * Plages labellisees Pavillon Bleu 2026 par la Fondation Mohammed VI
 * pour la Protection de l'Environnement (38 sites au Maroc : 33 plages,
 * 4 marinas, 1 lac). Source : annonce officielle relayee par la presse,
 * juillet 2026. On ne cite que les sites rattachables aux villes
 * couvertes par le moteur : aucune extrapolation.
 */
export const BLUE_FLAG: Record<string, { fr: string; en: string }> = {
  Rabat: {
    fr: "Les plages Contrebandiers et Sable d'Or (Skhirate-Témara, au sud de Rabat) figurent parmi les 5 nouvelles plages labellisées Pavillon Bleu 2026 par la Fondation Mohammed VI pour la Protection de l'Environnement.",
    en: "Contrebandiers and Sable d'Or beaches (Skhirate-Témara, south of Rabat) are among the 5 new beaches awarded the 2026 Blue Flag by the Mohammed VI Foundation for Environmental Protection.",
  },
  Casablanca: {
    fr: "La plage Tamaris II (province de Nouaceur, région de Casablanca) fait partie des 5 nouvelles plages labellisées Pavillon Bleu 2026 par la Fondation Mohammed VI pour la Protection de l'Environnement.",
    en: "Tamaris II beach (Nouaceur province, Casablanca region) is one of the 5 new beaches awarded the 2026 Blue Flag by the Mohammed VI Foundation for Environmental Protection.",
  },
};
