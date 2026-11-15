# Génère l'accueil du site en français (index.html) et en anglais (en/index.html) à partir d'un seul gabarit.
# Le français fait foi : modifier d'abord FR, puis traduire dans EN. Lancer : python3 outils/accueil-site.py
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent

SEAL = '<svg class="seal" viewBox="0 0 200 200" aria-hidden="true"><path d="M 16 12 L 40 8 L 46 14 L 70 7 L 104 12 L 132 6 L 150 10 L 176 8 L 192 16 L 190 40 L 195 64 L 188 98 L 194 128 L 190 150 L 196 172 L 186 193 L 160 188 L 138 194 L 110 189 L 84 195 L 58 188 L 34 194 L 10 190 L 13 164 L 6 138 L 12 110 L 7 82 L 14 56 L 8 32 Z"/><g class="wear"><circle cx="14" cy="40" r="5"/><circle cx="60" cy="196" r="6"/><circle cx="196" cy="88" r="5"/><circle cx="190" cy="180" r="4"/></g><text x="100" y="106" text-anchor="middle" dominant-baseline="central" font-weight="700" font-size="128">門</text></svg>'

# Dessins au trait (viewBox 150×100), la touche rouge = couleur du sceau
ICONS = {
  'dojo': '<path d="M18 78 L132 78 L124 88 L26 88 Z"/><ellipse cx="75" cy="50" rx="34" ry="10"/><path d="M41 50 L41 64 Q75 82 109 64 L109 50"/><circle class="fill" cx="75" cy="22" r="5"/>',  # zafu sur zabuton
  'roles': '<path d="M75 16 Q60 38 61 72 L89 72 Q90 38 75 16 Z"/><path d="M75 22 L75 72"/><path d="M40 86 Q52 70 61 66 M110 86 Q98 70 89 66"/><circle class="fill" cx="75" cy="84" r="4"/>',  # mains en gasshō
  'instr': '<ellipse cx="66" cy="34" rx="34" ry="7"/><path d="M32 34 Q34 70 66 70 Q98 70 100 34"/><path d="M28 80 Q66 70 104 80 Q66 92 28 80 Z"/><path d="M108 22 L130 70"/><ellipse class="fill" cx="106" cy="17" rx="6" ry="7" transform="rotate(-24 106 17)"/>',  # keisu et baguette
  'chant': '<path d="M42 70 Q30 42 60 31 Q92 21 106 46 Q113 64 97 71 Z"/><path d="M52 57 Q76 64 100 55"/><path d="M28 81 Q72 71 116 81 Q72 93 28 81 Z"/><path d="M128 20 L104 44"/><circle class="fill" cx="131" cy="16" r="7"/>',  # mokugyo et maillet
  'sens': '<path d="M20 30 L48 20 L76 30 L104 20 L132 30 L132 82 L104 72 L76 82 L48 72 L20 82 Z"/><path d="M48 20 L48 72 M76 30 L76 82 M104 20 L104 72"/><path d="M30 40 L30 70 M38 37 L38 67 M86 40 L86 70 M94 37 L94 62" opacity=".55"/><rect class="fill" x="56" y="34" width="12" height="12" rx="1.5"/>',  # livre de sutra en accordéon
  'textes': '<path d="M30 22 L30 84 M120 22 L120 84"/><path d="M30 26 L120 26 L120 80 L30 80" /><path d="M46 36 L46 70 M58 36 L58 64 M70 36 L70 70 M82 36 L82 60 M94 36 L94 70 M106 36 L106 66" opacity=".55"/><rect class="fill" x="24" y="16" width="12" height="8" rx="2"/><rect class="fill" x="114" y="16" width="12" height="8" rx="2"/>',  # rouleau déroulé
  'reperes': '<path d="M84 16 A34 34 0 1 1 58 18" stroke-width="5"/><circle class="fill" cx="75" cy="50" r="5"/>',  # ensō
}

FR = dict(
  lang='fr', root='', self='https://dharmagates.eu/', locale='fr_FR',
  title='DharmaGates · Pratiquer et comprendre le zen Sōtō',
  desc="Apprendre les bases du zen Sōtō : les gestes du dojo, les instruments, le chant des textes, et le sens de ces textes, à commencer par le Sutra du cœur (Hannya Shingyō).",
  ogdesc="Les gestes du dojo, les instruments, le chant et le sens des textes, à commencer par le Sutra du cœur.",
  ogalt='Sceau DharmaGates : le kanji 門 (la porte) sur une pierre rouge usée',
  home='DharmaGates, accueil', menu='Menu principal', m1='Pratiquer', m2='Comprendre', don='Soutenir',
  other='en/', otherlabel='EN', otherhl='en', otheraria='English version',
  eyebrow='Zen Sōtō · premiers pas', h1='Les portes du zen Sōtō',
  lead="Se tenir au dojo, reconnaître les instruments, chanter les textes, puis en comprendre le sens. Une porte après l'autre, simplement.",
  cta='Apprendre à chanter le Sutra du cœur', tool='hannya-shingyo/fr/',
  g1='Pratiquer', g1d="Le corps, les gestes et la voix : ce qu'on fait au dojo.",
  g2='Comprendre le zen Sōtō', g2d="Le sens des textes que l'on chante, et d'où ils viennent.",
  soon='Bientôt', ok='Disponible',
  i_dojo=('Le dojo', "Entrer et saluer, zazen, kinhin, gasshō : les gestes expliqués simplement."),
  i_roles=('Les rôles au dojo', "Dōshi, kokyō, jisha, tenzo… qui fait quoi pendant zazen et la cérémonie, et ce qui varie d'un dojo à l'autre."),
  i_instr=('Les instruments', "Mokugyo, keisu, inkin, han, taiko… leur nom, leur rôle et leur son."),
  i_chant=('Chanter le Hannya Shingyō', "Écouter kanji par kanji, réciter avec les cloches ou au micro, mode dojo."),
  i_sens=('Le sens du Sutra du cœur', "Le texte ligne à ligne, ses mots clés et son histoire, avec les sources."),
  i_textes=('Les autres textes', "Sandōkai, Hōkyō zanmai, Fukanzazengi, les quatre grands vœux…"),
  i_reperes=("Repères", "L'école Sōtō, Dōgen et Keizan, en quelques pages."),
  about_t='DharmaGates',
  about1="Un projet éditorial indépendant et gratuit, tenu par un pratiquant du zen Sōtō. Il ne remplace ni un dojo ni un enseignant : il aide à faire ses premiers pas et à réviser chez soi.",
  about2="Les explications s'appuient sur des sources publiées, en priorité académiques, citées en notes.",
  contact="Écrire à l'éditeur", kofi='Soutenir DharmaGates (Ko-fi)', legal='Mentions légales et vie privée',
  copy='© 2026 Thomas Léonard. Tous droits réservés. · Éditeur : DharmaGates',
)
EN = dict(
  lang='en', root='../', self='https://dharmagates.eu/en/', locale='en_US',
  title='DharmaGates · Practising and understanding Sōtō Zen',
  desc="Learn the basics of Sōtō Zen: the forms of the dojo, the instruments, chanting the texts and what they mean, starting with the Heart Sutra (Hannya Shingyō).",
  ogdesc="The forms of the dojo, the instruments, chanting the texts and what they mean, starting with the Heart Sutra.",
  ogalt='DharmaGates seal: the kanji 門 (gate) on worn red stone',
  home='DharmaGates, home', menu='Main menu', m1='Practice', m2='Understand', don='Support',
  other='../', otherlabel='FR', otherhl='fr', otheraria='Version française',
  eyebrow='Sōtō Zen · first steps', h1='The gates of Sōtō Zen',
  lead="How to move in the dojo, the names of the instruments, chanting the texts, then what they mean. One gate after another, simply.",
  cta='Learn to chant the Heart Sutra', tool='../hannya-shingyo/',
  g1='Practice', g1d="Body, gestures and voice: what we do in the dojo.",
  g2='Understanding Sōtō Zen', g2d="What the chanted texts mean, and where they come from.",
  soon='Coming soon', ok='Available',
  i_dojo=('The dojo', "Entering and bowing, zazen, kinhin, gasshō: the forms, simply explained."),
  i_roles=('Roles in the dojo', "Dōshi, kokyō, jisha, tenzo… who does what during zazen and the ceremony, and what varies from one dojo to another."),
  i_instr=('The instruments', "Mokugyo, keisu, inkin, han, taiko… their names, their role and their sound."),
  i_chant=('Chanting the Hannya Shingyō', "Listen kanji by kanji, recite with the bells or into the microphone, dojo mode."),
  i_sens=('The meaning of the Heart Sutra', "The text line by line, its key words and its history, with sources."),
  i_textes=('Other texts', "Sandōkai, Hōkyō zanmai, Fukanzazengi, the Four Great Vows…"),
  i_reperes=("Landmarks", "The Sōtō school, Dōgen and Keizan, in a few pages."),
  about_t='DharmaGates',
  about1="An independent, free publishing project run by a Sōtō Zen practitioner. It does not replace a dojo or a teacher: it helps you take your first steps and practise at home.",
  about2="Explanations rely on published sources, academic ones first, cited in footnotes.",
  contact='Write to the editor', kofi='Support DharmaGates (Ko-fi)', legal='Legal notice and privacy',
  copy='© 2026 Thomas Léonard. All rights reserved. · Publisher: DharmaGates',
)

def item(t, key, icon, href=None):
    title, d = t[key]
    pic = f'<span class="pic" aria-hidden="true"><svg viewBox="0 0 150 100">{ICONS[icon]}</svg></span>'
    body = f'<span class="t"><b>{title}</b><small>{d}</small></span>'
    if href:
        return f'      <li><a class="item" href="{href}">{pic}{body}<span class="go" aria-hidden="true">→</span></a></li>'
    return f'      <li><div class="item soon">{pic}{body}<span class="tag">{t["soon"]}</span></div></li>'

def page(t):
    r = t['root']
    return f'''<!doctype html>
<html lang="{t['lang']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<!-- Généré par outils/accueil-site.py : modifier ce script, pas ce fichier. -->
<title>{t['title']}</title>
<meta name="description" content="{t['desc']}">
<link rel="canonical" href="{t['self']}">
<link rel="alternate" hreflang="fr" href="https://dharmagates.eu/">
<link rel="alternate" hreflang="en" href="https://dharmagates.eu/en/">
<link rel="alternate" hreflang="x-default" href="https://dharmagates.eu/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="DharmaGates">
<meta property="og:title" content="{t['title']}">
<meta property="og:description" content="{t['ogdesc']}">
<meta property="og:url" content="{t['self']}">
<meta property="og:locale" content="{t['locale']}">
<meta property="og:image" content="https://dharmagates.eu/hannya-shingyo/partage.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{t['ogalt']}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{r}hannya-shingyo/favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="{r}hannya-shingyo/hannya.ico">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap">
<link rel="stylesheet" href="{r}site.css">
</head>
<body>

<header class="wrap top">
  <a class="brand" href="./" aria-label="{t['home']}">{SEAL}<span aria-hidden="true">DharmaGates</span></a>
  <nav class="menu" aria-label="{t['menu']}">
    <ul>
      <li><a href="#pratiquer">{t['m1']}</a></li>
      <li><a href="#comprendre">{t['m2']}</a></li>
      <li class="don" data-don hidden><a data-don href="#">{t['don']}</a></li>
      <li class="lang"><a href="{t['other']}" hreflang="{t['otherhl']}" lang="{t['otherhl']}" aria-label="{t['otheraria']}">{t['otherlabel']}</a></li>
    </ul>
  </nav>
</header>

<main>
  <div class="hero">
    <div class="kannon" aria-hidden="true"></div>
    <div class="wrap">
      <p class="eyebrow">{t['eyebrow']}</p>
      <h1>{t['h1']}<span class="jp" lang="ja">曹洞禅の門</span></h1>
      <p class="lead">{t['lead']}</p>
      <a class="cta" href="{t['tool']}"><span class="jp" lang="ja" aria-hidden="true">般若心経</span> {t['cta']} →</a>
    </div>
  </div>

  <!-- Deux portes. Une ligne « soon » devient un lien (href) quand sa page est en ligne. -->
  <div class="wrap gates">
    <section class="gate" id="pratiquer" aria-labelledby="g1">
      <header><span class="kanji" lang="ja" aria-hidden="true">行</span><div><h2 id="g1">{t['g1']}</h2><p>{t['g1d']}</p></div></header>
      <ul>
{item(t,'i_dojo','dojo')}
{item(t,'i_roles','roles')}
{item(t,'i_instr','instr')}
{item(t,'i_chant','chant',t['tool'])}
      </ul>
    </section>
    <section class="gate" id="comprendre" aria-labelledby="g2">
      <header><span class="kanji" lang="ja" aria-hidden="true">学</span><div><h2 id="g2">{t['g2']}</h2><p>{t['g2d']}</p></div></header>
      <ul>
{item(t,'i_sens','sens')}
{item(t,'i_textes','textes')}
{item(t,'i_reperes','reperes')}
      </ul>
    </section>
  </div>

  <section class="wrap about" aria-labelledby="apropos">
    <h2 id="apropos">{t['about_t']}</h2>
    <p>{t['about1']}</p>
    <p>{t['about2']}</p>
  </section>
</main>

<footer class="wrap">
  <ul>
    <li><a href="mailto:dharmagates.contact@gmail.com">{t['contact']}</a></li>
    <li data-don hidden><a data-don href="#">{t['kofi']}</a></li>
    <li><a href="{r}hannya-shingyo/mentions.html">{t['legal']}</a></li>
  </ul>
  <p>{t['copy']}</p>
</footer>

<script src="{r}hannya-shingyo/dons.js"></script>
</body>
</html>
'''

(ROOT / 'index.html').write_text(page(FR), encoding='utf-8')
(ROOT / 'en').mkdir(exist_ok=True)
(ROOT / 'en' / 'index.html').write_text(page(EN), encoding='utf-8')
print('ok')
