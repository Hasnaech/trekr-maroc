import Image from "next/image";
import { CITY_IMAGES } from "@/lib/cityImages";

/**
 * Bandeau visuel d'une ville : vraie photo Commons (credit affiche)
 * si disponible, sinon motif zellige abstrait aux couleurs de la ville.
 * Jamais de fausse photo d'un lieu reel.
 */

/** Palettes par ville pour le motif de repli (deterministe). */
const PALETTES: Record<string, [string, string]> = {
  marrakech: ["#c2410c", "#f39200"],
  rabat: ["#1e3a5f", "#3c91dc"],
  casa: ["#1e3a5f", "#0e7490"],
  aeroport: ["#334155", "#3c91dc"],
  fes: ["#166534", "#16a34a"],
  tanger: ["#0e7490", "#38bdf8"],
  meknes: ["#7c2d12", "#b45309"],
  oujda: ["#4a044e", "#a21caf"],
  kenitra: ["#065f46", "#10b981"],
  essaouira: ["#1d4ed8", "#60a5fa"],
  ouarzazate: ["#92400e", "#d97706"],
  chefchaouen: ["#1e40af", "#3b82f6"],
};

export default function CityImage({ cityKey, city }: { cityKey: string; city: string }) {
  const info = CITY_IMAGES[cityKey];

  if (info) {
    return (
      <div className="relative h-32 w-full">
        <Image src={info.src} alt={info.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
        <p className="absolute bottom-1 right-2 text-[8px] text-white/75">
          <a href={info.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {info.credit}
          </a>
        </p>
        <p className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow">{city}</p>
      </div>
    );
  }

  // Repli decoratif : motif zellige abstrait, aucune fausse photo.
  const [c1, c2] = PALETTES[cityKey] ?? ["#1e3a5f", "#f39200"];
  return (
    <div className="relative h-24 w-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 200 100" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 10 }).map((_, x) =>
          Array.from({ length: 5 }).map((_, y) => (
            <g key={`${x}-${y}`} transform={`translate(${x * 20 + 10}, ${y * 20 + 10}) rotate(45)`}>
              <rect x="-6" y="-6" width="12" height="12" rx="2" fill="white" />
            </g>
          ))
        )}
      </svg>
      <p className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow">{city}</p>
    </div>
  );
}
