// Import d'un tableau Excel (.xlsx) de cérémonie : une ligne par étape, une colonne par rôle.
// Lit le fichier dans le navigateur (rien n'est envoyé), découpe chaque case en actions
// grâce à cases.js, et renvoie une cérémonie au format du module.
// Sert aussi à outils/generer-modele.js pour refaire le modèle du dojo d'un coup.
(function (racine) {
  'use strict';
  const CASES = (typeof module !== 'undefined' && module.exports) ? require('./cases.js') : racine.DG_CASES;

  // ---------- Ce que le tableau ne dit pas : kanji, fonctions, places, instruments ----------
  const BASE = {
    roles: {
      jisha: { kanji: '侍者', fonctions: ['encens'], place: { zazen: 'Face au mur.', ceremonie: 'Accompagne le doshi à l’autel.' }, objets: ['Charbon et shoko (encens en poudre)', 'Bâton d’encens', 'Zafuton de prosternation du doshi'] },
      jikido: { kanji: '直堂', fonctions: ['han'], place: { zazen: 'Face au mur.', ceremonie: 'Debout avec la sangha.' }, objets: ['Bougie et allumettes', 'Moppan et son maillet'] },
      shuso: { kanji: '首座', fonctions: ['shokei-zazen', 'kyosaku'], place: { zazen: 'Face à la sangha, à gauche du doshi.' }, objets: ['Shōkei et son maillet', 'Kyosaku'] },
      godo: { kanji: '後堂', fonctions: ['kusen', 'kyosaku'], place: { zazen: 'Face à la sangha, à droite du doshi.' }, objets: ['Kyosaku'] },
      doshi: { kanji: '導師', fonctions: ['officiant'], place: { zazen: 'Face à la sangha.', ceremonie: 'Sur le zafuton de prosternation, devant l’autel.' }, objets: ['Zagu'] },
      inkin: { fonctions: ['inkin'], place: { zazen: 'Face au mur.' }, objets: ['Inkin et sa baguette'] },
      doan: { fonctions: ['daikei', 'shokei-ceremonie'], place: { zazen: 'Face au mur.', ceremonie: 'En seiza devant le daikei.' }, objets: ['Daikei et son bâton', 'Shōkei et son maillet'] },
      kokyo: { fonctions: ['voix'], place: { zazen: 'Face au mur.' }, objets: [] },
      fukudo: { fonctions: ['mokugyo'], place: { zazen: 'Face au mur.', ceremonie: 'Devant le mokugyo.' }, objets: ['Mokugyo et son maillet'] },
      sangha: { fonctions: ['sangha'], place: { zazen: 'Face au mur.', ceremonie: 'Debout en deux rangs.' }, objets: [] },
    },
    fonctions: [
      { id: 'officiant', nom: 'Officie et se prosterne' }, { id: 'kusen', nom: 'Guide la pratique, donne le kusen' },
      { id: 'kyosaku', nom: 'Porte le kyosaku, corrige les postures' }, { id: 'shokei-zazen', nom: 'Ouvre et ferme le zazen au shōkei' },
      { id: 'encens', nom: 'Prépare et présente l’encens' }, { id: 'han', nom: 'Frappe le moppan, allume la bougie' },
      { id: 'inkin', nom: 'Joue l’inkin' }, { id: 'daikei', nom: 'Joue le daikei' }, { id: 'shokei-ceremonie', nom: 'Joue le shōkei pendant la cérémonie' },
      { id: 'voix', nom: 'Lance les chants, récite l’ekō' }, { id: 'mokugyo', nom: 'Joue le mokugyo' }, { id: 'sangha', nom: 'Pratique avec la communauté' },
    ],
    instruments: [
      { id: 'moppan', nom: 'Moppan', kanji: '木版', description: 'Planche de bois suspendue, frappée au maillet pour appeler au zazen.', technique: 'Frappé avant le zazen en trois séries : sept coups, cinq coups, trois coups.', source: 'Tableau du dojo' },
      { id: 'shokei', nom: 'Shōkei', kanji: '小鏧', son: '../hannya-shingyo/shokei-12cm.mp3', description: 'Petite cloche en forme de bol ; signale le début et la fin du zazen et accompagne certains passages des chants.', technique: 'Se frappe en Ken (coup normal) ou en Gatsu (coup étouffé).', source: 'Glossaire sotozen.com ; tableau du dojo' },
      { id: 'daikei', nom: 'Daikei', kanji: '大鏧', son: '../hannya-shingyo/keisu-39cm.mp3', description: 'Grande cloche en forme de bol, posée sur un coussin et frappée avec un bâton ; ponctue les chants. Aussi appelée keisu.', technique: 'Deux frappes : Ken, le coup normal qu’on laisse résonner, et Gatsu, le coup étouffé.', source: 'Glossaire sotozen.com ; tableau du dojo' },
      { id: 'inkin', nom: 'Inkin', kanji: '引鏧', description: 'Clochette à main montée sur un manche ; marque les déplacements et les saluts du doshi.', technique: 'Un coup à chaque geste du doshi à marquer ; la cascade est une série de coups de plus en plus rapprochés.', source: 'Glossaire sotozen.com ; tableau du dojo' },
      { id: 'mokugyo', nom: 'Mokugyo', kanji: '木魚', son: '../hannya-shingyo/mokugyo-papargyris.mp3', description: '« Poisson de bois » : tambour de bois creux frappé au maillet, qui donne le rythme du chant.', technique: 'Une frappe par syllabe.', source: 'Tableau du dojo' },
    ],
    frappes: [
      { id: 'ken', nom: 'Ken', description: 'Coup normal, qu’on laisse résonner.' },
      { id: 'gatsu', nom: 'Gatsu', description: 'Coup étouffé.' },
      { id: 'cascade', nom: 'Cascade', description: 'Série de coups de plus en plus rapprochés.' },
    ],
    // Nom affiché et explication simple d'une grande phase, d'après le libellé du tableau (et son rang quand il revient).
    phases: {
      'avant zazen': [{ nom: 'Avant le zazen', bref: 'On arrive en silence. On entre par la gauche de la porte, pied gauche en premier, on salue l’autel mains jointes et on rejoint sa place. Le moppan appelle au zazen.' }],
      'pendant zazen': [
        { nom: 'Zazen, 1re période', bref: 'Première assise, immobile et silencieuse, d’environ trente minutes. Deux coups de petite cloche la ferment.' },
        { nom: 'Zazen, 2e période', bref: 'Deuxième assise. Le godo donne l’enseignement oral (kusen). On chante ensemble les quatre vœux, puis un coup de petite cloche clôt le zazen.' }],
      kinhin: [{ nom: 'Kinhin', bref: 'On se lève, on salue, puis on marche lentement en file. Un coup de petite cloche y met fin et chacun revient à sa place d’un pas normal.' }],
      'après zazen': [{ nom: 'Après le zazen', bref: 'On se lève lentement et on salue son zafu, puis le rang d’en face.' }],
      'cérémonie': [{ nom: 'Cérémonie', bref: 'L’inkin annonce la cérémonie. On chante le Sutra du cœur, le kokyo récite l’ekō (la dédicace), puis on chante le Ji ho san shi. On termine debout par trois prosternations et les saluts.' }],
    },
    exclusions: [['D', 'E']],
    formules: [
      { id: 'tronc', nom: 'Tronc commun', options: [] },
      { id: 'courte', nom: 'Courte', options: ['B', 'E'] },
      { id: 'complete', nom: 'Complète', options: ['A', 'C', 'D'] },
    ],
    glossaire: [
      { terme: 'osaeru', categorie: 'Sons', definition: 'Terme officiel de l’école Sōtō (押さえる) : étouffer la cloche avec la main. Correspond au coup Gatsu du dojo.' },
      { terme: 'nakkei', categorie: 'Sons', definition: 'Terme officiel de l’école Sōtō (捺鏧) : coup donné avec le talon du bâton sur la cloche déjà étouffée.' },
    ],
    // Références au Gyōji kihan (trad. Foulk, 2008), attachées aux actions concernées.
    refs: [
      { moment: /période zazen/i, instrument: 'shokei', ref: 'GK p. 6, 43-44, 512' },
      { option: 'C', pasVerbe: 'zazen', ref: 'GK p. 6-9, 43, 55' },
      { moment: /demande de l['’]assise/i, instrument: 'inkin', ref: 'GK p. 13, 519' },
      { moment: /ouverture directe du sutra/i, instrument: 'daikei', ref: 'GK p. 521, 541' },
      { moment: /^sanpai/i, instrument: 'inkin', ref: 'GK p. 519' },
      { moment: /chant du sutra/i, verbe: 'entonner', ref: 'GK p. 529' },
      { moment: /chant du sutra/i, verbe: 'chanter', maniere: /hokkai/i, ref: 'GK p. 534' },
      { moment: /chant du sutra/i, texte: /ponctuent|mantra/i, ref: 'GK p. 541-542' },
      { option: 'F', instrument: 'daikei', ref: 'GK p. 541-542' },
      { option: 'F', role: 'doshi', ref: 'GK p. 71' },
      { moment: /^ek[ōo]/i, verbe: 'reciter', ref: 'GK p. 576' },
    ],
  };

  // ---------- Lecture du fichier .xlsx (un zip de fichiers XML) ----------
  async function degonfle(octets) {
    const flux = new Blob([octets]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(flux).arrayBuffer());
  }
  async function lireZip(tampon) {
    const o = new Uint8Array(tampon), v = new DataView(o.buffer, o.byteOffset, o.byteLength);
    let fin = o.length - 22;
    while (fin >= 0 && v.getUint32(fin, true) !== 0x06054b50) fin--;
    if (fin < 0) throw new Error('zip');
    const n = v.getUint16(fin + 10, true);
    let p = v.getUint32(fin + 16, true);
    const fichiers = {}, texte = new TextDecoder('utf-8');
    for (let i = 0; i < n; i++) {
      if (v.getUint32(p, true) !== 0x02014b50) throw new Error('zip');
      const methode = v.getUint16(p + 10, true), taille = v.getUint32(p + 20, true);
      const lNom = v.getUint16(p + 28, true), lSup = v.getUint16(p + 30, true), lCom = v.getUint16(p + 32, true), local = v.getUint32(p + 42, true);
      const nom = texte.decode(o.subarray(p + 46, p + 46 + lNom));
      const debut = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
      fichiers[nom] = { methode, donnees: o.subarray(debut, debut + taille) };
      p += 46 + lNom + lSup + lCom;
    }
    return async nom => {
      const f = fichiers[nom];
      if (!f) return null;
      return texte.decode(f.methode === 0 ? f.donnees : await degonfle(f.donnees));
    };
  }
  const xml = t => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d)).replace(/&#x([0-9a-f]+);/gi, (m, d) => String.fromCodePoint(parseInt(d, 16))).replace(/_x000D_/g, '').replace(/&amp;/g, '&');
  const textes = bloc => [...bloc.replace(/<rPh[\s\S]*?<\/rPh>/g, '').matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map(m => xml(m[1])).join('');
  const attr = (balise, nom) => { const m = new RegExp('\\b' + nom + '="([^"]*)"').exec(balise); return m ? xml(m[1]) : null; };
  // Renvoie { feuilles: [{ nom, cellules: { 'F4': 'texte' }, fusions: ['F5:O5'] }] }
  async function lire(tampon) {
    const ouvrir = await lireZip(tampon);
    const classeur = await ouvrir('xl/workbook.xml'), liens = await ouvrir('xl/_rels/workbook.xml.rels');
    if (!classeur || !liens) throw new Error('xlsx');
    const cibles = {};
    for (const m of liens.matchAll(/<Relationship\b[^>]*>/g)) cibles[attr(m[0], 'Id')] = attr(m[0], 'Target');
    const partages = [], sst = await ouvrir('xl/sharedStrings.xml');
    if (sst) for (const m of sst.matchAll(/<si>([\s\S]*?)<\/si>|<si\/>/g)) partages.push(m[1] ? textes(m[1]) : '');
    const feuilles = [];
    for (const m of classeur.matchAll(/<sheet\b[^>]*>/g)) {
      let chemin = cibles[attr(m[0], 'r:id')] || '';
      chemin = chemin.startsWith('/') ? chemin.slice(1) : 'xl/' + chemin;
      const contenu = await ouvrir(chemin);
      if (!contenu) continue;
      const cellules = {};
      for (const c of contenu.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const ref = attr(c[1], 'r'), type = attr(c[1], 't'), corps = c[2] || '';
        const val = /<v>([\s\S]*?)<\/v>/.exec(corps);
        let t = '';
        if (type === 's') t = val ? partages[+val[1]] || '' : '';
        else if (type === 'inlineStr') t = textes(corps);
        else if (val) t = xml(val[1]);
        if (ref && t !== '') cellules[ref] = t;
      }
      const fusions = [...contenu.matchAll(/<mergeCell\b[^>]*>/g)].map(x => attr(x[0], 'ref'));
      feuilles.push({ nom: attr(m[0], 'name'), cellules, fusions });
    }
    return { feuilles };
  }

  // ---------- Du tableau à la cérémonie ----------
  const colNum = l => l.split('').reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
  const colNom = n => { let s = ''; while (n > 0) { s = String.fromCharCode(65 + (n - 1) % 26) + s; n = Math.floor((n - 1) / 26); } return s; };
  const coupeRef = r => { const m = /^([A-Z]+)(\d+)$/.exec(r); return [colNum(m[1]), +m[2]]; };
  const sansAccent = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const identifiant = t => sansAccent(String(t)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function convertir(classeur, infos = {}) {
    // La feuille du déroulé : celle dont la ligne 3 a « Option » et « phase » ; à défaut, la première.
    const f = classeur.feuilles.find(x => Object.keys(x.cellules).some(k => /^[A-E]3$/.test(k) && /option/i.test(x.cellules[k]))) || classeur.feuilles[0];
    const val = (c, l) => f.cellules[colNom(c) + l] || '';
    const ligneMax = Math.max(...Object.keys(f.cellules).map(k => coupeRef(k)[1]));
    // Colonnes de repère (ligne 3) et colonnes de rôles (ligne 1, à droite des repères)
    const repere = {}; let derniere = 0;
    for (let c = 1; c <= 12; c++) {
      const t = val(c, 3).toLowerCase();
      if (!t) continue;
      derniere = c;
      if (/minute/.test(t)) repere.minute = c; else if (/ordre/.test(t)) repere.ordre = c; else if (/^option/.test(t)) repere.option = c;
      else if (/phase/.test(t) && !/moment/.test(t)) repere.phase = c; else if (/moment/.test(t)) repere.moment = c;
    }
    if (!repere.moment) throw new Error('colonnes');
    const roles = [], cols = [];
    let c = derniere + 1;
    for (; val(c, 1); c++) {
      const nom = val(c, 1).trim(), id = identifiant(nom), b = BASE.roles[id] || {};
      roles.push({ id, nom, ...(b.kanji ? { kanji: b.kanji } : {}), fonctions: b.fonctions || [], ...(id !== 'godo' ? { obligatoire: true } : {}),
        resume: val(c, 2).trim(), place: b.place || {}, objets: b.objets || [] });
      cols.push(c);
    }
    if (!roles.length) throw new Error('roles');
    // Options : après la case « Options : » de la ligne 1
    const options = [];
    for (let k = c; k < c + 30; k++) {
      if (!/^options/i.test(val(k, 1))) continue;
      for (let j = k + 1; val(j, 1); j++) {
        const nom = val(j, 1).trim();
        if (/tronc commun/i.test(nom)) continue;
        const o = { id: nom, nom: 'Option ' + nom, description: val(j, 2).trim() };
        options.push(o);
      }
      break;
    }
    for (const [a, b] of BASE.exclusions) { const oa = options.find(o => o.id === a), ob = options.find(o => o.id === b); if (oa && ob) { oa.exclut = [b]; ob.exclut = [a]; } }
    // Fusions : case de départ → dernière colonne
    const fusion = {};
    for (const r of f.fusions) { const [d, e] = r.split(':'); if (!e) continue; const [c1, l1] = coupeRef(d), [c2, l2] = coupeRef(e); if (l1 === l2) fusion[d] = c2; }

    const phases = [], vus = {}, etapes = [], instruments = new Set();
    let phasePrec = null, phaseId = null;
    const aRole = id => roles.some(r => r.id === id);
    for (let l = 4; l <= ligneMax; l++) {
      let moment = val(repere.moment, l).trim();
      if (!moment || /^option\b/i.test(moment)) continue;
      const optTexte = repere.option ? val(repere.option, l).trim() : '';
      const option = options.find(o => o.id === optTexte) || null;
      const actions = [];
      const auBesoin = /\(au besoin\)/i.test(moment);
      const cellsRole = {};
      for (let i = 0; i < cols.length; i++) { const t = val(cols[i], l).trim(); if (t) cellsRole[roles[i].id] = t; }
      // « Qui officie ? » : sur une ligne d'officiant où godo et doshi sont remplis, chacun ne garde sa case que s'il officie.
      const ligneOfficiant = aRole('godo') && aRole('doshi') && cellsRole.godo && cellsRole.doshi
        && (/officiant/i.test(moment) || (option && /officiant/i.test(option.description)));
      // Regroupe les cases de même texte (cases fusionnées ou recopiées) : une seule action pour ces rôles.
      const groupes = [];
      for (let i = 0; i < cols.length; i++) {
        const t = cellsRole[roles[i].id];
        if (!t) continue;
        const finCol = fusion[colNom(cols[i]) + l] || cols[i];
        const qui = cols.filter(x => x >= cols[i] && x <= finCol).map(x => roles[cols.indexOf(x)].id);
        const g = groupes.find(x => x.t === t && !ligneOfficiant);
        if (g) g.qui.push(...qui); else groupes.push({ t, qui });
      }
      const nommes = new Set(groupes.flatMap(g => g.qui));
      for (const { t, qui } of groupes) {
        // « * » = tous les autres rôles : seulement si la ligne ne laisse aucune case vide.
        const tous = nommes.size === roles.length && qui.length > 1 && qui.length >= roles.length / 2;
        for (const a of CASES.analyser(t)) {
          const action = { roles: tous ? ['*'] : qui.slice(), ...a };
          if (a.condition === 'si-officie' && qui.length === 1) action.si = { choix: 'officiant', est: qui[0] };
          else if (a.condition === 'si-n-officie-pas' && qui.length === 1) action.si = { choix: 'officiant', pas: qui[0] };
          else if (ligneOfficiant && qui.length === 1 && (qui[0] === 'godo' || qui[0] === 'doshi')) action.si = { choix: 'officiant', est: qui[0] };
          if (auBesoin && !action.condition) action.condition = 'au-besoin';
          if (action.signal && /doshi/i.test(action.signal.texte) && aRole('doshi') && !qui.includes('doshi')) action.signal.role = 'doshi';
          for (const s of action.sons || []) instruments.add(s.instrument);
          const regle = BASE.refs.find(r => (!r.moment || r.moment.test(moment)) && (!r.option || (option && option.id === r.option))
            && (!r.instrument || (action.sons || []).some(s => s.instrument === r.instrument)) && (!r.verbe || action.verbe === r.verbe)
            && (!r.pasVerbe || action.verbe !== r.pasVerbe)
            && (!r.role || qui.includes(r.role)) && (!r.maniere || r.maniere.test(action.maniere || '')) && (!r.texte || r.texte.test(action.texte)));
          if (regle) action.ref = regle.ref;
          actions.push(action);
        }
      }
      if (!actions.length) continue;
      const libelle = repere.phase ? val(repere.phase, l).trim().toLowerCase() : 'pratique';
      if (libelle !== phasePrec) {
        phasePrec = libelle;
        const rang = vus[libelle] = (vus[libelle] || 0) + 1;
        const connu = (BASE.phases[libelle] || [])[rang - 1];
        phaseId = 'p' + (phases.length + 1);
        phases.push({ id: phaseId, nom: connu ? connu.nom : CASES.majuscule(libelle) + (rang > 1 ? ' (' + rang + ')' : ''), ...(connu ? { bref: connu.bref } : {}) });
      }
      const e = { id: 'l' + l, phase: phaseId, moment: CASES.majuscule(moment.replace(/\s*\(au besoin\)/i, '').replace(/\s*\([^()]*remplace[^()]*\)/i, '')), actions };
      const minute = repere.minute ? parseFloat(val(repere.minute, l)) : NaN;
      if (!isNaN(minute)) e.minute = minute;
      if (option) e.option = option.id;
      etapes.push(e);
    }
    const glossaire = [];
    const voc = classeur.feuilles.find(x => /vocabulaire|glossaire/i.test(x.nom));
    if (voc) {
      const lignes = [...new Set(Object.keys(voc.cellules).map(k => coupeRef(k)[1]))].sort((a, b) => a - b);
      for (const l of lignes) {
        const terme = (voc.cellules['A' + l] || '').trim(), definition = (voc.cellules['C' + l] || '').trim();
        if (terme && definition && !/^terme$/i.test(terme)) glossaire.push({ terme, categorie: (voc.cellules['B' + l] || '').trim(), definition });
      }
    }
    for (const g of BASE.glossaire) if (glossaire.length && !glossaire.some(x => x.terme.toLowerCase() === g.terme)) glossaire.push(g);
    const cer = {
      format: 'dharmagates-ceremonie', version: 2, id: infos.id || 'ceremonie-importee', langue: 'fr',
      titre: infos.titre || 'Cérémonie importée', resume: infos.resume || '', source: infos.source || 'Importé d’un tableau Excel.',
      ...(infos.dureeIndicative ? { dureeIndicative: infos.dureeIndicative } : {}),
      phases, fonctions: BASE.fonctions, roles,
      instruments: BASE.instruments.filter(i => instruments.has(i.id)), frappes: BASE.frappes,
    };
    if (options.length) {
      cer.options = options;
      const ids = options.map(o => o.id);
      cer.formules = BASE.formules.filter(x => x.options.every(o => ids.includes(o)));
    }
    if (etapes.some(e => e.actions.some(a => a.si))) cer.choix = [{ id: 'officiant', nom: 'Qui officie ?', defaut: 'doshi', valeurs: [{ id: 'doshi', nom: 'Le doshi' }, { id: 'godo', nom: 'Le godo' }] }];
    if (glossaire.length) cer.glossaire = glossaire;
    cer.etapes = etapes;
    return cer;
  }

  const api = { lire, convertir, BASE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  racine.DG_EXCEL = api;
})(typeof window !== 'undefined' ? window : globalThis);
