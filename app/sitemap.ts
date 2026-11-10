import type { MetadataRoute } from "next";
import { allRoutePairs } from "@/lib/router";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap bilingue : pages piliers FR + EN et les axes dans les deux langues.
 * NEXT_PUBLIC_SITE_URL a definir au deploiement.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();
  const pairs = allRoutePairs();

  const staticPaths = ["", "/circuits", "/aeroport", "/2030", "/carbone", "/mission"];

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
