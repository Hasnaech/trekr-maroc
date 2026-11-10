/**
 * Adresses du site, lues a la compilation. Aucune n'est secrete.
 * NEXT_PUBLIC_SITE_URL : adresse publique complete, sans barre finale.
 * NEXT_PUBLIC_BASE_PATH : sous-dossier d'hebergement (ex. /trekr-maroc sur GitHub Pages).
 * NEXT_PUBLIC_REPO_URL : depot public du code et des donnees.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/Hasnaech/trekr-maroc";
export const REPORT_URL = `${REPO_URL}/issues/new`;
