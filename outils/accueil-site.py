# Génère l'accueil du site en français (index.html) et en anglais (en/index.html) à partir d'un seul gabarit.
# Le français fait foi : modifier d'abord FR, puis traduire dans EN. Lancer : python3 outils/accueil-site.py
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent

SEAL = '<svg class="seal" viewBox="0 0 200 200" aria-hidden="true"><path d="M 16 12 L 40 8 L 46 14 L 70 7 L 104 12 L 132 6 L 150 10 L 176 8 L 192 16 L 190 40 L 195 64 L 188 98 L 194 128 L 190 150 L 196 172 L 186 193 L 160 188 L 138 194 L 110 189 L 84 195 L 58 188 L 34 194 L 10 190 L 13 164 L 6 138 L 12 110 L 7 82 L 14 56 L 8 32 Z"/><g class="wear"><circle cx="14" cy="40" r="5"/><circle cx="60" cy="196" r="6"/><circle cx="196" cy="88" r="5"/><circle cx="190" cy="180" r="4"/></g><text x="100" y="106" text-anchor="middle" dominant-baseline="central" font-weight="700" font-size="128">門</text></svg>'

# Dessins façon gravure (viewBox 120×120). Classes : s = forme, d = trait (f = fin), h = hachures (l = serrées),
# hole = creux, a = touche rouge du sceau, brush = pinceau. Le rendu est dans site.css.
ICONS = {
  'dojo': '<circle class="a" cx="92" cy="30" r="11"/><path class="s" d="M22 84 L98 84 Q104 84 107 89 L112 99 Q114 104 107 104 L13 104 Q6 104 8 99 L13 89 Q16 84 22 84 Z"/><path class="d" d="M9 104 Q9 110 15 110 L105 110 Q111 110 111 104"/><path class="d" d="M24 89 L96 89"/><path class="s" d="M30 58 Q23 68 30 79 Q40 91 60 91 Q80 91 90 79 Q97 68 90 58 Q80 46 60 46 Q40 46 30 58 Z"/><path class="h" d="M60 69 Q78 68 91 60 Q96 69 90 79 Q80 91 60 91 Z"/><path class="d" d="M29 60 Q60 76 91 60"/><path class="d" d="M38 64 Q34 74 39 84 M48 67 Q45 78 49 89 M60 68 L60 91 M72 67 Q75 78 71 89 M82 64 Q86 74 81 84"/><path class="d f" d="M44 54 Q60 49 76 54"/>',  # zafu sur zabuton, disque rouge
  'roles': '<path class="s" d="M60 44 Q42 46 31 55 Q22 64 18 88 L14 110 L106 110 L102 88 Q98 64 89 55 Q78 46 60 44 Z"/><path class="h l" d="M60 44 Q42 46 31 55 Q22 64 18 88 L14 110 L26 110 Q31 93 45 81 Q58 69 66 53 L60 63 L50 45 Z"/><path class="s" d="M71 45 Q80 47 89 55 Q98 64 102 88 L106 110 L26 110 Q31 93 45 81 Q58 69 66 53 Z"/><path class="d f" d="M74 50 Q66 70 52 84 Q38 97 34 110 M84 53 Q76 78 62 92 Q52 102 50 110 M92 60 Q88 84 76 98 Q70 106 68 110 M99 76 Q96 96 88 110"/><path class="d f" d="M70 62 L88 68 M58 80 L74 88 M82 82 L96 88 M44 94 L58 100 M66 100 L80 106 M90 100 L103 104"/><path class="s" d="M48 45 L60 65 L72 45 L67 43.5 L60 55 L53 43.5 Z"/><path class="d f" d="M51 44.5 L60 60 L69 44.5"/><path class="s" d="M51 89 Q36 86 25 94 L19 112 L47 112 Q49 103 54 98 Z"/><path class="h l" d="M51 89 Q36 86 25 94 L19 112 L47 112 Q49 103 54 98 Z"/><path class="d f" d="M30 96 Q29 104 27 112 M38 91 Q36 102 36 112"/><path class="d" d="M69 89 Q84 88 96 98"/><path class="s" d="M51 98 Q48 83 60 69 Q72 83 69 98 Z"/><path class="d f" d="M60 73 L60 98 M52 93 L68 93"/><circle class="s" cx="60" cy="27" r="14"/><path class="d f" d="M46 28 Q44 31 47 34 M74 28 Q76 31 73 34"/><path class="a" d="M72 55 q4 -3 7 1 q3 4 -1 7 q-4 2 -7 -2 q-2 -3 1 -6 Z"/>',  # moine Sōtō en gasshō : koromo, col blanc, kesa sur l'épaule gauche (sans anneau)
  'instr': '<path class="s" d="M104 60 L110 59 L115 101 L110 102 Z"/><path class="s" d="M95 14 Q101 10 106 13 L112 60 Q107 64 101 61 Z"/><path class="h" d="M95 14 Q101 10 106 13 L112 60 Q107 64 101 61 Z"/><path class="a" d="M10 97 H98 V102 H10 Z M20 102 H88 Q86 107 93 113 H80 Q76 107 66 107 H42 Q32 107 28 113 H15 Q22 107 20 102 Z"/><path class="s" d="M16 86 Q16 77 54 77 Q92 77 92 86 Q93 96 54 97 Q15 96 16 86 Z"/><path class="d f" d="M22 84 Q20 90 24 95 M32 86 Q31 92 33 96.5 M43 87.5 Q42.5 93 43.5 97 M54 88 L54 97 M65 87.5 Q65.5 93 64.5 97 M76 86 Q77 92 75 96.5 M86 84 Q88 90 84 95"/><path class="s" d="M24 40 Q24 32 54 32 Q84 32 84 40 Q87 66 78 78 Q70 87 54 87 Q38 87 30 78 Q21 66 24 40 Z"/><path class="h l" d="M27.5 40 Q27.5 35.5 54 35.5 Q80.5 35.5 80.5 40 Q80.5 45.5 54 45.5 Q27.5 45.5 27.5 40 Z"/><path class="h" d="M64 50 Q76 49 84 43 Q87 66 78 78 Q72 85 62 86.5 Q72 70 64 50 Z"/><path class="d" d="M24 40 Q24 49.5 54 49.5 Q84 49.5 84 40"/><path class="d f" d="M24.5 53 Q54 62.5 83.5 53 M25 57 Q54 66.5 83 57"/>',  # keisu sur coussin et support laqué, bâton gainé
  'chant': '<path class="s" d="M12 97 Q12 87 58 87 Q104 87 104 97 Q104 111 58 111 Q12 111 12 97 Z"/><path class="d f" d="M18 96 Q16 101 20 106 M30 99 Q29 104 31 109 M44 101 L44 110.5 M58 101.5 L58 111 M72 101 L72 110.5 M86 99 Q87 104 85 109 M98 96 Q100 101 96 106"/><path class="s" d="M36 48 Q31 13 58 12 Q85 13 80 48 Z"/><path class="s" d="M21 66 Q21 36 58 34 Q95 36 95 66 Q95 93 58 94 Q21 93 21 66 Z"/><path class="h l" d="M74 37 Q95 44 95 66 Q95 86 78 91.5 Q90 64 74 37 Z"/><path class="hole" d="M46 34.6 Q46 24 58 24 Q70 24 70 34.6 Q58 33.4 46 34.6 Z"/><path class="d f" d="M41 30 Q44 19 54 18 M75 30 Q72 19 62 18"/><path class="d f" d="M36 51 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 M30.5 60 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 M41.5 43 q5.5 -7 11 0 q5.5 -7 11 0 q5.5 -7 11 0"/><path class="hole" d="M29 71 Q58 86 87 71 Q90 66 85 65.5 Q58 77 31 65.5 Q26 66 29 71 Z"/><circle class="hole" cx="30" cy="67.5" r="5"/><circle class="hole" cx="86" cy="67.5" r="5"/><path class="d f" d="M36 80 Q58 90 80 80"/><circle class="a" cx="58" cy="17.5" r="4"/><path class="s" d="M109 6 L114 8.5 L102 42 L97 40 Z"/><circle class="s" cx="98" cy="47" r="8.5"/><path class="h" d="M98 38.5 a8.5 8.5 0 0 1 0 17 a12 12 0 0 0 0 -17 Z"/>',  # mokugyo sur son coussin, mailloche
  'sens': '<path class="s" d="M12 36 L38 25 L38 85 L12 96 Z"/><path class="s" d="M38 25 L64 36 L64 96 L38 85 Z"/><path class="s" d="M64 36 L90 25 L90 85 L64 96 Z"/><path class="s" d="M90 25 L110 33 L110 93 L90 85 Z"/><path class="h" d="M38 25 L64 36 L64 96 L38 85 Z"/><path class="h" d="M90 25 L110 33 L110 93 L90 85 Z"/><path class="d f" d="M19 42 L19 82 M25 39.5 L25 86 M31 37 L31 70 M45 37 L45 82 M51 39.5 L51 88 M57 42 L57 76 M71 42 L71 84 M77 39.5 L77 86 M83 37 L83 66 M96 36 L96 80 M103 39 L103 86"/><path class="a" d="M27 76 L35 72.6 L35 81.6 L27 85 Z"/>',  # livre de sutra en accordéon
  'textes': '<path class="s" d="M26 38 L102 38 Q107 62 102 86 L26 86 Z"/><path class="h" d="M26 38 L40 38 L40 86 L26 86 Z"/><path class="d f" d="M48 46 L48 78 M56 46 L56 70 M64 46 L64 78 M72 46 L72 64 M80 46 L80 78 M88 46 L88 72 M96 46 L96 78"/><path class="s" d="M102 36 Q112 36 112 45 L112 79 Q112 88 102 88 Q106 62 102 36 Z"/><path class="s" d="M19 30 Q11 30 11 37 L11 87 Q11 94 19 94 Q27 94 27 87 L27 37 Q27 30 19 30 Z"/><path class="d f" d="M15 36 L15 88 M23 36 L23 88"/><path class="a" d="M14 21 H24 Q26 21 26 23 V30 H12 V23 Q12 21 14 21 Z M12 94 H26 V101 Q26 103 24 103 H14 Q12 103 12 101 Z"/><path class="d" d="M27 62 Q36 66 34 76 Q32 86 40 92"/>',  # rouleau déroulé
  'reperes': '<path class="s brush" d="M79.5 24.3 L83.1 25.9 L86.5 28.0 L89.7 30.5 L92.6 33.3 L95.2 36.3 L97.6 39.7 L99.6 43.2 L101.2 47.0 L102.5 50.9 L103.4 54.9 L103.9 59.0 L104.0 63.2 L103.7 67.3 L102.9 71.4 L101.8 75.4 L100.3 79.3 L98.5 83.0 L96.3 86.6 L93.7 89.9 L90.8 92.9 L87.7 95.7 L84.3 98.1 L80.7 100.2 L76.9 102.0 L72.9 103.3 L68.9 104.3 L64.8 104.9 L60.6 105.0 L56.5 104.8 L52.4 104.2 L48.4 103.2 L44.5 101.8 L40.8 100.1 L37.3 98.0 L34.0 95.6 L30.9 92.9 L28.1 89.9 L25.7 86.7 L23.5 83.3 L21.8 79.7 L20.3 75.9 L19.2 72.1 L18.6 68.2 L18.2 64.2 L18.3 60.3 L18.7 56.4 L19.5 52.5 L20.7 48.8 L22.2 45.2 L24.0 41.8 L26.1 38.7 L28.5 35.7 L31.1 32.9 L33.9 30.3 L36.9 28.0 L40.1 26.0 L43.5 24.4 L47.1 23.0 L50.7 22.0 L54.4 21.3 L54.9 24.5 L51.4 25.1 L48.1 26.0 L44.8 27.3 L41.7 28.8 L38.8 30.7 L36.0 32.8 L33.4 35.2 L31.1 37.8 L29.2 40.7 L27.6 43.8 L26.3 47.0 L25.2 50.2 L24.5 53.6 L24.1 57.0 L24.0 60.4 L24.2 63.8 L24.7 67.1 L25.6 70.4 L26.7 73.5 L28.1 76.5 L29.8 79.4 L31.8 82.1 L34.0 84.6 L36.4 86.9 L39.0 88.9 L41.7 90.7 L44.6 92.2 L47.7 93.5 L50.8 94.4 L54.0 95.1 L57.2 95.5 L60.5 95.6 L63.7 95.3 L66.9 94.8 L70.1 94.0 L73.1 92.9 L76.1 91.5 L78.9 89.9 L81.6 88.0 L84.0 85.9 L86.3 83.6 L88.4 81.0 L90.2 78.3 L91.8 75.4 L93.1 72.4 L94.1 69.3 L94.9 66.0 L95.3 62.7 L95.5 59.4 L95.4 56.0 L94.9 52.7 L94.1 49.4 L93.1 46.1 L91.7 43.0 L90.1 39.9 L88.2 37.0 L86.0 34.3 L83.6 31.7 L80.9 29.3 L78.0 27.1 Z"/><path class="a" d="M86 92 h12 v12 h-12 Z"/>',  # ensō au pinceau, cachet
}

# Motifs de hachures partagés par tous les dessins (un seul bloc par page)
DEFS = '<svg class="defs" width="0" height="0" aria-hidden="true"><defs><pattern id="hach" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line class="hl" x1="0" y1="0" x2="0" y2="3.2"/></pattern><pattern id="hach2" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-42)"><line class="hl" x1="0" y1="0" x2="0" y2="2.4"/></pattern></defs></svg>'

def embleme(k):
    # Emblème d'une porte : le kanji en rouge dans une fenêtre ronde hachurée
    return f'<span class="embleme" aria-hidden="true"><svg viewBox="0 0 120 120"><circle class="e-h" cx="60" cy="60" r="50"/><circle class="e-r1" cx="60" cy="60" r="55"/><circle class="e-r2" cx="60" cy="60" r="50"/><text x="60" y="62" text-anchor="middle" dominant-baseline="central" lang="ja">{k}</text></svg></span>'

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
    pic = f'<span class="pic" aria-hidden="true"><svg viewBox="0 0 120 120">{ICONS[icon]}</svg></span>'
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
{DEFS}

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
    <!-- Fond d'encre qui remonte derrière l'en-tête, avec l'estrade du dojo en filigrane calée dans le coin haut gauche -->
    <div class="encre" aria-hidden="true"><img src="{r}accueil-dojo.webp" alt="" width="926" height="1463"></div>
    <div class="wrap"><div class="hero-text">
      <p class="eyebrow">{t['eyebrow']}</p>
      <h1>{t['h1']}<span class="jp" lang="ja">曹洞禅の門</span></h1>
      <p class="lead">{t['lead']}</p>
      <a class="cta" href="{t['tool']}"><span class="jp" lang="ja" aria-hidden="true">般若心経</span> {t['cta']} →</a>
    </div></div>
  </div>

  <!-- Deux portes. Une ligne « soon » devient un lien (href) quand sa page est en ligne. -->
  <div class="wrap gates">
    <section class="gate" id="pratiquer" aria-labelledby="g1">
      <header>{embleme('行')}<div><h2 id="g1">{t['g1']}</h2><p>{t['g1d']}</p></div></header>
      <ul>
{item(t,'i_dojo','dojo')}
{item(t,'i_roles','roles')}
{item(t,'i_instr','instr')}
{item(t,'i_chant','chant',t['tool'])}
      </ul>
    </section>
    <section class="gate" id="comprendre" aria-labelledby="g2">
      <header>{embleme('学')}<div><h2 id="g2">{t['g2']}</h2><p>{t['g2d']}</p></div></header>
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
