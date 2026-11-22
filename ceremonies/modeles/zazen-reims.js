// Modèle « Zazen et cérémonie, dojo de Reims ».
// Écrit à la main d'après le document « SONS » (novembre 2009), document de pratique de la sangha
// de Maître Roland Yuno Rech. Même format que les fichiers exportés par le module (voir ../FORMAT.md).
// Le modèle n'ajoute rien à la logique du module : ce qui lui est propre (lieux, personnes, objets,
// conditions, frappe « nakkei », tambour) est déclaré ici, dans ses propres listes.
(function () {
  // ----- Petites aides d'écriture (elles ne produisent que des données au format du module) -----
  const liste = r => (Array.isArray(r) ? r : [r]);
  // Une action : rôle(s), texte, puis les cases (verbe, cible, lieu, maniere, nombre, signal, si…).
  const A = (roles, texte, cases) => ({ roles: liste(roles), texte, ...(cases || {}) });
  // Un son : instrument, puis coups, frappe, quand…
  const S = (instrument, d) => ({ instrument, ...(d || {}) });
  // Une action « jouer » : rôle, instrument, texte, sons, autres cases.
  const J = (role, instrument, texte, sons, cases) => A(role, texte, { verbe: 'jouer', cible: 'objets:' + instrument, sons: liste(sons), ...(cases || {}) });
  // Le signal : ce qui déclenche l'action (« quand… »), et le rôle qui le donne.
  const quand = (texte, role) => ({ signal: role ? { role, texte } : { texte } });
  // Choix du lecteur : ce que fait le doshi pendant le sutra, et quel ekō est récité.
  const seiza = { si: { choix: 'doshi-sutra', est: 'seiza' } }, debout = { si: { choix: 'doshi-sutra', est: 'debout' } };
  const simple = { si: { choix: 'eko', est: 'simple' } }, patriarches = { si: { choix: 'eko', est: 'patriarches' } };
  let n = 0;
  const E = (phase, moment, actions, plus) => ({ id: 'r' + (++n), phase, moment, ...(plus || {}), actions });

  const GASSHO = 'mains en gasshō', SHASHU = 'mains en shashu', HOKKAI = 'mains en hokkai jō in';
  // Les sons de la clochette pendant un sanpai : les mêmes au début et à la fin de la cérémonie.
  const sanpaiClochette = () => J('clochette', 'inkin', 'Clochette : un tchin au gasshō du 1er pai, un au gasshō du 2e pai, puis deux au 3e pai (au gasshō, puis quand le doshi plie les genoux)', [
    S('inkin', { coups: 1, quand: 'au gasshō du 1er pai' }), S('inkin', { coups: 1, quand: 'au gasshō du 2e pai' }),
    S('inkin', { coups: 2, quand: 'au 3e pai : au gasshō, puis quand le doshi plie les genoux' })], quand('au gasshō de chaque pai du doshi, puis quand il plie les genoux', 'doshi'));

  const etapes = [
    // ----- Avant le zazen -----
    E('p1', 'Appel au zazen', [
      J('kyosaku1', 'moppan', 'Frappe le bois (moppan) en trois séries : 7 coups, 5 coups, 3 coups, chacune suivie d’une cascade. La dernière série se termine par un coup moyen, un faible, un fort', S('moppan', { serie: '7 5 3' })),
    ], { minute: -5 }),
    E('p1', 'Annonce du début', [
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : une cascade, puis un dernier coup. En général, le godo n’est pas encore arrivé', [S('daikei', { frappe: 'cascade' }), S('daikei', { frappe: 'ken', coups: 1, quand: 'pour finir' })]),
    ]),

    // ----- Zazen -----
    E('p2', 'Shijo : début du zazen', [
      A('doshi', 'Gasshō vers son zafu', { verbe: 'gassho', cible: 'objets:zafu' }),
      A('doshi', 'Gasshō vers la sangha', { verbe: 'gassho', cible: 'personnes:sangha' }),
      A('doshi', 'S’assoit', { verbe: 's-asseoir' }),
      J('shuso', 'shokei', 'Cloche du shusso : trois coups, quand le godo salue son zafu, quand il salue la sangha, puis quand il s’assoit', [
        S('shokei', { coups: 1, quand: 'quand le godo salue son zafu' }), S('shokei', { coups: 1, quand: 'quand le godo salue la sangha' }), S('shokei', { coups: 1, quand: 'quand le godo s’assoit' })], quand('quand le godo salue son zafu, quand il salue la sangha, puis quand il s’assoit', 'doshi')),
      A('*', 'Zazen', { verbe: 'zazen', ...quand('aux trois coups de la cloche du shusso', 'shuso') }),
    ], { minute: 0 }),
    E('p2', 'Kin hin', [
      J('shuso', 'shokei', 'Cloche du shusso : deux coups', S('shokei', { coups: 2 })),
      A('*', 'Kin hin', { verbe: 'kinhin', ...quand('quand la cloche du shusso sonne deux fois', 'shuso') }),
    ], { option: 'A' }),
    E('p2', 'Fin du kin hin', [
      J('shuso', 'shokei', 'Cloche du shusso : un coup', S('shokei', { coups: 1 })),
      A('*', 'Retourne à sa place', { verbe: 'aller', cible: 'lieux:sa-place', ...quand('quand la cloche du shusso sonne une fois', 'shuso') }),
    ], { option: 'A' }),
    E('p2', 'Reprise du zazen', [
      J('shuso', 'shokei', 'Cloche du shusso : trois coups (shijo), une fois la sangha et le godo installés et le calme revenu', S('shokei', { coups: 3 }), quand('une fois la sangha et le godo installés', 'doshi')),
      A('*', 'Zazen', { verbe: 'zazen', ...quand('aux trois coups de la cloche du shusso', 'shuso') }),
    ], { option: 'A' }),
    E('p2', 'Fin du zazen', [
      J('shuso', 'shokei', 'Cloche du shusso : un seul coup', S('shokei', { coups: 1 }), quand('quand le godo décide de la fin du zazen', 'doshi')),
    ]),

    // ----- Cérémonie : entrée et sanpai -----
    E('p3', 'Appel à la cérémonie', [
      J('clochette', 'inkin', 'Clochette : deux tchin. « Levez-vous et alignez-vous pour la cérémonie »', S('inkin', { coups: 2 })),
      A('*', 'Se lève', { verbe: 'se-lever', ...quand('quand la clochette sonne deux fois', 'clochette') }),
      A('*', 'Reste debout, alignée de chaque côté, mains en shashu', { verbe: 'rester', maniere: 'debout, ' + SHASHU, ...quand('quand la clochette sonne deux fois', 'clochette') }),
    ]),
    E('p3', 'Mise en place', [
      A('doshi', 'Se place devant le tatami', { verbe: 'aller', cible: 'lieux:devant-tatami' }),
      A('shuso', 'Se place à droite du doshi', { verbe: 'aller', cible: 'lieux:droite-doshi' }),
      A('jisha', 'Se place à gauche du doshi', { verbe: 'aller', cible: 'lieux:gauche-doshi' }),
      A('clochette', 'Se place derrière le doshi', { verbe: 'aller', cible: 'lieux:derriere-doshi' }),
    ]),
    E('p3', 'Offrande de l’encens', [
      A('doshi', 'Monte à l’autel avec le shusso, mains en shashu', { verbe: 'aller', cible: 'lieux:autel', maniere: SHASHU }),
      A('shuso', 'Monte à l’autel avec le doshi, mains en shashu', { verbe: 'accompagner', cible: 'personnes:doshi', lieu: 'lieux:autel', maniere: SHASHU }),
      A('jisha', 'Apporte au doshi sa boîte à shoko, devant l’autel', { verbe: 'donner', cible: 'objets:boite-shoko', lieu: 'lieux:devant-autel', condition: 'ceremonie-non-ordinaire', optionnel: true }),
      A('doshi', 'Offre l’encens et le shoko', { verbe: 'offrir', cible: 'objets:encens' }),
      A('doshi', 'Gasshō', { verbe: 'gassho' }),
      J('clochette', 'inkin', 'Clochette : un tchin au gasshō après l’offrande', S('inkin', { coups: 1 }), quand('au gasshō après l’offrande', 'doshi')),
    ]),
    E('p3', 'Retour au tatami', [
      A('doshi', 'Redescend vers le tatami, mains en gasshō', { verbe: 'aller', cible: 'lieux:tatami', maniere: GASSHO }),
      A('shuso', 'Redescend avec le doshi, mains en gasshō', { verbe: 'accompagner', cible: 'personnes:doshi', maniere: GASSHO }),
      A('doshi', 'Monte sur le tatami du pied gauche', { verbe: 'aller', cible: 'lieux:tatami', maniere: 'par le pied gauche' }),
      J('clochette', 'inkin', 'Clochette : un tchin au milieu du tatami, un à l’angle du tatami, un quand le doshi monte sur le tatami', [
        S('inkin', { coups: 1, quand: 'au milieu du tatami' }), S('inkin', { coups: 1, quand: 'à l’angle du tatami' }), S('inkin', { coups: 1, quand: 'quand le doshi monte sur le tatami' })], quand('au milieu du tatami, à l’angle du tatami, puis quand le doshi monte sur le tatami', 'doshi')),
    ]),
    E('p3', 'Ouverture du zagu', [
      A('doshi', 'Déplie son zagu, tourné vers la droite', { verbe: 'deplier', cible: 'objets:zagu' }),
      J('clochette', 'inkin', 'Clochette : cascade pendant le dépliage du zagu', S('inkin', { frappe: 'cascade' }), quand('pendant le dépliage du zagu', 'doshi')),
    ]),
    E('p3', 'Sanpai', [
      A(['doshi', '*'], 'Se prosterne trois fois (sanpai)', { verbe: 'se-prosterner', nombre: 3, ...quand('aux tchin de la clochette', 'clochette') }),
      sanpaiClochette(),
    ]),
    E('p3', 'Shoko du doshi', [
      A('doshi', 'Descend du tatami du pied droit', { verbe: 'aller', maniere: 'par le pied droit' }),
      A('doshi', 'Gasshō', { verbe: 'gassho' }),
      A('kyosaku1', 'Gasshō', { verbe: 'gassho' }),
      A('kyosaku1', 'S’assoit en seiza devant la cloche (keisu)', { verbe: 's-asseoir', cible: 'lieux:devant-keisu', maniere: 'en seiza' }),
      A('doshi', 'Monte seul à l’autel', { verbe: 'aller', cible: 'lieux:autel', maniere: 'seul' }),
      A('doshi', 'Offre le shoko', { verbe: 'offrir', cible: 'objets:shoko' }),
      A('doshi', 'Gasshō vers le Bouddha de l’autel', { verbe: 'gassho', cible: 'personnes:bouddha' }),
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken) au gasshō après l’offrande du shoko', S('daikei', { frappe: 'ken', coups: 1 }), quand('au gasshō après l’offrande du shoko', 'doshi')),
    ]),
    E('p3', 'La sangha s’assoit', [
      A('doshi', 'Se retourne', { verbe: 'se-tourner' }),
      A('doshi', 'Redescend le long du tatami', { verbe: 'aller', cible: 'lieux:tatami' }),
      J('clochette', 'inkin', 'Clochette : deux tchin, pour que la sangha s’assoie en seiza', S('inkin', { coups: 2 }), quand('quand le doshi redescend', 'doshi')),
      A('*', 'S’assoit en seiza, mains en hokkai jō in', { verbe: 's-asseoir', maniere: 'en seiza, ' + HOKKAI, ...quand('quand la clochette sonne deux fois', 'clochette') }),
    ]),
    E('p3', 'Sanpai du doshi', [
      A('doshi', 'Se prosterne trois fois sur le tatami', { verbe: 'se-prosterner', nombre: 3, lieu: 'lieux:sur-tatami' }),
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : ken au gasshō du 1er pai, ken au gasshō du 2e pai, gatsu au gasshō du 3e pai. Le gatsu demande à l’ino d’entonner le titre du premier sutra', S('daikei', { motif: ['ken', 'ken', 'gatsu'], coups: 3 }), quand('au gasshō de chacun des trois pai du doshi', 'doshi')),
    ]),

    // ----- Les chants -----
    E('p4', 'Hannya shingyo : le titre', [
      J('kyosaku2', 'mokugyo', 'Mokugyo : un coup, juste après le gatsu et avant que l’ino entonne le titre', S('mokugyo', { coups: 1 }), quand('juste après le gatsu', 'kyosaku1')),
      A('ino', 'Entonne le titre de l’Hannya shingyo, mains en gasshō', { verbe: 'entonner', cible: 'objets:sutra-coeur', maniere: GASSHO, ...quand('après le gatsu de la grande cloche et le coup de mokugyo', 'kyosaku2') }),
      A('doshi', 'S’assoit en seiza', { verbe: 's-asseoir', maniere: 'en seiza', ...seiza }),
      A('doshi', 'Se lève', { verbe: 'se-lever', ...debout }),
    ]),
    E('p4', 'Hannya shingyo : le chant', [
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken), pour que la sangha chante avec l’ino', S('daikei', { frappe: 'ken', coups: 1 }), quand('après le titre entonné par l’ino', 'ino')),
      A('*', 'Chante avec l’ino, mains en hokkai jō in', { verbe: 'chanter', cible: 'objets:sutra-coeur', maniere: 'en suivant l’ino, ' + HOKKAI, ...quand('au coup de la grande cloche', 'kyosaku1') }),
      J('kyosaku2', 'mokugyo', 'Mokugyo : démarre progressivement, puis garde son rythme, calé sur l’ino', S('mokugyo', { continu: true }), quand('quand la sangha commence à chanter', 'ino')),
    ]),
    E('p4', 'Hannya shingyo : à « go »', [
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken) à « go »', S('daikei', { frappe: 'ken', coups: 1 }), quand('à « go »')),
      A('ino', 'Met les mains en hokkai jō in', { verbe: 'rester', maniere: HOKKAI, ...quand('au coup de la grande cloche à « go »', 'kyosaku1') }),
      A('doshi', 'Va à l’autel', { verbe: 'aller', cible: 'lieux:autel', ...quand('au coup de la grande cloche à « go »', 'kyosaku1'), ...debout }),
      A('doshi', 'Offre le shoko', { verbe: 'offrir', cible: 'objets:shoko', ...debout }),
      A('doshi', 'Gasshō', { verbe: 'gassho', ...debout }),
      A('doshi', 'Redescend faire sanpai', { verbe: 'se-prosterner', nombre: 3, ...debout }),
    ]),
    E('p4', 'Hannya shingyo : à « on »', [
      J('taiko', 'taiko', 'Tambour (taiko) : démarre à « on », tout de suite après la grande cloche, et suit le rythme de l’ino', S('taiko', { continu: true }), quand('à « on »')),
    ], { option: 'B' }),
    E('p4', 'Hannya shingyo : à « ko (shin mu…) »', [
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken) à « ko (shin mu…) »', S('daikei', { frappe: 'ken', coups: 1 }), quand('à « ko (shin mu…) »')),
      A('doshi', 'Met les mains en gasshō', { verbe: 'rester', maniere: GASSHO, ...quand('au coup de la grande cloche à « ko (shin mu…) »', 'kyosaku1'), ...seiza }),
      A('doshi', 'Remonte à l’autel', { verbe: 'aller', cible: 'lieux:autel', ...quand('au coup de la grande cloche à « ko (shin mu…) »', 'kyosaku1'), ...debout }),
      A('doshi', 'Offre le shoko', { verbe: 'offrir', cible: 'objets:shoko', ...debout }),
    ]),
    E('p4', 'Hannya shingyo : à « ko (toku a…) »', [
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken) à « ko (toku a…) »', S('daikei', { frappe: 'ken', coups: 1 }), { ...quand('à « ko (toku a…) »'), ...seiza }),
      A('doshi', 'Remet les mains en hokkai jō in', { verbe: 'rester', maniere: HOKKAI, ...quand('au coup de la grande cloche à « ko (toku a…) »', 'kyosaku1'), ...seiza }),
      A('doshi', 'Gasshō après l’offrande', { verbe: 'gassho', ...debout }),
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken) au gasshō du doshi après l’offrande', S('daikei', { frappe: 'ken', coups: 1 }), { ...quand('au gasshō du doshi après l’offrande', 'doshi'), ...debout }),
      A('doshi', 'Redescend sur le tatami', { verbe: 'aller', cible: 'lieux:tatami', ...debout }),
      A('doshi', 'Reste debout', { verbe: 'rester', maniere: 'debout', ...debout }),
    ]),
    E('p4', 'Hannya shingyo : la fin', [
      J('kyosaku1', 'shokei', 'Petite cloche (sho keisu) : un coup après « gya tei, gya tei », un coup à « bo ji sowa ka »', [
        S('shokei', { coups: 1, quand: 'après « gya tei, gya tei »' }), S('shokei', { coups: 1, quand: 'à « bo ji sowa ka »' })]),
      A('ino', 'Met les mains en gasshō au premier coup de sho keisu', { verbe: 'rester', maniere: GASSHO, ...quand('au premier coup de sho keisu', 'kyosaku1') }),
    ]),
    E('p4', 'Quatre Vœux : le titre', [
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : gatsu, pour que l’ino entonne le Shigu seigan mon', S('daikei', { frappe: 'gatsu', coups: 1 })),
      A('ino', 'Entonne les Quatre Vœux (Shigu seigan mon)', { verbe: 'entonner', cible: 'objets:quatre-voeux', ...quand('au gatsu de la grande cloche', 'kyosaku1') }),
    ]),
    E('p4', 'Quatre Vœux : le chant', [
      A('*', 'Chante les Quatre Vœux, mains en gasshō', { verbe: 'chanter', cible: 'objets:quatre-voeux', maniere: GASSHO, ...quand('après le titre entonné par l’ino', 'ino') }),
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken) à chaque vœu', S('daikei', { frappe: 'ken', coups: 4 }), quand('à chaque vœu')),
    ]),
    E('p4', 'Ekō', [
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : gatsu, pour que l’ino chante l’ekō', S('daikei', { frappe: 'gatsu', coups: 1 })),
      A('ino', 'Chante seul l’ekō, mains en gasshō', { verbe: 'reciter', cible: 'objets:eko', maniere: 'seul, ' + GASSHO, ...quand('au gatsu de la grande cloche', 'kyosaku1') }),
      // Ekō simple
      J('kyosaku1', 'shokei', 'Petite cloche (sho keisu) : un coup pour que la sangha se prosterne, un coup pour qu’elle se redresse', [
        S('shokei', { coups: 1, quand: 'pour que la sangha se prosterne' }), S('shokei', { coups: 1, quand: 'pour qu’elle se redresse' })], simple),
      A('*', 'Se prosterne en gasshoteizu au premier coup de sho keisu', { verbe: 'se-prosterner', ...quand('au premier coup de sho keisu', 'kyosaku1'), ...simple }),
      A('*', 'Se redresse en gasshō au second coup, en restant en seiza, puis remet les mains en hokkai jō in', { verbe: 'rester', maniere: 'en seiza, ' + GASSHO, ...quand('au second coup de sho keisu', 'kyosaku1'), ...simple }),
      // Ekō des Patriarches
      A('*', 'Garde les mains en gasshō pendant tout l’ekō des Patriarches', { verbe: 'rester', maniere: GASSHO, ...patriarches }),
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : coup amorti (nakkei) au début de chacun des sept premiers Patriarches, puis avant et après Keizan Jokin', [
        S('daikei', { frappe: 'nakkei', coups: 7, quand: 'au début de chacun des sept premiers Patriarches' }), S('daikei', { frappe: 'nakkei', coups: 2, quand: 'avant et après Keizan Jokin' })], patriarches),
      J('kyosaku1', 'shokei', 'Petite cloche (sho keisu) : un coup à la fin de « Keizan Jokin daisho », la sangha se prosterne ; un coup à « mukui », elle se redresse en seiza', [
        S('shokei', { coups: 1, quand: 'à la fin de « Keizan Jokin daisho »' }), S('shokei', { coups: 1, quand: 'à « mukui »' })], patriarches),
      A('*', 'Se prosterne en gasshoteizu au premier coup de sho keisu, se redresse en seiza à « mukui »', { verbe: 'se-prosterner', ...quand('au premier coup de sho keisu', 'kyosaku1'), ...patriarches }),
      A('doshi', 'Se lève au tout début de l’énumération', { verbe: 'se-lever', ...quand('au tout début de l’énumération'), ...patriarches }),
      A('doshi', 'Offre le shoko', { verbe: 'offrir', cible: 'objets:shoko', ...patriarches }),
      A('doshi', 'Fait un pai à Shakamuni (la tête au sol à l’énoncé du nom), puis un pai pour Bashumitta, Nagyaharajuna, Bashubanzu, Bodaidaruma, Daikan Eno, Tozan Ryokai, Toshi Gisei et Eihei Dogen. À Eihei Dogen, reste prosterné jusqu’à « mukui »', { verbe: 'se-prosterner', nombre: 9, ...patriarches }),
    ]),
    E('p4', 'Ji ho san shi', [
      A('*', 'Chante le Ji ho san shi, mains en gasshō', { verbe: 'chanter', cible: 'objets:ji-ho', maniere: GASSHO, ...quand('après l’ekō chanté par l’ino', 'ino') }),
      J('kyosaku1', 'daikei', 'Grande cloche (dai keisu) : un coup normal (ken) au début de chacun des trois versets. Les trois coups annoncent à la sangha que la cérémonie va se terminer', S('daikei', { frappe: 'ken', coups: 3 }), quand('au début de chaque verset')),
      A('doshi', 'Monte à l’autel pendant les versets', { verbe: 'aller', cible: 'lieux:autel', ...quand('pendant les versets') }),
      A('doshi', 'Offre le shoko', { verbe: 'offrir', cible: 'objets:shoko' }),
      A('clochette', 'Se lève en même temps que le doshi', { verbe: 'se-lever', ...quand('en même temps que le doshi', 'doshi') }),
    ]),

    // ----- Fin de la cérémonie -----
    E('p5', 'La sangha se lève', [
      A('doshi', 'Gasshō après l’offrande, à la fin du dernier verset', { verbe: 'gassho', ...quand('à la fin du dernier verset') }),
      J('clochette', 'inkin', 'Clochette : un tchin au gasshō après l’offrande du shoko', S('inkin', { coups: 1 }), quand('au gasshō après l’offrande du shoko', 'doshi')),
      A('*', 'Se lève', { verbe: 'se-lever', ...quand('au tchin de la clochette', 'clochette') }),
    ]),
    E('p5', 'Retour du doshi', [
      A('doshi', 'Se retourne', { verbe: 'se-tourner' }),
      A('doshi', 'Redescend le long du tatami', { verbe: 'aller', cible: 'lieux:tatami' }),
      J('clochette', 'inkin', 'Clochette : cascade rapide dès que le doshi se retourne. Elle doit se terminer quand le doshi monte sur le tatami', S('inkin', { frappe: 'cascade' }), quand('dès que le doshi se retourne', 'doshi')),
    ]),
    E('p5', 'Sanpai final', [
      A(['doshi', '*'], 'Se prosterne trois fois (sanpai)', { verbe: 'se-prosterner', nombre: 3, ...quand('aux tchin de la clochette', 'clochette') }),
      sanpaiClochette(),
    ]),
    E('p5', 'Rangement du zagu', [
      A(['doshi', '*'], 'Replie son zagu', { verbe: 'replier', cible: 'objets:zagu', ...quand('après le sanpai') }),
    ]),
    E('p5', 'Saluts', [
      A(['doshi', '*'], 'Gasshō vers le Bouddha de l’autel', { verbe: 'gassho', cible: 'personnes:bouddha', ...quand('au tchin de la clochette', 'clochette') }),
      A('doshi', 'Gasshō vers la sangha', { verbe: 'gassho', cible: 'personnes:sangha' }),
      A('*', 'Gasshō face au doshi', { verbe: 'gassho', cible: 'personnes:doshi', ...quand('au tchin de la clochette', 'clochette') }),
      J('clochette', 'inkin', 'Clochette : un tchin au gasshō face au Bouddha de l’autel, un tchin au gasshō face à la sangha', [
        S('inkin', { coups: 1, quand: 'au gasshō face au Bouddha de l’autel' }), S('inkin', { coups: 1, quand: 'au gasshō face à la sangha' })], quand('au gasshō du doshi face au Bouddha de l’autel, puis face à la sangha', 'doshi')),
    ]),
    E('p5', 'Sortie du doshi', [
      A('clochette', 'Se place dans le gaitan, du côté de la sortie', { verbe: 'aller', cible: 'lieux:gaitan' }),
      A('doshi', 'Sort du dojo en passant la poutre', { verbe: 'aller', cible: 'lieux:poutre' }),
      A('doshi', 'Gasshō face à la clochette, dans le gaitan', { verbe: 'gassho', cible: 'personnes:clochette', lieu: 'lieux:gaitan' }),
      J('clochette', 'inkin', 'Clochette : un tchin quand le doshi passe la poutre, un tchin au gasshō face au doshi dans le gaitan', [
        S('inkin', { coups: 1, quand: 'quand le doshi passe la poutre' }), S('inkin', { coups: 1, quand: 'au gasshō face au doshi' })], quand('quand le doshi passe la poutre, puis au gasshō face à face', 'doshi')),
    ]),
  ];

  (window.DG_MODELES = window.DG_MODELES || []).push({
    format: 'dharmagates-ceremonie',
    version: 2,
    id: 'zazen-reims',
    langue: 'fr',
    titre: 'Zazen et cérémonie, dojo de Reims',
    resume: 'Zazen, puis la cérémonie pas à pas, geste par geste et son par son : entrée et sanpai, Hannya shingyo, Quatre Vœux, ekō, Ji ho san shi, sanpai final et sortie du doshi.',
    source: 'D’après le document « SONS » (novembre 2009), document de pratique de la sangha de Maître Roland Yuno Rech. Les noms des rôles et des instruments sont ceux du document.',
    phases: [
      { id: 'p1', nom: 'Avant le zazen', bref: 'Le bois (moppan) appelle au zazen, cinq minutes avant dans un dojo. La grande cloche de l’autel annonce le tout début de la méditation.' },
      { id: 'p2', nom: 'Zazen', bref: 'La cloche du shusso relie le godo et la sangha : trois coups pour commencer (shijo), deux coups s’il y a un kin hin, un seul coup pour finir.' },
      { id: 'p3', nom: 'Cérémonie : entrée et sanpai', bref: 'Deux tchin de clochette : on se lève et on s’aligne. Le doshi offre l’encens, la clochette marque chacun de ses déplacements, puis tout le monde fait trois prosternations. La sangha s’assoit en seiza.' },
      { id: 'p4', nom: 'Les chants', bref: 'L’ino entonne les titres. On chante l’Hannya shingyo au rythme du mokugyo, puis les Quatre Vœux. L’ino chante seul l’ekō, et la cérémonie se termine par le Ji ho san shi.' },
      { id: 'p5', nom: 'Fin de la cérémonie', bref: 'On se lève, on refait trois prosternations, on replie son zagu, on salue le Bouddha puis le doshi. La clochette accompagne la sortie du doshi.' },
    ],
    fonctions: [
      { id: 'officiant', nom: 'Officie et se prosterne' },
      { id: 'shokei-zazen', nom: 'Ouvre et ferme le zazen à la cloche' },
      { id: 'encens', nom: 'Assiste le doshi pour l’encens' },
      { id: 'inkin', nom: 'Joue la clochette (inkin)' },
      { id: 'daikei', nom: 'Joue la grande cloche de l’autel' },
      { id: 'shokei-ceremonie', nom: 'Joue la petite cloche de l’autel' },
      { id: 'han', nom: 'Frappe le bois (moppan)' },
      { id: 'mokugyo', nom: 'Joue le mokugyo' },
      { id: 'voix', nom: 'Entonne les titres, chante l’ekō' },
      { id: 'taiko', nom: 'Joue le tambour' },
      { id: 'sangha', nom: 'Pratique avec la communauté' },
    ],
    roles: [
      { id: 'doshi', nom: 'Doshi', kanji: '導師', fonctions: ['officiant'], obligatoire: true, resume: 'Officiant de la cérémonie. Pendant le zazen, le document l’appelle le godo',
        place: { zazen: 'Face à la sangha.', ceremonie: 'Devant le tatami, puis sur le tatami (haishiki).' }, objets: ['Zagu', 'Boîte à shoko (cérémonie non ordinaire)'] },
      { id: 'shuso', nom: 'Shusso', kanji: '首座', fonctions: ['shokei-zazen'], obligatoire: true, resume: 'Sonne la cloche du shusso : début et fin du zazen, kin hin. Monte à l’autel avec le doshi',
        place: { ceremonie: 'À droite du doshi.' }, objets: ['Cloche du shusso'] },
      { id: 'jisha', nom: 'Jisha (secrétaire)', kanji: '侍者', fonctions: ['encens'], resume: 'Secrétaire du doshi : lui apporte sa boîte à shoko pour une cérémonie non ordinaire',
        place: { ceremonie: 'À gauche du doshi.' }, objets: ['Boîte à shoko du doshi'] },
      { id: 'clochette', nom: 'Doan (clochette)', fonctions: ['inkin'], obligatoire: true, resume: 'Joue la clochette (inkin) : lien entre le godo et la sangha de la fin du zazen jusqu’à ce que la sangha s’assoie, puis de la fin de la cérémonie jusqu’à la sortie',
        place: { ceremonie: 'Derrière le doshi, puis dans le gaitan, du côté de la sortie.' }, objets: ['Clochette à manche (inkin)'] },
      { id: 'kyosaku1', nom: '1er kyosakuman', fonctions: ['daikei', 'shokei-ceremonie', 'han'], obligatoire: true, resume: 'Joue les cloches de l’autel (dai keisu et sho keisu) et frappe le bois. Dans les dojos, c’est souvent le shusso',
        place: { ceremonie: 'En seiza devant la cloche (keisu).' }, objets: ['Dai keisu et son maillet', 'Sho keisu et son petit maillet', 'Moppan et son maillet'] },
      { id: 'kyosaku2', nom: '2e kyosakuman', fonctions: ['mokugyo'], obligatoire: true, resume: 'Joue le mokugyo : rythme l’Hannya shingyo en suivant l’ino',
        place: { ceremonie: 'Devant le mokugyo.' }, objets: ['Mokugyo et son maillet'] },
      { id: 'ino', nom: 'Ino', kanji: '維那', fonctions: ['voix'], obligatoire: true, resume: 'Entonne les titres des sutra et des Quatre Vœux, chante seul les ekō', place: {}, objets: [] },
      { id: 'taiko', nom: 'Tambour', fonctions: ['taiko'], resume: 'Joue le tambour (taiko) : rythme l’Hannya shingyo. Souvent nommé pour la journée', place: {}, objets: ['Taiko et ses baguettes'] },
      { id: 'sangha', nom: 'Sangha', fonctions: ['sangha'], obligatoire: true, resume: 'Communauté des pratiquants : pratique zazen, chante, se prosterne',
        place: { zazen: 'Face au mur.', ceremonie: 'Debout, alignée de chaque côté, puis en seiza.' }, objets: ['Zagu'] },
    ],
    instruments: [
      { id: 'moppan', nom: 'Moppan', kanji: '木版', description: 'Bois et maillet : planche de bois suspendue. Kaijo, « ouvrir le silence » : appel au zazen, fin de zazen.', technique: 'Frappé en trois séries (7, 5, 3 coups) suivies d’une cascade. Dans un dojo, cinq minutes avant le zazen suffisent.', source: 'Document « SONS » (2009)' },
      { id: 'shokei', nom: 'Petite cloche', kanji: '小鏧', son: '../hannya-shingyo/shokei-12cm.mp3', description: 'Petite cloche. Celle du shusso ouvre et ferme le zazen. Celle de l’autel (sho keisu) signale les fins de sutra et les prosternations pendant l’ekō.', technique: 'Zazen : trois coups pour commencer, deux s’il y a un kin hin, un pour finir. Sutra : les deux derniers coups annoncent la fin.', source: 'Document « SONS » (2009)' },
      { id: 'daikei', nom: 'Dai keisu', kanji: '大鏧', son: '../hannya-shingyo/keisu-39cm.mp3', description: 'Grande cloche de l’autel. Elle signale les gestes du doshi, lance les chants de l’ino et dit à la sangha de commencer à chanter.', technique: 'Trois sons : normal (ken), étouffé (gatsu), amorti (nakkei). Le mouvement du maillet se fait en courbe ascendante.', source: 'Document « SONS » (2009)' },
      { id: 'inkin', nom: 'Clochette (inkin)', kanji: '引鏧', description: 'Clochette à manche. Elle marque les déplacements du doshi et dit à la sangha de se lever ou de s’asseoir.', technique: 'Un « tchin » par geste à marquer ; cascade pendant le dépliage du zagu et au retour du doshi.', source: 'Document « SONS » (2009)' },
      { id: 'mokugyo', nom: 'Mokugyo', kanji: '木魚', son: '../hannya-shingyo/mokugyo-papargyris.mp3', description: 'Poisson de bois : rythme certains sutra (Hannya shingyo, Daihishin darani, Kannon gyo).', technique: 'Un coup avant le titre, puis il démarre progressivement et garde son rythme, calé sur l’ino.', source: 'Document « SONS » (2009)' },
      { id: 'taiko', nom: 'Tambour (taiko)', kanji: '太鼓', description: 'Tambour : rythme l’Hannya shingyo et annonce l’heure à la fin du zazen.', technique: 'Démarre à « on », tout de suite après la grande cloche, et suit le rythme de l’ino.', source: 'Document « SONS » (2009)' },
    ],
    frappes: [
      { id: 'ken', nom: 'Ken', description: 'Coup normal.' },
      { id: 'gatsu', nom: 'Gatsu', description: 'Coup étouffé ou « cassé » : il demande à l’ino d’entonner.' },
      { id: 'nakkei', nom: 'Nakkei', description: 'Coup amorti : on tient le haut de la cloche avec la manche. Utilisé pour l’ekō des Patriarches.' },
      { id: 'cascade', nom: 'Cascade', description: 'Série de coups de plus en plus rapprochés.' },
    ],
    options: [
      { id: 'A', nom: 'Option A', description: 'Kin hin, puis reprise du zazen' },
      { id: 'B', nom: 'Option B', description: 'Tambour (taiko) pendant l’Hannya shingyo' },
    ],
    formules: [
      { id: 'tronc', nom: 'Tronc commun', options: [] },
      { id: 'kinhin', nom: 'Avec kin hin', options: ['A'] },
    ],
    choix: [
      { id: 'doshi-sutra', nom: 'Pendant le sutra, le doshi…', defaut: 'seiza', valeurs: [{ id: 'seiza', nom: 'reste en seiza (cérémonie ordinaire)' }, { id: 'debout', nom: 'monte à l’autel offrir le shoko' }] },
      { id: 'eko', nom: 'Quel ekō ?', defaut: 'simple', valeurs: [{ id: 'simple', nom: 'Ekō simple' }, { id: 'patriarches', nom: 'Ekō des Patriarches' }] },
    ],
    // Ce que ce modèle ajoute aux listes du module.
    lieux: [
      { id: 'tatami', nom: 'le tatami', ou: 'vers le tatami' },
      { id: 'sur-tatami', nom: 'sur le tatami', ou: 'sur le tatami' },
      { id: 'devant-tatami', nom: 'devant le tatami', ou: 'devant le tatami' },
      { id: 'derriere-doshi', nom: 'derrière le doshi', ou: 'derrière le doshi' },
      { id: 'devant-keisu', nom: 'devant la cloche (keisu)', ou: 'devant la cloche (keisu)' },
      { id: 'gaitan', nom: 'le gaitan', ou: 'dans le gaitan' },
      { id: 'poutre', nom: 'la poutre', ou: 'à la poutre' },
    ],
    personnes: [
      { id: 'ino', nom: 'l’ino' },
      { id: 'clochette', nom: 'la clochette (la personne)' },
      { id: 'kyosakuman', nom: 'le kyosakuman' },
    ],
    objets: [
      { id: 'boite-shoko', nom: 'la boîte à shoko' },
      { id: 'taiko', nom: 'le tambour (taiko)', instrument: true },
    ],
    conditions: [
      { id: 'ceremonie-non-ordinaire', nom: 'si la cérémonie n’est pas ordinaire' },
    ],
    glossaire: [
      { terme: 'Doshi', categorie: 'Rôles', definition: 'Officiant de la cérémonie. Il monte à l’autel en shashu et revient en gasshō.' },
      { terme: 'Godo', categorie: 'Rôles', definition: 'Celui qui dirige la méditation et l’enseignement. Dans le document, c’est lui qui devient le doshi pendant la cérémonie.' },
      { terme: 'Shusso', categorie: 'Rôles', definition: 'Sonne la cloche du shusso (début et fin de zazen, kin hin). Dans les dojos, il fait souvent office de premier kyosakuman.' },
      { terme: 'Kyosakuman', categorie: 'Rôles', definition: 'Le premier joue les cloches de l’autel et le bois ; le deuxième joue le mokugyo.' },
      { terme: 'Ino', categorie: 'Rôles', definition: 'Entonne les titres des sutra et des Quatre Vœux, chante seul les ekō, mains en gasshō.' },
      { terme: 'Doan', categorie: 'Rôles', definition: 'Dans le document : la personne qui joue la clochette (inkin).' },
      { terme: 'Jisha', categorie: 'Rôles', definition: 'Secrétaire du doshi.' },
      { terme: 'Dai keisu', categorie: 'Instruments et objets', definition: 'Grande cloche de l’autel. Trois sons : ken, gatsu, nakkei.' },
      { terme: 'Sho keisu', categorie: 'Instruments et objets', definition: 'Petite cloche de l’autel : signale les fins de sutra et les prosternations pendant l’ekō.' },
      { terme: 'Inkin', categorie: 'Instruments et objets', definition: 'Clochette à manche. Un coup se dit un « tchin ».' },
      { terme: 'Moppan', categorie: 'Instruments et objets', definition: 'Bois et maillet (han) : appelle au zazen.' },
      { terme: 'Mokugyo', categorie: 'Instruments et objets', definition: 'Poisson de bois qui rythme certains sutra.' },
      { terme: 'Taiko', categorie: 'Instruments et objets', definition: 'Tambour : rythme l’Hannya shingyo, annonce l’heure à la fin du zazen.' },
      { terme: 'Zagu', categorie: 'Instruments et objets', definition: 'Tissu que l’on déplie pour se prosterner.' },
      { terme: 'Shoko', categorie: 'Instruments et objets', definition: 'Encens en poudre offert à l’autel.' },
      { terme: 'Haishiki', categorie: 'Instruments et objets', definition: 'Le tatami du doshi, devant l’autel. Il y monte du pied gauche et en descend du pied droit.' },
      { terme: 'Gaitan', categorie: 'Instruments et objets', definition: 'Partie du dojo du côté de l’entrée, où la clochette attend le doshi à la sortie.' },
      { terme: 'Shijo', categorie: 'Sons', definition: 'Les trois coups de cloche du début du zazen.' },
      { terme: 'Ken', categorie: 'Sons', definition: 'Coup normal sur la grande cloche.' },
      { terme: 'Gatsu', categorie: 'Sons', definition: 'Coup étouffé ou « cassé » : demande à l’ino d’entonner le titre du sutra, des Quatre Vœux ou de l’ekō. Terme d’usage dans cette sangha.' },
      { terme: 'Nakkei', categorie: 'Sons', definition: 'Dans le document : coup amorti, pour l’ekō des Patriarches. Dans le glossaire du Sōtōshū, nakkei désigne le coup donné sur une cloche étouffée.' },
      { terme: 'Tchin', categorie: 'Sons', definition: 'Un coup de clochette.' },
      { terme: 'Kaijo', categorie: 'Sons', definition: '« Ouvrir le silence » : appel au zazen et fin de zazen, au bois.' },
      { terme: 'Uchi dashi', categorie: 'Sons', definition: 'Début d’une série au bois : moyen, moyen, faible, fort.' },
      { terme: 'Shashu', categorie: 'Gestes et postures', definition: 'Position des mains debout dans le dojo, au début de la cérémonie ou lors d’un déplacement.' },
      { terme: 'Hokkai jo in', categorie: 'Gestes et postures', definition: 'Position des mains pendant les sutra.' },
      { terme: 'Gasshō', categorie: 'Gestes et postures', definition: 'Mains jointes : pendant les Quatre Vœux, le Ji ho san shi et l’ekō des Patriarches.' },
      { terme: 'Pai, sanpai', categorie: 'Gestes et postures', definition: 'Prosternation ; sanpai : trois prosternations.' },
      { terme: 'Gasshoteizu', categorie: 'Gestes et postures', definition: 'Prosternation en restant en seiza, pendant l’ekō. On se redresse en gasshō, puis on remet les mains en hokkai jo in.' },
      { terme: 'Kin hin', categorie: 'Pratique', definition: 'Marche entre deux périodes de zazen, annoncée par deux coups de la cloche du shusso.' },
      { terme: 'Hannya shingyo', categorie: 'Chants et textes', definition: 'Sutra du cœur. Dans cette sangha, les Quatre Vœux en sont indissociables et se chantent juste après.' },
      { terme: 'Shigu seigan mon', categorie: 'Chants et textes', definition: 'Les Quatre Vœux.' },
      { terme: 'Ekō', categorie: 'Chants et textes', definition: 'Dédicace liée au sutra qui précède. Ekō simple ou ekō des Patriarches.' },
      { terme: 'Ji ho san shi', categorie: 'Chants et textes', definition: 'Il termine toujours l’enchaînement sutra, ekō, Ji ho san shi.' },
    ],
    etapes,
  });
})();
