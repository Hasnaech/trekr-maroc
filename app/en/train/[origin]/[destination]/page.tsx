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
  const direct = trip.transfers === 0 ? "direct" : `${trip.transfers} transfer${trip.transfers > 1 ? "s" : ""}`;
  return {
    title: `${trip.origin.city} to ${trip.destination.city} by train: ${formatMin(trip.totalMin)}, ${direct}`,
    description: `Route from ${trip.origin.name} to ${trip.destination.name}: ${formatMin(trip.totalMin)} (${direct}), ${trip.totalDistanceKm} km estimated, lines ${trip.legs.map((l) => l.line).join(" + ")}. Carbon impact, local experiences and stays in ${trip.destination.city}.`,
    alternates: {
      languages: {
        fr: `/train/${origin}/${destination}`,
        en: `/en/train/${origin}/${destination}`,
      },
    },
  };
}

export default async function TrainRoutePageEn({ params }: { params: Promise<Params> }) {
  const { origin, destination } = await params;
  const trip = findRoute(origin, destination);
  if (!trip) notFound();
  return <TrainView trip={trip} locale="en" />;
}
