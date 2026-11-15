# Format d'une cérémonie (version 1)

Une cérémonie est un fichier JSON. Le bouton « Exporter » du module produit ce fichier, « Importer » le relit. Rien n'est envoyé sur un serveur : une cérémonie importée reste dans le navigateur.

```
format        "dharmagates-ceremonie" (obligatoire)
version       1
id            identifiant court, sans espace (obligatoire)
langue        "fr" (structure prête pour d'autres langues)
titre         nom affiché (obligatoire)
resume, source, dureeIndicative   textes libres

phases[]      { id, nom }                       grandes parties, dans l'ordre
fonctions[]   { id, nom }                       ce que fait un rôle, indépendamment de son nom local
roles[]       { id, nom, kanji?, fonctions[], resume, obligatoire?,
                place: { zazen, ceremonie }, tenue?, objets[] }
instruments[] { id, nom, kanji?, description, technique, son? (fichier audio), source }
frappes[]     { id, nom, description }          ex. ken, gatsu, cascade

etapes[]      { id, phase, moment, minute?, actions[], variantes[]? }
  actions[]   { roles[], texte, sons[]?, signal?, optionnel? }
    roles     ids de rôles ; "*" = tous les rôles qui n'ont pas d'autre action à cette étape
    sons[]    { instrument, coups?, frappe?, quand? }
    signal    { role, texte }                   déclencheur : « sur le gasshō du dōshi »
  variantes[] même forme qu'une action          version parallèle d'une étape
```

Règles :

- Les étapes qui se suivent avec le même `moment` sont présentées ensemble.
- `minute` est indicative (0 = début du zazen). Le module n'a pas de minuteur.
- Un même rôle peut avoir plusieurs actions dans une étape, et une action peut concerner plusieurs rôles.
- Le module refuse un fichier sans `format`, `id`, `titre`, `roles` ou `etapes` valides.
