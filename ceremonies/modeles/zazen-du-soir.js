// Cérémonie modèle « Zazen du soir », reprise du tableau ceremoniezenv2.xlsx de Thomas.
// Même format que les fichiers exportés par le module (voir ../FORMAT.md).
// Dans "roles" d'une action, "*" veut dire : tous les rôles qui n'ont pas d'autre action à cette étape.
(window.DG_MODELES = window.DG_MODELES || []).push({
  "format": "dharmagates-ceremonie",
  "version": 1,
  "id": "zazen-du-soir",
  "langue": "fr",
  "titre": "Zazen du soir",
  "resume": "Deux périodes de zazen séparées par kinhin, puis la cérémonie : offrande d'encens, sanpai, shoko, Hannya Shingyō, ekō, Ji ho san shi et salutations.",
  "source": "Usage d'un dojo sōtō européen (dojo de l'éditeur), d'après son tableau des étapes et des rôles.",
  "dureeIndicative": "Environ 1 h 15",
  "phases": [
    { "id": "avant", "nom": "Avant le zazen" , "bref": "On arrive en silence et on laisse ses chaussures à l'entrée. On entre par la gauche de la porte, pied gauche en premier, on salue l'autel mains jointes et on rejoint sa place. Le moppan appelle au zazen : chacun s'assoit face au mur." },
    { "id": "zazen1", "nom": "Zazen, 1re période" , "bref": "Première assise, immobile et silencieuse, d'environ trente minutes. Trois coups de petite cloche l'ouvrent, deux coups la ferment. Les responsables peuvent corriger les postures." },
    { "id": "kinhin", "nom": "Kinhin" , "bref": "On se lève, on salue, puis on marche lentement en file, dans le sens des aiguilles d'une montre. Un coup de petite cloche y met fin et chacun revient à sa place d'un pas normal." },
    { "id": "zazen2", "nom": "Zazen, 2e période" , "bref": "Deuxième assise. Le godō donne l'enseignement oral (kusen). On chante ensemble les quatre vœux, puis un coup de petite cloche clôt le zazen." },
    { "id": "ceremonie", "nom": "Cérémonie" , "bref": "On se lève et on se tient debout. Le dōshi offre l'encens et se prosterne trois fois (sanpai) ; l'inkin marque chacun de ses gestes et tout le monde le suit. Puis on s'assoit pour chanter le Hannya Shingyō, l'ekō (la dédicace) et le Ji ho san shi. On termine debout par trois prosternations et les saluts." },
    { "id": "fin", "nom": "Fin" , "bref": "On se salue et on se souhaite une bonne soirée." }
  ],
  "fonctions": [
    { "id": "officiant", "nom": "Officie et se prosterne" },
    { "id": "kusen", "nom": "Guide la pratique, donne le kusen" },
    { "id": "kyosaku", "nom": "Porte le kyōsaku, corrige les postures" },
    { "id": "shokei-zazen", "nom": "Ouvre et ferme le zazen au shōkei" },
    { "id": "encens", "nom": "Prépare et présente l'encens" },
    { "id": "han", "nom": "Frappe le moppan, allume la bougie" },
    { "id": "inkin", "nom": "Joue l'inkin" },
    { "id": "keisu", "nom": "Joue la keisu" },
    { "id": "shokei-ceremonie", "nom": "Joue le shōkei pendant la cérémonie" },
    { "id": "voix", "nom": "Lance les chants, récite l'ekō" },
    { "id": "mokugyo", "nom": "Joue le mokugyo" },
    { "id": "sangha", "nom": "Pratique avec la communauté" }
  ],
  "roles": [
    {
      "id": "jisha", "nom": "Jisha", "kanji": "侍者", "fonctions": ["encens"],
      "resume": "Assistant du godō : prépare l'autel et offre l'encens.",
      "place": { "zazen": "Face au mur.", "ceremonie": "Accompagne le dōshi à l'autel, à sa droite (place exacte à confirmer)." },
      "objets": ["Charbon et shoko (encens en poudre) dans la boîte à shoko", "Bâton d'encens", "Zafuton de prosternation du dōshi"]
    },
    {
      "id": "jikido", "nom": "Jikidō", "kanji": "直堂", "fonctions": ["han"],
      "resume": "Gardien du dojo : frappe le moppan pour appeler au zazen, allume la bougie.",
      "place": { "zazen": "Face au mur.", "ceremonie": "Debout avec la sangha." },
      "objets": ["Bougie et allumettes", "Moppan et son maillet"]
    },
    {
      "id": "shuso", "nom": "Shuso", "kanji": "首座", "fonctions": ["shokei-zazen", "kyosaku"],
      "resume": "Premier moine : ouvre et ferme le zazen avec le shōkei.",
      "place": { "zazen": "Près de l'entrée, dans l'axe, tourné vers la salle, à gauche du godō.", "ceremonie": "Reste à sa place (à confirmer)." },
      "objets": ["Shōkei et son maillet", "Kyōsaku"]
    },
    {
      "id": "godo", "nom": "Godō", "kanji": "後堂", "fonctions": ["kusen", "kyosaku"],
      "resume": "Responsable de la pratique : guide la sangha, donne le kusen, corrige les postures.",
      "place": { "zazen": "Près de l'entrée, dans l'axe, tourné vers la salle, à droite du shuso.", "ceremonie": "Reste à sa place (à confirmer)." },
      "objets": ["Kyōsaku"]
    },
    {
      "id": "doshi", "nom": "Dōshi", "kanji": "導師", "fonctions": ["officiant"], "obligatoire": true,
      "resume": "Officiant : préside la cérémonie, fait les offrandes et le sanpai.",
      "place": { "zazen": "Près de l'entrée, dans l'axe, tourné vers la salle.", "ceremonie": "Rejoint le zafuton de prosternation posé près de l'autel ; il y offre l'encens et s'y prosterne." },
      "objets": ["Zagu"]
    },
    {
      "id": "inkin", "nom": "Inkin", "fonctions": ["inkin"],
      "resume": "Joue l'inkin : marque les déplacements du dōshi.",
      "place": { "zazen": "Face au mur.", "ceremonie": "À confirmer." },
      "objets": ["Inkin et sa baguette"]
    },
    {
      "id": "doan", "nom": "Dōan", "fonctions": ["keisu", "shokei-ceremonie"],
      "resume": "Joue la keisu et le shōkei qui ponctuent les chants et la cérémonie.",
      "place": { "zazen": "Derrière l'autel, près de ses instruments, face au mur.", "ceremonie": "En seiza devant la keisu, derrière l'autel." },
      "objets": ["Keisu et son maillet", "Shōkei et son maillet"]
    },
    {
      "id": "kokyo", "nom": "Kokyō", "fonctions": ["voix"],
      "resume": "Voix : lance les chants et récite l'ekō.",
      "place": { "zazen": "Derrière l'autel, tourné vers la salle.", "ceremonie": "Derrière l'autel." },
      "objets": []
    },
    {
      "id": "fukudo", "nom": "Fukudo", "fonctions": ["mokugyo"],
      "resume": "Joue le mokugyo : donne le rythme du chant.",
      "place": { "zazen": "Derrière l'autel, près du mokugyo, face au mur.", "ceremonie": "Devant le mokugyo, derrière l'autel." },
      "objets": ["Mokugyo et son maillet"]
    },
    {
      "id": "sangha", "nom": "Sangha", "fonctions": ["sangha"], "obligatoire": true,
      "resume": "Communauté des pratiquants : zazen, kinhin, écoute, chante, se prosterne.",
      "place": { "zazen": "Face au mur.", "ceremonie": "Debout en deux rangs, de part et d'autre de l'axe." },
      "objets": []
    }
  ],
  "instruments": [
    {
      "id": "moppan", "nom": "Moppan", "kanji": "木版",
      "description": "Planche de bois suspendue à l'entrée du dojo, frappée au maillet pour appeler au zazen.",
      "technique": "Frappé avant le zazen. À Reims, trois séries : sept coups puis une cascade, cinq coups, trois coups.",
      "source": "Zen Sōtō Reims, « Les sons »"
    },
    {
      "id": "shokei", "nom": "Shōkei", "kanji": "小鏧", "son": "../hannya-shingyo/shokei-12cm.mp3",
      "description": "Petite cloche en forme de bol, posée sur un coussin.",
      "technique": "Ouvre et ferme les périodes de zazen et de kinhin ; pendant la cérémonie, demande l'assise et accompagne le mantra du Hannya Shingyō.",
      "source": "Glossaire sotozen.com ; tableau du dojo"
    },
    {
      "id": "keisu", "nom": "Keisu", "kanji": "鏧子", "son": "../hannya-shingyo/keisu-39cm.mp3",
      "description": "Grande cloche en forme de bol (daikei), posée sur un coussin, frappée au maillet.",
      "technique": "Deux frappes : Ken, le coup normal qu'on laisse résonner, et Gatsu, le coup étouffé.",
      "source": "Glossaire sotozen.com ; tableau du dojo"
    },
    {
      "id": "inkin", "nom": "Inkin", "kanji": "引鏧",
      "description": "Petite cloche en bol montée sur un manche, qu'on tient à la main.",
      "technique": "Un coup à chaque geste du dōshi qu'il faut marquer ; la cascade est une série de coups rapprochés.",
      "source": "Glossaire sotozen.com ; tableau du dojo"
    },
    {
      "id": "mokugyo", "nom": "Mokugyo", "kanji": "木魚", "son": "../hannya-shingyo/mokugyo-papargyris.mp3",
      "description": "Tambour de bois sculpté en forme de poisson, frappé au maillet.",
      "technique": "Donne le rythme du chant, une frappe par syllabe.",
      "source": "Tableau du dojo"
    }
  ],
  "frappes": [
    { "id": "ken", "nom": "Ken", "description": "Coup normal, qu'on laisse résonner." },
    { "id": "gatsu", "nom": "Gatsu", "description": "Coup étouffé." },
    { "id": "cascade", "nom": "Cascade", "description": "Série de coups rapprochés." }
  ],
  "etapes": [
    { "id": "e01", "phase": "avant", "moment": "Appel au zazen", "minute": -5,
      "actions": [
        { "roles": ["jisha"], "texte": "Allume le charbon pour le shoko et fait l'offrande d'encens, puis s'assoit face au mur." },
        { "roles": ["jikido"], "texte": "Allume la bougie, frappe le moppan, puis s'assoit face au mur.", "sons": [{ "instrument": "moppan" }] },
        { "roles": ["shuso"], "texte": "S'assoit face à la sangha, à gauche du godō." },
        { "roles": ["godo"], "texte": "S'assoit face à la sangha, à droite du shuso." },
        { "roles": ["doshi"], "texte": "S'assoit face à la sangha." },
        { "roles": ["kokyo"], "texte": "S'assoit face à la sangha." },
        { "roles": ["*"], "texte": "S'assoit face au mur." }
      ],
      "variantes": [
        { "roles": ["jisha", "doshi"], "texte": "Le jisha accompagne le dōshi avec l'encens, et c'est le dōshi qui fait l'offrande avant de s'asseoir." }
      ]
    },
    { "id": "e02", "phase": "zazen1", "moment": "Début du zazen", "minute": 0,
      "actions": [ { "roles": ["shuso"], "texte": "Ouvre le zazen.", "sons": [{ "instrument": "shokei", "coups": 3 }] } ] },
    { "id": "e03", "phase": "zazen1", "moment": "Zazen",
      "actions": [
        { "roles": ["shuso", "godo"], "texte": "Offre le kyōsaku si on le demande, corrige les postures." },
        { "roles": ["*"], "texte": "Zazen immobile, en silence." }
      ] },
    { "id": "e04", "phase": "zazen1", "moment": "Fin du zazen", "minute": 30,
      "actions": [ { "roles": ["shuso"], "texte": "Clôt le zazen.", "sons": [{ "instrument": "shokei", "coups": 2 }] } ] },

    { "id": "e05", "phase": "kinhin", "moment": "Passage au kinhin",
      "actions": [ { "roles": ["*"], "texte": "Gasshō assis, puis se lève lentement." } ] },
    { "id": "e06", "phase": "kinhin", "moment": "Passage au kinhin",
      "actions": [ { "roles": ["*"], "texte": "Gasshō vers son zafu." } ] },
    { "id": "e07", "phase": "kinhin", "moment": "Passage au kinhin",
      "actions": [ { "roles": ["*"], "texte": "Gasshō vers le rang d'en face." } ] },
    { "id": "e08", "phase": "kinhin", "moment": "Kinhin",
      "actions": [
        { "roles": ["godo"], "texte": "Corrige les postures." },
        { "roles": ["*"], "texte": "Kinhin, en file dans le sens des aiguilles d'une montre, en passant derrière l'autel." }
      ] },
    { "id": "e09", "phase": "kinhin", "moment": "Fin du kinhin", "minute": 40,
      "actions": [ { "roles": ["shuso"], "texte": "Marque la fin du kinhin.", "sons": [{ "instrument": "shokei", "coups": 1 }] } ] },
    { "id": "e10", "phase": "kinhin", "moment": "Retour à sa place",
      "actions": [ { "roles": ["*"], "texte": "Retourne à son zafu à pas normal, mains en shashu." } ] },
    { "id": "e11", "phase": "kinhin", "moment": "Retour à sa place",
      "actions": [ { "roles": ["*"], "texte": "Gasshō vers son zafu." } ] },
    { "id": "e12", "phase": "kinhin", "moment": "Retour à sa place",
      "actions": [ { "roles": ["*"], "texte": "Gasshō vers le rang d'en face." } ] },
    { "id": "e13", "phase": "kinhin", "moment": "Retour à sa place",
      "actions": [ { "roles": ["*"], "texte": "Se met en position de zazen." } ] },

    { "id": "e14", "phase": "zazen2", "moment": "Début du zazen",
      "actions": [ { "roles": ["shuso"], "texte": "Ouvre le zazen.", "sons": [{ "instrument": "shokei", "coups": 3 }] } ] },
    { "id": "e15", "phase": "zazen2", "moment": "Zazen",
      "actions": [
        { "roles": ["godo"], "texte": "Zazen ; donne le kusen." },
        { "roles": ["*"], "texte": "Zazen immobile, en silence." }
      ] },
    { "id": "e16", "phase": "zazen2", "moment": "Les quatre vœux (Shigu seigan mon)",
      "actions": [
        { "roles": ["kokyo"], "texte": "Lance les quatre vœux." },
        { "roles": ["*"], "texte": "Chante en suivant le kokyō, mains en gasshō." }
      ] },
    { "id": "e17", "phase": "zazen2", "moment": "Fin du zazen", "minute": 65,
      "actions": [ { "roles": ["shuso"], "texte": "Clôt le zazen.", "sons": [{ "instrument": "shokei", "coups": 1 }] } ] },

    { "id": "e18", "phase": "ceremonie", "moment": "Passage à la cérémonie",
      "actions": [ { "roles": ["*"], "texte": "Gasshō assis, puis se lève lentement." } ] },
    { "id": "e19", "phase": "ceremonie", "moment": "Passage à la cérémonie",
      "actions": [ { "roles": ["*"], "texte": "Gasshō vers son zafu." } ] },
    { "id": "e20", "phase": "ceremonie", "moment": "Passage à la cérémonie",
      "actions": [ { "roles": ["*"], "texte": "Gasshō vers le rang d'en face." } ] },
    { "id": "e21", "phase": "ceremonie", "moment": "Début de la cérémonie",
      "actions": [ { "roles": ["inkin"], "texte": "Annonce la cérémonie.", "sons": [{ "instrument": "inkin", "coups": 2 }] } ] },
    { "id": "e22", "phase": "ceremonie", "moment": "Mise en place",
      "actions": [
        { "roles": ["jisha"], "texte": "Installe le zafuton de prosternation du dōshi près de l'autel." },
        { "roles": ["doan", "fukudo"], "texte": "Met en place ses instruments." }
      ] },
    { "id": "e23", "phase": "ceremonie", "moment": "Mise en place",
      "actions": [ { "roles": ["*"], "texte": "Debout, mains en shashu." } ] },
    { "id": "e24", "phase": "ceremonie", "moment": "Offrande d'encens",
      "actions": [
        { "roles": ["jisha"], "texte": "Accompagne le dōshi, à sa droite." },
        { "roles": ["doshi"], "texte": "Monte à l'autel par la gauche et fait l'offrande d'encens." }
      ] },
    { "id": "e25", "phase": "ceremonie", "moment": "Offrande d'encens",
      "actions": [
        { "roles": ["doshi"], "texte": "Gasshō." },
        { "roles": ["inkin"], "texte": "Un coup.", "sons": [{ "instrument": "inkin", "coups": 1 }], "signal": { "role": "doshi", "texte": "sur le gasshō du dōshi" } }
      ] },
    { "id": "e26", "phase": "ceremonie", "moment": "Retour au zafuton",
      "actions": [
        { "roles": ["doshi"], "texte": "Revient vers son zafuton, par la droite." },
        { "roles": ["inkin"], "texte": "Un coup.", "sons": [{ "instrument": "inkin", "coups": 1 }], "signal": { "role": "doshi", "texte": "quand le dōshi est à mi-chemin du zafuton" } }
      ] },
    { "id": "e27", "phase": "ceremonie", "moment": "Retour au zafuton",
      "actions": [
        { "roles": ["doshi"], "texte": "Fait face à son zafuton." },
        { "roles": ["inkin"], "texte": "Un coup.", "sons": [{ "instrument": "inkin", "coups": 1 }], "signal": { "role": "doshi", "texte": "quand le dōshi fait face au zafuton" } }
      ] },
    { "id": "e28", "phase": "ceremonie", "moment": "Retour au zafuton",
      "actions": [
        { "roles": ["doshi"], "texte": "Déplie son zagu." },
        { "roles": ["inkin"], "texte": "Cascade.", "sons": [{ "instrument": "inkin", "frappe": "cascade" }], "signal": { "role": "doshi", "texte": "quand le dōshi déplie son zagu" } }
      ] },
    { "id": "e29", "phase": "ceremonie", "moment": "Sanpai",
      "actions": [
        { "roles": ["doshi"], "texte": "Trois fois gasshō puis prosternation (pai)." },
        { "roles": ["inkin"], "texte": "Un coup à chaque gasshō du dōshi.", "sons": [{ "instrument": "inkin", "coups": 3 }], "signal": { "role": "doshi", "texte": "à chaque gasshō du dōshi" } },
        { "roles": ["sangha"], "texte": "Trois fois gasshō puis prosternation, en suivant le dōshi." }
      ] },
    { "id": "e30", "phase": "ceremonie", "moment": "Offrande du shoko",
      "actions": [
        { "roles": ["doan"], "texte": "S'assoit en seiza." },
        { "roles": ["jisha", "jikido", "shuso", "godo", "inkin", "kokyo", "fukudo", "sangha"], "texte": "Debout, mains en shashu." }
      ] },
    { "id": "e31", "phase": "ceremonie", "moment": "Offrande du shoko",
      "actions": [ { "roles": ["doshi"], "texte": "Monte seul à l'autel pour offrir le shoko." } ] },
    { "id": "e32", "phase": "ceremonie", "moment": "Offrande du shoko",
      "actions": [
        { "roles": ["doshi"], "texte": "Gasshō au Bouddha." },
        { "roles": ["doan"], "texte": "Un coup normal de keisu.", "sons": [{ "instrument": "keisu", "coups": 1, "frappe": "ken" }], "signal": { "role": "doshi", "texte": "sur le gasshō du dōshi" } }
      ] },
    { "id": "e33", "phase": "ceremonie", "moment": "Offrande du shoko",
      "actions": [
        { "roles": ["doan"], "texte": "Demande l'assise.", "sons": [{ "instrument": "shokei", "coups": 2 }] }
      ],
      "variantes": [
        { "roles": ["inkin"], "texte": "L'assise est demandée à l'inkin, deux coups.", "sons": [{ "instrument": "inkin", "coups": 2 }] }
      ] },
    { "id": "e34", "phase": "ceremonie", "moment": "Offrande du shoko",
      "actions": [
        { "roles": ["jisha", "jikido", "shuso", "godo", "inkin", "kokyo", "fukudo", "sangha"], "texte": "S'assoit en seiza." }
      ] },
    { "id": "e35", "phase": "ceremonie", "moment": "Sanpai",
      "actions": [ { "roles": ["doshi"], "texte": "Redescend jusqu'à son zafuton pour le sanpai." } ] },
    { "id": "e36", "phase": "ceremonie", "moment": "Sanpai",
      "actions": [
        { "roles": ["doshi"], "texte": "Trois fois gasshō puis prosternation (pai)." },
        { "roles": ["doan"], "texte": "Keisu : un coup normal au 2e gasshō, un coup étouffé au 3e.", "sons": [{ "instrument": "keisu", "coups": 1, "frappe": "ken", "quand": "au 2e gasshō" }, { "instrument": "keisu", "coups": 1, "frappe": "gatsu", "quand": "au 3e gasshō" }], "signal": { "role": "doshi", "texte": "sur les gasshō du dōshi" } }
      ] },
    { "id": "e37", "phase": "ceremonie", "moment": "Hannya Shingyō",
      "actions": [
        { "roles": ["fukudo"], "texte": "Un coup unique de mokugyo, seulement si l'on ajoute les déplacements du dōshi.", "optionnel": true, "sons": [{ "instrument": "mokugyo", "coups": 1 }] }
      ] },
    { "id": "e38", "phase": "ceremonie", "moment": "Hannya Shingyō",
      "actions": [ { "roles": ["kokyo"], "texte": "Annonce « Maka Hannya Haramita Shingyō »." } ] },
    { "id": "e39", "phase": "ceremonie", "moment": "Hannya Shingyō",
      "actions": [
        { "roles": ["doan"], "texte": "Un coup normal de keisu marque le début du chant.", "sons": [{ "instrument": "keisu", "coups": 1, "frappe": "ken" }], "signal": { "role": "kokyo", "texte": "après l'annonce du kokyō" } }
      ] },
    { "id": "e40", "phase": "ceremonie", "moment": "Hannya Shingyō",
      "actions": [
        { "roles": ["kokyo"], "texte": "Lance et mène le chant, mains en gasshō." },
        { "roles": ["doan"], "texte": "Ponctue le chant : coups normaux de keisu, shōkei pour le mantra, puis un coup étouffé de keisu pour clore.", "sons": [{ "instrument": "keisu", "frappe": "ken", "quand": "pendant le chant" }, { "instrument": "shokei", "quand": "pour le mantra" }, { "instrument": "keisu", "coups": 1, "frappe": "gatsu", "quand": "pour clore" }] },
        { "roles": ["fukudo"], "texte": "Donne le rythme au mokugyo : commence après le « KAN », ne frappe pas l'avant-dernier mot.", "sons": [{ "instrument": "mokugyo", "quand": "pendant tout le chant" }] },
        { "roles": ["*"], "texte": "Chante en suivant le kokyō, mains en hokkai jō-in." }
      ] },
    { "id": "e41", "phase": "ceremonie", "moment": "Ekō",
      "actions": [
        { "roles": ["kokyo"], "texte": "Récite seul l'ekō (la dédicace)." },
        { "roles": ["doan"], "texte": "Ponctue l'ekō de coups normaux de keisu.", "sons": [{ "instrument": "keisu", "frappe": "ken" }] },
        { "roles": ["jisha", "jikido", "shuso", "godo", "doshi", "inkin"], "texte": "En silence, mains en gasshō ; s'incline entre les deux coups de keisu." },
        { "roles": ["fukudo", "sangha"], "texte": "En silence, mains en hokkai jō-in ; s'incline entre les deux coups de keisu." }
      ] },
    { "id": "e42", "phase": "ceremonie", "moment": "Ji ho san shi",
      "actions": [
        { "roles": ["kokyo"], "texte": "Entonne le chant." },
        { "roles": ["doan"], "texte": "Ponctue le chant de coups normaux de keisu.", "sons": [{ "instrument": "keisu", "frappe": "ken" }] },
        { "roles": ["inkin"], "texte": "Chante en suivant le kokyō ; cascade à la fin de la deuxième phrase.", "sons": [{ "instrument": "inkin", "frappe": "cascade", "quand": "à la fin de la deuxième phrase" }] },
        { "roles": ["jisha", "jikido", "shuso", "godo", "doshi"], "texte": "Chante en suivant le kokyō, mains en gasshō." },
        { "roles": ["fukudo", "sangha"], "texte": "Chante en suivant le kokyō, mains en hokkai jō-in." }
      ] },
    { "id": "e43", "phase": "ceremonie", "moment": "Sanpai final",
      "actions": [ { "roles": ["*"], "texte": "Tout le monde se lève, mains en shashu." } ] },
    { "id": "e44", "phase": "ceremonie", "moment": "Sanpai final",
      "actions": [
        { "roles": ["doshi"], "texte": "Trois fois gasshō puis prosternation (pai)." },
        { "roles": ["inkin"], "texte": "Un coup à chaque gasshō du dōshi.", "sons": [{ "instrument": "inkin", "coups": 3 }], "signal": { "role": "doshi", "texte": "à chaque gasshō du dōshi" } },
        { "roles": ["*"], "texte": "Trois fois gasshō puis prosternation, en suivant le dōshi." }
      ] },
    { "id": "e45", "phase": "ceremonie", "moment": "Salutations finales",
      "actions": [
        { "roles": ["doshi"], "texte": "Gasshō vers le Bouddha." },
        { "roles": ["inkin"], "texte": "Un coup.", "sons": [{ "instrument": "inkin", "coups": 1 }], "signal": { "role": "doshi", "texte": "sur le gasshō du dōshi" } }
      ] },
    { "id": "e46", "phase": "ceremonie", "moment": "Salutations finales",
      "actions": [
        { "roles": ["doshi"], "texte": "Salue la sangha en shashu." },
        { "roles": ["inkin"], "texte": "Un coup.", "sons": [{ "instrument": "inkin", "coups": 1 }], "signal": { "role": "doshi", "texte": "sur la salutation du dōshi" } },
        { "roles": ["*"], "texte": "Salue le dōshi en shashu." }
      ] },
    { "id": "e47", "phase": "ceremonie", "moment": "Salutations finales",
      "actions": [
        { "roles": ["doshi"], "texte": "Gasshō vers l'inkin." },
        { "roles": ["inkin"], "texte": "Un coup, puis gasshō vers le dōshi.", "sons": [{ "instrument": "inkin", "coups": 1 }], "signal": { "role": "doshi", "texte": "sur le gasshō du dōshi" } }
      ] },
    { "id": "e48", "phase": "fin", "moment": "Fin de la cérémonie",
      "actions": [ { "roles": ["*"], "texte": "On se souhaite une bonne soirée." } ] }
  ]
});
