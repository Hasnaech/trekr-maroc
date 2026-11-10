/**
 * Photos des villes : fichiers locaux (public/cities/) issus de
 * Wikimedia Commons, licences libres verifiees, credit obligatoire
 * affiche dans l'interface. Regle d'honnetete : uniquement de vraies
 * photos de vrais lieux, jamais d'image generee pour un lieu reel.
 * Genere automatiquement; une ville absente de cette table recoit
 * un motif decoratif abstrait (aucune fausse photo).
 */

export interface CityImageInfo {
  src: string; // chemin sous /public
  alt: string;
  credit: string; // auteur + licence, affiche sur l'image
  sourceUrl: string; // page Commons d'origine
}

export const CITY_IMAGES: Record<string, CityImageInfo> = {
  "casa": {
    "src": "/cities/casa.jpg",
    "alt": "Mosquée Hassan II, Casablanca",
    "credit": "Milamber's portfolio · CC BY 2.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sunshine_on_mosque_Hassan_II_in_Casablanca,_Morocco_-_Flickr_-_Milamber%27s_portfolio.jpg"
  },
  "rabat": {
    "src": "/cities/rabat.jpg",
    "alt": "Kasbah des Oudaïas, Rabat",
    "credit": "Petar Milošević · CC BY-SA 4.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Fortifications_of_Rabat,_Kasbah_Udayas_(%D8%A3%D8%B3%D9%88%D8%A7%D8%B1_%D8%A7%D9%84%D8%B1%D8%A8%D8%A7%D8%B7).jpg"
  },
  "marrakech": {
    "src": "/cities/marrakech.jpg",
    "alt": "Mosquée Koutoubia, Marrakech",
    "credit": "Baca12 · CC BY-SA 4.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mosqu%C3%A9e_de_la_Koutoubia_-_marakesh.jpg"
  },
  "fes": {
    "src": "/cities/fes.jpg",
    "alt": "Médina de Fès el-Bali",
    "credit": "Sim Br · CC BY-SA 2.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Looking_Upon_The_Medina_in_Fes,_Morocco.jpg"
  },
  "tanger": {
    "src": "/cities/tanger.jpg",
    "alt": "Médina de Tanger",
    "credit": "Travel4Brews · CC BY 2.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tangier_Medina_(40115238324).jpg"
  },
  "meknes": {
    "src": "/cities/meknes.jpg",
    "alt": "Bab Mansour, Meknès",
    "credit": "Jerzy Strzelecki · CC BY 3.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Bab_Mansour_gate.jpg"
  },
  "oujda": {
    "src": "/cities/oujda.jpg",
    "alt": "Médina d'Oujda",
    "credit": "Farajiibrahim · CC BY-SA 4.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Remparts_medina_Oujda_Brahim_FARAJI.jpg"
  },
  "kenitra": {
    "src": "/cities/kenitra.jpg",
    "alt": "Plage de Mehdia, Kénitra",
    "credit": "Achraf abarhous · CC BY-SA 4.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mehdia_beach,_kenitra,_Morocco.jpg"
  },
  "essaouira": {
    "src": "/cities/essaouira.jpg",
    "alt": "Port d'Essaouira",
    "credit": "DimiTalen · CC0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Fishing_boats_in_the_port_of_Essaouira,_2008.jpg"
  },
  "ouarzazate": {
    "src": "/cities/ouarzazate.jpg",
    "alt": "Kasbah d'Aït-ben-Haddou, Ouarzazate",
    "credit": "Petar Milošević · CC BY-SA 4.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ksar_A%C3%AFt_Benhaddou,_Marocco_(%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8,_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93).jpg"
  },
  "chefchaouen": {
    "src": "/cities/chefchaouen.jpg",
    "alt": "Chefchaouen, la perle bleue",
    "credit": "Fbrandao.1963 · CC BY-SA 4.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:2018_01_(Blue)_-_Chaouen.jpg"
  },
  "aeroport": {
    "src": "/cities/aeroport.jpg",
    "alt": "Aéroport Mohammed V, Casablanca",
    "credit": "JukoFF · CC BY-SA 4.0 · Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mohammed_V_International_Airport._August_2017.jpg"
  }
};
