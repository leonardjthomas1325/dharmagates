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

## 1.29.1-bêta
- Dons activés : `dons.js` pointe vers https://ko-fi.com/dharmagates.

## 1.29.0-bêta
- **Dons (Ko-fi)** : nouvelle adresse unique `dons.js` (`window.DHARMA_DONS`). Tant qu'elle est vide, rien ne s'affiche.
  - Accueil et pied de page de l'outil : une ligne « DharmaGates est gratuit, sans publicité, et le restera. Soutenir DharmaGates ».
  - Outil : après une récitation ou une écoute complète du sutra entier, une invitation calme (« Gasshō. Si cette pratique t'aide… ») apparaît 4 s plus tard, au plus une fois tous les 30 jours. Jamais pendant la pratique, ni en mode dojo ou plein écran.
  - Mentions légales : rubrique « Dons » (libres et sans contrepartie, Ko-fi + Stripe/PayPal, pas d'attestation fiscale).
  - Textes traduits dans les 5 langues.

## 1.27.1-bêta
- Crédits du pied de page repliés sous un petit lien « Crédits et confidentialité » (ils s'ouvrent d'un toucher).

## 1.27.0-bêta
- La bande-son `bande-son.mp3` (5 min 01 s), servie par le site, remplace le lecteur YouTube. Même synchro (synchro.json) ; constante `AUDIO_OFFSET` pour un éventuel décalage. Plus de vignette vidéo : la barre « Lecture / Vitesse / Reprendre » se place comme celles d'Apprendre et de Réciter. Mentions : plus d'appel à YouTube.

## 1.26.12-bêta
- « Commencer à apprendre » sur le sutra entier sans calibrage complet : le calibrage se fait une section à la fois ; à la fin de chaque section, la page propose de calibrer la suivante ou de commencer à apprendre les sections déjà calibrées.

## 1.26.11-bêta
- Italien, espagnol et allemand désactivés pour le moment (accueil et outil) ; seuls français et anglais sont proposés. Les traductions restent dans traductions.js ; une adresse ?lang=it|es|de ouvre la page en français (outil) ou en anglais (accueil).

## 1.26.10-bêta
- Écouter : le gros bouton s'appelle « Commencer à écouter », comme pour Apprendre et Réciter (traduit en 4 langues).

## 1.26.9-bêta
- « Kanji répétés » (coloration des kanji identiques) désactivé par défaut.
- Téléphone : la vidéo est de nouveau intégrée en haut de la page ; sur écran plus large, elle reste en vignette flottante. En plein écran sur téléphone, le bouton de sortie passe en bas à droite pour ne pas recouvrir la vidéo.

## 1.26.8-bêta
- Bouton ⤢ « Agrandir la vidéo » retiré du menu du bas : la vidéo reste toujours en vignette.

## 1.26.7-bêta
- Plein écran : la vignette vidéo (toujours 200 × 200 px) se glisse par une poignée et se range dans le coin le plus proche ; le coin est mémorisé.

## 1.26.6-bêta
- Plein écran : masque aussi les barres flottantes du bas (la vignette YouTube reste visible).
- En changeant de pratique (ex. Apprendre → Écouter), les marques de la précédente sur le texte sont effacées (kanji trouvés, ratés, dévoilés ; lignes réussies ou à revoir). La progression enregistrée n'est pas touchée.

## 1.26.5-bêta
- Le menu du haut ne se retire plus tout seul (retour sur 1.26.2). À la place, un bouton « Plein écran » à côté de « Mode dojo » ne garde que le texte et les barres du bas ; le navigateur passe aussi en plein écran quand il le permet (pas sur iPhone). Un bouton rond en haut à droite permet d'en sortir.

## 1.26.4-bêta
- Avant le tout premier calibrage de la voix : un écran d'explication avec un bouton « On y va » (traduit en 4 langues).

## 1.26.3-bêta
- Kanji du texte agrandis de 25 % (le mode dojo garde sa taille).

## 1.26.2-bêta
- Téléphone : le menu du haut (Écouter / Apprendre / Réciter) se retire quand on descend dans le texte, et revient dès qu'on remonte.

## 1.26.1-bêta
- Téléphone (≤ 720 px) : la vignette vidéo (200 × 200 px, minimum imposé par YouTube) et ses commandes tiennent dans une seule bande en bas de l'écran, côte à côte, au lieu d'empiler le menu au-dessus de la vignette. Le texte suivi reste centré au-dessus de la bande.

## Reste à faire avant d'envoyer le lien
- ~~Remplacer l'adresse provisoire~~ : fait, adresse de contact `dharmagates.contact@gmail.com` (index.html et mentions.html).
- Créer le dépôt GitHub et activer Pages.

## 1.28.0-bêta (11/11/2026)
- **Voix régénérées avec Microsoft Azure AI Speech** : `syllabes.js`, `syllabes-f.js`, `lignes.js`, `lignes-f.js` (Keita et Nanami).
  Les anciennes venaient d'edge-tts (service de lecture d'Edge, hors contrat). Même format : MP3 24 kHz 48 kb/s, syllabes en katakana + « ーー » à −10 %,
  lignes recalées sur la durée visée (`t`), mêmes positions de syllabes (`c`). Script : `Zen Archive\voix-azure\generer_voix_azure.py`.
- **Crédits** : mention « voix de synthèse … Microsoft Azure AI Speech » dans les 5 langues et dans `mentions.html`.

## 1.28.1-bêta (11/11/2026)
- **Crédits et confidentialité** réorganisés en 4 rubriques (Confidentialité, Sons et voix, Image, Traductions), une puce par élément, dans les 5 langues.
