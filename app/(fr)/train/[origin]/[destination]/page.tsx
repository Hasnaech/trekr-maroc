import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TrainView from "@/components/views/TrainView";
import { findRoute, allRoutePairs, formatMin } from "@/lib/router";

interface Params {
  origin: string;
  destination: string;
}

export function generateStaticParams(): Params[] {
  return allRoutePairs();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { origin, destination } = await params;
  const trip = findRoute(origin, destination);
  if (!trip) return {};
  const direct = trip.transfers === 0 ? "direct" : `${trip.transfers} correspondance${trip.transfers > 1 ? "s" : ""}`;
  return {
    title: `${trip.origin.city} → ${trip.destination.city} en train : ${formatMin(trip.totalMin)}, ${direct}`,
    description: `Itinéraire ${trip.origin.name} vers ${trip.destination.name} : ${formatMin(trip.totalMin)} (${direct}), ${trip.totalDistanceKm} km estimés, lignes ${trip.legs.map((l) => l.line).join(" + ")}. Impact carbone, expériences locales et hébergements à ${trip.destination.city}.`,
    alternates: {
      languages: {
        fr: `/train/${origin}/${destination}`,
        en: `/en/train/${origin}/${destination}`,
      },
    },
  };
}

export default async function TrainRoutePage({ params }: { params: Promise<Params> }) {
  const { origin, destination } = await params;
  const trip = findRoute(origin, destination);
  if (!trip) notFound();
  return <TrainView trip={trip} locale="fr" />;
}
