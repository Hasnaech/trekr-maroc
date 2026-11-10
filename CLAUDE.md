# CLAUDE.md - Trekr Maroc (le produit reparti de zero, juillet 2026)

## Vision

**Trekr est le compagnon de voyage IA du Maroc.** Strategie dans
../VISION.md (v3) et ../PITCH-INSTITUTIONNEL.md. Monetisation par
affiliation (GetYourGuide/Booking), distribution par contenu et SEO
programmatique, alignement institutionnel (feuille de route Tourisme
2030, RAM, Maroc IA 2030, Coupe du Monde 2030).

Filtre pour toute nouvelle feature : augmente-t-elle les clics
affiliation ou l'audience Maroc ?

## Architecture : une seule app, zero backend

Next.js 15 (App Router) + TypeScript + Tailwind 4. Le moteur
d'itineraires est en TypeScript pur, execute au build :

```
lib/network.ts    reseau ONCF (gares, segments, horaires theoriques,
                  lieux phares, dernier km). Donnees publiques verifiables.
lib/router.ts     Dijkstra avec penalite de correspondance, agregation
                  par ligne, carbone en ordres de grandeur, allRoutePairs().
lib/immersion.ts  immersion culturelle et culinaire par ville
                  (Casablanca, Rabat, Marrakech, Fes, Tanger). Reel uniquement.
lib/affiliates.ts liens GetYourGuide/Booking. Identifiants via
                  NEXT_PUBLIC_GYG_PARTNER_ID / NEXT_PUBLIC_BOOKING_AID
                  (.env.local). Mention "lien partenaire" seulement si configure.
app/page.tsx      homepage : hero, scenarios (passager RAM, supporter 2030,
                  culture), picker, axes populaires (liens internes SEO).
app/train/[origin]/[destination]/page.tsx
                  page SEO par axe, pre-generee (generateStaticParams,
                  dynamicParams=false), metadata dynamiques.
```

Pages piliers alignees sur les attentes institutionnelles :
- app/circuits/page.tsx : circuits multi-villes (lib/circuits.ts),
  reponse a la dispersion territoriale de la feuille de route 2030.
- app/aeroport/page.tsx : hub Mohammed V vers tout le pays,
  reponse a l'intermodalite air-rail du contrat-programme RAM.
- app/2030/page.tsx : liaisons entre villes hotes annoncees,
  scenario supporter Coupe du Monde 2030.
- lib/omni.ts + components/OmniSearch.tsx : omni-saisie FR/EN/darija
  (latin et arabe), heuristique locale sans serveur, testee 9/9.
  C'est la brique "AI Made in Morocco" du pitch. Le "l" darija et
  l'elision francaise "l'" sont desambiguises dans normalize().
- app/sitemap.ts : sitemap complet (NEXT_PUBLIC_SITE_URL au deploiement).

140 pages statiques au build. Deployable tel quel sur Vercel/Netlify.

## Commandes

```bash
npm run dev     # developpement, http://localhost:3000
npm run build   # verifie types + genere les 136 pages
```

## Contraintes obligatoires (heritees et confirmees)

- Langue : francais dans tous les textes utilisateur. Pas de tiret long.
- Honnetete absolue : aucune donnee inventee. Durees indicatives ONCF,
  distances estimees, horaires theoriques, carbone en ordres de grandeur,
  tout est etiquete. Les lieux d'immersion sont reels et celebres.
- Design : fond blanc pur / dark OLED noir (prefers-color-scheme),
  accent safran #f39200, marine #1e3a5f, classes .glass .spring
  .card-in .gauge-fill dans app/globals.css, prefers-reduced-motion
  respecte.
- Billets : deep-link vers oncf-voyages.ma, jamais de vente directe.

## Les anciens dossiers (geles, ne pas reinvestir)

- ../eco-travel-frontend-main et ../trekr-api-backend-client-main :
  l'ancienne app France + module Maroc. Conserves comme reference,
  aucune nouvelle feature.
- ../eco-travel-ai-service-main : deprecie, a supprimer.

## Ajouts du 2 juillet 2026 (apres le "go tout")

- **Affiliation active** : NEXT_PUBLIC_GYG_PARTNER_ID=UL7RSD6 dans
  .env.local (GetYourGuide). Booking AID encore a renseigner.
- **i18n FR/EN** : lib/i18n.ts (dictionnaires), app/(fr)/ et app/en/
  (groupes de routes), Chrome.tsx (header/footer localises + switch
  langue), donnees EN dans network.ts/immersion.ts/circuits.ts,
  hreflang alternates, sitemap bilingue. ~560 pages au build.
- **Images reelles** : public/cities/*.jpg (12 villes) telechargees de
  Wikimedia Commons avec verification de licence automatique
  (script conserve dans le scratchpad de session), credits obligatoires
  affiches sur l'image (lib/cityImages.ts), rendu via
  components/CityImage.tsx (repli motif zellige si ville sans photo).
  REGLE : jamais d'image generee par IA pour un lieu reel.
- **Concierge IA ancre** : app/api/concierge/route.ts (API Mistral,
  mistral-small-latest via fetch, choix d'Hasnae le 2 juillet) +
  components/Concierge.tsx (chat flottant). Anti-hallucination :
  repond uniquement depuis les donnees du moteur injectees dans le
  system prompt; parseOmni detecte les villes du message et injecte
  l'itineraire exact calcule. Cle : MISTRAL_API_KEY dans .env.local
  (cote serveur uniquement, jamais NEXT_PUBLIC). Sans cle : repli
  honnete vers l'omni-saisie. Teste en live : trajet FR exact,
  darija comprise.
- **Quand y aller (anti-foule)** : lib/visitTips.ts (FR/EN, 5 villes,
  2 monuments chacune), affiche dans la carte immersion des pages
  trajet et injecte au concierge. REGLE : conseils fondes uniquement
  sur des faits structurels (creneaux de visite, priere du vendredi,
  rythme des groupes), jamais de courbe d'affluence inventee;
  etiquette d'honnetete affichee. Niveau 2 prevu : calendrier
  d'affluence previsible (vacances, Aid, Marhaba). Niveau 3 : API
  mesuree type BestTime quand il y aura du revenu.
- **Pavillon Bleu 2026** : BLUE_FLAG dans lib/network.ts (FR/EN),
  affiche sur la carte hebergement des pages Rabat et Casablanca et
  injecte au concierge. Source : annonce Fondation Mohammed VI
  (38 sites 2026), presse juillet 2026. Ne citer que les plages
  rattachables aux villes couvertes.
- **DEPLOIEMENT.md** : guide Vercel pas a pas.
- PIEGE CONNU : le cache dev webpack (.next) se corrompt apres de
  grosses modifications a chaud ("__webpack_require__.n is not a
  function" / "a[d] is not a function"). Remede : rm -rf .next et
  relancer npm run dev. Le build de production n'est pas affecte.

## Prochaines briques

1. NEXT_PUBLIC_BOOKING_AID dans .env.local (Hasnae).
2. Deploiement Vercel (suivre DEPLOIEMENT.md) + Search Console.
3. Capture email ("recevez l'itineraire complet") sur les pages trajet.
4. Dossiers GO SIYAHA / GITEX avec le produit en ligne comme demo.
