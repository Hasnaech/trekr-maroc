# Trekr Maroc

Le Maroc en train, guide libre et gratuit. Projet d'utilité publique.

Trekr aide chacun, habitant ou visiteur, à traverser le Maroc en train et en
autocar plutôt qu'en voiture ou en avion : itinéraires entre 12 villes,
correspondances, dernier kilomètre, culture locale et comparaison carbone,
en français et en anglais.

## Engagements

- **Gratuit** : aucun compte, aucune publicité, aucun lien commissionné.
- **Aucun traceur** : pas de cookie, pas de mesure d'audience, pas de serveur.
- **Honnête** : durées indicatives, distances estimées, fréquences
  approximatives, carbone en ordres de grandeur. Aucune heure de départ n'est
  affichée : les horaires réels et les billets sont sur
  [oncf-voyages.ma](https://www.oncf-voyages.ma).
- **Ouvert** : code sous licence MIT, données lisibles dans `lib/`.

Trekr n'est pas un service officiel de l'ONCF, de CTM ou de Supratours.

## Corriger une donnée

Vous avez constaté une erreur sur place (durée, tramway, accès, lieu) ?
Ouvrez un signalement dans l'onglet Issues, ou modifiez directement :

| Fichier | Contenu |
|---|---|
| `lib/network.ts` | gares, liaisons, durées, fréquences, dernier kilomètre |
| `lib/immersion.ts` | culture et cuisine par ville |
| `lib/visitTips.ts` | quand visiter pour éviter la foule |
| `lib/circuits.ts` | circuits en plusieurs étapes |

Règle unique : aucune donnée inventée. Chaque ajout doit être vérifiable.

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # moteur d'itinéraires, toutes les paires
npm run build   # site statique dans out/
```

Le site est 100 % statique (Next.js `output: "export"`). Chaque envoi sur
`main` le teste et le publie sur GitHub Pages (`.github/workflows/pages.yml`).

## Crédits

Photos des villes : Wikimedia Commons, crédits et licences dans
`lib/cityImages.ts` et affichés sur chaque image. Elles ne sont pas couvertes
par la licence MIT du code.
