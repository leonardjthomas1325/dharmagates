// Refait le modèle du dojo à partir de son tableau Excel, d'un coup :
//   node ceremonies/outils/generer-modele.js chemin/vers/CeremonieZenV2.xlsx
// Écrit ceremonies/modeles/zazen-chaumont-gistoux.js. Le même lecteur (excel.js) sert au bouton
// « Importer » du module, qui accepte aussi un fichier .xlsx.
const fs = require('fs'), path = require('path');
const EXCEL = require('../excel.js');
const source = process.argv[2];
if (!source) { console.error('Indiquez le fichier .xlsx.'); process.exit(1); }
const b = fs.readFileSync(source);
EXCEL.lire(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)).then(classeur => {
  const c = EXCEL.convertir(classeur, {
    id: 'zazen-chaumont-gistoux',
    titre: 'Zazen du soir, dojo de Chaumont-Gistoux',
    resume: 'Deux périodes de zazen séparées par kinhin, puis la cérémonie : Sutra du cœur, ekō, Ji ho san shi, sanpai et salutations. Le tronc commun se complète par des options (A à G).',
    source: 'Usage du dojo zen de Chaumont-Gistoux, d’après son tableau des étapes et des rôles.',
    dureeIndicative: 'Environ 1 h 15',
  });
  const sortie = path.join(__dirname, '..', 'modeles', 'zazen-chaumont-gistoux.js');
  fs.writeFileSync(sortie, '// Modèle « Zazen du soir, dojo de Chaumont-Gistoux ».\n// Fichier fabriqué par outils/generer-modele.js à partir du tableau Excel du dojo : ne pas le modifier à la main.\n// Même format que les fichiers exportés par le module (voir ../FORMAT.md).\n(window.DG_MODELES = window.DG_MODELES || []).push(\n' + JSON.stringify(c, null, 1) + '\n);\n');
  const n = c.etapes.reduce((s, e) => s + e.actions.length, 0), libres = c.etapes.reduce((s, e) => s + e.actions.filter(a => !a.verbe).length, 0);
  console.log(c.etapes.length + ' étapes, ' + n + ' actions (' + libres + ' en texte libre), ' + c.roles.length + ' rôles, ' + (c.options || []).length + ' options, ' + (c.glossaire || []).length + ' termes.');
  for (const e of c.etapes) for (const a of e.actions) if (!a.verbe) console.log('  texte libre : ' + e.moment + ' → ' + a.texte);
});
