// Produit les pages d'accueil traduites de l'Hannya Shingyō (hannya-shingyo/fr/index.html, etc.)
// à partir de la page anglaise (hannya-shingyo/index.html) et des textes de hannya-shingyo/accueil.js.
// Chaque langue a ainsi sa propre adresse, avec son texte déjà écrit dans le HTML : c'est ce que Google lit.
//
// Usage, depuis la racine du dépôt :  node outils/accueil-langues.mjs
// À relancer après toute modification du texte de l'accueil (index.html ou T dans accueil.js).
// Les langues produites sont celles de ORDER dans accueil.js (sauf l'anglais, qui est la page source).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const DIR = new URL('../hannya-shingyo/', import.meta.url);
const SITE = 'https://dharmagates.eu/hannya-shingyo/';
const LOCALE = { en: 'en_GB', fr: 'fr_FR', it: 'it_IT', es: 'es_ES', de: 'de_DE' };

const js = readFileSync(new URL('accueil.js', DIR), 'utf8');
const T = new Function(js.slice(js.indexOf('const T = {'), js.indexOf('\n};', js.indexOf('const T = {')) + 3) + '\nreturn T;')();
const ORDER = JSON.parse(js.match(/const ORDER = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
const src = readFileSync(new URL('index.html', DIR), 'utf8');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const attr = (html, re, value) => { if (!re.test(html)) throw new Error('introuvable : ' + re); return html.replace(re, `$1${esc(value)}$2`); };

for (const lang of ORDER.filter(l => l !== 'en')){
  const L = T[lang];
  let h = src;
  h = h.replace('<html lang="en">', `<html lang="${lang}">`);
  h = attr(h, /(<title>)[^<]*(<\/title>)/, L.title);
  h = attr(h, /(<meta name="description" content=")[^"]*(")/, L.desc);
  h = attr(h, /(<meta property="og:title" content=")[^"]*(")/, L.title);
  h = attr(h, /(<meta property="og:description" content=")[^"]*(")/, L.desc);
  h = attr(h, /(<link rel="canonical" href=")[^"]*(")/, SITE + lang + '/');
  h = attr(h, /(<meta property="og:url" content=")[^"]*(")/, SITE + lang + '/');
  h = attr(h, /(<meta property="og:locale" content=")[^"]*(")/, LOCALE[lang]);
  // Textes de la page (data-t), libellés (data-t-label), accroche visible
  h = h.replace(/(<(\w+)\b[^>]*\sdata-t="(\w+)"[^>]*>)([^<]*)(<\/\2>)/g, (m, open, tag, key, txt, close) => key in L ? open + esc(L[key]) + close : m);
  h = h.replace(/(\sdata-t-label="(\w+)"[^>]*?\saria-label=")[^"]*(")/g, (m, a, key, b) => a + esc(L[key]) + b);
  h = attr(h, /(<span class="rot" id="tagline" aria-hidden="true">)[^<]*(<\/span>)/, L.tagline);
  h = h.replace('<option value="en" selected>', '<option value="en">').replace(`<option value="${lang}">`, `<option value="${lang}" selected>`);
  // La page est un dossier plus bas : les fichiers voisins sont dans ../ (le logo, lui, ramène à l'accueil de la langue)
  h = h.replace(/(\s(?:href|src)=")(?!https?:|mailto:|#|\/|\.\.\/|\.\/")([^"]+")/g, '$1../$2');
  mkdirSync(new URL(lang + '/', DIR), { recursive: true });
  writeFileSync(new URL(lang + '/index.html', DIR), h);
  console.log(`hannya-shingyo/${lang}/index.html écrite`);
}
