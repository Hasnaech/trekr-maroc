# Mettre Trekr Maroc en ligne (GitHub Pages, gratuit)

Le site est statique. La publication est automatique a chaque envoi sur `main`.

```bash
gh repo create trekr-maroc --public --source=. --push
```

```bash
gh api -X POST repos/{owner}/trekr-maroc/pages -f build_type=workflow
```

Le site apparait ensuite sur https://<compte>.github.io/trekr-maroc/ une
fois le workflow "Publier le site" termine (onglet Actions).

Aucune variable secrete n'est necessaire. Le fichier .env.local (ancienne
cle Mistral, ancien identifiant GetYourGuide) n'est plus utilise et n'est
jamais envoye sur GitHub (.gitignore).
