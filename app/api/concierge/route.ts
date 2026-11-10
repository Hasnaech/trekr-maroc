import { NextResponse } from "next/server";
import { STATIONS, SEGMENTS, SCHEDULES, HIGHLIGHTS, BLUE_FLAG, DISCLAIMER } from "@/lib/network";
import { CITY_IMMERSIONS } from "@/lib/immersion";
import { VISIT_TIPS } from "@/lib/visitTips";
import { CIRCUITS } from "@/lib/circuits";
import { findRoute, formatMin } from "@/lib/router";
import { parseOmni } from "@/lib/omni";

/**
 * Concierge Trekr Maroc : chat ancre sur les donnees du moteur,
 * servi par l'API Mistral (choix d'Hasnae, cle dans MISTRAL_API_KEY,
 * cote serveur uniquement, jamais exposee au navigateur).
 * Anti-hallucination : le modele ne repond QUE depuis le contexte
 * fourni (reseau, horaires theoriques, immersion, circuits, labels)
 * et renvoie vers oncf.ma pour tout ce qui sort de son perimetre.
 * Sans cle : reponse { error: "no_key" }, l'interface bascule sur
 * l'omni-saisie.
 */

export const runtime = "nodejs";

const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";
const MISTRAL_MODEL = "mistral-small-latest";
const MAX_TURNS = 12;
const MAX_CHARS = 2000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function buildKnowledge(): string {
  const stations = Object.values(STATIONS)
    .map((s) => `- ${s.name} (${s.city}, ${s.kind === "gare" ? "gare ONCF" : "hub autocar"})`)
    .join("\n");
  const segments = SEGMENTS.map(
    ([a, b, line, , min, km, op]) =>
      `- ${STATIONS[a].city} <-> ${STATIONS[b].city} : ${line} (${op}), ~${min} min, ~${km} km estimes`
  ).join("\n");
  const schedules = Object.entries(SCHEDULES)
    .map(([line, s]) => `- ${line} : ${s.frequency}, premiers departs ${s.departures.slice(0, 3).join(", ")}`)
    .join("\n");
  const highlights = Object.entries(HIGHLIGHTS)
    .map(([k, h]) => `- ${STATIONS[k]?.city ?? k} : ${h.title}. ${h.description} Acces : ${h.access}`)
    .join("\n");
  const immersion = Object.entries(CITY_IMMERSIONS)
    .map(([city, d]) =>
      [...d.culture, ...d.saveurs].map((i) => `- ${city} : ${i.title}. ${i.description}`).join("\n")
    )
    .join("\n");
  const circuits = CIRCUITS.map(
    (c) => `- ${c.title} (${c.days}) : ${c.pitch} Etapes : ${c.stops.map((s) => STATIONS[s].city).join(" -> ")}`
  ).join("\n");
  const blueFlag = Object.entries(BLUE_FLAG)
    .map(([city, note]) => `- ${city} : ${note.fr}`)
    .join("\n");
  const visitTips = Object.entries(VISIT_TIPS)
    .map(([city, tips]) => tips.map((v) => `- ${city}, ${v.place.fr} : ${v.tip.fr}`).join("\n"))
    .join("\n");

  return `GARES ET HUBS COUVERTS :\n${stations}\n\nLIAISONS DIRECTES DU RESEAU :\n${segments}\n\nHORAIRES THEORIQUES PAR LIGNE :\n${schedules}\n\nLIEUX PHARES PAR VILLE :\n${highlights}\n\nIMMERSION CULTURE ET GASTRONOMIE :\n${immersion}\n\nCIRCUITS SUGGERES :\n${circuits}\n\nPLAGES LABELLISEES PAVILLON BLEU 2026 (Fondation Mohammed VI pour la Protection de l'Environnement) :\n${blueFlag}\n\nQUAND VISITER POUR EVITER LA FOULE (conseils fondes sur des faits structurels, pas de mesure en temps reel; le preciser si on te le demande) :\n${visitTips}`;
}

const SYSTEM_PROMPT = `Tu es le concierge de Trekr Maroc, le compagnon de voyage IA du Maroc en train.

REGLES ABSOLUES, NON NEGOCIABLES :
1. Tu ne reponds QUE depuis les DONNEES ci-dessous. Tu n'inventes JAMAIS un horaire, un prix, un hotel, un restaurant, une ligne ou un lieu qui n'y figure pas.
2. Les prix des billets ne sont pas dans tes donnees : pour tout prix ou achat, renvoie vers oncf-voyages.ma.
3. Les durees sont commerciales indicatives et les horaires theoriques : rappelle-le des que tu cites un horaire, et invite a verifier sur oncf.ma.
4. Si la question sort de ton perimetre (autre pays, avion, meteo, actualite, ville non couverte), dis-le simplement et propose ce que tu sais faire.
5. Reponds dans la langue de l'utilisateur (francais, anglais ou darija). Reste concis : 2 a 5 phrases, listes courtes si utile.
6. Quand un itineraire precis est fourni dans le contexte ITINERAIRE CALCULE, appuie-toi dessus en priorite : c'est le calcul exact du moteur.
7. Tu peux suggerer les pages du site : /circuits (circuits multi-villes), /aeroport (depuis l'aeroport Mohammed V), /2030 (villes de la Coupe du Monde).

DONNEES (source unique de verite) :
${buildKnowledge()}

Avertissement global : ${DISCLAIMER}`;

/** Si le dernier message mentionne deux villes, injecte l'itineraire exact. */
function routeContext(lastUserMessage: string): string {
  const parsed = parseOmni(lastUserMessage);
  if (!parsed) return "";
  const trip = findRoute(parsed.origin, parsed.destination);
  if (!trip) return "";
  const legs = trip.legs
    .map((l) => `${l.line} (${l.fromName} -> ${l.toName}, ${formatMin(l.durationMin)}, departs theoriques ${l.sampleDepartures.join("/")})`)
    .join(" puis ");
  return `\n\nITINERAIRE CALCULE PAR LE MOTEUR pour la derniere question : ${trip.origin.name} -> ${trip.destination.name} : ${formatMin(trip.totalMin)} au total (${trip.transfers} correspondance(s)), ${trip.totalDistanceKm} km estimes, via ${legs}. Carbone : ${trip.carbon.tripKg} kg CO2e (ordre de grandeur) contre ${trip.carbon.carKg} kg en voiture. Page detaillee : /train/${trip.origin.key}/${trip.destination.key}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no_key" }, { status: 200 });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter(
      (m): m is ChatMessage =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const lastUser = history[history.length - 1].content;

  try {
    const res = await fetch(MISTRAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        max_tokens: 600,
        temperature: 0.3,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.slice(0, -1),
          { role: "user", content: lastUser + routeContext(lastUser) },
        ],
      }),
    });

    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ error: "no_key" }, { status: 200 });
    }
    if (res.status === 429) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    if (!res.ok) {
      return NextResponse.json({ error: "api_error" }, { status: 502 });
    }

    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content ?? "";
    if (!reply) {
      return NextResponse.json({ error: "api_error" }, { status: 502 });
    }
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "api_error" }, { status: 502 });
  }
}
