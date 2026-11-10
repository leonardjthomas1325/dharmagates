# Hannya Shingyō — version 1.26.0-bêta

Copie de travail préparée le 10/11/2026 à partir de `Zen Archive` (version 1.25.4). L'original n'a pas été modifié.

## Changements
- **Synchro réservée à l'administrateur** (`hannya-shingyo.html`, section « Synchro dans un fichier ») : constante `ADMIN`
  (vraie seulement sur `localhost` / `127.0.0.1`). En ligne : bouton « Synchroniser » masqué, aucune écriture de `synchro.json`,
  `synchro.json` relu à chaque visite (la dernière synchro publiée l'emporte), progression `known` de l'administrateur non reprise.
  En local avec `lancer-hannya.pyw`, rien ne change.
- **Crédits** : mention « usage personnel, ne pas diffuser » retirée des cloches Tierra Zen (décision de Thomas : risque assumé) ;
  crédit de l'image de Kannon (ColBase, TNM C-306) ajouté dans les 5 langues.
- **Mentions légales et vie privée** : nouvelle page `mentions.html`, liée depuis l'accueil et le pied de page de l'outil (libellé traduit).
- **Version** : `1.26.0-bêta` (`version.js`).
- `.nojekyll` pour GitHub Pages.

## 1.26.2-bêta
- Téléphone : le menu du haut (Écouter / Apprendre / Réciter) se retire quand on descend dans le texte, et revient dès qu'on remonte.

## 1.26.1-bêta
- Téléphone (≤ 720 px) : la vignette vidéo (200 × 200 px, minimum imposé par YouTube) et ses commandes tiennent dans une seule bande en bas de l'écran, côte à côte, au lieu d'empiler le menu au-dessus de la vignette. Le texte suivi reste centré au-dessus de la bande.

## Reste à faire avant d'envoyer le lien
- Remplacer `erratum@exemple.org` par l'adresse réelle : `index.html` (constante `ERRATA` et lien `errata`) et `mentions.html` (lien `contact`).
- Créer le dépôt GitHub et activer Pages.
