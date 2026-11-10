# CLAUDE.md - Trekr Maroc (projet d'utilite publique depuis le 10 novembre 2026)

## Ce que c'est

**Trekr : le Maroc en train, guide libre et gratuit.** Bien commun, pas un
produit commercial. Decision d'Hasnae du 10 novembre 2026 (carte blanche a
Claude) : arreter les pivots, livrer ce qui existe, gratuit et ouvert.

Filtre pour toute nouvelle feature : aide-t-elle reellement quelqu'un a
voyager au Maroc sans voiture ni avion, sans rien inventer ?

## Engagements (affiches sur /mission, ne pas les trahir)

- Gratuit, sans compte, sans publicite, **sans affiliation** (lib/affiliates.ts
  supprime, ne pas le remettre).
- Aucun traceur, aucun serveur : site 100 % statique (output: "export").
  Le concierge Mistral (route API + cle payante non protegee) a ete retire.
- Honnetete : durees indicatives, distances estimees, frequences
  approximatives, carbone en ordres de grandeur. **Aucune heure d'horloge**
  n'est affichee (les horaires ecrits a la main etaient faux) : le fil
  d'ariane est en temps ecoule (+3h05). Horaires reels : oncf-voyages.ma.
- Ouvert : MIT, donnees dans lib/, "Signaler une erreur" vers les Issues.

## Architecture

Next.js 15 (App Router) + TypeScript + Tailwind 4, export statique dans out/.

```
lib/network.ts    gares, coordonnees, liaisons, frequences, dernier km
lib/router.ts     Dijkstra + penalite de correspondance 25 min, temps
                  ecoule, carbone (voiture/avion sur distance a vol d'oiseau)
lib/site.ts       SITE_URL, REPO_URL, REPORT_URL (variables NEXT_PUBLIC_*)
lib/immersion.ts, visitTips.ts, circuits.ts, cityImages.ts, omni.ts, i18n.ts
app/(fr)/ et app/en/   deux layouts RACINE (lang correct du <html>)
  train/[origin]/[destination], circuits, aeroport, 2030, carbone, mission
components/views/CarbonView.tsx   comparateur carbone (idee d'origine de
                  Trekr, dossiers carbon/ et carbon 2/) + gestes du voyageur
tests/engine.test.ts   132 paires, chronologie, carbone
.github/workflows/pages.yml   test + build + GitHub Pages a chaque push
```

## Commandes

```bash
npm run dev     # http://localhost:3000
npm test        # obligatoire avant de dire "termine"
npm run build   # 281 pages statiques dans out/
```

## Contraintes

- Francais dans les textes utilisateur (EN sous /en). Pas de tiret long.
- Aucune donnee inventee, aucun pourcentage CO2 sans source.
- Jamais d'image generee par IA pour un lieu reel (photos Wikimedia creditees).
- next/image : prefixer src avec NEXT_PUBLIC_BASE_PATH (voir CityImage.tsx).
- PIEGE : ne pas lancer `npm run build` pendant `npm run dev` (meme .next).
- Reste connu : alerte npm audit sur postcss embarque dans next (outil de
  build uniquement, pas de serveur en production).

## Prochaines briques (par utilite, pas par revenu)

1. EN LIGNE depuis le 10 novembre 2026 : https://hasnaech.github.io/trekr-maroc/ (chaque push sur main republie). Reste : Search Console + sitemap.
2. Verifier durees et frequences sur oncf-voyages.ma, liaison par liaison.
3. Version arabe / darija des pages (aujourd'hui seule la recherche comprend la darija).
4. Source pour "19,8 millions de visiteurs en 2025" (i18n.ts) ou retrait.
5. Villes manquantes du reseau ONCF (Settat, El Jadida, Safi, Nador, Taza...).
