/**
 * Internationalisation Trekr Maroc.
 * FR aux URLs racine, EN sous /en. Dictionnaires statiques TypeScript :
 * pas de librairie, tout est resolu au build.
 */

export type Locale = "fr" | "en";

export const localePrefix = (locale: Locale): string => (locale === "en" ? "/en" : "");

interface Dict {
  chrome: {
    searchLink: string;
    circuits: string;
    airport: string;
    wc2030: string;
    footerLine: string;
    footerHonesty: string;
    ticketsOn: string;
  };
  home: {
    kicker: string;
    title1: string;
    title2: string;
    subtitle: string;
    scenarios: { label: string; detail: string }[];
    facts: string[];
    promiseNetworkTitle: string;
    promiseNetworkBody: string;
    promiseImmersionTitle: string;
    promiseImmersionBody: string;
    promiseCarbonTitle: string;
    promiseCarbonBody: string;
    axesTitle: string;
    direct: string;
    transfer: string;
    transfers: string;
    stationsCovered: string;
  };
  omni: {
    placeholder: string;
    go: string;
    error: string;
    note: string;
    examples: string[];
  };
  picker: {
    from: string;
    to: string;
    submit: string;
    coach: string;
  };
  train: {
    breadcrumbHome: string;
    byTrain: string;
    estimatedKm: string;
    inVehicle: string;
    transferLabel: string;
    theoreticalDepartures: string;
    departure: string;
    arrival: string;
    sleepAt: string;
    sleepBody: string;
    greenKeyDirectory: string;
    seeStays: string;
    immersionTitle: string;
    cultureHeading: string;
    flavorsHeading: string;
    bookExperiences: string;
    verifiedData: string;
    whenToGo: string;
    crowdDisclaimer: string;
    carbonTitle: string;
    thisTrip: string;
    car: string;
    plane: string;
    savedVsCar: string;
    lastMileTitle: string;
    electric: string;
    notCertified: string;
    buyTicket: string;
    returnTrip: string;
  };
  circuits: {
    kicker: string;
    title: string;
    subtitle: string;
    totalTransport: string;
    savedVsCar: string;
    footnote: string;
  };
  airport: {
    kicker: string;
    title1: string;
    title2: string;
    subtitle: string;
    tip: string;
    verify: string;
  };
  wc2030: {
    kicker: string;
    title: string;
    subtitle: string;
    direct: string;
    transfer: string;
    transfers: string;
    footnote: string;
  };
}

export const T: Record<Locale, Dict> = {
  fr: {
    chrome: {
      searchLink: "Rechercher un trajet",
      circuits: "Circuits",
      airport: "Aéroport",
      wc2030: "2030",
      footerLine: "Trekr, le guide libre du Maroc en train. Billets vendus par l'ONCF sur",
      footerHonesty: "Durées indicatives, fréquences approximatives, estimations carbone en ordres de grandeur : aucune donnée inventée.",
      ticketsOn: "oncf-voyages.ma",
    },
    home: {
      kicker: "Trekr Maroc 🇲🇦",
      title1: "Le Maroc en train,",
      title2: "guide libre et gratuit",
      subtitle:
        "L'avion vous amène au Maroc. Trekr vous fait découvrir le Royaume : itinéraires réels ONCF, expériences locales authentiques, impact carbone mesuré.",
      scenarios: [
        { label: "J'atterris à Casablanca", detail: "De l'aéroport Mohammed V à Marrakech, sans voiture" },
        { label: "Supporter 2030", detail: "Tanger vers Marrakech, le corridor de la future LGV" },
        { label: "Escapade culturelle", detail: "Casablanca vers Fès, la médina classée UNESCO" },
      ],
      facts: [
        "19,8 millions de visiteurs en 2025, record historique",
        "LGV Kénitra-Marrakech en chantier pour 2030",
        "Coupe du Monde 2030 co-organisée par le Maroc",
      ],
      promiseNetworkTitle: "Le réseau réel",
      promiseNetworkBody:
        "Al Boraq, Al Atlas, navettes TNR et autocars Supratours ou CTM : itinéraires combinés calculés sur le réseau marocain réel.",
      promiseImmersionTitle: "L'immersion locale",
      promiseImmersionBody:
        "À chaque destination, des lieux et des saveurs authentiques et vérifiés : médinas UNESCO, artisanat, plats signatures.",
      promiseCarbonTitle: "L'impact en clair",
      promiseCarbonBody:
        "Chaque trajet affiche le CO2 comparé à la voiture et à l'avion, en ordres de grandeur étiquetés. Jamais de chiffre inventé.",
      axesTitle: "Les grands axes du Royaume",
      direct: "direct",
      transfer: "correspondance",
      transfers: "correspondances",
      stationsCovered: "gares et hubs couverts, du détroit au désert.",
    },
    omni: {
      placeholder: "Décrivez votre trajet : français, anglais ou darija...",
      go: "Go",
      error: "Deux villes sont nécessaires. Essayez par exemple : ",
      note: "Compréhension locale et instantanée, sans serveur. Français, anglais, darija.",
      examples: ["De l'aéroport Mohammed V à Marrakech", "From Tangier to Fes", "Men kaza l swira", "من طنجة إلى مراكش"],
    },
    picker: {
      from: "Départ",
      to: "Destination",
      submit: "Voir le trajet",
      coach: "(autocar)",
    },
    train: {
      breadcrumbHome: "Trekr Maroc",
      byTrain: "en train",
      estimatedKm: "km estimés",
      inVehicle: "en véhicule",
      transferLabel: "Correspondance",
      theoreticalDepartures: "Fréquence indicative",
      departure: "départ",
      arrival: "arrivée",
      sleepAt: "Dormir à",
      sleepBody:
        "Privilégiez un hébergement porteur d'un label environnemental vérifiable : au Maroc, le label international Clef Verte est déployé par la Fondation Mohammed VI pour la Protection de l'Environnement.",
      greenKeyDirectory: "Annuaire officiel Clef Verte",
      seeStays: "Voir les hébergements à",
      immersionTitle: "Immersion Locale & Culture",
      cultureHeading: "Les Incontournables Culturels",
      flavorsHeading: "Saveurs et Spécialités de",
      bookExperiences: "Réserver des expériences à",
      verifiedData: "Données vérifiées et authentiques",
      whenToGo: "Quand y aller pour éviter la foule",
      crowdDisclaimer: "Conseils de visite fondés sur des faits vérifiables (horaires, prière du vendredi, rythme des groupes), pas de mesure d'affluence en temps réel.",
      carbonTitle: "Impact carbone",
      thisTrip: "Cet itinéraire",
      car: "Voiture thermique",
      plane: "Avion court-courrier",
      savedVsCar: "kg CO2 vs voiture",
      lastMileTitle: "Dernier kilomètre à",
      electric: "électrique",
      notCertified: "non certifié",
      buyTicket: "Acheter le billet sur ONCF Voyages",
      returnTrip: "Voir le trajet retour",
    },
    circuits: {
      kicker: "Circuits",
      title: "Le Royaume en plusieurs étapes",
      subtitle:
        "Des circuits multi-villes entièrement en train et éco-connecteurs, calculés sur le réseau réel. Chaque étape s'ouvre en détail.",
      totalTransport: "de transport au total",
      savedVsCar: "kg CO2 vs voiture",
      footnote: "Durées commerciales indicatives, à vérifier sur oncf.ma. Les jours suggérés incluent le temps de visite.",
    },
    airport: {
      kicker: "J'atterris à Casablanca",
      title1: "L'avion vous amène au Maroc.",
      title2: "Le train vous fait découvrir le Royaume.",
      subtitle:
        "La gare est directement sous le terminal 1 de l'aéroport Mohammed V. La navette TNR rejoint Casa Voyageurs, puis Al Boraq et Al Atlas desservent tout le pays. Pas de voiture, pas de négociation, un billet.",
      tip: "Astuce : la navette TNR circule environ toutes les heures de 05h30 à 22h30. Billets vendus par l'ONCF sur",
      verify: ". Horaires théoriques à vérifier avant le voyage.",
    },
    wc2030: {
      kicker: "Supporter 2030",
      title: "La Coupe du Monde se jouera aussi en train",
      subtitle:
        "Le Maroc co-organise la Coupe du Monde 2030 avec l'Espagne et le Portugal. Entre les villes marocaines annoncées comme hôtes, le rail est déjà le moyen le plus simple de circuler, et la LGV Kénitra-Marrakech, en chantier, rapprochera encore Tanger de la ville ocre d'ici l'échéance.",
      direct: "direct",
      transfer: "correspondance",
      transfers: "correspondances",
      footnote:
        "Durées du réseau actuel, horaires théoriques à vérifier sur oncf.ma. La liste définitive des villes hôtes et les temps de parcours LGV 2030 seront confirmés par les organisateurs : aucune promesse inventée.",
    },
  },

  en: {
    chrome: {
      searchLink: "Find a route",
      circuits: "Circuits",
      airport: "Airport",
      wc2030: "2030",
      footerLine: "Trekr, the free and open guide to Morocco by train. Tickets sold by ONCF on",
      footerHonesty: "Indicative durations, approximate frequencies, carbon estimates as orders of magnitude: no invented data.",
      ticketsOn: "oncf-voyages.ma",
    },
    home: {
      kicker: "Trekr Morocco 🇲🇦",
      title1: "Morocco by train,",
      title2: "a free and open guide",
      subtitle:
        "The plane brings you to Morocco. Trekr helps you discover the Kingdom: real ONCF itineraries, authentic local experiences, measured carbon impact.",
      scenarios: [
        { label: "I land in Casablanca", detail: "From Mohammed V airport to Marrakech, no car needed" },
        { label: "2030 supporter", detail: "Tangier to Marrakech, the future high-speed corridor" },
        { label: "Cultural escape", detail: "Casablanca to Fes, the UNESCO-listed medina" },
      ],
      facts: [
        "19.8 million visitors in 2025, an all-time record",
        "Kenitra-Marrakech high-speed line under construction for 2030",
        "2030 World Cup co-hosted by Morocco",
      ],
      promiseNetworkTitle: "The real network",
      promiseNetworkBody:
        "Al Boraq, Al Atlas, TNR shuttles and Supratours or CTM coaches: combined itineraries computed on Morocco's real network.",
      promiseImmersionTitle: "Local immersion",
      promiseImmersionBody:
        "At every destination, authentic and verified places and flavors: UNESCO medinas, craftsmanship, signature dishes.",
      promiseCarbonTitle: "Impact, made clear",
      promiseCarbonBody:
        "Every trip shows CO2 compared with car and plane, as labelled orders of magnitude. Never an invented figure.",
      axesTitle: "The Kingdom's main lines",
      direct: "direct",
      transfer: "transfer",
      transfers: "transfers",
      stationsCovered: "stations and hubs covered, from the strait to the desert.",
    },
    omni: {
      placeholder: "Describe your trip: English, French or Darija...",
      go: "Go",
      error: "Two cities are needed. Try for example: ",
      note: "Local, instant understanding, no server. English, French, Darija.",
      examples: ["From Mohammed V airport to Marrakech", "De Tanger à Fès", "Men kaza l swira", "من طنجة إلى مراكش"],
    },
    picker: {
      from: "From",
      to: "To",
      submit: "See the route",
      coach: "(coach)",
    },
    train: {
      breadcrumbHome: "Trekr Morocco",
      byTrain: "by train",
      estimatedKm: "km estimated",
      inVehicle: "on board",
      transferLabel: "Transfer",
      theoreticalDepartures: "Indicative frequency",
      departure: "departure",
      arrival: "arrival",
      sleepAt: "Stay in",
      sleepBody:
        "Choose accommodation with a verifiable environmental label: in Morocco, the international Green Key label is deployed by the Mohammed VI Foundation for Environmental Protection.",
      greenKeyDirectory: "Official Green Key directory",
      seeStays: "See places to stay in",
      immersionTitle: "Local Immersion & Culture",
      cultureHeading: "Cultural Essentials",
      flavorsHeading: "Flavors and Specialties of",
      bookExperiences: "Book experiences in",
      verifiedData: "Verified, authentic data",
      whenToGo: "When to go to beat the crowds",
      crowdDisclaimer: "Visit advice based on verifiable facts (opening patterns, Friday prayer, tour-group rhythms), not real-time crowd measurements.",
      carbonTitle: "Carbon impact",
      thisTrip: "This itinerary",
      car: "Petrol car",
      plane: "Short-haul flight",
      savedVsCar: "kg CO2 vs car",
      lastMileTitle: "Last mile in",
      electric: "electric",
      notCertified: "not certified",
      buyTicket: "Buy the ticket on ONCF Voyages",
      returnTrip: "See the return route",
    },
    circuits: {
      kicker: "Circuits",
      title: "The Kingdom, one stage at a time",
      subtitle:
        "Multi-city circuits entirely by train and eco-connectors, computed on the real network. Every stage opens in detail.",
      totalTransport: "total transport time",
      savedVsCar: "kg CO2 vs car",
      footnote: "Indicative commercial durations, check on oncf.ma. Suggested days include visiting time.",
    },
    airport: {
      kicker: "I land in Casablanca",
      title1: "The plane brings you to Morocco.",
      title2: "The train shows you the Kingdom.",
      subtitle:
        "The station sits right under terminal 1 of Mohammed V airport. The TNR shuttle reaches Casa Voyageurs, then Al Boraq and Al Atlas serve the whole country. No car, no haggling, one ticket.",
      tip: "Tip: the TNR shuttle runs roughly hourly from 05:30 to 22:30. Tickets sold by ONCF on",
      verify: ". Theoretical timetables, check before travelling.",
    },
    wc2030: {
      kicker: "2030 supporter",
      title: "The World Cup will also be played by train",
      subtitle:
        "Morocco co-hosts the 2030 World Cup with Spain and Portugal. Between the announced Moroccan host cities, rail is already the simplest way to move around, and the Kenitra-Marrakech high-speed line under construction will bring Tangier even closer to the ochre city by then.",
      direct: "direct",
      transfer: "transfer",
      transfers: "transfers",
      footnote:
        "Current network durations, theoretical timetables to check on oncf.ma. The final list of host cities and 2030 high-speed travel times will be confirmed by the organisers: no invented promises.",
    },
  },
};
