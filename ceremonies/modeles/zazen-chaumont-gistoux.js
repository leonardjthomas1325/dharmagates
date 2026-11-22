// Modèle « Zazen du soir, dojo de Chaumont-Gistoux ».
// Fichier fabriqué par outils/generer-modele.js à partir du tableau Excel du dojo : ne pas le modifier à la main.
// Même format que les fichiers exportés par le module (voir ../FORMAT.md).
(window.DG_MODELES = window.DG_MODELES || []).push(
{
 "format": "dharmagates-ceremonie",
 "version": 2,
 "id": "zazen-chaumont-gistoux",
 "langue": "fr",
 "titre": "Zazen du soir, dojo de Chaumont-Gistoux",
 "resume": "Deux périodes de zazen séparées par kinhin, puis la cérémonie : Sutra du cœur, ekō, Ji ho san shi, sanpai et salutations. Le tronc commun se complète par des options (A à G).",
 "source": "Usage du dojo zen de Chaumont-Gistoux, d’après son tableau des étapes et des rôles.",
 "dureeIndicative": "Environ 1 h 15",
 "phases": [
  {
   "id": "p1",
   "nom": "Avant le zazen",
   "bref": "On arrive en silence. On entre par la gauche de la porte, pied gauche en premier, on salue l’autel mains jointes et on rejoint sa place. Le moppan appelle au zazen."
  },
  {
   "id": "p2",
   "nom": "Zazen, 1re période",
   "bref": "Première assise, immobile et silencieuse, d’environ trente minutes. Deux coups de petite cloche la ferment."
  },
  {
   "id": "p3",
   "nom": "Kinhin",
   "bref": "On se lève, on salue, puis on marche lentement en file. Un coup de petite cloche y met fin et chacun revient à sa place d’un pas normal."
  },
  {
   "id": "p4",
   "nom": "Zazen, 2e période",
   "bref": "Deuxième assise. Le godo donne l’enseignement oral (kusen). On chante ensemble les quatre vœux, puis un coup de petite cloche clôt le zazen."
  },
  {
   "id": "p5",
   "nom": "Après le zazen",
   "bref": "On se lève lentement et on salue son zafu, puis le rang d’en face."
  },
  {
   "id": "p6",
   "nom": "Cérémonie",
   "bref": "L’inkin annonce la cérémonie. On chante le Sutra du cœur, le kokyo récite l’ekō (la dédicace), puis on chante le Ji ho san shi. On termine debout par trois prosternations et les saluts."
  }
 ],
 "fonctions": [
  {
   "id": "officiant",
   "nom": "Officie et se prosterne"
  },
  {
   "id": "kusen",
   "nom": "Guide la pratique, donne le kusen"
  },
  {
   "id": "kyosaku",
   "nom": "Porte le kyosaku, corrige les postures"
  },
  {
   "id": "shokei-zazen",
   "nom": "Ouvre et ferme le zazen au shōkei"
  },
  {
   "id": "encens",
   "nom": "Prépare et présente l’encens"
  },
  {
   "id": "han",
   "nom": "Frappe le moppan, allume la bougie"
  },
  {
   "id": "inkin",
   "nom": "Joue l’inkin"
  },
  {
   "id": "daikei",
   "nom": "Joue le daikei"
  },
  {
   "id": "shokei-ceremonie",
   "nom": "Joue le shōkei pendant la cérémonie"
  },
  {
   "id": "voix",
   "nom": "Lance les chants, récite l’ekō"
  },
  {
   "id": "mokugyo",
   "nom": "Joue le mokugyo"
  },
  {
   "id": "sangha",
   "nom": "Pratique avec la communauté"
  }
 ],
 "roles": [
  {
   "id": "jisha",
   "nom": "Jisha",
   "kanji": "侍者",
   "fonctions": [
    "encens"
   ],
   "obligatoire": true,
   "resume": "Assistant du godo : prépare l'autel et offre l'encens",
   "place": {
    "zazen": "Face au mur.",
    "ceremonie": "Accompagne le doshi à l’autel."
   },
   "objets": [
    "Charbon et shoko (encens en poudre)",
    "Bâton d’encens",
    "Zafuton de prosternation du doshi"
   ]
  },
  {
   "id": "jikido",
   "nom": "Jikido",
   "kanji": "直堂",
   "fonctions": [
    "han"
   ],
   "obligatoire": true,
   "resume": "Gardien du dojo : frappe le moppan pour appeler au zazen, allume la bougie",
   "place": {
    "zazen": "Face au mur.",
    "ceremonie": "Debout avec la sangha."
   },
   "objets": [
    "Bougie et allumettes",
    "Moppan et son maillet"
   ]
  },
  {
   "id": "shuso",
   "nom": "Shuso",
   "kanji": "首座",
   "fonctions": [
    "shokei-zazen",
    "kyosaku"
   ],
   "obligatoire": true,
   "resume": "Premier moine : ouvre et ferme le zazen avec le shōkei",
   "place": {
    "zazen": "Face à la sangha, à gauche du doshi."
   },
   "objets": [
    "Shōkei et son maillet",
    "Kyosaku"
   ]
  },
  {
   "id": "godo",
   "nom": "Godo",
   "kanji": "後堂",
   "fonctions": [
    "kusen",
    "kyosaku"
   ],
   "resume": "Responsable de la pratique : guide la sangha, donne le kusen, corrige les postures",
   "place": {
    "zazen": "Face à la sangha, à droite du doshi."
   },
   "objets": [
    "Kyosaku"
   ]
  },
  {
   "id": "doshi",
   "nom": "Doshi",
   "kanji": "導師",
   "fonctions": [
    "officiant"
   ],
   "obligatoire": true,
   "resume": "Officiant : préside la cérémonie, fait les offrandes et le sanpai",
   "place": {
    "zazen": "Face à la sangha.",
    "ceremonie": "Sur le zafuton de prosternation, devant l’autel."
   },
   "objets": [
    "Zagu"
   ]
  },
  {
   "id": "inkin",
   "nom": "Inkin",
   "fonctions": [
    "inkin"
   ],
   "obligatoire": true,
   "resume": "Joue l'inkin : marque les déplacements du doshi",
   "place": {
    "zazen": "Face au mur."
   },
   "objets": [
    "Inkin et sa baguette"
   ]
  },
  {
   "id": "doan",
   "nom": "Doan",
   "fonctions": [
    "daikei",
    "shokei-ceremonie"
   ],
   "obligatoire": true,
   "resume": "Joue le daikei + shōkei qui ponctue les chants et la cérémonie",
   "place": {
    "zazen": "Face au mur.",
    "ceremonie": "En seiza devant le daikei."
   },
   "objets": [
    "Daikei et son bâton",
    "Shōkei et son maillet"
   ]
  },
  {
   "id": "kokyo",
   "nom": "Kokyo",
   "fonctions": [
    "voix"
   ],
   "obligatoire": true,
   "resume": "Voix : lance les chants et récite l'ekō",
   "place": {
    "zazen": "Face au mur."
   },
   "objets": []
  },
  {
   "id": "fukudo",
   "nom": "Fukudo",
   "fonctions": [
    "mokugyo"
   ],
   "obligatoire": true,
   "resume": "Joue le mokugyo : donne le rythme du chant",
   "place": {
    "zazen": "Face au mur.",
    "ceremonie": "Devant le mokugyo."
   },
   "objets": [
    "Mokugyo et son maillet"
   ]
  },
  {
   "id": "sangha",
   "nom": "Sangha",
   "fonctions": [
    "sangha"
   ],
   "obligatoire": true,
   "resume": "Communauté des pratiquants : pratique zazen, kinhin, écoute, chante, se prosterne",
   "place": {
    "zazen": "Face au mur.",
    "ceremonie": "Debout en deux rangs."
   },
   "objets": []
  }
 ],
 "instruments": [
  {
   "id": "moppan",
   "nom": "Moppan",
   "kanji": "木版",
   "description": "Planche de bois suspendue, frappée au maillet pour appeler au zazen.",
   "technique": "Frappé avant le zazen en trois séries : sept coups, cinq coups, trois coups.",
   "source": "Tableau du dojo"
  },
  {
   "id": "shokei",
   "nom": "Shōkei",
   "kanji": "小鏧",
   "son": "../hannya-shingyo/shokei-12cm.mp3",
   "description": "Petite cloche en forme de bol ; signale le début et la fin du zazen et accompagne certains passages des chants.",
   "technique": "Se frappe en Ken (coup normal) ou en Gatsu (coup étouffé).",
   "source": "Glossaire sotozen.com ; tableau du dojo"
  },
  {
   "id": "daikei",
   "nom": "Daikei",
   "kanji": "大鏧",
   "son": "../hannya-shingyo/keisu-39cm.mp3",
   "description": "Grande cloche en forme de bol, posée sur un coussin et frappée avec un bâton ; ponctue les chants. Aussi appelée keisu.",
   "technique": "Deux frappes : Ken, le coup normal qu’on laisse résonner, et Gatsu, le coup étouffé.",
   "source": "Glossaire sotozen.com ; tableau du dojo"
  },
  {
   "id": "inkin",
   "nom": "Inkin",
   "kanji": "引鏧",
   "description": "Clochette à main montée sur un manche ; marque les déplacements et les saluts du doshi.",
   "technique": "Un coup à chaque geste du doshi à marquer ; la cascade est une série de coups de plus en plus rapprochés.",
   "source": "Glossaire sotozen.com ; tableau du dojo"
  },
  {
   "id": "mokugyo",
   "nom": "Mokugyo",
   "kanji": "木魚",
   "son": "../hannya-shingyo/mokugyo-papargyris.mp3",
   "description": "« Poisson de bois » : tambour de bois creux frappé au maillet, qui donne le rythme du chant.",
   "technique": "Une frappe par syllabe.",
   "source": "Tableau du dojo"
  }
 ],
 "frappes": [
  {
   "id": "ken",
   "nom": "Ken",
   "description": "Coup normal, qu’on laisse résonner."
  },
  {
   "id": "gatsu",
   "nom": "Gatsu",
   "description": "Coup étouffé."
  },
  {
   "id": "cascade",
   "nom": "Cascade",
   "description": "Série de coups de plus en plus rapprochés."
  }
 ],
 "options": [
  {
   "id": "A",
   "nom": "Option A",
   "description": "Sanpai silencieux de l'officiant"
  },
  {
   "id": "B",
   "nom": "Option B",
   "description": "Offrande d'encens simple, puis trois coups de shōkei"
  },
  {
   "id": "C",
   "nom": "Option C",
   "description": "Kyosaku pendant zazen (prise, ronde, don, rangement)"
  },
  {
   "id": "D",
   "nom": "Option D",
   "description": "Cérémonie complète : encens, sanpai, shoko, sanpai du doshi",
   "exclut": [
    "E"
   ]
  },
  {
   "id": "E",
   "nom": "Option E",
   "description": "Sutra du cœur direct : deux coups d'inkin pour s'asseoir, trois coups de daikei, puis le chant",
   "exclut": [
    "D"
   ]
  },
  {
   "id": "F",
   "nom": "Option F",
   "description": "Déplacements du doshi pendant le Sutra du cœur (shoko, sanpai)"
  },
  {
   "id": "G",
   "nom": "Option G",
   "description": "Shoko du doshi pendant le Ji ho san shi"
  }
 ],
 "formules": [
  {
   "id": "tronc",
   "nom": "Tronc commun",
   "options": []
  },
  {
   "id": "courte",
   "nom": "Courte",
   "options": [
    "B",
    "E"
   ]
  },
  {
   "id": "complete",
   "nom": "Complète",
   "options": [
    "A",
    "C",
    "D"
   ]
  }
 ],
 "choix": [
  {
   "id": "officiant",
   "nom": "Qui officie ?",
   "defaut": "doshi",
   "valeurs": [
    {
     "id": "doshi",
     "nom": "Le doshi"
    },
    {
     "id": "godo",
     "nom": "Le godo"
    }
   ]
  }
 ],
 "glossaire": [
  {
   "terme": "Doshi",
   "categorie": "Rôles",
   "definition": "Officiant : préside la cérémonie, fait les offrandes d'encens et les prosternations (sanpai)."
  },
  {
   "terme": "Godo",
   "categorie": "Rôles",
   "definition": "Responsable de la pratique dans le dojo : guide la sangha, donne le kusen, corrige les postures."
  },
  {
   "terme": "Shuso",
   "categorie": "Rôles",
   "definition": "Premier moine (« premier siège ») : ouvre et ferme le zazen avec le shōkei."
  },
  {
   "terme": "Jisha",
   "categorie": "Rôles",
   "definition": "Assistant de l'officiant : prépare l'autel, porte et tend l'encens."
  },
  {
   "terme": "Jikido",
   "categorie": "Rôles",
   "definition": "Gardien du dojo : frappe le moppan pour appeler au zazen, allume la bougie."
  },
  {
   "terme": "Doan",
   "categorie": "Rôles",
   "definition": "Personne qui joue les cloches (daikei et shōkei) pendant les chants et la cérémonie."
  },
  {
   "terme": "Kokyo",
   "categorie": "Rôles",
   "definition": "Voix : lance les chants et récite seul l'ekō."
  },
  {
   "terme": "Fukudo",
   "categorie": "Rôles",
   "definition": "Personne qui joue le mokugyo et donne le rythme du chant."
  },
  {
   "terme": "Sangha",
   "categorie": "Rôles",
   "definition": "Communauté des pratiquants."
  },
  {
   "terme": "daikei",
   "categorie": "Instruments et objets",
   "definition": "Grande cloche en forme de bol, posée sur un coussin et frappée avec un bâton ; ponctue les chants. Aussi appelée keisu."
  },
  {
   "terme": "shōkei",
   "categorie": "Instruments et objets",
   "definition": "Petite cloche en forme de bol ; signale le début et la fin du zazen et accompagne certains passages des chants."
  },
  {
   "terme": "inkin",
   "categorie": "Instruments et objets",
   "definition": "Clochette à main montée sur un manche ; marque les déplacements et les saluts du doshi."
  },
  {
   "terme": "mokugyo",
   "categorie": "Instruments et objets",
   "definition": "« Poisson de bois » : tambour de bois creux frappé au maillet, qui donne le rythme du chant."
  },
  {
   "terme": "moppan",
   "categorie": "Instruments et objets",
   "definition": "Planche de bois suspendue, frappée au maillet pour appeler au zazen."
  },
  {
   "terme": "kyosaku",
   "categorie": "Instruments et objets",
   "definition": "Bâton plat en bois, appliqué sur l'épaule pendant le zazen pour réveiller l'attention et détendre."
  },
  {
   "terme": "shoko",
   "categorie": "Instruments et objets",
   "definition": "Offrande d'encens en poudre, déposé par pincées sur un charbon ardent ; désigne aussi le brûle-encens utilisé pour cette offrande."
  },
  {
   "terme": "zagu",
   "categorie": "Instruments et objets",
   "definition": "Tissu rectangulaire que le moine ou la nonne porte plié sur le bras et déplie au sol pour se prosterner."
  },
  {
   "terme": "zafu",
   "categorie": "Instruments et objets",
   "definition": "Coussin rond sur lequel on s'assoit pour le zazen."
  },
  {
   "terme": "zafuton",
   "categorie": "Instruments et objets",
   "definition": "Tapis carré rembourré placé sous le zafu ; celui du doshi, devant l'autel, sert aux prosternations."
  },
  {
   "terme": "gasshō",
   "categorie": "Gestes et postures",
   "definition": "Paumes jointes devant le visage, avant-bras à l'horizontale : geste de salut et de respect."
  },
  {
   "terme": "shashu",
   "categorie": "Gestes et postures",
   "definition": "Position des mains debout et en marche : poing gauche fermé sur le pouce, contre la poitrine, recouvert par la main droite."
  },
  {
   "terme": "hokkai jō in",
   "categorie": "Gestes et postures",
   "definition": "Mudra du zazen (« sceau cosmique ») : main gauche posée sur la main droite, paumes vers le haut, pouces qui se touchent légèrement."
  },
  {
   "terme": "pai",
   "categorie": "Gestes et postures",
   "definition": "Prosternation complète : genoux, coudes et front au sol, paumes tournées vers le haut."
  },
  {
   "terme": "sanpai",
   "categorie": "Gestes et postures",
   "definition": "Trois prosternations (pai) successives."
  },
  {
   "terme": "seiza",
   "categorie": "Gestes et postures",
   "definition": "Assise à genoux, fesses sur les talons, dos droit."
  },
  {
   "terme": "zazen",
   "categorie": "Pratique",
   "definition": "Méditation assise, face au mur, immobile et en silence."
  },
  {
   "terme": "kinhin",
   "categorie": "Pratique",
   "definition": "Marche méditative lente, au rythme de la respiration, pratiquée entre deux périodes de zazen."
  },
  {
   "terme": "kusen",
   "categorie": "Pratique",
   "definition": "Enseignement oral donné pendant le zazen."
  },
  {
   "terme": "dojo",
   "categorie": "Pratique",
   "definition": "Lieu de pratique du zazen."
  },
  {
   "terme": "Gyōji kihan",
   "categorie": "Pratique",
   "definition": "Manuel des cérémonies et observances de l'école Sōtō. Les commentaires du tableau citent la traduction anglaise de T. G. Foulk (Standard Observances, 2008)."
  },
  {
   "terme": "Ken",
   "categorie": "Sons",
   "definition": "Coup normal sur la cloche, qu'on laisse résonner."
  },
  {
   "terme": "Gatsu",
   "categorie": "Sons",
   "definition": "Coup étouffé : le son de la cloche est arrêté aussitôt au lieu de résonner."
  },
  {
   "terme": "cascade",
   "categorie": "Sons",
   "definition": "Série de coups de clochette de plus en plus rapprochés (roulement)."
  },
  {
   "terme": "Sutra du cœur",
   "categorie": "Chants et textes",
   "definition": "Maka Hannya Haramita Shingyo : court sutra sur la sagesse et la vacuité, chanté pendant la cérémonie."
  },
  {
   "terme": "KAN",
   "categorie": "Chants et textes",
   "definition": "Première syllabe du Sutra du cœur (« Kan ji zai bo satsu… ») ; repère pour le début du mokugyo."
  },
  {
   "terme": "mantra",
   "categorie": "Chants et textes",
   "definition": "Formule finale du Sutra du cœur : « gya tei gya tei ha ra gya tei hara so gya tei bo ji so wa ka »."
  },
  {
   "terme": "ekō",
   "categorie": "Chants et textes",
   "definition": "Dédicace : texte récité par le Kokyo après le sutra pour dédier les mérites du chant."
  },
  {
   "terme": "Ji ho san shi",
   "categorie": "Chants et textes",
   "definition": "Verset de clôture chanté après l'ekō : hommage à tous les bouddhas des dix directions et des trois temps, aux bodhisattvas et à la grande sagesse."
  },
  {
   "terme": "4 vœux du bodhisattva",
   "categorie": "Chants et textes",
   "definition": "Les quatre grands vœux (sauver tous les êtres, trancher les illusions, étudier les enseignements, réaliser la Voie du Bouddha)."
  },
  {
   "terme": "osaeru",
   "categorie": "Sons",
   "definition": "Terme officiel de l’école Sōtō (押さえる) : étouffer la cloche avec la main. Correspond au coup Gatsu du dojo."
  },
  {
   "terme": "nakkei",
   "categorie": "Sons",
   "definition": "Terme officiel de l’école Sōtō (捺鏧) : coup donné avec le talon du bâton sur la cloche déjà étouffée."
  }
 ],
 "etapes": [
  {
   "id": "l4",
   "phase": "p1",
   "moment": "Appel au zazen : préparation",
   "actions": [
    {
     "roles": [
      "jisha"
     ],
     "texte": "Allume le charbon du shoko",
     "verbe": "allumer",
     "cible": "objets:charbon"
    },
    {
     "roles": [
      "jikido"
     ],
     "texte": "Allume la bougie",
     "verbe": "allumer",
     "cible": "objets:bougie"
    }
   ],
   "minute": -5
  },
  {
   "id": "l5",
   "phase": "p1",
   "moment": "Appel au zazen : moppan",
   "actions": [
    {
     "roles": [
      "jikido"
     ],
     "texte": "Frappe le moppan (7 5 3)",
     "verbe": "jouer",
     "cible": "objets:moppan",
     "sons": [
      {
       "instrument": "moppan",
       "serie": "7 5 3"
      }
     ]
    }
   ]
  },
  {
   "id": "l6",
   "phase": "p1",
   "moment": "Appel au zazen : entrée dans le dojo",
   "actions": [
    {
     "roles": [
      "jisha"
     ],
     "texte": "Attend l'officiant à la porte",
     "verbe": "attendre",
     "cible": "personnes:officiant",
     "lieu": "lieux:porte"
    },
    {
     "roles": [
      "jisha"
     ],
     "texte": "Entre avec lui",
     "verbe": "entrer"
    },
    {
     "roles": [
      "jisha"
     ],
     "texte": "Va à sa place",
     "verbe": "aller",
     "cible": "lieux:sa-place"
    },
    {
     "roles": [
      "jikido"
     ],
     "texte": "Entre comme la sangha, après avoir frappé le moppan",
     "verbe": "entrer",
     "signal": {
      "texte": "après avoir frappé le moppan"
     }
    },
    {
     "roles": [
      "shuso"
     ],
     "texte": "Entre comme la sangha",
     "verbe": "entrer"
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Entre en dernier, pied droit en premier",
     "verbe": "entrer",
     "maniere": "en dernier, pied droit en premier",
     "condition": "si-officie",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Passe devant l'autel",
     "verbe": "aller",
     "cible": "lieux:devant-autel",
     "condition": "si-officie",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Entre comme la sangha",
     "verbe": "entrer",
     "condition": "si-n-officie-pas",
     "si": {
      "choix": "officiant",
      "pas": "godo"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Entre en dernier, pied droit en premier",
     "verbe": "entrer",
     "maniere": "en dernier, pied droit en premier"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Passe devant l'autel",
     "verbe": "aller",
     "cible": "lieux:devant-autel"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Attend l'appel",
     "verbe": "attendre"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Entre au son du moppan",
     "verbe": "entrer",
     "signal": {
      "texte": "au son du moppan"
     }
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Entre par le côté gauche de la porte, pied gauche en premier",
     "verbe": "entrer",
     "cible": "lieux:porte",
     "maniere": "pied gauche en premier"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers l'autel",
     "verbe": "gassho",
     "cible": "lieux:autel"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Passe derrière l'autel si nécessaire",
     "condition": "au-besoin",
     "verbe": "aller",
     "cible": "lieux:derriere-autel"
    }
   ]
  },
  {
   "id": "l7",
   "phase": "p1",
   "moment": "Appel au zazen : saluts à sa place",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō face à sa place (salut aux voisins)",
     "verbe": "gassho",
     "cible": "lieux:sa-place"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Demi-tour par la droite",
     "verbe": "se-tourner",
     "maniere": "par la droite"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers le rang d'en face",
     "verbe": "gassho",
     "cible": "personnes:rang-face"
    }
   ]
  },
  {
   "id": "l9",
   "phase": "p1",
   "moment": "Appel au zazen : assise",
   "actions": [
    {
     "roles": [
      "jisha",
      "jikido",
      "inkin",
      "doan",
      "kokyo",
      "fukudo",
      "sangha"
     ],
     "texte": "S'assoit face au mur",
     "verbe": "s-asseoir",
     "cible": "lieux:face-mur"
    },
    {
     "roles": [
      "shuso"
     ],
     "texte": "S'assoit face à la sangha à gauche du doshi",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "lieu": "lieux:gauche-doshi"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "S'assoit face à la sangha, soit entre le godo et le shuso, soit à droite du shuso",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "lieu": "lieux:entre-godo-shuso"
    }
   ],
   "option": "A"
  },
  {
   "id": "l10",
   "phase": "p1",
   "moment": "Entrée de l'officiant",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Assis face à la sangha, en silence",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "maniere": "assis, en silence"
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Entre en dernier, mains en shashu",
     "verbe": "entrer",
     "maniere": "en dernier, mains en shashu",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Va devant l'autel",
     "verbe": "aller",
     "cible": "lieux:devant-autel",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Entre en dernier, mains en shashu",
     "verbe": "entrer",
     "maniere": "en dernier, mains en shashu",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Va devant l'autel",
     "verbe": "aller",
     "cible": "lieux:devant-autel",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    }
   ],
   "option": "A"
  },
  {
   "id": "l11",
   "phase": "p1",
   "moment": "Offrande de l'encens",
   "actions": [
    {
     "roles": [
      "jisha"
     ],
     "texte": "Tend le bâton d'encens à l'officiant",
     "verbe": "tendre",
     "cible": "objets:baton-encens"
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Gasshō",
     "verbe": "gassho",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Plante l'encens",
     "verbe": "offrir",
     "cible": "objets:encens",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Gasshō",
     "verbe": "gassho",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō",
     "verbe": "gassho",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Plante l'encens",
     "verbe": "offrir",
     "cible": "objets:encens",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō",
     "verbe": "gassho",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    }
   ],
   "option": "A"
  },
  {
   "id": "l12",
   "phase": "p1",
   "moment": "Sanpai",
   "actions": [
    {
     "roles": [
      "godo"
     ],
     "texte": "Déplie son zagu",
     "verbe": "deplier",
     "cible": "objets:zagu",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "3 fois gasshō puis pai, en silence (sans cloche)",
     "verbe": "se-prosterner",
     "nombre": 3,
     "maniere": "en silence",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Replie le zagu",
     "verbe": "replier",
     "cible": "objets:zagu",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Déplie son zagu",
     "verbe": "deplier",
     "cible": "objets:zagu",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "3 fois gasshō puis pai, en silence (sans cloche)",
     "verbe": "se-prosterner",
     "nombre": 3,
     "maniere": "en silence",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Replie le zagu",
     "verbe": "replier",
     "cible": "objets:zagu",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    }
   ],
   "option": "A"
  },
  {
   "id": "l13",
   "phase": "p1",
   "moment": "Salut au Bouddha",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : un coup sur le salut de l'officiant",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le salut de l'officiant"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Gasshō vers le Bouddha",
     "verbe": "gassho",
     "cible": "personnes:bouddha",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō vers le Bouddha",
     "verbe": "gassho",
     "cible": "personnes:bouddha",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    }
   ],
   "option": "A"
  },
  {
   "id": "l14",
   "phase": "p1",
   "moment": "Salut au zafuton",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : un coup sur le salut de l'officiant",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le salut de l'officiant"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Retourne à sa place",
     "verbe": "aller",
     "cible": "lieux:sa-place",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Gasshō vers son zafuton",
     "verbe": "gassho",
     "cible": "objets:zafuton",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Retourne à sa place",
     "verbe": "aller",
     "cible": "lieux:sa-place",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō vers son zafuton",
     "verbe": "gassho",
     "cible": "objets:zafuton",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    }
   ],
   "option": "A"
  },
  {
   "id": "l15",
   "phase": "p1",
   "moment": "Salut à la communauté",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : un coup sur le salut de l'officiant",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le salut de l'officiant"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Se retourne",
     "verbe": "se-tourner",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Gasshō vers la sangha",
     "verbe": "gassho",
     "cible": "personnes:sangha",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "S'assoit face à la sangha à droite du doshi",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "lieu": "lieux:droite-doshi",
     "si": {
      "choix": "officiant",
      "est": "godo"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Se retourne",
     "verbe": "se-tourner",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō vers la sangha",
     "verbe": "gassho",
     "cible": "personnes:sangha",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "S'assoit face à la sangha",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "si": {
      "choix": "officiant",
      "est": "doshi"
     }
    }
   ],
   "option": "A"
  },
  {
   "id": "l18",
   "phase": "p1",
   "moment": "Appel au zazen : assise",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "S'assoit face au mur",
     "verbe": "s-asseoir",
     "cible": "lieux:face-mur"
    },
    {
     "roles": [
      "shuso"
     ],
     "texte": "S'assoit face à la sangha à gauche du doshi",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "lieu": "lieux:gauche-doshi"
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "S'assoit face à la sangha à droite du doshi",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "lieu": "lieux:droite-doshi"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "S'assoit face à la sangha, soit entre le godo et le shuso, soit à droite du shuso",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha",
     "lieu": "lieux:entre-godo-shuso"
    }
   ],
   "option": "B"
  },
  {
   "id": "l19",
   "phase": "p1",
   "moment": "Offrande d'encens simple (avant l'assise)",
   "actions": [
    {
     "roles": [
      "jisha"
     ],
     "texte": "Fait l'offrande de l'encens (ou accompagne le doshi avec l'encens si c'est lui qui la fait)",
     "verbe": "offrir",
     "cible": "objets:encens"
    },
    {
     "roles": [
      "jisha"
     ],
     "texte": "S'assoit face au mur",
     "verbe": "s-asseoir",
     "cible": "lieux:face-mur"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Fait l'offrande de l'encens",
     "condition": "si-jisha-non",
     "verbe": "offrir",
     "cible": "objets:encens"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "S'assoit face à la sangha",
     "verbe": "s-asseoir",
     "cible": "lieux:face-sangha"
    }
   ],
   "option": "B"
  },
  {
   "id": "l20",
   "phase": "p2",
   "moment": "Début période zazen 1 (trois coups)",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : trois coups",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 3
      }
     ],
     "ref": "GK p. 6, 43-44, 512"
    }
   ],
   "minute": 0,
   "option": "B"
  },
  {
   "id": "l22",
   "phase": "p2",
   "moment": "Zazen 1",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Zazen immobile, en silence",
     "verbe": "zazen",
     "maniere": "immobile, en silence"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Corrige les postures",
     "verbe": "corriger",
     "cible": "objets:postures"
    }
   ]
  },
  {
   "id": "l24",
   "phase": "p2",
   "moment": "Prise du kyosaku (après les trois coups)",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Gasshō vers l'autel",
     "verbe": "gassho",
     "cible": "lieux:autel",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Prend le kyosaku",
     "verbe": "prendre",
     "cible": "objets:kyosaku",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Fait un tour de salle",
     "verbe": "marcher",
     "cible": "lieux:salle",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Zazen immobile, en silence",
     "verbe": "zazen",
     "maniere": "immobile, en silence"
    }
   ],
   "option": "C"
  },
  {
   "id": "l25",
   "phase": "p2",
   "moment": "Ronde du kyosaku (pendant toute la période)",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Marche lentement le long des rangs, kyosaku tenu vertical",
     "verbe": "marcher",
     "cible": "lieux:rangs",
     "maniere": "lentement, kyosaku tenu vertical",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Zazen",
     "verbe": "zazen"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Pour demander le kyosaku : gasshō",
     "verbe": "gassho",
     "signal": {
      "texte": "pour demander le kyosaku"
     },
     "ref": "GK p. 6-9, 43, 55"
    }
   ],
   "option": "C"
  },
  {
   "id": "l26",
   "phase": "p2",
   "moment": "Don du kyosaku",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Touche légèrement l'épaule droite",
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Frappe",
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Salue en gasshō",
     "verbe": "saluer",
     "maniere": "en gasshō",
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Gasshō avant et après le coup",
     "verbe": "gassho",
     "signal": {
      "texte": "avant et après le coup"
     },
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    }
   ],
   "option": "C"
  },
  {
   "id": "l27",
   "phase": "p2",
   "moment": "Rangement du kyosaku (avant la cloche)",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Repose le kyosaku",
     "verbe": "reposer",
     "cible": "objets:kyosaku",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Gasshō vers l'autel",
     "verbe": "gassho",
     "cible": "lieux:autel",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Zazen immobile, en silence",
     "verbe": "zazen",
     "maniere": "immobile, en silence"
    }
   ],
   "option": "C"
  },
  {
   "id": "l29",
   "phase": "p2",
   "moment": "Fin période zazen 1",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : deux coups",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 2
      }
     ],
     "ref": "GK p. 6, 43-44, 512"
    }
   ],
   "minute": 30
  },
  {
   "id": "l30",
   "phase": "p3",
   "moment": "Transition vers kinhin",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō assis",
     "verbe": "gassho",
     "maniere": "assis"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Se lève lentement",
     "verbe": "se-lever",
     "maniere": "lentement"
    }
   ]
  },
  {
   "id": "l31",
   "phase": "p3",
   "moment": "Transition vers kinhin",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers son zafu",
     "verbe": "gassho",
     "cible": "objets:zafu"
    }
   ]
  },
  {
   "id": "l32",
   "phase": "p3",
   "moment": "Transition vers kinhin",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers le rang d'en face",
     "verbe": "gassho",
     "cible": "personnes:rang-face"
    }
   ]
  },
  {
   "id": "l34",
   "phase": "p3",
   "moment": "Kinhin",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Kinhin",
     "verbe": "kinhin"
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Corrige les postures",
     "verbe": "corriger",
     "cible": "objets:postures"
    }
   ]
  },
  {
   "id": "l35",
   "phase": "p3",
   "moment": "Fin kinhin",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : un coup",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 1
      }
     ]
    }
   ],
   "minute": 40
  },
  {
   "id": "l36",
   "phase": "p3",
   "moment": "Transition vers zazen 2",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Retour vers son zafu, mains en shashu",
     "verbe": "aller",
     "cible": "objets:zafu",
     "maniere": "mains en shashu"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Marche à vitesse « normale »",
     "verbe": "marcher",
     "maniere": "à vitesse normale"
    }
   ]
  },
  {
   "id": "l37",
   "phase": "p3",
   "moment": "Transition vers zazen 2",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers son zafu",
     "verbe": "gassho",
     "cible": "objets:zafu"
    }
   ]
  },
  {
   "id": "l38",
   "phase": "p3",
   "moment": "Transition vers zazen 2",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers le rang d'en face",
     "verbe": "gassho",
     "cible": "personnes:rang-face"
    }
   ]
  },
  {
   "id": "l39",
   "phase": "p3",
   "moment": "Transition vers zazen 2",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Se met en position zazen",
     "verbe": "s-asseoir"
    }
   ]
  },
  {
   "id": "l40",
   "phase": "p4",
   "moment": "Début période zazen 2",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : trois coups",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 3
      }
     ],
     "ref": "GK p. 6, 43-44, 512"
    }
   ]
  },
  {
   "id": "l41",
   "phase": "p4",
   "moment": "Zazen 2",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Zazen immobile, en silence",
     "verbe": "zazen",
     "maniere": "immobile, en silence"
    },
    {
     "roles": [
      "shuso"
     ],
     "texte": "Corrige les postures",
     "verbe": "corriger",
     "cible": "objets:postures"
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Zazen",
     "verbe": "zazen"
    },
    {
     "roles": [
      "godo"
     ],
     "texte": "Donne le kusen",
     "verbe": "donner",
     "cible": "objets:kusen"
    }
   ]
  },
  {
   "id": "l43",
   "phase": "p4",
   "moment": "Prise du kyosaku (après les trois coups)",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Gasshō vers l'autel",
     "verbe": "gassho",
     "cible": "lieux:autel",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Prend le kyosaku",
     "verbe": "prendre",
     "cible": "objets:kyosaku",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Fait un tour de salle",
     "verbe": "marcher",
     "cible": "lieux:salle",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Zazen immobile, en silence",
     "verbe": "zazen",
     "maniere": "immobile, en silence"
    }
   ],
   "option": "C"
  },
  {
   "id": "l44",
   "phase": "p4",
   "moment": "Ronde du kyosaku (pendant toute la période)",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Marche lentement le long des rangs, kyosaku tenu vertical",
     "verbe": "marcher",
     "cible": "lieux:rangs",
     "maniere": "lentement, kyosaku tenu vertical",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Zazen",
     "verbe": "zazen"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Pour demander le kyosaku : gasshō",
     "verbe": "gassho",
     "signal": {
      "texte": "pour demander le kyosaku"
     },
     "ref": "GK p. 6-9, 43, 55"
    }
   ],
   "option": "C"
  },
  {
   "id": "l45",
   "phase": "p4",
   "moment": "Don du kyosaku",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Touche légèrement l'épaule droite",
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Frappe",
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Salue en gasshō",
     "verbe": "saluer",
     "maniere": "en gasshō",
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Gasshō avant et après le coup",
     "verbe": "gassho",
     "signal": {
      "texte": "avant et après le coup"
     },
     "condition": "au-besoin",
     "ref": "GK p. 6-9, 43, 55"
    }
   ],
   "option": "C"
  },
  {
   "id": "l46",
   "phase": "p4",
   "moment": "Rangement du kyosaku (avant la cloche)",
   "actions": [
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Repose le kyosaku",
     "verbe": "reposer",
     "cible": "objets:kyosaku",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "shuso",
      "godo"
     ],
     "texte": "Gasshō vers l'autel",
     "verbe": "gassho",
     "cible": "lieux:autel",
     "ref": "GK p. 6-9, 43, 55"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Zazen immobile, en silence",
     "verbe": "zazen",
     "maniere": "immobile, en silence"
    }
   ],
   "option": "C"
  },
  {
   "id": "l48",
   "phase": "p4",
   "moment": "4 vœux du bodhisattva (shigu seigan mon)",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Chante en suivant le Kokyo, mains en gasshō",
     "verbe": "chanter",
     "maniere": "en suivant le kokyo, mains en gasshō"
    },
    {
     "roles": [
      "kokyo"
     ],
     "texte": "Lance les 4 vœux",
     "verbe": "entonner",
     "cible": "objets:quatre-voeux"
    }
   ]
  },
  {
   "id": "l49",
   "phase": "p4",
   "moment": "Fin période zazen 2",
   "actions": [
    {
     "roles": [
      "shuso"
     ],
     "texte": "Petite cloche (shōkei) : un coup",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 1
      }
     ],
     "ref": "GK p. 6, 43-44, 512"
    }
   ],
   "minute": 65
  },
  {
   "id": "l50",
   "phase": "p5",
   "moment": "Transition vers cérémonie",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō assis",
     "verbe": "gassho",
     "maniere": "assis"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "Se lève lentement",
     "verbe": "se-lever",
     "maniere": "lentement"
    }
   ]
  },
  {
   "id": "l51",
   "phase": "p5",
   "moment": "Transition vers cérémonie",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers son zafu",
     "verbe": "gassho",
     "cible": "objets:zafu"
    }
   ]
  },
  {
   "id": "l52",
   "phase": "p5",
   "moment": "Transition vers cérémonie",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Gasshō vers le rang d'en face",
     "verbe": "gassho",
     "cible": "personnes:rang-face"
    }
   ]
  },
  {
   "id": "l53",
   "phase": "p6",
   "moment": "Début cérémonie",
   "actions": [
    {
     "roles": [
      "inkin"
     ],
     "texte": "Annonce la cérémonie : clochette (inkin) : deux coups",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 2
      }
     ]
    }
   ]
  },
  {
   "id": "l54",
   "phase": "p6",
   "moment": "Transition vers offrande",
   "actions": [
    {
     "roles": [
      "jisha"
     ],
     "texte": "Aménagement de l'espace du doshi (zafuton)",
     "verbe": "installer"
    },
    {
     "roles": [
      "doan",
      "fukudo"
     ],
     "texte": "Met en place ses instruments",
     "verbe": "installer",
     "cible": "objets:instruments"
    }
   ]
  },
  {
   "id": "l56",
   "phase": "p6",
   "moment": "Transition vers offrande",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Debout, mains en shashu",
     "verbe": "rester",
     "maniere": "debout, mains en shashu"
    }
   ],
   "option": "D"
  },
  {
   "id": "l57",
   "phase": "p6",
   "moment": "Offrande de l'encens",
   "actions": [
    {
     "roles": [
      "jisha"
     ],
     "texte": "Accompagne le doshi",
     "verbe": "accompagner",
     "cible": "personnes:doshi"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Offrande d'encens",
     "verbe": "offrir",
     "cible": "objets:encens"
    }
   ],
   "option": "D"
  },
  {
   "id": "l58",
   "phase": "p6",
   "moment": "Offrande de l'encens",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō",
     "verbe": "gassho"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup sur le gasshō du doshi",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le gasshō du doshi",
      "role": "doshi"
     }
    }
   ],
   "option": "D"
  },
  {
   "id": "l59",
   "phase": "p6",
   "moment": "Transition vers sanpai",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Retourne à son zafuton",
     "verbe": "aller",
     "cible": "objets:zafuton"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup quand le doshi est à la moitié du zafuton",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "quand le doshi est à la moitié du zafuton",
      "role": "doshi"
     }
    }
   ],
   "option": "D"
  },
  {
   "id": "l60",
   "phase": "p6",
   "moment": "Transition vers sanpai",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Fait face à son zafuton",
     "verbe": "se-tourner",
     "cible": "objets:zafuton"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup quand le doshi fait face au zafuton",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "quand le doshi fait face au zafuton",
      "role": "doshi"
     }
    }
   ],
   "option": "D"
  },
  {
   "id": "l61",
   "phase": "p6",
   "moment": "Transition vers sanpai",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Déplie son zagu",
     "verbe": "deplier",
     "cible": "objets:zagu"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : cascade",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "frappe": "cascade"
      }
     ]
    }
   ],
   "option": "D"
  },
  {
   "id": "l62",
   "phase": "p6",
   "moment": "Sanpai",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "3 fois gasshō puis pai en suivant le doshi",
     "verbe": "se-prosterner",
     "nombre": 3,
     "maniere": "en suivant le doshi"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "3 fois gasshō puis pai",
     "verbe": "se-prosterner",
     "nombre": 3
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup à chaque gasshō du doshi",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "à chaque gasshō du doshi",
      "role": "doshi"
     },
     "ref": "GK p. 519"
    }
   ],
   "option": "D"
  },
  {
   "id": "l63",
   "phase": "p6",
   "moment": "Shoko",
   "actions": [
    {
     "roles": [
      "jisha",
      "jikido",
      "shuso",
      "godo",
      "inkin",
      "kokyo",
      "fukudo",
      "sangha"
     ],
     "texte": "Debout, mains en shashu",
     "verbe": "rester",
     "maniere": "debout, mains en shashu"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "S'assoit en seiza",
     "verbe": "s-asseoir",
     "maniere": "en seiza"
    }
   ],
   "option": "D"
  },
  {
   "id": "l64",
   "phase": "p6",
   "moment": "Shoko",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Monte seul pour l'offrande du shoko",
     "verbe": "aller",
     "cible": "objets:shoko",
     "maniere": "seul"
    }
   ],
   "option": "D"
  },
  {
   "id": "l65",
   "phase": "p6",
   "moment": "Shoko",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō au Bouddha",
     "verbe": "gassho",
     "cible": "personnes:bouddha"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coup normal (Ken) au gasshō",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "au gasshō"
     }
    }
   ],
   "option": "D"
  },
  {
   "id": "l66",
   "phase": "p6",
   "moment": "Demande de l'assise",
   "actions": [
    {
     "roles": [
      "doan"
     ],
     "texte": "Demande l'assise : petite cloche (shōkei) : deux coups",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 2
      }
     ]
    }
   ],
   "option": "D"
  },
  {
   "id": "l67",
   "phase": "p6",
   "moment": "Assise",
   "actions": [
    {
     "roles": [
      "jisha",
      "jikido",
      "shuso",
      "godo",
      "inkin",
      "kokyo",
      "fukudo",
      "sangha"
     ],
     "texte": "S'assoit en seiza",
     "verbe": "s-asseoir",
     "maniere": "en seiza"
    }
   ],
   "option": "D"
  },
  {
   "id": "l68",
   "phase": "p6",
   "moment": "Transition vers sanpai",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Redescend faire sanpai",
     "verbe": "se-prosterner",
     "nombre": 3
    }
   ],
   "option": "D"
  },
  {
   "id": "l69",
   "phase": "p6",
   "moment": "Sanpai",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "3 fois gasshō puis pai",
     "verbe": "se-prosterner",
     "nombre": 3
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coup normal (Ken) au 2e gasshō, coup étouffé (Gatsu) au 3e gasshō",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken",
       "coups": 1,
       "quand": "au 2e gasshō"
      },
      {
       "instrument": "daikei",
       "frappe": "gatsu",
       "coups": 1,
       "quand": "au 3e gasshō"
      }
     ]
    }
   ],
   "option": "D"
  },
  {
   "id": "l72",
   "phase": "p6",
   "moment": "Demande de l'assise (version courte)",
   "actions": [
    {
     "roles": [
      "inkin"
     ],
     "texte": "Demande l'assise : clochette (inkin) : deux coups",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 2
      }
     ],
     "ref": "GK p. 13, 519"
    }
   ],
   "option": "E"
  },
  {
   "id": "l73",
   "phase": "p6",
   "moment": "Assise",
   "actions": [
    {
     "roles": [
      "jisha",
      "jikido",
      "shuso",
      "godo",
      "inkin",
      "kokyo",
      "fukudo",
      "sangha"
     ],
     "texte": "S'assoit en seiza",
     "verbe": "s-asseoir",
     "maniere": "en seiza"
    }
   ],
   "option": "E"
  },
  {
   "id": "l74",
   "phase": "p6",
   "moment": "Ouverture directe du sutra",
   "actions": [
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : trois coups, le dernier étouffé (Ken, Ken, Gatsu)",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "motif": [
        "ken",
        "ken",
        "gatsu"
       ],
       "coups": 3
      }
     ],
     "ref": "GK p. 521, 541"
    }
   ],
   "option": "E"
  },
  {
   "id": "l76",
   "phase": "p6",
   "moment": "Chant du sutra du cœur",
   "actions": [
    {
     "roles": [
      "fukudo"
     ],
     "texte": "Mokugyo : donne un coup unique",
     "verbe": "jouer",
     "cible": "objets:mokugyo",
     "sons": [
      {
       "instrument": "mokugyo",
       "coups": 1
      }
     ]
    }
   ]
  },
  {
   "id": "l77",
   "phase": "p6",
   "moment": "Chant du sutra du cœur",
   "actions": [
    {
     "roles": [
      "kokyo"
     ],
     "texte": "Annonce « Maka Hannya Haramita Shingyo »",
     "verbe": "annoncer",
     "cible": "objets:sutra-coeur"
    }
   ]
  },
  {
   "id": "l78",
   "phase": "p6",
   "moment": "Chant du sutra du cœur",
   "actions": [
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coup normal (Ken) marque le début du chant",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "marque le début du chant"
     }
    }
   ]
  },
  {
   "id": "l79",
   "phase": "p6",
   "moment": "Chant du sutra du cœur",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Chante en suivant le Kokyo, mains en hokkai jō in",
     "verbe": "chanter",
     "maniere": "en suivant le kokyo, mains en hokkai jō in",
     "ref": "GK p. 534"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coups normaux (Ken) qui ponctuent le chant",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken"
      }
     ],
     "signal": {
      "texte": "qui ponctuent le chant"
     },
     "ref": "GK p. 541-542"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Petite cloche (shōkei) : pour le mantra",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei"
      }
     ],
     "signal": {
      "texte": "pour le mantra"
     },
     "ref": "GK p. 541-542"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coup étouffé (Gatsu) pour clôturer",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "gatsu",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "pour clôturer"
     }
    },
    {
     "roles": [
      "kokyo"
     ],
     "texte": "Entonne le titre, mains en gasshō",
     "verbe": "entonner",
     "cible": "objets:titre",
     "maniere": "mains en gasshō",
     "ref": "GK p. 529"
    },
    {
     "roles": [
      "kokyo"
     ],
     "texte": "Mène le chant, mains en hokkai jō in à partir du premier coup de daikei (« go »)",
     "verbe": "chanter",
     "cible": "objets:chant",
     "maniere": "mains en hokkai jō in",
     "signal": {
      "texte": "à partir du premier coup de daikei (« go »)"
     },
     "ref": "GK p. 534"
    },
    {
     "roles": [
      "kokyo"
     ],
     "texte": "Revient en gasshō au premier coup de shōkei (après « gya tei gya tei »)",
     "verbe": "gassho",
     "maniere": "en gasshō",
     "signal": {
      "texte": "au premier coup de shōkei (après « gya tei gya tei »)"
     }
    },
    {
     "roles": [
      "fukudo"
     ],
     "texte": "Mokugyo : donne le rythme, débute après le KAN, ne frappe pas l'avant-dernier mot",
     "verbe": "jouer",
     "cible": "objets:mokugyo",
     "sons": [
      {
       "instrument": "mokugyo",
       "continu": true,
       "quand": "débute après le KAN ; ne frappe pas l'avant-dernier mot"
      }
     ]
    }
   ]
  },
  {
   "id": "l81",
   "phase": "p6",
   "moment": "Avant le chant",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Reste debout devant son zafuton (au lieu de s'asseoir en seiza)",
     "verbe": "rester",
     "cible": "lieux:devant-zafuton",
     "maniere": "debout",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Assise en seiza",
     "verbe": "s-asseoir",
     "maniere": "en seiza"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Seul le doshi se déplace et se prosterne"
    }
   ],
   "option": "F"
  },
  {
   "id": "l82",
   "phase": "p6",
   "moment": "1er coup de daikei (« go on kai kū do »)",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Monte à l'autel",
     "verbe": "aller",
     "cible": "lieux:autel",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Offre le shoko",
     "verbe": "offrir",
     "cible": "objets:shoko",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō",
     "verbe": "gassho",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Redescend à son zafuton",
     "verbe": "aller",
     "cible": "objets:zafuton",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Fait sanpai (3 pai) pendant le chant",
     "verbe": "se-prosterner",
     "nombre": 3,
     "signal": {
      "texte": "pendant le chant"
     },
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coup normal (Ken) à « go »",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "à « go »"
     },
     "ref": "GK p. 541-542"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Continue de chanter, sans se prosterner",
     "verbe": "chanter"
    }
   ],
   "option": "F"
  },
  {
   "id": "l83",
   "phase": "p6",
   "moment": "2e coup de daikei (« ko shin mu kei ge »)",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Remonte à l'autel",
     "verbe": "aller",
     "cible": "lieux:autel",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Offre le shoko",
     "verbe": "offrir",
     "cible": "objets:shoko",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coup normal (Ken) à « ko (shin mu…) »",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "à « ko (shin mu…) »"
     },
     "ref": "GK p. 541-542"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Continue de chanter",
     "verbe": "chanter"
    }
   ],
   "option": "F"
  },
  {
   "id": "l84",
   "phase": "p6",
   "moment": "3e coup de daikei (« ko toku a noku ta ra »)",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō après l'offrande",
     "verbe": "gassho",
     "signal": {
      "texte": "après l'offrande"
     },
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Redescend à son zafuton",
     "verbe": "aller",
     "cible": "objets:zafuton",
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Reste debout (ou s'assoit en seiza) jusqu'à la fin du chant",
     "verbe": "rester",
     "maniere": "debout",
     "signal": {
      "texte": "jusqu'à la fin du chant"
     },
     "ref": "GK p. 71"
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coup normal (Ken) sur le gasshō du doshi après l'offrande, à « ko (toku a…) »",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le gasshō du doshi après l'offrande, à « ko (toku a…) »",
      "role": "doshi"
     },
     "ref": "GK p. 541-542"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Continue de chanter",
     "verbe": "chanter"
    }
   ],
   "option": "F"
  },
  {
   "id": "l86",
   "phase": "p6",
   "moment": "Ekō",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "En silence, mains en hokkai jō in",
     "verbe": "rester",
     "maniere": "en silence, mains en hokkai jō in"
    },
    {
     "roles": [
      "*"
     ],
     "texte": "S'incline en gasshō entre les deux coups de shōkei",
     "verbe": "saluer",
     "maniere": "en gasshō",
     "signal": {
      "texte": "entre les deux coups de shōkei"
     }
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Petite cloche (shōkei) : un coup pour s'incliner, un coup pour se redresser",
     "verbe": "jouer",
     "cible": "objets:shokei",
     "sons": [
      {
       "instrument": "shokei",
       "coups": 1,
       "quand": "pour s'incliner"
      },
      {
       "instrument": "shokei",
       "coups": 1,
       "quand": "pour se redresser"
      }
     ]
    },
    {
     "roles": [
      "kokyo"
     ],
     "texte": "Récite seul l'ekō, mains en gasshō",
     "verbe": "reciter",
     "cible": "objets:eko",
     "maniere": "seul, mains en gasshō",
     "ref": "GK p. 576"
    }
   ]
  },
  {
   "id": "l87",
   "phase": "p6",
   "moment": "Ji ho san shi",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Chante en suivant le Kokyo, mains en gasshō",
     "verbe": "chanter",
     "maniere": "en suivant le kokyo, mains en gasshō"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Chante en suivant le Kokyo",
     "verbe": "chanter",
     "maniere": "en suivant le kokyo"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : cascade à la fin de la deuxième phrase",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "frappe": "cascade"
      }
     ],
     "signal": {
      "texte": "à la fin de la deuxième phrase"
     }
    },
    {
     "roles": [
      "doan"
     ],
     "texte": "Cloche (daikei) : coups normaux (Ken) qui ponctuent le Ji ho san shi",
     "verbe": "jouer",
     "cible": "objets:daikei",
     "sons": [
      {
       "instrument": "daikei",
       "frappe": "ken"
      }
     ],
     "signal": {
      "texte": "qui ponctuent le Ji ho san shi"
     }
    },
    {
     "roles": [
      "kokyo"
     ],
     "texte": "Entonne le chant",
     "verbe": "entonner",
     "cible": "objets:chant"
    }
   ]
  },
  {
   "id": "l89",
   "phase": "p6",
   "moment": "Pendant les versets du Ji ho san shi",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Monte à l'autel",
     "verbe": "aller",
     "cible": "lieux:autel"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Offre le shoko",
     "verbe": "offrir",
     "cible": "objets:shoko"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Se lève en même temps que le doshi",
     "verbe": "se-lever",
     "signal": {
      "texte": "en même temps que le doshi",
      "role": "doshi"
     }
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Continue de chanter",
     "verbe": "chanter"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Continue de chanter, mains en hokkai jō in",
     "verbe": "chanter",
     "maniere": "mains en hokkai jō in"
    }
   ],
   "option": "G"
  },
  {
   "id": "l90",
   "phase": "p6",
   "moment": "Fin du dernier verset : gasshō du doshi après l'offrande",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Gasshō vers le Bouddha après l'offrande",
     "verbe": "gassho",
     "cible": "personnes:bouddha",
     "signal": {
      "texte": "après l'offrande"
     }
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup sur le gasshō du doshi",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le gasshō du doshi",
      "role": "doshi"
     }
    }
   ],
   "option": "G"
  },
  {
   "id": "l91",
   "phase": "p6",
   "moment": "Retour du doshi",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Redescend à son zafuton",
     "verbe": "aller",
     "cible": "objets:zafuton"
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Se lève quand le doshi redescend",
     "verbe": "se-lever",
     "signal": {
      "texte": "quand le doshi redescend",
      "role": "doshi"
     }
    },
    {
     "roles": [
      "sangha"
     ],
     "texte": "Sanpai final",
     "verbe": "se-prosterner",
     "nombre": 3
    }
   ],
   "option": "G"
  },
  {
   "id": "l93",
   "phase": "p6",
   "moment": "Transition vers sanpai",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Tout le monde se lève, mains en shashu",
     "verbe": "se-lever",
     "maniere": "mains en shashu"
    }
   ]
  },
  {
   "id": "l94",
   "phase": "p6",
   "moment": "Sanpai",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "3 fois gasshō puis pai en suivant le doshi",
     "verbe": "se-prosterner",
     "nombre": 3,
     "maniere": "en suivant le doshi"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "3 fois gasshō puis pai",
     "verbe": "se-prosterner",
     "nombre": 3
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup à chaque gasshō du doshi",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "à chaque gasshō du doshi",
      "role": "doshi"
     },
     "ref": "GK p. 519"
    }
   ]
  },
  {
   "id": "l95",
   "phase": "p6",
   "moment": "Salutation finale",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Fait gasshō vers le Bouddha",
     "verbe": "gassho",
     "cible": "personnes:bouddha"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup sur le gasshō du doshi",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le gasshō du doshi",
      "role": "doshi"
     }
    }
   ]
  },
  {
   "id": "l96",
   "phase": "p6",
   "moment": "Salutation finale",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "Fait une salutation en shashu vers le doshi",
     "verbe": "saluer",
     "cible": "personnes:doshi",
     "maniere": "en shashu"
    },
    {
     "roles": [
      "doshi"
     ],
     "texte": "Fait une salutation en shashu vers la sangha",
     "verbe": "saluer",
     "cible": "personnes:sangha",
     "maniere": "en shashu"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup sur la salutation du doshi",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur la salutation du doshi",
      "role": "doshi"
     }
    }
   ]
  },
  {
   "id": "l97",
   "phase": "p6",
   "moment": "Salutation finale",
   "actions": [
    {
     "roles": [
      "doshi"
     ],
     "texte": "Fait gasshō vers l'inkin",
     "verbe": "gassho",
     "cible": "personnes:joueur-inkin"
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Clochette (inkin) : un coup sur le gasshō du doshi",
     "verbe": "jouer",
     "cible": "objets:inkin",
     "sons": [
      {
       "instrument": "inkin",
       "coups": 1
      }
     ],
     "signal": {
      "texte": "sur le gasshō du doshi",
      "role": "doshi"
     }
    },
    {
     "roles": [
      "inkin"
     ],
     "texte": "Fait gasshō vers le doshi",
     "verbe": "gassho",
     "cible": "personnes:doshi"
    }
   ]
  },
  {
   "id": "l98",
   "phase": "p6",
   "moment": "Fin cérémonie",
   "actions": [
    {
     "roles": [
      "*"
     ],
     "texte": "On se souhaite bonne soirée, bonne journée, ou …"
    }
   ]
  }
 ]
}
);
