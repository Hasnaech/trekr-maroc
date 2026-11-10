import type { MetadataRoute } from "next";
import { allRoutePairs } from "@/lib/router";

/**
 * Sitemap bilingue : pages piliers FR + EN et les axes dans les deux langues.
 * NEXT_PUBLIC_SITE_URL a definir au deploiement.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();
  const pairs = allRoutePairs();

  const staticPaths = ["", "/circuits", "/aeroport", "/2030"];

  return [
    ...staticPaths.map((path) => ({ url: `${base}${path || "/"}`, lastModified: now, priority: path === "" ? 1 : 0.9 })),
    ...staticPaths.map((path) => ({ url: `${base}/en${path}`, lastModified: now, priority: path === "" ? 0.9 : 0.8 })),
    ...pairs.map(({ origin, destination }) => ({
      url: `${base}/train/${origin}/${destination}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...pairs.map(({ origin, destination }) => ({
      url: `${base}/en/train/${origin}/${destination}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
