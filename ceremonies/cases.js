// « Phrases à cases » du module Cérémonies.
// Une action = une action (verbe) + un objet ou une cible + des compléments facultatifs :
// où (repère spatial), manière, nombre, repère (quand), condition, référence.
// Ce fichier contient les listes (actions, lieux, personnes, objets, manières, conditions),
// la fabrication de la phrase à partir des cases, et la lecture d'une case de tableur
// (texte libre → actions découpées). Il sert au navigateur et à l'outil outils/generer-modele.js.
(function (racine) {
  'use strict';

  // ---------- Listes ----------
  // prep : comment la cible s'accroche au verbe, par liste. '' = complément direct,
  // 'ou' = forme locative du lieu (« à l'autel »), sinon la préposition elle-même.
  const VERBES = [
    { id: 'entrer', nom: 'Entrer', forme: 'entre', prep: { lieux: 'ou' } },
    { id: 'aller', nom: 'Aller', forme: 'va', prep: { lieux: 'ou', personnes: 'vers', objets: 'vers' } },
    { id: 's-asseoir', nom: 'S’asseoir', forme: 's’assoit', prep: { lieux: 'ou' } },
    { id: 'se-lever', nom: 'Se lever', forme: 'se lève', prep: {} },
    { id: 'gassho', nom: 'Faire gasshō', forme: 'fait gasshō', prep: { personnes: 'vers', objets: 'vers', lieux: 'vers' } },
    { id: 'saluer', nom: 'Saluer', forme: 'salue', prep: { personnes: '', objets: '' } },
    { id: 'se-prosterner', nom: 'Se prosterner', forme: 'se prosterne', prep: {} },
    { id: 'allumer', nom: 'Allumer', forme: 'allume', prep: { objets: '' } },
    { id: 'offrir', nom: 'Offrir', forme: 'offre', prep: { objets: '' } },
    { id: 'tendre', nom: 'Tendre', forme: 'tend', prep: { objets: '' } },
    { id: 'prendre', nom: 'Prendre', forme: 'prend', prep: { objets: '' } },
    { id: 'reposer', nom: 'Reposer', forme: 'repose', prep: { objets: '' } },
    { id: 'deplier', nom: 'Déplier', forme: 'déplie', prep: { objets: '' } },
    { id: 'replier', nom: 'Replier', forme: 'replie', prep: { objets: '' } },
    { id: 'jouer', nom: 'Jouer', forme: 'joue', prep: { objets: '' }, instruments: true },
    { id: 'chanter', nom: 'Chanter', forme: 'chante', prep: { objets: '' } },
    { id: 'entonner', nom: 'Entonner', forme: 'entonne', prep: { objets: '' } },
    { id: 'reciter', nom: 'Réciter', forme: 'récite', prep: { objets: '' } },
    { id: 'annoncer', nom: 'Annoncer', forme: 'annonce', prep: { objets: '' } },
    { id: 'zazen', nom: 'Zazen', forme: 'zazen', prep: {} },
    { id: 'kinhin', nom: 'Kinhin', forme: 'kinhin', prep: {} },
    { id: 'corriger', nom: 'Corriger', forme: 'corrige', prep: { objets: '' } },
    { id: 'attendre', nom: 'Attendre', forme: 'attend', prep: { personnes: '', objets: '' } },
    { id: 'installer', nom: 'Installer', forme: 'met en place', prep: { objets: '' } },
    // Ajoutés pour couvrir le tableau du dojo
    { id: 'marcher', nom: 'Marcher', forme: 'marche', prep: { lieux: 'ou' } },
    { id: 'se-tourner', nom: 'Se tourner', forme: 'se tourne', prep: { personnes: 'vers', objets: 'vers', lieux: 'vers' } },
    { id: 'rester', nom: 'Rester', forme: 'reste', prep: { lieux: 'ou' } },
    { id: 'accompagner', nom: 'Accompagner', forme: 'accompagne', prep: { personnes: '' } },
    { id: 'donner', nom: 'Donner', forme: 'donne', prep: { objets: '' } },
  ];
  // re : sert à reconnaître l'élément dans une case du tableur.
  const LIEUX = [
    { id: 'devant-autel', nom: 'devant l’autel', ou: 'devant l’autel', re: /devant l['’]autel/i },
    { id: 'derriere-autel', nom: 'derrière l’autel', ou: 'derrière l’autel', re: /derrière l['’]autel/i },
    { id: 'autel', nom: 'l’autel', ou: 'à l’autel', re: /l['’]autel/i },
    { id: 'sa-place', nom: 'sa place', ou: 'à sa place', re: /\bsa place\b/i },
    { id: 'porte', nom: 'la porte', ou: 'à la porte', re: /\bla porte\b/i },
    { id: 'face-mur', nom: 'face au mur', ou: 'face au mur', re: /face au mur/i },
    { id: 'face-sangha', nom: 'face à la sangha', ou: 'face à la sangha', re: /face à la sangha/i },
    { id: 'gauche-doshi', nom: 'à gauche du doshi', ou: 'à gauche du doshi', re: /à gauche du doshi/i },
    { id: 'droite-doshi', nom: 'à droite du doshi', ou: 'à droite du doshi', re: /à droite du doshi/i },
    { id: 'droite-shuso', nom: 'à droite du shuso', ou: 'à droite du shuso', re: /à droite du shuso/i },
    { id: 'entre-godo-shuso', nom: 'entre le godo et le shuso', ou: 'entre le godo et le shuso', re: /entre le godo et le shuso/i },
    { id: 'devant-zafuton', nom: 'devant son zafuton', ou: 'devant son zafuton', re: /devant son zafuton/i },
    { id: 'rangs', nom: 'le long des rangs', ou: 'le long des rangs', re: /le long des rangs/i },
    { id: 'salle', nom: 'la salle', ou: 'dans la salle', re: /tour de salle|\bla salle\b/i },
  ];
  const PERSONNES = [
    { id: 'bouddha', nom: 'le Bouddha', re: /Bouddha/i },
    { id: 'rang-face', nom: 'le rang d’en face', re: /rang d['’]en face/i },
    { id: 'voisins', nom: 'ses voisins', re: /voisins/i },
    { id: 'sangha', nom: 'la sangha', re: /\bla sangha\b/i },
    { id: 'officiant', nom: 'l’officiant', re: /l['’]officiant/i },
    { id: 'doshi', nom: 'le doshi', re: /\b(?:le|du) doshi\b/i },
    { id: 'godo', nom: 'le godo', re: /\b(?:le|du) godo\b/i },
    { id: 'shuso', nom: 'le shuso', re: /\b(?:le|du) shuso\b/i },
    { id: 'jisha', nom: 'le jisha', re: /\b(?:le|du) jisha\b/i },
    { id: 'kokyo', nom: 'le kokyo', re: /\b(?:le|du) kokyo\b/i },
    { id: 'joueur-inkin', nom: 'l’inkin (la personne)', re: /vers l['’]inkin/i },
  ];
  const OBJETS = [
    { id: 'bougie', nom: 'la bougie', re: /bougie/i },
    { id: 'charbon', nom: 'le charbon', re: /charbon/i },
    { id: 'baton-encens', nom: 'le bâton d’encens', re: /bâton d['’]encens/i },
    { id: 'encens', nom: 'l’encens', re: /encens/i },
    { id: 'shoko', nom: 'le shoko', re: /shoko/i },
    { id: 'zafuton', nom: 'son zafuton', re: /zafuton/i },
    { id: 'zafu', nom: 'son zafu', re: /zafu\b/i },
    { id: 'zagu', nom: 'son zagu', re: /zagu/i },
    { id: 'kyosaku', nom: 'le kyosaku', re: /kyosaku/i },
    { id: 'instruments', nom: 'ses instruments', re: /ses instruments/i },
    { id: 'postures', nom: 'les postures', re: /postures/i },
    { id: 'kusen', nom: 'le kusen', re: /kusen/i },
    { id: 'ceremonie', nom: 'la cérémonie', re: /la cérémonie/i },
    { id: 'sutra-coeur', nom: 'le Sutra du cœur', re: /Maka Hannya|sutra du c[œo]/i },
    { id: 'quatre-voeux', nom: 'les quatre vœux', re: /4 v[œo]ux|quatre v[œo]ux/i },
    { id: 'eko', nom: 'l’ekō', re: /l['’]ek[ōo]/i },
    { id: 'ji-ho', nom: 'le Ji ho san shi', re: /Ji ho san shi/i },
    { id: 'titre', nom: 'le titre', re: /\ble titre\b/i },
    { id: 'chant', nom: 'le chant', re: /\ble chant\b/i },
    // Les instruments sont des objets : ils vont avec l'action « Jouer ».
    { id: 'daikei', nom: 'le daikei', instrument: true, re: /daikei|keisu/i },
    { id: 'shokei', nom: 'le shōkei', instrument: true, re: /sh[ōo]kei/i },
    { id: 'inkin', nom: 'l’inkin', instrument: true, re: /clochette|\binkin\b/i },
    { id: 'mokugyo', nom: 'le mokugyo', instrument: true, re: /mokugyo/i },
    { id: 'moppan', nom: 'le moppan', instrument: true, re: /moppan/i },
  ];
  const MANIERES = [
    ['mains en gasshō', /(?:mains )?en gassh[ōo]/i], ['mains en shashu', /(?:mains )?en shashu/i], ['mains en hokkai jō in', /(?:mains )?en hokkai[ -]?j[ōo][ -]?in/i],
    ['en silence', /en silence/i], ['en seiza', /en seiza/i], ['immobile', /immobile/i], ['lentement', /lentement/i],
    ['debout', /\bdebout\b/i], ['assis', /\bassis\b/i], ['seul', /\bseul\b/i],
    ['en dernier', /en dernier/i], ['pied droit en premier', /pied droit en premier/i], ['pied gauche en premier', /pied gauche en premier/i],
    ['par la droite', /par la droite/i], ['par la gauche', /par la gauche(?! de)/i], ['par le pied droit', /par le pied droit/i], ['par le pied gauche', /par le pied gauche/i], ['en suivant le kokyo', /en suivant le kokyo/i], ['en suivant le doshi', /en suivant le doshi/i],
    ['kyosaku tenu vertical', /kyosaku tenu vertical/i], ['à vitesse normale', /vitesse « ?normale ?»|vitesse normale/i],
  ];
  // si : la condition dépend du choix « Qui officie ? » (remplie à la conversion).
  const CONDITIONS = [
    { id: 'si-officie', nom: 'si c’est lui qui officie' },
    { id: 'si-n-officie-pas', nom: 's’il n’officie pas' },
    { id: 'au-besoin', nom: 'au besoin' },
    { id: 'si-jisha-non', nom: 'si le jisha ne fait pas l’offrande' },
  ];
  const LISTES = { lieux: LIEUX, personnes: PERSONNES, objets: OBJETS };
  const NOMS_LISTES = { lieux: 'Lieux', personnes: 'Personnes', objets: 'Objets' };
  const FRAPPES_COURT = { ken: 'Ken', gatsu: 'Gatsu', cascade: 'cascade' };

  // Liste complète pour une cérémonie : le catalogue + ce que la cérémonie a ajouté (c.lieux, c.personnes, c.objets).
  function liste(c, nom) {
    const propres = (c && Array.isArray(c[nom])) ? c[nom] : [];
    return LISTES[nom].filter(x => !propres.some(p => p.id === x.id)).concat(propres);
  }
  function element(c, ref) {
    if (!ref) return null;
    const k = ref.indexOf(':'), nomListe = ref.slice(0, k), id = ref.slice(k + 1);
    if (!LISTES[nomListe]) return null;
    const e = liste(c, nomListe).find(x => x.id === id);
    return e ? { liste: nomListe, item: e } : null;
  }
  const verbe = id => VERBES.find(v => v.id === id) || null;
  const condition = (c, id) => ((c && c.conditions) || []).concat(CONDITIONS).find(x => x.id === id) || null;

  // ---------- De cases à phrase ----------
  const contracte = t => t.replace(/\bà le /g, 'au ').replace(/\bà les /g, 'aux ').replace(/\bde le /g, 'du ').replace(/\bde les /g, 'des ');
  const majuscule = t => t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  function texteSons(c, sons) {
    return (sons || []).map(s => {
      let d;
      if (s.motif && s.motif.length) d = s.motif.map(m => FRAPPES_COURT[m] || m).join(', ');
      else if (s.serie) d = s.serie;
      else if (s.frappe === 'cascade') d = 'cascade';
      else if (s.coups) d = s.coups + (s.coups > 1 ? ' coups' : ' coup') + (s.frappe ? ' (' + (FRAPPES_COURT[s.frappe] || s.frappe) + ')' : '');
      else if (s.continu) d = 'en continu';
      else d = s.frappe ? 'coups ' + (FRAPPES_COURT[s.frappe] || s.frappe) : '';
      return [d, s.quand].filter(Boolean).join(' ');
    }).filter(Boolean).join(', puis ');
  }
  // Fabrique la phrase affichée à partir des cases d'une action.
  function phrase(c, a) {
    const v = verbe(a.verbe);
    if (!v) return a.texte || '';
    let t = v.forme;
    const cib = element(c, a.cible);
    if (cib) {
      const p = v.prep[cib.liste];
      t += ' ' + (p === 'ou' ? (cib.item.ou || 'à ' + cib.item.nom) : p ? p + ' ' + cib.item.nom : cib.item.nom);
    }
    if (a.nombre) t += ' ' + a.nombre + ' fois';
    if (v.id === 'jouer') { const d = texteSons(c, a.sons); if (d) t += ' : ' + d; }
    const lieu = element(c, a.lieu);
    if (lieu) t += ' ' + (lieu.item.ou || 'à ' + lieu.item.nom);
    const vers = element(c, a.vers);
    if (vers) t += ' vers ' + vers.item.nom;
    if (a.maniere) t += ', ' + a.maniere;
    if (a.signal && a.signal.texte) t += ', ' + a.signal.texte;
    return majuscule(contracte(t));
  }

  // ---------- D'une case de tableur à des actions ----------
  const NOMBRES = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7 };
  // Début de fragment → action. L'ordre compte.
  const DEBUTS = [
    [/^(?:(?:\d+|trois) fois gassh[ōo] puis pai|(?:fait |redescend faire )?sanpai|se prosterne)/i, 'se-prosterner', { nombre: 3 }],
    [/^(?:fait gassh[ōo]|gassh[ōo]|revient en gassh[ōo])/i, 'gassho'],
    [/^allume/i, 'allumer'], [/^attend/i, 'attendre'], [/^entre\b/i, 'entrer'],
    [/^(?:va|passe|retourne|retour|redescend|monte|remonte)\b/i, 'aller'],
    [/^(?:demi-tour|se retourne|fait face)/i, 'se-tourner'],
    [/^(?:s['’]assoit|assise?\b|se met en position)/i, 's-asseoir'],
    [/^(?:se lève|tout le monde se lève)/i, 'se-lever'],
    [/^tend\b/i, 'tendre'], [/^(?:plante|offre|fait l['’]offrande|offrande)/i, 'offrir'],
    [/^déplie/i, 'deplier'], [/^replie/i, 'replier'], [/^prend\b/i, 'prendre'], [/^repose/i, 'reposer'],
    [/^zazen/i, 'zazen'], [/^kinhin/i, 'kinhin'], [/^corrige/i, 'corriger'],
    [/^(?:fait un tour|marche)/i, 'marcher'],
    [/^(?:salue|fait une salutation|s['’]incline)/i, 'saluer'],
    [/^(?:chante|continue de chanter|mène le chant)/i, 'chanter'],
    [/^(?:lance|entonne)/i, 'entonner'], [/^annonce/i, 'annoncer'], [/^récite/i, 'reciter'],
    [/^(?:met en place|aménagement)/i, 'installer'],
    [/^reste debout/i, 'rester'], [/^(?:debout|en silence)/i, 'rester', { premierSeulement: true }],
    [/^accompagne/i, 'accompagner'], [/^donne le kusen/i, 'donner'],
  ];
  const debut = (t, premier) => DEBUTS.find(d => d[0].test(t) && (premier || !(d[2] && d[2].premierSeulement))) || null;
  const REPERE = /(?:^|[\s,])((?:sur (?:le|la) (?:gassh[ōo]|salut|salutation)|quand |après |avant |pendant |à la fin |à partir |au premier |au son |en même temps |à chaque |entre les deux |jusqu['’]|à « |au \de |au gassh[ōo]|pour demander |pour clôturer|pour le mantra|pour s['’]incliner|pour se redresser|qui ponctuent ).*)$/i;
  const SON = /^(?:(.*?)\s*:\s*)?(?:(?:petite cloche|clochette|cloche)\s*\((sh[ōo]kei|inkin|daikei)\)|(mokugyo))\s*:\s*(.+)$/i;
  const horsParentheses = (t, fn) => { let n = 0, out = '', buf = ''; const vide = () => { out += fn(buf); buf = ''; }; for (const ch of t) { if (ch === '(') { if (!n) vide(); n++; out += ch; } else if (ch === ')') { n = Math.max(0, n - 1); out += ch; } else if (n) out += ch; else buf += ch; } vide(); return out; };
  const SEP = '\u0001';
  // Coupe un texte sur un séparateur, sans toucher à ce qui est entre parenthèses.
  const coupe = (t, re) => horsParentheses(t, s => s.replace(re, SEP)).split(SEP).map(s => s.trim()).filter(Boolean);

  function lireSons(instrument, desc) {
    const sons = [];
    if (instrument === 'mokugyo') {
      if (/coup unique/i.test(desc)) return [{ instrument, coups: 1 }];
      const m = /donne le rythme[, ]*(.*)$/i.exec(desc);
      return [{ instrument, continu: true, ...(m && m[1] ? { quand: m[1].replace(/, /g, ' ; ') } : {}) }];
    }
    const motif = /\(((?:Ken|Gatsu)(?:, (?:Ken|Gatsu))+)\)/i.exec(desc);
    if (motif) { const m = motif[1].split(', ').map(x => x.toLowerCase()); return [{ instrument, motif: m, coups: m.length }]; }
    for (let part of desc.split(/, (?=(?:(?:un|deux|trois) )?coups? )/i)) {
      const s = { instrument };
      let m = /^(un|une|deux|trois|quatre|cinq|six|sept) coups?\b\s*/i.exec(part);
      if (m) { s.coups = NOMBRES[m[1].toLowerCase()]; part = part.slice(m[0].length); }
      m = /^coups? (?:normal|normaux) \(Ken\)\s*/i.exec(part);
      if (m) { s.frappe = 'ken'; if (/^coup /i.test(m[0])) s.coups = 1; part = part.slice(m[0].length); }
      m = /^coups? étouffés? \(Gatsu\)\s*/i.exec(part);
      if (m) { s.frappe = 'gatsu'; if (/^coup /i.test(m[0])) s.coups = 1; part = part.slice(m[0].length); }
      m = /^cascade\s*/i.exec(part);
      if (m) { s.frappe = 'cascade'; part = part.slice(m[0].length); }
      part = part.replace(/^[,;:\s]+/, '').trim();
      if (part) s.quand = part;
      sons.push(s);
    }
    return sons;
  }
  function trouver(listeNom, texte, pris) {
    // Renvoie les éléments reconnus dans le texte, par position, sans chevauchement.
    const out = [];
    for (const it of LISTES[listeNom]) {
      const m = it.re.exec(texte);
      if (!m) continue;
      const d = m.index, f = d + m[0].length;
      if (pris.some(p => d < p[1] && f > p[0])) continue;
      pris.push([d, f]); out.push({ ref: listeNom + ':' + it.id, pos: d, item: it });
    }
    return out;
  }
  function lireFragment(texte, premier) {
    const a = { texte: majuscule(texte) };
    const cond = /\(si le jisha ne la fait pas\)/i.exec(texte);
    if (cond) { a.condition = 'si-jisha-non'; a.texte = majuscule(texte.replace(cond[0], '').replace(/\s+,/g, ',').trim()); }
    if (/\bsi nécessaire\b/i.test(texte)) a.condition = 'au-besoin';
    const d = debut(texte, premier);
    if (!d) return a;
    a.verbe = d[1];
    if (d[2] && d[2].nombre) a.nombre = d[2].nombre;
    const v = verbe(a.verbe), nu = horsParentheses(texte, s => s);
    const pris = [], trouves = [];
    for (const l of ['lieux', 'personnes', 'objets']) trouves.push(...trouver(l, nu.replace(/\([^()]*\)/g, m => ' '.repeat(m.length)), pris));
    trouves.sort((x, y) => x.pos - y.pos);
    const cible = trouves.find(t => t.ref.split(':')[0] in v.prep && !t.item.instrument);
    if (cible) a.cible = cible.ref;
    // « vers le doshi », « face au godo » : vers qui le geste est fait (si ce n'est pas déjà la cible).
    const vers = trouves.find(t => t !== cible && !t.item.instrument && (t.ref.startsWith('personnes:') || t.item.nom !== t.item.ou) && /(?:\bvers|\bface (?:à|au|aux)|\ben direction (?:de|du|des))\s+(?:l['’]|le |la |les )?$/i.test(nu.slice(0, t.pos).replace(/(?:l['’]|le |la |les |au |aux |du |des )$/i, m => /^(au|aux|du|des) $/i.test(m) ? 'à ' : m)));
    if (vers) a.vers = vers.ref;
    const lieu = trouves.find(t => t !== cible && t !== vers && t.ref.startsWith('lieux:'));
    if (lieu) a.lieu = lieu.ref;
    const sansPar = texte.replace(/\([^()]*\)/g, ' ');
    const man = MANIERES.map(m => [m[0], sansPar.search(m[1])]).filter(m => m[1] >= 0).sort((x, y) => x[1] - y[1]).map(m => m[0]);
    if (man.length) a.maniere = man.join(', ');
    const r = REPERE.exec(texte);
    if (r) a.signal = { texte: r[1].trim() };
    return a;
  }
  function lireGestes(segment) {
    // « pour demander le kyosaku : gasshō » → le début devient le repère du geste.
    let m = /^(pour [^:]+?)\s*:\s*(.+)$/i.exec(segment);
    if (m) return lireGestes(m[2]).map((a, i) => i ? a : { ...a, texte: majuscule(segment), signal: { texte: m[1] } });
    // « entre au son du moppan : entre par… » → deux temps.
    m = /^([^:(]+?)\s:\s(.+)$/.exec(segment);
    if (m && debut(m[1], true)) return lireGestes(m[1]).concat(lireGestes(m[2]));
    const jetons = [];
    for (const morceau of coupe(segment, /,\s+puis\s+|\s+puis\s+(?!pai)|\s+et\s+(?=(?:offre|fait sanpai|reste debout)\b)/gi)) {
      coupe(morceau, /,\s+/g).forEach((j, i) => {
        const j2 = j.replace(/^puis\s+/i, '');
        if ((i === 0 || debut(j2, false)) || !jetons.length) jetons.push(j2); else jetons[jetons.length - 1] += ', ' + j2;
      });
    }
    return jetons.map((j, i) => lireFragment(j, i === 0));
  }
  // Lit une case entière du tableur. Renvoie une liste d'actions (sans les rôles).
  function analyser(cellule) {
    let t = String(cellule || '').replace(/\s*\((?:[^()]*\bvoir\b[^()]*)\)/gi, '').trim();
    if (!t) return [];
    let m = /^si officiant\s*:\s*(.+?)\s*;\s*sinon\s*:\s*(.+)$/i.exec(t);
    if (m) return analyser(m[1]).map(a => ({ ...a, condition: 'si-officie' })).concat(analyser(m[2]).map(a => ({ ...a, condition: 'si-n-officie-pas' })));
    const out = [];
    for (const ligne of t.split(/\n+/)) for (let seg of coupe(ligne.replace(/^[→\-•\s]+/, ''), /\s*;\s+/g)) {
      m = /^frappe le moppan(?:\s*\(([^)]+)\))?/i.exec(seg);
      if (m) { out.push({ texte: majuscule(seg), verbe: 'jouer', cible: 'objets:moppan', sons: [{ instrument: 'moppan', ...(m[1] ? { serie: m[1].trim() } : {}) }] }); continue; }
      m = SON.exec(seg);
      if (m) {
        const instrument = (m[2] || m[3]).toLowerCase().replace('ō', 'o');
        // Ce qui suit le son et commence par un verbe (« …, fait gasshō vers le doshi ») est un autre geste.
        const parts = coupe(m[4], /,\s+(?=(?:fait gassh|gassh|salue|se lève|s['’]assoit)\S*)/gi);
        const sons = lireSons(instrument, parts[0]);
        const a = { texte: majuscule(seg.slice(0, seg.length - m[4].length) + parts[0]), verbe: 'jouer', cible: 'objets:' + instrument, sons };
        if (sons.length === 1 && sons[0].quand && !sons[0].continu) { a.signal = { texte: sons[0].quand }; delete sons[0].quand; }
        out.push(a);
        for (const p of parts.slice(1)) out.push(...lireGestes(p));
        continue;
      }
      out.push(...lireGestes(seg));
    }
    return out;
  }

  const api = { VERBES, LIEUX, PERSONNES, OBJETS, MANIERES, CONDITIONS, LISTES, NOMS_LISTES, liste, element, verbe, condition, phrase, texteSons, analyser, majuscule };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  racine.DG_CASES = api;
})(typeof window !== 'undefined' ? window : globalThis);
