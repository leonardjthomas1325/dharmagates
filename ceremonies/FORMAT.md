# Format d'une cérémonie (version 2)

Une cérémonie est un fichier JSON. Le bouton « Exporter » du module produit ce fichier, « Importer » le relit. Rien n'est envoyé sur un serveur : une cérémonie importée reste dans le navigateur.

```
format        "dharmagates-ceremonie" (obligatoire)
version       2 (les fichiers en version 1 restent lisibles)
id            identifiant court, sans espace (obligatoire)
langue        "fr" (structure prête pour d'autres langues)
titre         nom affiché (obligatoire)
resume, source, dureeIndicative   textes libres

phases[]      { id, nom, bref? }                grandes parties, dans l'ordre ; bref = explication simple
fonctions[]   { id, nom }                       ce que fait un rôle, indépendamment de son nom local
roles[]       { id, nom, kanji?, fonctions[], resume, obligatoire?,
                place: { zazen, ceremonie }, tenue?, objets[] }
instruments[] { id, nom, kanji?, description, technique, son? (fichier audio), source }
frappes[]     { id, nom, description }          ex. ken, gatsu, cascade
options[]     { id, nom, description, exclut[]? }   ex. A, B, C ; exclut = options qu'elle remplace
formules[]    { id, nom, options[] }            combinaisons toutes faites (« Courte », « Complète »)
choix[]       { id, nom, defaut, valeurs[{ id, nom }] }   ex. « Qui officie ? »
lieux[], personnes[], objets[]   { id, nom, ou? }   éléments ajoutés aux listes de cases.js
glossaire[]   { terme, categorie, definition }

etapes[]      { id, phase, moment, minute?, option?, actions[], variantes[]? }
    option    id d'une option ; absent = tronc commun
  actions[]   { roles[], texte, sons[]?, signal?, optionnel?,
                verbe?, cible?, lieu?, vers?, maniere?, nombre?, condition?, ref?, si?, auto? }
    verbe     l'action (id de cases.js : allumer, gassho, jouer…) ; absent = texte libre
    cible     l'objet ou la cible, sous la forme "liste:id" ("objets:bougie", "personnes:doshi", "lieux:autel")
    lieu      repère dans le dojo, "lieux:id"
    vers      vers qui (ou vers quoi) le geste est fait, "liste:id" ("personnes:doshi", "lieux:autel")
    maniere   texte court ("mains en shashu") ; nombre : nombre de fois
    condition id d'une condition ("au-besoin"…) ; ref : référence ("GK p. 519")
    si        { choix, est | pas } : l'action ne s'affiche que pour cette valeur du choix
    auto      true si le texte a été fabriqué à partir des cases (il est refait quand une case change)
    roles     ids de rôles ; "*" = tous les rôles qui n'ont pas d'autre action à cette étape
    sons[]    { instrument, coups?, frappe?, motif?, serie?, continu?, quand? }
      serie     série libre de coups, ex. "7 5 3" ; continu : joué pendant toute l'étape
      motif     suite de frappes dans l’ordre, ex. ["ken", "ken", "gatsu"] (brique « Joue du… »)
    signal    { role, texte }                   repère dans le temps : « sur le gasshō du doshi »
  variantes[] même forme qu'une action          version parallèle d'une étape
```

Règles :

- Les étapes qui se suivent avec le même `moment` sont présentées ensemble.
- `minute` est indicative (0 = début du zazen). Le module n'a pas de minuteur.
- Un même rôle peut avoir plusieurs actions dans une étape, et une action peut concerner plusieurs rôles.
- Le module refuse un fichier sans `format`, `id`, `titre`, `roles` ou `etapes` valides.

## Importer un tableau Excel

Le bouton « Importer » accepte aussi un fichier `.xlsx` : rôles en ligne 1, leur résumé en ligne 2, et en ligne 3 les colonnes « Minute », « Ordre », « Option », « Grande phase » et « Moment ». Une étape par ligne. Les options se déclarent après une case « Options : » en ligne 1. Une feuille « Vocabulaire » (terme, catégorie, définition) devient le glossaire. Chaque case est découpée en actions, une par geste (`cases.js`, `excel.js`).

Pour refaire le modèle du dojo d'un coup : `node ceremonies/outils/generer-modele.js chemin/vers/le-tableau.xlsx`.
