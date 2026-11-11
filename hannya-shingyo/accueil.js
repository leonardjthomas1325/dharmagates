// Textes de la page d'accueil dans les 5 langues. Chaque langue a sa propre page, au texte déjà écrit dans le HTML
// (anglais : index.html ; français : fr/index.html, produite par outils/accueil-langues.mjs à partir de ces textes).
// desc et title servent aussi au référencement (balises description et Open Graph).
const T = {
  en: {
    desc: 'Learn to chant the Heart Sutra (Hannya Shingyō) in its Sōtō Zen Japanese reading: listen kanji by kanji, recite at the mic and with the bells, free and offline.',
    title: 'Hannya Shingyō · Learn the Heart Sutra by heart',
    tagline: 'The Heart Sutra, to learn by heart.',
    hero: '心無罣礙, shin mu ke ge: “a mind without hindrance”',
    verse: '“A mind without hindrance”',
    intro: 'Chanted every day in Sōtō dojos and temples, the Hannya Shingyō is learned here in its Japanese reading, line after line, to the rhythm of the mokugyo, until the mind carries it without hindrance.',
    langs: 'Choose a language and enter', pageLang: 'Language',
    f1: 'Listen', f1d: 'The recording, with the text highlighted kanji by kanji.',
    f2: 'Chant with the bells', f2d: 'Keisu, mokugyo and shokei where they belong.',
    f3: 'Chant with the mic', f3d: 'Kanji by kanji, with offline recognition.',
    f4: 'Dojo mode', f4d: 'One line at a time, readable in front of the altar.',
    f5: 'Reviews', f5d: 'The lines to review each day, progress by part.',
    ai: 'English, Italian, Spanish and German translations made by AI from the French text, using the vocabulary of the reference Sōtō translations.',
    err: 'Found a mistake in the text or a translation?', errLink: 'Write to the publisher', legal: 'Legal notice and privacy',
    rights: 'All rights reserved.', pub: 'Publisher:', ver: 'Version',
    don: 'DharmaGates is free, ad-free, and will remain so.', donLink: 'Support DharmaGates',
  },
  fr: {
    desc: 'Apprendre à chanter le Sutra du cœur (Hannya Shingyō) dans la lecture japonaise du zen Sōtō : écoute kanji par kanji, récitation au micro et avec les cloches, gratuit et hors ligne.',
    title: 'Hannya Shingyō · Apprendre le Sutra du cœur par cœur',
    tagline: 'Le Sutra du cœur, à apprendre par cœur.',
    hero: '心無罣礙, shin mu ke ge : « l\'esprit sans obstacle »',
    verse: '« L\'esprit sans obstacle »',
    intro: 'Récité chaque jour dans les dojos et les temples Sōtō, le Hannya Shingyō s\'apprend ici dans la lecture japonaise, ligne après ligne, au rythme du mokugyo, jusqu\'à ce que l\'esprit le porte sans obstacle.',
    langs: 'Choisir la langue et entrer', pageLang: 'Langue',
    f1: 'Écouter', f1d: 'L\'enregistrement, le texte surligné kanji par kanji.',
    f2: 'Réciter avec les cloches', f2d: 'Keisu, mokugyo et shokei aux endroits prévus.',
    f3: 'Réciter au micro', f3d: 'Kanji par kanji, reconnaissance hors ligne.',
    f4: 'Mode dojo', f4d: 'Une ligne à la fois, lisible devant l\'autel.',
    f5: 'Révisions', f5d: 'Les lignes à revoir chaque jour, la progression par partie.',
    ai: 'Traductions anglaise, italienne, espagnole et allemande réalisées par IA à partir du texte français, avec le vocabulaire des traductions Sōtō de référence.',
    err: 'Une erreur dans le texte ou une traduction ?', errLink: 'Écrire à l\'éditeur', legal: 'Mentions légales et vie privée',
    rights: 'Tous droits réservés.', pub: 'Éditeur :', ver: 'Version',
    don: 'DharmaGates est gratuit, sans publicité, et le restera.', donLink: 'Soutenir DharmaGates',
  },
  it: {
    desc: 'Imparare a recitare il Sutra del Cuore (Hannya Shingyō) nella lettura giapponese dello zen Sōtō: ascolto kanji per kanji, recitazione al microfono e con le campane, gratuito.',
    title: 'Hannya Shingyō · Imparare a memoria il Sutra del Cuore',
    tagline: 'Il Sutra del Cuore, da imparare a memoria.',
    hero: '心無罣礙, shin mu ke ge: «la mente senza ostacoli»',
    verse: '«La mente senza ostacoli»',
    intro: 'Recitato ogni giorno nei dojo e nei templi Sōtō, l\'Hannya Shingyō si impara qui nella lettura giapponese, riga dopo riga, al ritmo del mokugyo, finché la mente lo porta senza ostacoli.',
    langs: 'Scegli la lingua ed entra', pageLang: 'Lingua',
    f1: 'Ascoltare', f1d: 'La registrazione, con il testo evidenziato kanji per kanji.',
    f2: 'Recitare con le campane', f2d: 'Keisu, mokugyo e shokei nei punti previsti.',
    f3: 'Recitare al microfono', f3d: 'Kanji per kanji, riconoscimento offline.',
    f4: 'Modalità dojo', f4d: 'Una riga alla volta, leggibile davanti all\'altare.',
    f5: 'Ripassi', f5d: 'Le righe da rivedere ogni giorno, i progressi per parte.',
    ai: 'Traduzioni inglese, italiana, spagnola e tedesca realizzate con l\'IA a partire dal testo francese, con il lessico delle traduzioni Sōtō di riferimento.',
    err: 'Un errore nel testo o in una traduzione?', errLink: 'Scrivi all\'editore', legal: 'Note legali e privacy',
    rights: 'Tutti i diritti riservati.', pub: 'Editore:', ver: 'Versione',
    don: 'DharmaGates è gratuito, senza pubblicità, e lo resterà.', donLink: 'Sostieni DharmaGates',
  },
  es: {
    desc: 'Aprender a recitar el Sutra del Corazón (Hannya Shingyō) en la lectura japonesa del zen Sōtō: escucha kanji a kanji, recitación con micrófono y con las campanas, gratis.',
    title: 'Hannya Shingyō · Aprender de memoria el Sutra del Corazón',
    tagline: 'El Sutra del Corazón, para aprender de memoria.',
    hero: '心無罣礙, shin mu ke ge: «la mente sin obstáculos»',
    verse: '«La mente sin obstáculos»',
    intro: 'Recitado cada día en los dojos y templos Sōtō, el Hannya Shingyō se aprende aquí en su lectura japonesa, línea a línea, al ritmo del mokugyo, hasta que la mente lo lleva sin obstáculos.',
    langs: 'Elige el idioma y entra', pageLang: 'Idioma',
    f1: 'Escuchar', f1d: 'La grabación, con el texto resaltado kanji a kanji.',
    f2: 'Recitar con las campanas', f2d: 'Keisu, mokugyo y shokei en su lugar.',
    f3: 'Recitar con micrófono', f3d: 'Kanji a kanji, reconocimiento sin conexión.',
    f4: 'Modo dojo', f4d: 'Una línea cada vez, legible ante el altar.',
    f5: 'Repasos', f5d: 'Las líneas para repasar cada día, el progreso por parte.',
    ai: 'Traducciones al inglés, italiano, español y alemán realizadas con IA a partir del texto francés, con el vocabulario de las traducciones Sōtō de referencia.',
    err: '¿Un error en el texto o en una traducción?', errLink: 'Escribir al editor', legal: 'Aviso legal y privacidad',
    rights: 'Todos los derechos reservados.', pub: 'Editor:', ver: 'Versión',
    don: 'DharmaGates es gratuito, sin publicidad, y lo seguirá siendo.', donLink: 'Apoyar DharmaGates',
  },
  de: {
    desc: 'Das Herz-Sutra (Hannya Shingyō) in der japanischen Lesung des Sōtō-Zen rezitieren lernen: Kanji für Kanji anhören, mit Mikrofon und Glocken üben, kostenlos.',
    title: 'Hannya Shingyō · Das Herz-Sutra auswendig lernen',
    tagline: 'Das Herz-Sutra, zum Auswendiglernen.',
    hero: '心無罣礙, shin mu ke ge: „ein Geist ohne Hindernis“',
    verse: '„Ein Geist ohne Hindernis“',
    intro: 'Täglich in den Sōtō-Dojos und -Tempeln rezitiert, lernt man das Hannya Shingyō hier in der japanischen Lesung, Zeile für Zeile, im Rhythmus des Mokugyo, bis der Geist es ohne Hindernis trägt.',
    langs: 'Sprache wählen und eintreten', pageLang: 'Sprache',
    f1: 'Anhören', f1d: 'Die Aufnahme, der Text Kanji für Kanji markiert.',
    f2: 'Mit den Glocken rezitieren', f2d: 'Keisu, Mokugyo und Shokei an den vorgesehenen Stellen.',
    f3: 'Mit Mikrofon rezitieren', f3d: 'Kanji für Kanji, Offline-Erkennung.',
    f4: 'Dojo-Modus', f4d: 'Eine Zeile auf einmal, lesbar vor dem Altar.',
    f5: 'Wiederholungen', f5d: 'Die täglich fälligen Zeilen, der Fortschritt pro Teil.',
    ai: 'Englische, italienische, spanische und deutsche Übersetzungen mit KI aus dem französischen Text erstellt, mit dem Wortschatz der maßgeblichen Sōtō-Übersetzungen.',
    err: 'Ein Fehler im Text oder in einer Übersetzung?', errLink: 'An den Herausgeber schreiben', legal: 'Impressum und Datenschutz',
    rights: 'Alle Rechte vorbehalten.', pub: 'Herausgeber:', ver: 'Version',
    don: 'DharmaGates ist kostenlos, werbefrei und wird es bleiben.', donLink: 'DharmaGates unterstützen',
  },
};
// Adresse des erratums et du contact
const ERRATA = 'dharmagates.contact@gmail.com';

// Les boutons d'entrée ouvrent l'outil dans leur langue, qui devient aussi celle de l'outil (mémoire commune)
const store = {
  get(k, d){ try { const v = localStorage.getItem('hannya:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v){ try { localStorage.setItem('hannya:' + k, JSON.stringify(v)); } catch {} }
};
function applyLang(lang){
  const L = T[lang];
  document.documentElement.lang = lang;
  document.title = L.title;
  document.querySelectorAll('[data-t]').forEach(e => { e.textContent = L[e.dataset.t]; });
  document.querySelectorAll('[data-t-label]').forEach(e => e.setAttribute('aria-label', L[e.dataset.tLabel]));
  document.querySelectorAll('#langs a').forEach(a => { if (a.dataset.lang === lang) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  document.getElementById('errata').href = `mailto:${ERRATA}?subject=${encodeURIComponent('Hannya Shingyō · erratum (' + lang + ')')}`;
  document.getElementById('pageLang').value = lang;
  showTagline(lang);
}
// L'accroche défile dans les 5 langues, à partir de celle de la page ; immobile si l'animation est réduite
const ORDER = ['en', 'fr'];   // 'it', 'es', 'de' désactivés pour le moment
let tagIdx = 0, tagTimer = 0;
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
function setTagline(lang){ const e = document.getElementById('tagline'); e.textContent = T[lang].tagline; e.lang = lang; }
function showTagline(lang){
  tagIdx = ORDER.indexOf(lang); setTagline(lang);
  clearInterval(tagTimer);
  if (!still) tagTimer = setInterval(nextTagline, 3200);
}
function nextTagline(){
  const e = document.getElementById('tagline');
  e.classList.add('out');
  setTimeout(() => {
    tagIdx = (tagIdx + 1) % ORDER.length; setTagline(ORDER[tagIdx]);
    e.classList.remove('out'); e.classList.add('in');
    void e.offsetWidth;                    // part d'en bas, puis remonte à sa place
    e.classList.remove('in');
  }, 700);
}
// Langue de cette page (anglais à la racine, les autres dans leur dossier : fr/…). Le sélecteur ouvre la page de l'autre langue.
const PAGE = document.documentElement.lang;
const BASE = PAGE === 'en' ? './' : '../';
const home = lang => BASE + (lang === 'en' ? '' : lang + '/');
const q = new URLSearchParams(location.search).get('lang');      // anciens liens en ?lang=fr : vers la page de la langue
if (q && q !== PAGE && ORDER.includes(q)) location.replace(home(q));
applyLang(PAGE);
document.getElementById('pageLang').onchange = e => { location.href = home(e.target.value); };
document.querySelectorAll('#langs a').forEach(a => a.addEventListener('click', () => store.set('lang', a.dataset.lang)));
document.getElementById('version').textContent = window.HANNYA_VERSION || '';

// Le carré jaune passe d'un kanji au suivant toutes les 1,8 s, puis revient au premier ; immobile si l'animation est réduite
const line = document.getElementById('demo'), chips = [...line.querySelectorAll('.syl')], hl = line.querySelector('.hl');
let cur = 0;
function place(){
  const c = chips[cur];
  hl.style.width = c.offsetWidth + 'px'; hl.style.height = c.offsetHeight + 'px';
  hl.style.transform = `translate(${c.offsetLeft}px, ${c.offsetTop}px)`;
  chips.forEach((x, k) => x.classList.toggle('on', k === cur));
}
place();
addEventListener('resize', place);
document.fonts?.ready.then(place);
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => { cur = (cur + 1) % chips.length; place(); }, 1800);
