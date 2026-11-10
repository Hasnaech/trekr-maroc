/**
 * Immersion Locale & Culture, par ville marocaine.
 * Donnees culturelles et culinaires reelles et verifiees, codees en dur.
 * Regle d'honnetete absolue : aucun lieu invente.
 */

export interface ImmersionItem {
  emoji: string;
  title: string;
  description: string;
}

export interface CityImmersion {
  tagline: string;
  culture: ImmersionItem[];
  saveurs: ImmersionItem[];
}

export const CITY_IMMERSIONS: Record<string, CityImmersion> = {
  Casablanca: {
    tagline: "La métropole entre Art déco et océan",
    culture: [
      {
        emoji: "🕌",
        title: "Mosquée Hassan II",
        description:
          "Visite guidée avec un focus sur l'artisanat d'art : 6 000 maîtres artisans ont réalisé les zelliges complexes, les bois de cèdre sculptés et les plafonds ouvragés mobiles.",
      },
      {
        emoji: "🏛️",
        title: "Quartier des Habous",
        description:
          "Exploration architecturale de la Nouvelle Médina pour admirer l'urbanisme néo-mauresque des années 1920, entre arcades, placettes et librairies traditionnelles.",
      },
    ],
    saveurs: [
      {
        emoji: "🥐",
        title: "Pâtisserie Bennis Habous",
        description:
          "Pause gourmande incontournable pour déguster d'authentiques cornes de gazelle et des pastillas fines dans cette institution mythique du quartier des Habous.",
      },
      {
        emoji: "🐟",
        title: "Le poisson du marché central",
        description:
          "L'institution casablancaise du déjeuner : choisir son poisson à la criée du Marché Central et le faire griller sur place, au cœur de l'ancienne médina.",
      },
    ],
  },

  Rabat: {
    tagline: "L'art de vivre à Rabat",
    culture: [
      {
        emoji: "🏰",
        title: "Flânerie à la Kasbah des Oudaïas",
        description:
          "Explorez les ruelles bleues et blanches de la forteresse médiévale, découvrez le Jardin Andalou et profitez d'un thé à la menthe traditionnel au mythique Café Maure face à l'embouchure du Bouregreg.",
      },
      {
        emoji: "🧶",
        title: "Artisanat à la Rue des Consuls",
        description:
          "Le cœur battant de la Médina de Rabat. Idéal pour découvrir le savoir-faire historique des maîtres artisans : maroquinerie cousue main et authentiques tapis de Rabat tissés à point serré.",
      },
    ],
    saveurs: [
      {
        emoji: "🍲",
        title: "Le Plat Signature (Tajine Tfaya)",
        description:
          "Goûtez au fleuron de la gastronomie de la capitale : un tajine mariant la tendreté de la viande à la douceur de la Tfaya (oignons confits caramélisés, raisins secs et cannelle).",
      },
      {
        emoji: "🥮",
        title: "La Douceur Unique (Cornes de Gazelle)",
        description:
          "Distinguées par la finesse absolue de leur enveloppe de pâte, les cornes de gazelle de Rabat cachent un cœur d'amandes subtilement parfumé à l'eau de fleur d'oranger authentique.",
      },
    ],
  },

  Marrakech: {
    tagline: "L'énergie de la ville ocre",
    culture: [
      {
        emoji: "🎭",
        title: "La place Jemaa el-Fna au crépuscule",
        description:
          "Conteurs, musiciens gnaouas et étals fumants : l'espace culturel de la place est inscrit par l'UNESCO au patrimoine immatériel de l'humanité. Arrivez en fin d'après-midi pour voir la place se métamorphoser.",
      },
      {
        emoji: "🕌",
        title: "La médersa Ben Youssef",
        description:
          "L'ancien collège coranique du 16e siècle, chef-d'œuvre de l'architecture saadienne restauré en 2022 : zelliges, stucs ciselés et cèdre sculpté autour d'un bassin central.",
      },
    ],
    saveurs: [
      {
        emoji: "🏺",
        title: "Le Plat Signature (Tanjia Marrakchie)",
        description:
          "L'urne de terre cuite emblématique de la ville : viande confite au citron confit, ail et ras el hanout, cuite lentement dans les cendres du four du hammam de quartier.",
      },
      {
        emoji: "🍊",
        title: "Le jus d'orange des étals",
        description:
          "Institution de Jemaa el-Fna : les oranges de la région pressées à la minute sur les étals numérotés de la place, rituel simple et authentique des Marrakchis.",
      },
    ],
  },

  "Fès": {
    tagline: "La capitale spirituelle et artisanale",
    culture: [
      {
        emoji: "🕌",
        title: "La médina de Fès el-Bali",
        description:
          "La plus grande zone piétonne du monde, classée au patrimoine mondial de l'UNESCO, abrite l'université Al Quaraouiyine fondée en 859, considérée comme la plus ancienne encore en activité.",
      },
      {
        emoji: "🎨",
        title: "Les tanneries Chouara",
        description:
          "Depuis le 11e siècle, les cuves de pierre multicolores teignent les cuirs selon des gestes inchangés. Les terrasses des maroquineries voisines offrent le meilleur point de vue.",
      },
    ],
    saveurs: [
      {
        emoji: "🥧",
        title: "Le Plat Signature (Pastilla Fassie)",
        description:
          "Le joyau sucré-salé de la cuisine fassie : feuilles de warqa croustillantes, volaille aux épices, amandes et cannelle, poudrées de sucre glace. La version au pigeon est la plus traditionnelle.",
      },
      {
        emoji: "🍯",
        title: "Le miel et les douceurs de la médina",
        description:
          "Chebakia au sésame, sellou aux amandes grillées : les échoppes de la médina perpétuent des recettes familiales rythmées par les saisons et les fêtes religieuses.",
      },
    ],
  },

  Tanger: {
    tagline: "La porte de l'Afrique, entre deux mers",
    culture: [
      {
        emoji: "🏰",
        title: "La Kasbah et sa médina blanche",
        description:
          "Perchée au-dessus du détroit de Gibraltar, la Kasbah de Tanger a inspiré Matisse et Delacroix. Le musée de la Kasbah, dans l'ancien palais Dar el-Makhzen, raconte la ville-monde.",
      },
      {
        emoji: "🍵",
        title: "Le thé au Café Hafa",
        description:
          "Fondé en 1921, ses terrasses en escalier face à la Méditerranée ont accueilli Paul Bowles et les Rolling Stones. Le thé à la menthe y est servi comme au premier jour.",
      },
    ],
    saveurs: [
      {
        emoji: "🐟",
        title: "Le poisson du détroit",
        description:
          "Entre Atlantique et Méditerranée, les grillades de poisson du port et les fritures d'anchois font la réputation de la table tangéroise, au plus près de la criée.",
      },
      {
        emoji: "🍲",
        title: "Le Plat des pêcheurs (Tajine de poisson)",
        description:
          "Le tajine mchermel de la côte nord : poisson mariné à la chermoula (coriandre, cumin, paprika, citron confit), mijoté avec tomates et poivrons.",
      },
    ],
  },
};

export function immersionForCity(city: string): CityImmersion | null {
  return CITY_IMMERSIONS[city] ?? null;
}

/* ── English versions (i18n /en). Same real places, no invented data. ── */

export const CITY_IMMERSIONS_EN: Record<string, CityImmersion> = {
  Casablanca: {
    tagline: "The metropolis between Art Deco and ocean",
    culture: [
      {
        emoji: "🕌",
        title: "Hassan II Mosque",
        description:
          "Guided visit with a focus on fine craftsmanship: 6,000 master artisans created the intricate zellige, the carved cedar wood and the movable coffered ceilings.",
      },
      {
        emoji: "🏛️",
        title: "Habous district",
        description:
          "An architectural walk through the New Medina to admire 1920s neo-Moorish urban design, between arcades, small squares and traditional bookshops.",
      },
    ],
    saveurs: [
      {
        emoji: "🥐",
        title: "Bennis Habous pastry shop",
        description:
          "An essential gourmet stop for authentic gazelle horns and fine pastillas in this legendary institution of the Habous district.",
      },
      {
        emoji: "🐟",
        title: "Fish at the Central Market",
        description:
          "The Casablanca lunch institution: pick your fish at the Central Market auction and have it grilled on the spot, in the heart of the old medina.",
      },
    ],
  },

  Rabat: {
    tagline: "The art of living in Rabat",
    culture: [
      {
        emoji: "🏰",
        title: "Strolling the Kasbah of the Udayas",
        description:
          "Explore the blue and white lanes of the medieval fortress, discover the Andalusian Garden and enjoy a traditional mint tea at the legendary Café Maure facing the mouth of the Bouregreg.",
      },
      {
        emoji: "🧶",
        title: "Craftsmanship on Rue des Consuls",
        description:
          "The beating heart of Rabat's medina. Ideal for discovering the historic know-how of master artisans: hand-stitched leather goods and authentic tightly-knotted Rabat carpets.",
      },
    ],
    saveurs: [
      {
        emoji: "🍲",
        title: "The Signature Dish (Tfaya Tagine)",
        description:
          "Taste the jewel of the capital's gastronomy: a tagine pairing tender meat with the sweetness of Tfaya (caramelised confit onions, raisins and cinnamon).",
      },
      {
        emoji: "🥮",
        title: "The Unique Sweet (Gazelle Horns)",
        description:
          "Distinguished by the absolute finesse of their pastry shell, Rabat's gazelle horns hide an almond heart subtly scented with authentic orange blossom water.",
      },
    ],
  },

  Marrakech: {
    tagline: "The energy of the ochre city",
    culture: [
      {
        emoji: "🎭",
        title: "Jemaa el-Fna square at dusk",
        description:
          "Storytellers, Gnawa musicians and steaming food stalls: the square's cultural space is inscribed by UNESCO as intangible heritage of humanity. Arrive in the late afternoon to watch the square transform.",
      },
      {
        emoji: "🕌",
        title: "The Ben Youssef Madrasa",
        description:
          "The former 16th-century Koranic college, a masterpiece of Saadian architecture restored in 2022: zellige, chiselled stucco and carved cedar around a central basin.",
      },
    ],
    saveurs: [
      {
        emoji: "🏺",
        title: "The Signature Dish (Marrakchi Tanjia)",
        description:
          "The city's emblematic clay urn: meat slow-confited with preserved lemon, garlic and ras el hanout, cooked in the embers of the neighbourhood hammam's oven.",
      },
      {
        emoji: "🍊",
        title: "Orange juice from the stalls",
        description:
          "A Jemaa el-Fna institution: regional oranges pressed to order at the square's numbered stalls, a simple and authentic Marrakchi ritual.",
      },
    ],
  },

  "Fès": {
    tagline: "The spiritual and artisanal capital",
    culture: [
      {
        emoji: "🕌",
        title: "The medina of Fes el-Bali",
        description:
          "The world's largest pedestrian zone, a UNESCO World Heritage site, home to Al Quaraouiyine university founded in 859, considered the oldest still in operation.",
      },
      {
        emoji: "🎨",
        title: "The Chouara tanneries",
        description:
          "Since the 11th century, the multicoloured stone vats have dyed leather with unchanged gestures. The terraces of the neighbouring leather shops offer the best viewpoint.",
      },
    ],
    saveurs: [
      {
        emoji: "🥧",
        title: "The Signature Dish (Fassi Pastilla)",
        description:
          "The sweet-savoury jewel of Fassi cuisine: crispy warqa leaves, spiced poultry, almonds and cinnamon, dusted with icing sugar. The pigeon version is the most traditional.",
      },
      {
        emoji: "🍯",
        title: "Honey and sweets of the medina",
        description:
          "Sesame chebakia, sellou with roasted almonds: the medina's stalls keep alive family recipes paced by the seasons and religious festivals.",
      },
    ],
  },

  Tanger: {
    tagline: "The gate of Africa, between two seas",
    culture: [
      {
        emoji: "🏰",
        title: "The Kasbah and its white medina",
        description:
          "Perched above the Strait of Gibraltar, the Kasbah of Tangier inspired Matisse and Delacroix. The Kasbah museum, in the former Dar el-Makhzen sultan's palace, tells the story of the world-city.",
      },
      {
        emoji: "🍵",
        title: "Tea at Café Hafa",
        description:
          "Founded in 1921, its terraced steps facing the Mediterranean welcomed Paul Bowles and the Rolling Stones. Mint tea is still served as on day one.",
      },
    ],
    saveurs: [
      {
        emoji: "🐟",
        title: "Fish of the strait",
        description:
          "Between Atlantic and Mediterranean, grilled fish from the port and fried anchovies built the reputation of the Tangier table, right by the fish auction.",
      },
      {
        emoji: "🍲",
        title: "The fishermen's dish (fish tagine)",
        description:
          "The mchermel tagine of the northern coast: fish marinated in chermoula (coriander, cumin, paprika, preserved lemon), simmered with tomatoes and peppers.",
      },
    ],
  },
};

import type { Locale } from "./i18n";

/** Immersion localisee : memes lieux reels dans les deux langues. */
export function immersionFor(city: string, locale: Locale): CityImmersion | null {
  const source = locale === "en" ? CITY_IMMERSIONS_EN : CITY_IMMERSIONS;
  return source[city] ?? null;
}
