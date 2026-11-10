# Déployer Trekr Maroc sur Vercel (10 minutes, gratuit)

Le produit est 100 % prêt : le build génère toutes les pages sans erreur.
Seules les étapes marquées 👤 demandent une action humaine (compte, login).

## Étape 1 👤 : créer le compte

1. Va sur https://vercel.com/signup
2. Choisis "Continue with Email" (ou GitHub si tu en as un).
3. Plan Hobby (gratuit), largement suffisant.

## Étape 2 : installer l'outil et se connecter

Dans le terminal, DANS le dossier du projet :

```bash
cd "/Users/hasnae/Desktop/carbon 3/trekr-maroc"
npx vercel login
```

👤 Entre ton email, clique le lien de confirmation reçu, reviens au terminal.

## Étape 3 : déployer

```bash
npx vercel --prod
```

Réponds aux questions (les défauts sont bons) :
- Set up and deploy ? → Y
- Which scope ? → ton compte
- Link to existing project ? → N
- Project name ? → trekr-maroc
- Directory ? → ./ (Entrée)
- Modify settings ? → N

À la fin, Vercel affiche l'URL publique (https://trekr-maroc-xxx.vercel.app).

## Étape 4 : les variables d'environnement

Sur https://vercel.com → projet trekr-maroc → Settings → Environment Variables,
ajoute :

| Nom | Valeur |
|---|---|
| NEXT_PUBLIC_GYG_PARTNER_ID | UL7RSD6 |
| NEXT_PUBLIC_SITE_URL | l'URL donnée par Vercel (https://...) |
| MISTRAL_API_KEY | ta clé Mistral (active le concierge IA; la même que dans .env.local) |

Puis relance un déploiement : `npx vercel --prod`.

## Étape 5 : vérifier

- Ouvre l'URL publique : la homepage doit s'afficher.
- Ouvre /sitemap.xml : la liste complète des pages.
- Sur une page trajet, survole "Réserver des expériences" : l'URL doit
  contenir partner_id=UL7RSD6.

## Ensuite (référencement)

1. https://search.google.com/search-console → ajouter la propriété
   (l'URL Vercel), verification automatique via Vercel.
2. Soumettre le sitemap : NEXT_PUBLIC_SITE_URL/sitemap.xml.
3. Les requêtes "X Y en train" commenceront à indexer sous quelques jours.
