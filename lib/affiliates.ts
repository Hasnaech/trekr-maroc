/**
 * Liens partenaires (monetisation Trekr Maroc, VISION.md v2/v3).
 * Les liens pointent vers de vraies pages de recherche et fonctionnent
 * sans identifiant. Quand NEXT_PUBLIC_GYG_PARTNER_ID ou
 * NEXT_PUBLIC_BOOKING_AID est configure dans .env.local, le lien
 * devient commissionnable et la mention "lien partenaire" s'affiche.
 * Jamais de fausse transparence.
 */

const GYG_PARTNER_ID = process.env.NEXT_PUBLIC_GYG_PARTNER_ID ?? "";
const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID ?? "";

export const hasAffiliation = (): boolean => Boolean(GYG_PARTNER_ID || BOOKING_AID);

/** Recherche d'activites GetYourGuide pour une ville ou un lieu. */
export function experiencesUrl(query: string): string {
  const u = new URL("https://www.getyourguide.fr/s/");
  u.searchParams.set("q", query);
  if (GYG_PARTNER_ID) u.searchParams.set("partner_id", GYG_PARTNER_ID);
  return u.toString();
}

/** Recherche d'hebergements Booking pour une ville. */
export function staysUrl(city: string): string {
  const u = new URL("https://www.booking.com/searchresults.fr.html");
  u.searchParams.set("ss", city);
  if (BOOKING_AID) u.searchParams.set("aid", BOOKING_AID);
  return u.toString();
}

export const affiliateDisclosure = "Lien partenaire : Trekr peut percevoir une commission, sans surcoût pour vous.";
