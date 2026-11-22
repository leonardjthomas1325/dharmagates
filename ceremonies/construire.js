// Constructeur de cérémonie par glisser-déposer (onglet « Construire »).
// On glisse des blocs, des actions, des objets et des rôles depuis la palette vers la grille
// étapes × rôles ; on déplace les tuiles, les lignes et les colonnes ; on supprime en glissant
// vers la corbeille. Au doigt : toucher un élément de la palette, puis toucher l'endroit voulu.
// S'appuie sur window.DG, exposé par ceremonies.js (chargé juste après ce fichier).
(function () {
  'use strict';

  // ---------- Catalogues de la palette ----------
  // Actions (verbes) et objets (lieux, personnes, objets, instruments) viennent de cases.js.
  const CASES = window.DG_CASES;
  const LIBRE = { id: 'libre', nom: 'Texte libre…', texte: 'Nouvelle action.' };
  // Un instrument par étiquette ; on règle sur l'étiquette le nombre de coups et la frappe avant de la glisser.
  const SONS = [
    { id: 'shokei', nom: 'Shōkei', cloche: true, coups: 1 },
    { id: 'daikei', nom: 'Daikei', cloche: true, coups: 1 },
    { id: 'inkin', nom: 'Inkin', cloche: true, coups: 1 },
    { id: 'mokugyo', nom: 'Mokugyo', cloche: false, coups: 0 },
    { id: 'moppan', nom: 'Moppan', cloche: false, coups: 0 },
  ];
  const REGLAGES = {};   // id -> { coups, frappe } choisis dans la palette (0 coup = « en continu »)
  for (const i of SONS) REGLAGES[i.id] = { coups: i.coups, frappe: '' };
  const NOMBRES = ['', 'un coup', 'deux coups', 'trois coups', 'quatre coups', 'cinq coups', 'six coups', 'sept coups', 'huit coups', 'neuf coups'];
  function sonRegle(id) {
    const i = SONS.find(x => x.id === id), r = REGLAGES[id], son = { instrument: id };
    if (r.frappe !== 'cascade' && r.coups) son.coups = r.coups;
    if (r.frappe) son.frappe = r.frappe;
    const fr = { ken: ' normal', gatsu: ' étouffé' }[r.frappe] || '';
    const texte = r.frappe === 'cascade' ? 'Cascade de ' + i.nom.toLowerCase() + '.'
      : r.coups ? i.nom + ' : ' + (NOMBRES[r.coups] || r.coups + ' coups') + (fr ? (r.coups > 1 ? fr + 's' : fr) : '') + '.'
      : 'Joue le ' + i.nom.toLowerCase() + ' en continu.';
    const libelle = i.nom + (r.frappe === 'cascade' ? ' · cascade' : (r.coups ? ' ×' + r.coups : '') + (r.frappe ? ' · ' + (r.frappe === 'ken' ? 'Ken' : 'Gatsu') : ''));
    return { id, son, texte, nom: libelle };
  }
  // Toutes les cloches (shōkei, daikei, inkin) se frappent en Ken ou en Gatsu ; la cascade est une série de coups.
  const FRAPPES = [{ id: 'ken', nom: 'Ken (normal)' }, { id: 'gatsu', nom: 'Gatsu (étouffé)' }, { id: 'cascade', nom: 'Cascade' }];
  // Dans un bloc, "f" désigne une fonction (on cherche le rôle qui la porte) et "*" tous les autres.
  const S = (instrument, coups, frappe, quand) => ({ instrument, coups, frappe, quand });
  const BLOCS = [
    { id: 'vide', nom: 'Étape vide', etapes: [{ moment: 'Nouvelle étape', actions: [] }] },
    { id: 'debut-zazen', nom: 'Début du zazen', etapes: [{ moment: 'Début du zazen', actions: [{ f: 'shokei-zazen', texte: 'Ouvre le zazen.', sons: [S('shokei', 3)] }] }] },
    { id: 'zazen', nom: 'Zazen', etapes: [{ moment: 'Zazen', actions: [{ f: 'kusen', texte: 'Zazen.' }, { f: 'kusen', texte: 'Donne le kusen.' }, { f: '*', texte: 'Zazen immobile, en silence.' }] }] },
    { id: 'fin-zazen', nom: 'Fin du zazen', etapes: [{ moment: 'Fin du zazen', actions: [{ f: 'shokei-zazen', texte: 'Clôt le zazen.', sons: [S('shokei', 2)] }] }] },
    { id: 'lever', nom: 'Se lever et saluer', etapes: [
      { moment: 'Se lever et saluer', actions: [{ f: '*', texte: 'Gasshō assis.' }, { f: '*', texte: 'Se lève lentement.' }] },
      { moment: 'Se lever et saluer', actions: [{ f: '*', texte: 'Gasshō vers son zafu.' }] },
      { moment: 'Se lever et saluer', actions: [{ f: '*', texte: 'Gasshō vers le rang d’en face.' }] }] },
    { id: 'kinhin', nom: 'Kinhin', etapes: [
      { moment: 'Kinhin', actions: [{ f: 'kusen', texte: 'Corrige les postures.' }, { f: '*', texte: 'Kinhin, en file dans le sens des aiguilles d’une montre.' }] },
      { moment: 'Fin du kinhin', actions: [{ f: 'shokei-zazen', texte: 'Marque la fin du kinhin.', sons: [S('shokei', 1)] }] }] },
    { id: 'encens', nom: 'Offrande d’encens', etapes: [
      { moment: 'Offrande d’encens', actions: [{ f: 'encens', texte: 'Accompagne le dōshi, à sa droite.' }, { f: 'officiant', texte: 'Monte à l’autel par la gauche et fait l’offrande d’encens.' }] },
      { moment: 'Offrande d’encens', actions: [{ f: 'officiant', texte: 'Gasshō.' }, { f: 'inkin', texte: 'Un coup.', sons: [S('inkin', 1)], signal: { f: 'officiant', texte: 'sur le gasshō du dōshi' } }] }] },
    { id: 'sanpai', nom: 'Sanpai', etapes: [{ moment: 'Sanpai', actions: [
      { f: 'officiant', texte: 'Trois fois gasshō puis prosternation (pai).' },
      { f: 'inkin', texte: 'Un coup à chaque gasshō du dōshi.', sons: [S('inkin', 3)], signal: { f: 'officiant', texte: 'à chaque gasshō du dōshi' } },
      { f: '*', texte: 'Trois fois gasshō puis prosternation, en suivant le dōshi.' }] }] },
    { id: 'chant', nom: 'Chant d’un sutra', etapes: [
      { moment: 'Chant', actions: [{ f: 'voix', texte: 'Annonce le titre du sutra.' }] },
      { moment: 'Chant', actions: [{ f: 'daikei', texte: 'Un coup normal de daikei marque le début du chant.', sons: [S('daikei', 1, 'ken')], signal: { f: 'voix', texte: 'après l’annonce du kokyō' } }] },
      { moment: 'Chant', actions: [
        { f: 'voix', texte: 'Lance et mène le chant, mains en gasshō.' },
        { f: 'daikei', texte: 'Ponctue le chant de coups normaux de daikei, puis un coup étouffé pour clore.', sons: [S('daikei', null, 'ken', 'pendant le chant'), S('daikei', 1, 'gatsu', 'pour clore')] },
        { f: 'mokugyo', texte: 'Donne le rythme au mokugyo.', sons: [S('mokugyo', null, null, 'pendant tout le chant')] },
        { f: '*', texte: 'Chante en suivant le kokyō.' }] }] },
    { id: 'eko', nom: 'Ekō', etapes: [{ moment: 'Ekō', actions: [
      { f: 'voix', texte: 'Récite seul l’ekō (la dédicace).' },
      { f: 'daikei', texte: 'Ponctue l’ekō de coups normaux de daikei.', sons: [S('daikei', null, 'ken')] },
      { f: '*', texte: 'En silence, mains en gasshō.' }] }] },
    { id: 'salutations', nom: 'Salutations finales', etapes: [
      { moment: 'Salutations finales', actions: [{ f: 'officiant', texte: 'Gasshō vers le Bouddha.' }, { f: 'inkin', texte: 'Un coup.', sons: [S('inkin', 1)], signal: { f: 'officiant', texte: 'sur le gasshō du dōshi' } }] },
      { moment: 'Salutations finales', actions: [{ f: 'officiant', texte: 'Salue la sangha en shashu.' }, { f: 'inkin', texte: 'Un coup.', sons: [S('inkin', 1)], signal: { f: 'officiant', texte: 'sur la salutation du dōshi' } }, { f: '*', texte: 'Salue le dōshi en shashu.' }] }] },
  ];
  // Rôles qu'on peut ajouter : ceux des modèles, plus deux rôles décrits par le Gyōji Kihan.
  function rolesCatalogue() {
    const out = [], vus = new Set();
    for (const m of DG.MODELES) for (const r of m.roles || []) if (!vus.has(r.id)) { vus.add(r.id); out.push(r); }
    const extra = [
      { id: 'jiko', nom: 'Jikō', kanji: '侍香', fonctions: ['encens'], resume: 'Acolyte d’encens : porte la boîte à encens, se tient à l’arrière gauche du dōshi (Gyōji Kihan).', place: {}, objets: ['Boîte à encens'] },
      { id: 'ino', nom: 'Ino', kanji: '維那', fonctions: ['voix'], resume: 'Dans les temples japonais, chante les titres et l’ekō (Gyōji Kihan).', place: {}, objets: [] },
    ];
    for (const r of extra) if (!vus.has(r.id)) out.push(r);
    return out;
  }
  function instrumentsCatalogue() {
    const out = {};
    for (const m of DG.MODELES) for (const i of m.instruments || []) out[i.id] = out[i.id] || i;
    return out;
  }
  function frappesCatalogue() {
    const out = {};
    for (const m of DG.MODELES) for (const f of m.frappes || []) out[f.id] = out[f.id] || f;
    return out;
  }

  // ---------- Outils ----------
  const copie = o => JSON.parse(JSON.stringify(o));
  const nouvelId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  let h, remplace;

  // ---------- État du constructeur ----------
  let c = null;                 // cérémonie en cours de construction (copie modifiable)
  let annuler = [], refaire = [];
  let selection = null;         // { type: 'action'|'etape'|'role'|'phase'|'ceremonie', ... }
  let arme = null;              // élément de palette « en main » (mode toucher-placer)
  let racine = null, grilleCadre = null, inspecteur = null, bandeau = null, corbeille = null;
  let ongletPalette = 'blocs';   // blocs | actions | objets | roles

  function etape(id) { return c.etapes.find(e => e.id === id); }
  function ordreRoles() { return c.roles.map(r => r.id); }

  // Garde l'ordre des étapes conforme à l'ordre des phases, et répare ce qui manque.
  function normaliser() {
    if (!Array.isArray(c.phases) || !c.phases.length) c.phases = [{ id: 'p1', nom: 'Pratique' }];
    const ids = c.phases.map(p => p.id);
    c.etapes.forEach(e => { if (!ids.includes(e.phase)) e.phase = ids[0]; });
    const rang = new Map(ids.map((id, i) => [id, i]));
    c.etapes = c.etapes.map((e, i) => [e, i]).sort((a, b) => rang.get(a[0].phase) - rang.get(b[0].phase) || a[1] - b[1]).map(x => x[0]);
    const roles = new Set(ordreRoles());
    for (const e of c.etapes) {
      e.actions = (e.actions || []).filter(a => { a.roles = a.roles.filter(r => r === '*' || roles.has(r)); return a.roles.length; });
      if (e.variantes) { e.variantes = e.variantes.filter(v => { v.roles = v.roles.filter(r => roles.has(r)); return true; }); if (!e.variantes.length) delete e.variantes; }
      e.actions.forEach(a => { if (a.signal && a.signal.role && !roles.has(a.signal.role)) delete a.signal.role; });
    }
  }

  // Toute modification passe par ici : copie du modèle si besoin, annulation, enregistrement.
  function modifier(fn, opts = {}) {
    if (DG.estModele(DG.cer) || !c) partirDe(DG.cer);
    if (!opts.sansAnnulation) { annuler.push(JSON.stringify(c)); if (annuler.length > 100) annuler.shift(); refaire = []; }
    fn(c);
    normaliser();
    if (!DG.mettre(c)) DG.message(DG.T.stockageKo);
    if (!opts.garderInspecteur) peindreInspecteur();
    const pal = racine && racine.querySelector('.palette'); if (pal && pal._remplir) pal._remplir();
    peindreGrille();
    peindreOutils();
  }
  // Première modification d'un modèle : on travaille sur une copie, le modèle reste intact.
  function partirDe(source) {
    c = copie(DG.propre(source));
    if (DG.estModele(source)) {
      c.id = DG.idLibre(source.id + '-ma-version');
      c.titre = source.titre + ' (ma version)';
      c.source = 'Adapté de : ' + (source.source || source.titre);
      DG.mettre(c);
      DG.message('Une copie a été créée pour vos changements : « ' + c.titre + ' ». Le modèle reste intact.');
    }
    annuler = []; refaire = [];
  }
  function chargerCourante() {
    const cur = DG.cer;
    if (!c || c.id !== cur.id) { c = copie(DG.propre(cur)); annuler = []; refaire = []; selection = null; }
    normaliser();
  }
  function defaire(sens) {
    const pile = sens < 0 ? annuler : refaire, autre = sens < 0 ? refaire : annuler;
    if (!pile.length) return;
    autre.push(JSON.stringify(c));
    c = JSON.parse(pile.pop());
    DG.mettre(c);
    selection = null;
    peindreInspecteur(); peindreGrille(); peindreOutils();
  }

  // Trouve le rôle qui porte une fonction ; l'ajoute depuis le catalogue s'il manque.
  function roleDeFonction(f, ajoutes) {
    if (f === '*') return '*';
    let r = c.roles.find(x => (x.fonctions || []).includes(f));
    if (r) return r.id;
    const cat = rolesCatalogue().find(x => (x.fonctions || []).includes(f));
    if (!cat) return null;
    r = copie(cat);
    if (c.roles.some(x => x.id === r.id)) r.id = nouvelId('role-');
    c.roles.push(r); ajoutes.push(r.nom);
    if (cat.fonctions) for (const fid of cat.fonctions) if (!(c.fonctions || []).some(x => x.id === fid)) {
      const def = DG.MODELES.flatMap(m => m.fonctions || []).find(x => x.id === fid);
      if (def) (c.fonctions = c.fonctions || []).push(copie(def));
    }
    return r.id;
  }
  function assurerSons(sons) {
    const cat = instrumentsCatalogue(), fr = frappesCatalogue();
    c.instruments = c.instruments || []; c.frappes = c.frappes || [];
    for (const s of sons || []) {
      if (!c.instruments.some(i => i.id === s.instrument) && cat[s.instrument]) c.instruments.push(copie(cat[s.instrument]));
      if (s.frappe && !c.frappes.some(f => f.id === s.frappe) && fr[s.frappe]) c.frappes.push(copie(fr[s.frappe]));
    }
  }
  const sonPropre = s => { const o = {}; for (const k of ['instrument', 'coups', 'frappe', 'quand', 'serie', 'continu']) if (s[k] != null && s[k] !== '') o[k] = s[k]; if (s.motif && s.motif.length) o.motif = s.motif.slice(); return o; };

  // ---------- Glisser-déposer (souris, stylet ; au doigt par les poignées) ----------
  let enCours = null, ignorerClic = false, rafDefile = 0;
  function glissable(el, charge, opts = {}) {
    el.addEventListener('pointerdown', ev => {
      if (ev.button !== 0 || ev.target.closest('input,textarea,select')) return;
      const b = ev.target.closest('button'); if (b && b !== el) return;
      if (ev.pointerType === 'touch' && !opts.doigt) return;   // au doigt : toucher puis placer
      enCours = { charge, x0: ev.clientX, y0: ev.clientY, x: ev.clientX, y: ev.clientY, parti: false, el, cible: null, alt: false };
    });
  }
  function demarrer() {
    const ch = enCours.charge();
    if (!ch) { enCours = null; return; }
    enCours.parti = true; enCours.ch = ch;
    enCours.fantome = h('div', { class: 'fantome' }, ch.libelle);
    document.body.append(enCours.fantome);
    document.body.classList.add('glisse-en-cours', 'glisse-' + ch.type);
    enCours.el.classList.add('source-glisse');
    desarmer();
    boucleDefile();
  }
  document.addEventListener('pointermove', ev => {
    if (!enCours) return;
    enCours.x = ev.clientX; enCours.y = ev.clientY; enCours.alt = ev.altKey;
    if (!enCours.parti) { if (Math.hypot(ev.clientX - enCours.x0, ev.clientY - enCours.y0) < 6) return; demarrer(); if (!enCours) return; }
    ev.preventDefault();
    enCours.fantome.style.transform = 'translate(' + (ev.clientX + 12) + 'px,' + (ev.clientY + 10) + 'px)';
    enCours.cible = cible(ev.clientX, ev.clientY, enCours.ch.type);
    montrerCible(enCours.cible);
  }, { passive: false });
  function finir(deposer) {
    if (!enCours) return;
    const g = enCours; enCours = null;
    cancelAnimationFrame(rafDefile);
    if (!g.parti) return;
    g.fantome.remove();
    document.body.classList.remove('glisse-en-cours', 'glisse-' + g.ch.type);
    g.el.classList.remove('source-glisse');
    montrerCible(null);
    ignorerClic = true; setTimeout(() => { ignorerClic = false; }, 0);
    if (deposer) deposer_(g.ch, g.cible, g.alt);
  }
  document.addEventListener('pointerup', () => finir(true));
  document.addEventListener('pointercancel', () => finir(false));
  document.addEventListener('click', ev => { if (ignorerClic) { ev.stopPropagation(); ev.preventDefault(); } }, true);
  // Fait défiler la grille et la page quand on approche d'un bord.
  function boucleDefile() {
    rafDefile = requestAnimationFrame(() => {
      if (!enCours || !enCours.parti) return;
      const { x, y } = enCours, m = 50, v = 14;
      if (grilleCadre) {
        const r = grilleCadre.getBoundingClientRect();
        if (y > r.top && y < r.bottom) {
          if (x > r.right - m && x < r.right + 20) grilleCadre.scrollLeft += v;
          else if (x < r.left + m && x > r.left - 20) grilleCadre.scrollLeft -= v;
        }
      }
      if (y > innerHeight - m) scrollBy(0, v); else if (y < m) scrollBy(0, -v);
      boucleDefile();
    });
  }

  // Où tombe l'élément tenu ? Renvoie une description de la cible, ou null.
  function cible(x, y, type) {
    const el = document.elementFromPoint(x, y);
    if (!el || !racine || !racine.contains(el)) return null;
    if (el.closest('.corbeille')) return ['action', 'etape', 'col', 'phasex'].includes(type) ? { genre: 'corbeille' } : null;
    if (type === 'geste' || type === 'son' || type === 'action' || type === 'objet') {
      const ligne = el.closest('.b-ligne');
      if (!ligne) return null;
      const cases = [...ligne.querySelectorAll('.b-case')];
      const i = cases.findIndex(k => { const r = k.getBoundingClientRect(); return x >= r.left && x < r.right; });
      if (i < 0) return null;
      const tuile = type === 'son' || type === 'objet' ? el.closest('.tuile') : null;
      if (type === 'objet' && !tuile) return null;
      return { genre: 'case', etape: ligne.dataset.etape, role: ordreRoles()[i], el: cases[i], tuile, action: tuile ? +tuile.dataset.action : null };
    }
    if (type === 'bloc' || type === 'phase' || type === 'etape') {
      const z = el.closest('.b-ligne,.b-phase,.b-vide,.b-fin');
      if (!z) return null;
      const r = z.getBoundingClientRect();
      if (z.classList.contains('b-ligne')) {
        const e = etape(z.dataset.etape), avant = y < r.top + r.height / 2;
        const meme = c.etapes.filter(x => x.phase === e.phase), k = meme.indexOf(e);
        return { genre: 'insertion', phase: e.phase, avant: avant ? e.id : (meme[k + 1] ? meme[k + 1].id : null), ref: z, haut: avant };
      }
      if (z.classList.contains('b-phase')) {
        const pid = z.dataset.phase, prem = c.etapes.find(x => x.phase === pid);
        return { genre: 'insertion', phase: pid, avant: prem ? prem.id : null, ref: z, haut: false };
      }
      if (z.classList.contains('b-vide')) return { genre: 'insertion', phase: z.dataset.phase, avant: null, ref: z, haut: true };
      const der = c.phases[c.phases.length - 1].id;
      return { genre: 'insertion', phase: der, avant: null, ref: z, haut: true };
    }
    if (type === 'col' || type === 'role') {
      const t = el.closest('.b-entete');
      if (!t) return null;
      const cols = [...t.querySelectorAll('.b-col')];
      let i = cols.findIndex(k => { const r = k.getBoundingClientRect(); return x < r.left + r.width / 2; });
      if (i < 0) i = cols.length;
      return { genre: 'colonne', index: i, ref: cols[i] || cols[cols.length - 1], gauche: i < cols.length };
    }
    return null;
  }
  function montrerCible(t) {
    racine.querySelectorAll('.survol').forEach(e => e.classList.remove('survol'));
    const ligne = racine.querySelector('.repere');
    if (!t) { ligne.hidden = true; return; }
    if (t.genre === 'corbeille') { corbeille.classList.add('survol'); ligne.hidden = true; return; }
    if (t.genre === 'case') { (t.tuile || t.el).classList.add('survol'); ligne.hidden = true; return; }
    const g = racine.querySelector('.grille').getBoundingClientRect(), r = t.ref.getBoundingClientRect();
    ligne.hidden = false;
    if (t.genre === 'insertion') {
      ligne.className = 'repere horizontal';
      ligne.style.cssText = 'top:' + ((t.haut ? r.top : r.bottom) - g.top - 2) + 'px;left:0;width:' + g.width + 'px';
    } else {
      ligne.className = 'repere vertical';
      ligne.style.cssText = 'left:' + ((t.gauche ? r.left : r.right) - g.left - 2) + 'px;top:0;height:' + g.height + 'px';
    }
  }

  // ---------- Ce que fait un dépôt ----------
  // Après un dépôt, on ouvre l'inspecteur seulement sur grand écran (au téléphone il cacherait la grille).
  const grandEcran = () => matchMedia('(min-width: 861px)').matches;
  function selApres(s, focus) { if (grandEcran()) choisirSel(s, focus); }
  function deposer_(ch, t, alt) {
    if (!t) return;
    if (t.genre === 'corbeille') {
      selection = null;
      if (ch.type === 'action') modifier(c => { etape(ch.etape).actions.splice(ch.index, 1); });
      else if (ch.type === 'etape') modifier(c => { c.etapes = c.etapes.filter(e => e.id !== ch.etape); });
      else if (ch.type === 'col') supprimerRole(ch.role);
      else if (ch.type === 'phasex') supprimerPhase(ch.phase);
      return;
    }
    if (t.genre === 'case') {
      if (ch.type === 'geste') {
        let idx;
        modifier(c => { const e = etape(t.etape); e.actions.push({ roles: [t.role], texte: ch.item.texte, ...(ch.item.cases ? { ...ch.item.cases, auto: true } : {}) }); idx = e.actions.length - 1; }, { garderInspecteur: true });
        selApres({ type: 'action', etape: t.etape, index: idx }, ch.item.id === 'libre');
      } else if (ch.type === 'son') {
        let idx = t.action;
        modifier(c => {
          const e = etape(t.etape), s = sonPropre(ch.item.son);
          assurerSons([s]);
          if (idx != null && e.actions[idx]) (e.actions[idx].sons = e.actions[idx].sons || []).push(s);
          else { const a = { roles: [t.role], texte: ch.item.texte, sons: [s], verbe: 'jouer', cible: 'objets:' + s.instrument, auto: true }; a.texte = CASES.phrase(c, a); e.actions.push(a); idx = e.actions.length - 1; }
        }, { garderInspecteur: true });
        selApres({ type: 'action', etape: t.etape, index: idx });
      } else if (ch.type === 'objet') {
        // Un objet posé sur une tuile devient sa cible ; un lieu devient le « où » si la cible est déjà prise.
        const a0 = etape(t.etape).actions[t.action], v = a0 && CASES.verbe(a0.verbe), l = ch.ref.split(':')[0];
        if (!v) { DG.message('Choisissez d’abord une action pour cette tuile (touchez-la, puis « Action »).'); return; }
        const enCible = l in v.prep && !(l === 'lieux' && a0.cible && !a0.cible.startsWith('lieux:')) && !(v.id === 'jouer');
        if (!enCible && l !== 'lieux') { DG.message('« ' + v.nom + ' » ne se combine pas avec « ' + ch.libelle + ' ».'); return; }
        modifier(c => { const a = etape(t.etape).actions[t.action]; if (enCible) a.cible = ch.ref; else a.lieu = ch.ref; a.texte = CASES.phrase(c, a); a.auto = true; }, { garderInspecteur: true });
        selApres({ type: 'action', etape: t.etape, index: t.action });
      } else if (ch.type === 'action') {
        let idx;
        modifier(c => {
          const src = etape(ch.etape), dst = etape(t.etape), a = alt ? copie(src.actions[ch.index]) : src.actions[ch.index];
          if (!alt) src.actions.splice(ch.index, 1);
          // Une tuile à un seul rôle prend le rôle de la case ; une tuile partagée garde ses rôles
          // si la case en fait partie, sinon elle devient celle de ce rôle seul.
          const partage = a.roles.length > 1 || a.roles.includes('*');
          const couvre = a.roles.includes(t.role) || (a.roles.includes('*') && !dst.actions.some(x => x !== a && x.roles.includes(t.role)));
          if (!partage || !couvre) a.roles = [t.role];
          dst.actions.push(a); idx = dst.actions.length - 1;
        }, { garderInspecteur: true });
        selApres({ type: 'action', etape: t.etape, index: idx });
      }
      return;
    }
    if (t.genre === 'insertion') {
      if (ch.type === 'bloc') {
        const ajoutes = [];
        let premier = null;
        modifier(c => {
          const nouvelles = ch.item.etapes.map(m => {
            const e = { id: nouvelId('e'), phase: t.phase, moment: m.moment, actions: [] };
            for (const a of m.actions) {
              const role = roleDeFonction(a.f, ajoutes);
              if (!role) continue;
              const na = { roles: [role], texte: a.texte };
              if (a.sons) { na.sons = a.sons.map(sonPropre); assurerSons(na.sons); }
              if (a.signal) { na.signal = { texte: a.signal.texte }; const sr = roleDeFonction(a.signal.f, ajoutes); if (sr && sr !== '*') na.signal.role = sr; }
              e.actions.push(na);
            }
            return e;
          });
          premier = nouvelles[0].id;
          insererEtapes(nouvelles, t.avant);
        }, { garderInspecteur: true });
        selApres({ type: 'etape', etape: premier });
        if (ajoutes.length) DG.message('Rôle ajouté à la grille : ' + ajoutes.join(', ') + '.');
      } else if (ch.type === 'etape') {
        if (t.avant === ch.etape) return;
        modifier(c => {
          const e = etape(ch.etape);
          c.etapes = c.etapes.filter(x => x !== e);
          e.phase = t.phase;
          insererEtapes([e], t.avant);
        }, { garderInspecteur: true });
      } else if (ch.type === 'phase') {
        let pid;
        modifier(c => {
          pid = nouvelId('p');
          const k = c.phases.findIndex(p => p.id === t.phase);
          c.phases.splice(k + 1, 0, { id: pid, nom: 'Nouvelle phase' });
          if (t.avant) { let suivre = false; for (const e of c.etapes) { if (e.id === t.avant) suivre = true; if (suivre && e.phase === t.phase) e.phase = pid; } }
        }, { garderInspecteur: true });
        selApres({ type: 'phase', phase: pid }, true);
      }
      return;
    }
    if (t.genre === 'colonne') {
      if (ch.type === 'col') {
        modifier(c => {
          const k = c.roles.findIndex(r => r.id === ch.role);
          const [r] = c.roles.splice(k, 1);
          c.roles.splice(t.index > k ? t.index - 1 : t.index, 0, r);
        }, { garderInspecteur: true });
      } else if (ch.type === 'role') {
        let id;
        modifier(c => {
          const r = ch.item ? copie(ch.item) : { id: 'role', nom: 'Nouveau rôle', fonctions: [], resume: '', place: {}, objets: [] };
          if (c.roles.some(x => x.id === r.id)) r.id = nouvelId('role-');
          id = r.id;
          c.roles.splice(t.index, 0, r);
        }, { garderInspecteur: true });
        selApres({ type: 'role', role: id }, !ch.item);
      }
    }
  }
  function insererEtapes(liste, avant) {
    if (avant) { const k = c.etapes.findIndex(e => e.id === avant); c.etapes.splice(k, 0, ...liste); }
    else {
      // fin de la phase : juste après sa dernière étape (normaliser() remet l'ordre des phases)
      const ph = liste[0].phase;
      let k = -1; c.etapes.forEach((e, i) => { if (e.phase === ph) k = i; });
      if (k < 0) c.etapes.push(...liste); else c.etapes.splice(k + 1, 0, ...liste);
    }
  }
  function supprimerRole(id) {
    const r = c && c.roles.find(x => x.id === id) || DG.cer.roles.find(x => x.id === id);
    selection = null;
    modifier(c => { c.roles = c.roles.filter(x => x.id !== id); });
    DG.message('Rôle retiré : ' + (r ? r.nom : id) + '. Ses actions propres ont été supprimées (Ctrl+Z pour annuler).');
  }
  function supprimerPhase(id) {
    selection = null;
    modifier(c => {
      const k = c.phases.findIndex(p => p.id === id);
      const voisine = c.phases[k - 1] || c.phases[k + 1];
      if (voisine) c.etapes.forEach(e => { if (e.phase === id) e.phase = voisine.id; });
      else c.etapes = c.etapes.filter(e => e.phase !== id);
      c.phases.splice(k, 1);
    });
  }

  // ---------- Mode « toucher puis placer » (doigt, ou clic sans glisser) ----------
  function armer(ch, el) {
    if (arme && arme.el === el) { desarmer(); return; }
    desarmer();
    arme = { ch, el };
    el.classList.add('arme');
    document.body.classList.add('glisse-' + ch.type, 'mode-arme');
    bandeau.hidden = false;
    remplace(bandeau, h('span', null, 'Touchez ', ch.type === 'bloc' || ch.type === 'phase' ? 'une ligne de la grille' : ch.type === 'role' ? 'l’en-tête des rôles' : ch.type === 'objet' ? 'une tuile de la grille' : 'une case de la grille',
      ' pour placer « ' + ch.libelle + ' ».'), h('button', { type: 'button', onclick: desarmer }, 'Annuler'));
  }
  function desarmer() {
    if (!arme) return;
    arme.el.classList.remove('arme');
    document.body.classList.remove('glisse-' + arme.ch.type, 'mode-arme');
    arme = null; bandeau.hidden = true;
  }
  function placerArme(ev) {
    if (!arme) return false;
    const t = cible(ev.clientX, ev.clientY, arme.ch.type);
    if (!t) return false;
    const ch = arme.ch; desarmer(); deposer_(ch, t, false);
    return true;
  }

  // ---------- Palette ----------
  function itemPalette(ch, classe) {
    const el = h('button', { type: 'button', class: 'p-item ' + (classe || ''), title: ch.aide || null }, ch.libelle);
    glissable(el, () => ch);
    el.addEventListener('click', () => armer(ch, el));
    return el;
  }
  // Étiquette d'instrument : compteur de coups et frappe (Ken, Gatsu, cascade) réglables avant de glisser.
  function carteSon(i) {
    const r = REGLAGES[i.id];
    const nom = h('span', { class: 'ps-nom' }, i.nom);
    const nb = h('output', { class: 'ps-nb', 'aria-live': 'polite' });
    const moins = h('button', { type: 'button', class: 'ps-pas', 'aria-label': 'Un coup de moins' }, '−');
    const plus = h('button', { type: 'button', class: 'ps-pas', 'aria-label': 'Un coup de plus' }, '+');
    const frappe = i.cloche ? h('select', { class: 'ps-frappe', 'aria-label': 'Frappe du ' + i.nom },
      h('option', { value: '' }, 'frappe —'), FRAPPES.map(f => h('option', { value: f.id, selected: r.frappe === f.id || null }, f.id === 'cascade' ? 'Cascade' : f.id === 'ken' ? 'Ken' : 'Gatsu'))) : null;
    const el = h('div', { class: 'p-item p-son', tabindex: '0', role: 'button' }, nom,
      h('span', { class: 'ps-reglage' }, h('span', { class: 'ps-coups' }, moins, nb, plus), frappe));
    const maj = () => {
      const casc = r.frappe === 'cascade';
      nb.textContent = casc ? '∞' : r.coups ? '×' + r.coups : i.cloche ? '×?' : '∞';
      nb.title = casc ? 'cascade : série de coups' : r.coups ? '' : 'en continu';
      moins.disabled = casc || r.coups <= (i.cloche ? 1 : 0); plus.disabled = casc || r.coups >= 9;
      el.title = sonRegle(i.id).texte + ' Glissez dans une case, ou touchez puis touchez une case.';
    };
    moins.addEventListener('click', () => { r.coups = Math.max(i.cloche ? 1 : 0, r.coups - 1); maj(); });
    plus.addEventListener('click', () => { r.coups = Math.min(9, r.coups + 1); maj(); });
    if (frappe) frappe.addEventListener('change', () => { r.frappe = frappe.value; maj(); });
    const charge = () => { const it = sonRegle(i.id); return { type: 'son', item: it, libelle: it.nom }; };
    glissable(el, charge);
    el.addEventListener('click', ev => { if (ev.target.closest('button,select,output')) return; armer(charge(), el); });
    el.addEventListener('keydown', ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target === el) { ev.preventDefault(); armer(charge(), el); } });
    maj();
    return el;
  }
  // Brique « Joue du… » : on choisit l'instrument puis on compose un motif de coups (Ken, Gatsu, cascade).
  const ARTICLE = { shokei: 'du shōkei', daikei: 'du daikei', inkin: 'de l’inkin', mokugyo: 'du mokugyo', moppan: 'du moppan' };
  const COURT = { ken: 'Ken', gatsu: 'Gatsu', cascade: 'Cascade' };
  const JOUE = { instrument: 'daikei', motif: ['ken', 'ken', 'gatsu'], serie: '' };
  function sonMotif(instrument, motif) {
    const son = { instrument, motif: motif.slice() };
    const frappes = motif.filter(m => m !== 'cascade').length;
    if (frappes) son.coups = frappes;
    const f = [...new Set(motif)]; if (f.length === 1) son.frappe = f[0];
    return son;
  }
  const texteMotif = m => m.map(x => COURT[x] || x).join(', ');
  function editeurMotif(motif, change) {
    const puces = motif.length ? motif.map((m, k) => h('button', { type: 'button', class: 'm-coup m-' + m, title: 'Retirer ce coup', 'aria-label': 'Retirer le coup ' + (k + 1) + ' (' + COURT[m] + ')',
      onclick: () => { const n = motif.slice(); n.splice(k, 1); change(n); } }, COURT[m])) : [h('span', { class: 'm-vide' }, 'aucun coup')];
    return h('span', { class: 'motif' }, h('span', { class: 'm-suite' }, puces),
      h('span', { class: 'm-ajout' }, ['ken', 'gatsu', 'cascade'].map(f => h('button', { type: 'button', class: 'm-plus', 'aria-label': 'Ajouter un coup ' + COURT[f], onclick: () => change(motif.concat(f)) }, '+ ' + COURT[f]))));
  }
  function carteJoue() {
    const el = h('div', { class: 'p-item p-son p-joue', tabindex: '0', role: 'button' });
    const charge = () => {
      const nomI0 = (SONS.find(i => i.id === JOUE.instrument) || {}).nom || JOUE.instrument;
      if (JOUE.serie.trim()) return { type: 'son', libelle: 'Joue ' + ARTICLE[JOUE.instrument] + ' · ' + JOUE.serie.trim(),
        item: { son: { instrument: JOUE.instrument, serie: JOUE.serie.trim() }, texte: 'Joue ' + ARTICLE[JOUE.instrument] + ' : ' + JOUE.serie.trim() + '.', nom: nomI0 } };
      if (!JOUE.motif.length) return null;
      const nomI = (SONS.find(i => i.id === JOUE.instrument) || {}).nom || JOUE.instrument;
      return { type: 'son', libelle: 'Joue ' + ARTICLE[JOUE.instrument] + ' · ' + texteMotif(JOUE.motif),
        item: { son: sonMotif(JOUE.instrument, JOUE.motif), texte: 'Joue ' + ARTICLE[JOUE.instrument] + ' : ' + texteMotif(JOUE.motif) + '.', nom: nomI } };
    };
    const peindre = () => {
      const choix = h('select', { class: 'ps-frappe', 'aria-label': 'Instrument', onchange: ev => { JOUE.instrument = ev.target.value; } },
        SONS.map(i => h('option', { value: i.id, selected: i.id === JOUE.instrument || null }, i.nom)));
      remplace(el, h('span', { class: 'ps-nom' }, 'Joue ', choix),
        editeurMotif(JOUE.motif, n => { JOUE.motif = n; peindre(); }),
        h('label', { class: 'ps-serie' }, 'ou série : ', h('input', { type: 'text', id: 'joue-serie', list: 'joue-series', placeholder: '7 5 3', value: JOUE.serie || null, size: '7', oninput: ev => { JOUE.serie = ev.target.value; } }),
          h('datalist', { id: 'joue-series' }, h('option', { value: '7 5 3' }))));
      el.title = 'Composez le motif, puis glissez dans une case ou sur une tuile.';
    };
    glissable(el, charge);
    el.addEventListener('click', ev => { if (ev.target.closest('button,select,input')) return; const ch = charge(); if (ch) armer(ch, el); });
    el.addEventListener('keydown', ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target === el) { ev.preventDefault(); const ch = charge(); if (ch) armer(ch, el); } });
    peindre();
    return el;
  }
  // Carte d'action : le verbe, et la liste des objets ou cibles qui lui vont. On choisit, puis on glisse.
  const CHOIX_ACTION = {};
  function groupesCibles(v, selection) {
    return Object.keys(v.prep).map(l => h('optgroup', { label: CASES.NOMS_LISTES[l] },
      CASES.liste(c, l).filter(x => !!x.instrument === !!v.instruments).map(x => h('option', { value: l + ':' + x.id, selected: selection === l + ':' + x.id || null }, x.nom))));
  }
  function carteAction(v) {
    const aCibles = Object.keys(v.prep).length > 0;
    const choix = aCibles ? h('select', { class: 'ps-frappe', 'aria-label': v.nom + ' : quoi ou vers qui ?' }, h('option', { value: '' }, '—'), groupesCibles(v, CHOIX_ACTION[v.id])) : null;
    const el = h('div', { class: 'p-item p-geste p-option', tabindex: '0', role: 'button' }, h('span', { class: 'ps-nom' }, v.nom), choix);
    const cases = () => ({ verbe: v.id, ...(CHOIX_ACTION[v.id] ? { cible: CHOIX_ACTION[v.id] } : {}) });
    const charge = () => { const k = cases(), t = CASES.phrase(c, k); return { type: 'geste', item: { id: v.id, texte: t, cases: k }, libelle: t }; };
    const maj = () => { el.title = CASES.phrase(c, cases()) + '. Glissez dans une case, ou touchez puis touchez une case.'; };
    if (choix) choix.addEventListener('change', () => { CHOIX_ACTION[v.id] = choix.value; maj(); });
    glissable(el, charge);
    el.addEventListener('click', ev => { if (ev.target.closest('select')) return; armer(charge(), el); });
    el.addEventListener('keydown', ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target === el) { ev.preventDefault(); armer(charge(), el); } });
    maj();
    return el;
  }
  // Onglet Objets : trois listes (lieux, personnes, objets). On pose un élément sur une tuile ; on peut en ajouter.
  function sectionObjets(l) {
    const champ = h('input', { type: 'text', id: 'ajout-' + l, placeholder: { lieux: 'ex. près de la fenêtre', personnes: 'ex. le tenzo', objets: 'ex. la boîte à encens' }[l], 'aria-label': 'Ajouter à la liste ' + CASES.NOMS_LISTES[l] });
    const ajouter = () => {
      const nom = champ.value.trim();
      if (!nom) return;
      const id = nom.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || nouvelId('x');
      if (CASES.liste(c, l).some(x => x.id === id)) { DG.message('« ' + nom + ' » est déjà dans la liste.'); return; }
      modifier(c => { (c[l] = c[l] || []).push({ id, nom }); });
    };
    champ.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); ajouter(); } });
    return h('section', { class: 'p-section' }, h('h3', null, CASES.NOMS_LISTES[l]),
      h('div', { class: 'p-liste p-puces' }, CASES.liste(c, l).map(x => itemPalette({ type: 'objet', ref: l + ':' + x.id, libelle: x.nom, aide: 'Glissez sur une tuile' }, 'p-objet' + (x.instrument ? ' p-instr' : '')))),
      h('div', { class: 'p-ajout' }, champ, h('button', { type: 'button', onclick: ajouter }, 'Ajouter')));
  }
  function peindrePalette(z) {
    const onglets = [['blocs', 'Blocs'], ['actions', 'Actions'], ['objets', 'Objets'], ['roles', 'Rôles']];
    const corps = h('div', { class: 'p-corps' });
    const remplir = () => {
      const presents = new Set(ordreRoles());
      const listes = {
        blocs: () => [itemPalette({ type: 'phase', libelle: 'Nouvelle phase', aide: 'Sépare la cérémonie en grandes parties' }, 'p-phase'),
          ...BLOCS.map(b => itemPalette({ type: 'bloc', item: b, libelle: b.nom, aide: b.etapes.length + ' étape(s)' }, 'p-bloc'))],
        actions: () => [...CASES.VERBES.filter(v => !v.instruments).map(carteAction),
          h('h3', { class: 'p-sous' }, 'Jouer'), carteJoue(), ...SONS.map(carteSon),
          itemPalette({ type: 'geste', item: LIBRE, libelle: LIBRE.nom, aide: 'Une action écrite à la main' }, 'p-geste')],
        objets: () => ['lieux', 'personnes', 'objets'].map(sectionObjets),
        roles: () => [...rolesCatalogue().filter(r => !presents.has(r.id)).map(r => itemPalette({ type: 'role', item: r, libelle: r.nom, aide: r.resume }, 'p-role')),
          itemPalette({ type: 'role', item: null, libelle: 'Nouveau rôle…' }, 'p-role')],
      };
      remplace(corps, h('p', { class: 'p-aide' },
        { blocs: 'Glissez un bloc entre deux lignes : il ajoute une ou plusieurs étapes toutes faites.', actions: 'Choisissez l’action et, dans son menu, l’objet ou la cible. Glissez ensuite dans la case d’un rôle. « Jouer » : choisissez l’instrument et le motif (+ Ken, + Gatsu, + Cascade) ou une série comme 7 5 3.', objets: 'Glissez un lieu, une personne ou un objet sur une tuile pour compléter son action. Vous pouvez ajouter vos propres éléments.', roles: 'Glissez un rôle dans l’en-tête de la grille pour ajouter une colonne.' }[ongletPalette]),
        h('div', { class: 'p-liste' + (ongletPalette === 'objets' ? ' p-sections' : '') }, listes[ongletPalette]()));
    };
    const barre = h('div', { class: 'p-onglets', role: 'tablist' }, onglets.map(([id, nom]) => h('button', {
      type: 'button', role: 'tab', 'aria-selected': id === ongletPalette ? 'true' : 'false', class: id === ongletPalette ? 'actif' : null,
      onclick: ev => { ongletPalette = id; barre.querySelectorAll('button').forEach(b => { const on = b === ev.currentTarget; b.classList.toggle('actif', on); b.setAttribute('aria-selected', on); }); desarmer(); remplir(); },
    }, nom)));
    remplir();
    remplace(z, h('h2', { class: 'p-titre' }, 'Palette'), barre, corps);
    z._remplir = remplir;
  }

  // ---------- La grille étapes × rôles ----------
  // Place les actions d'une étape en « couloirs » : une action partagée s'étend sur ses
  // colonnes voisines ; si un rôle a plusieurs actions, elles s'empilent.
  function disposer(e) {
    const ids = ordreRoles(), m = DG.resoudre(e), tuiles = [], couloirs = [];
    e.actions.forEach((a, ia) => {
      const cols = ids.map((id, i) => (m.get(id) || []).includes(a) ? i : -1).filter(i => i >= 0);
      const runs = [];
      for (const i of cols) { const r = runs[runs.length - 1]; if (r && r[1] === i - 1) r[1] = i; else runs.push([i, i]); }
      for (const [d, f] of runs) {
        let k = 0;
        while (couloirs[k] && couloirs[k].slice(d, f + 1).some(Boolean)) k++;
        couloirs[k] = couloirs[k] || [];
        for (let i = d; i <= f; i++) couloirs[k][i] = true;
        tuiles.push({ a, ia, d, f, k });
      }
    });
    return { tuiles, n: Math.max(1, couloirs.length) };
  }
  let gabarit = '';
  function peindreGrille() {
    if (!racine) return;
    const g = racine.querySelector('.grille');
    const ids = ordreRoles();
    gabarit = 'var(--col-moment) repeat(' + ids.length + ', var(--col-role)) var(--col-plus)';
    const enfants = [];
    // En-tête : les rôles, déplaçables
    const entete = h('div', { class: 'b-entete', style: 'grid-template-columns:' + gabarit },
      h('div', { class: 'b-coin' }, 'Étapes'),
      c.roles.map(r => {
        const col = h('div', { class: 'b-col' + (selection && selection.type === 'role' && selection.role === r.id ? ' choisi' : ''), 'data-role': r.id, tabindex: '0',
          onclick: ev => { if (placerArme(ev)) return; choisirSel({ type: 'role', role: r.id }); },
          onkeydown: ev => { if (ev.key === 'Enter') choisirSel({ type: 'role', role: r.id }); } },
          h('span', { class: 'poignee', title: 'Glisser pour déplacer la colonne', 'aria-hidden': 'true' }, '⋮⋮'),
          h('b', null, r.nom), r.kanji ? h('span', { class: 'kanji', lang: 'ja' }, r.kanji) : null);
        glissable(col.querySelector('.poignee'), () => ({ type: 'col', role: r.id, libelle: r.nom }), { doigt: true });
        glissable(col, () => ({ type: 'col', role: r.id, libelle: r.nom }));
        return col;
      }),
      h('button', { type: 'button', class: 'b-plus', title: 'Ajouter un rôle', onclick: ev => { if (placerArme(ev)) return; ongletPalette = 'roles'; peindrePalette(racine.querySelector('.palette')); } }, '+'));
    enfants.push(entete);
    for (const p of c.phases) {
      const ph = h('div', { class: 'b-phase' + (selection && selection.type === 'phase' && selection.phase === p.id ? ' choisi' : ''), 'data-phase': p.id, tabindex: '0',
        onclick: ev => { if (placerArme(ev)) return; choisirSel({ type: 'phase', phase: p.id }); } },
        h('span', { class: 'poignee', title: 'Glisser vers la corbeille pour supprimer la phase', 'aria-hidden': 'true' }, '⋮⋮'),
        h('span', { class: 'nom' }, p.nom));
      glissable(ph, () => ({ type: 'phasex', phase: p.id, libelle: p.nom }));
      enfants.push(ph);
      const etapes = c.etapes.filter(e => e.phase === p.id);
      if (!etapes.length) enfants.push(h('div', { class: 'b-vide', 'data-phase': p.id, onclick: ev => placerArme(ev) }, 'Phase vide : glissez un bloc ici.'));
      let prec = null;
      for (const e of etapes) {
        const { tuiles, n } = disposer(e);
        const nouveau = e.moment !== prec; prec = e.moment;
        const choisie = selection && selection.etape === e.id && selection.type === 'etape';
        const ligne = h('div', { class: 'b-ligne' + (nouveau ? ' debut' : '') + (choisie ? ' choisi' : ''), 'data-etape': e.id,
          style: 'grid-template-columns:' + gabarit + ';grid-template-rows:repeat(' + n + ',auto)',
          onclick: ev => { if (placerArme(ev)) return; if (ev.target.closest('.tuile,.b-moment')) return; } });
        const mom = h('div', { class: 'b-moment', style: 'grid-row:1 / span ' + n, tabindex: '0',
          onclick: ev => { if (placerArme(ev)) return; choisirSel({ type: 'etape', etape: e.id }); },
          onkeydown: ev => { if (ev.key === 'Enter') choisirSel({ type: 'etape', etape: e.id }); } },
          h('span', { class: 'poignee', title: 'Glisser pour déplacer l’étape', 'aria-hidden': 'true' }, '⋮⋮'),
          h('span', { class: 'm-texte' }, nouveau ? e.moment : h('span', { class: 'idem' }, '〃 ', e.moment)),
          e.minute != null ? h('span', { class: 'minute' }, e.minute + ' min') : null,
          e.option ? h('span', { class: 'tag opt' }, 'Option ' + e.option) : null,
          e.variantes && e.variantes.length ? h('span', { class: 'tag' }, 'variante') : null);
        glissable(mom.querySelector('.poignee'), () => ({ type: 'etape', etape: e.id, libelle: e.moment }), { doigt: true });
        glissable(mom, () => ({ type: 'etape', etape: e.id, libelle: e.moment }));
        ligne.append(mom);
        ids.forEach((id, i) => ligne.append(h('div', { class: 'b-case', style: 'grid-column:' + (i + 2) + ';grid-row:1 / span ' + n, 'data-col': i })));
        for (const t of tuiles) {
          const sel = selection && selection.type === 'action' && selection.etape === e.id && selection.index === t.ia;
          const tu = h('div', { class: 'tuile' + (t.a.sons && t.a.sons.length ? ' sonore' : '') + (t.a.optionnel ? ' optionnelle' : '') + (sel ? ' choisi' : ''),
            'data-action': t.ia, tabindex: '0', style: 'grid-column:' + (t.d + 2) + ' / ' + (t.f + 3) + ';grid-row:' + (t.k + 1),
            onclick: ev => { ev.stopPropagation(); if (placerArme(ev)) return; choisirSel({ type: 'action', etape: e.id, index: t.ia }); },
            onkeydown: ev => { if (ev.key === 'Enter') choisirSel({ type: 'action', etape: e.id, index: t.ia }); } },
            h('span', { class: 't-texte' }, t.a.texte),
            t.a.sons && t.a.sons.length ? h('span', { class: 'sons' }, t.a.sons.map(s => h('span', { class: 'son' }, DG.texteSon(s)))) : null,
            t.a.signal ? h('span', { class: 'signal' }, '↳ ' + t.a.signal.texte) : null);
          glissable(tu, () => ({ type: 'action', etape: e.id, index: t.ia, libelle: t.a.texte.slice(0, 40) }));
          ligne.append(tu);
        }
        enfants.push(ligne);
      }
    }
    enfants.push(h('div', { class: 'b-fin', onclick: ev => placerArme(ev) }, c.etapes.length ? 'Glissez un bloc ici pour l’ajouter à la fin.' : 'Commencez ici : glissez un bloc de la palette (par exemple « Début du zazen »).'));
    enfants.push(h('div', { class: 'repere', hidden: true }));
    remplace(g, enfants);
  }

  // ---------- Inspecteur : modifier ce qui est sélectionné ----------
  function choisirSel(s, focus) {
    selection = s; peindreInspecteur(); peindreGrille();
    if (focus) { const f = inspecteur.querySelector('textarea,input[type=text]'); if (f) { f.focus(); f.select && f.select(); } }
  }
  // Un champ qui modifie la cérémonie à chaque frappe, avec une seule étape d'annulation par champ.
  function champ(etiquette, valeur, appliquer, opts = {}) {
    const id = 'insp-' + etiquette.replace(/\W+/g, '-').toLowerCase();
    const el = opts.long ? h('textarea', { id, rows: opts.lignes || 3 }) : h('input', { id, type: opts.type || 'text', inputmode: opts.type === 'number' ? 'numeric' : null });
    el.value = valeur == null ? '' : valeur;
    let premiere = true;
    el.addEventListener('focus', () => { premiere = true; });
    el.addEventListener('input', () => {
      modifier(c => appliquer(c, el.value), { garderInspecteur: true, sansAnnulation: !premiere });
      premiere = false;
    });
    return h('label', { class: 'i-champ', for: id }, h('span', null, etiquette), el);
  }
  function cases(etiquette, options, coches, appliquer) {
    return h('fieldset', { class: 'i-cases' }, h('legend', null, etiquette), options.map(o => h('label', null,
      h('input', { type: 'checkbox', checked: coches.includes(o.id) || null, onchange: ev => modifier(c => appliquer(c, o.id, ev.target.checked), {}) }), ' ' + o.nom)));
  }
  // Les cases de la phrase : action, objet ou cible, où, manière, nombre, condition, référence.
  function casesAction(s, a) {
    const v = CASES.verbe(a.verbe);
    const maj = fn => modifier(c => { const x = etape(s.etape).actions[s.index]; if (!x) return; fn(x, c); if (x.verbe) { x.texte = CASES.phrase(c, x); x.auto = true; } });
    const ap = fn => (c, val) => { const x = etape(s.etape).actions[s.index]; if (!x) return; fn(x, val); if (x.verbe) { x.texte = CASES.phrase(c, x); x.auto = true; } };
    const liste = (id, etiquette, enfants, change) => h('label', { class: 'i-champ', for: id }, h('span', null, etiquette), h('select', { id, onchange: ev => change(ev.target.value) }, enfants));
    return h('fieldset', { class: 'i-phrase' }, h('legend', null, 'Les cases de la phrase'),
      liste('insp-verbe', 'Action', [h('option', { value: '' }, 'Texte libre (pas de cases)'), CASES.VERBES.map(x => h('option', { value: x.id, selected: a.verbe === x.id || null }, x.nom))], val => maj((x, c) => {
        if (!val) { delete x.verbe; delete x.cible; delete x.auto; return; }
        x.verbe = val;
        const nv = CASES.verbe(val), cib = CASES.element(c, x.cible);
        if (cib && (!(cib.liste in nv.prep) || !!cib.item.instrument !== !!nv.instruments)) delete x.cible;
      })),
      v && Object.keys(v.prep).length ? liste('insp-cible', v.instruments ? 'Instrument' : 'Objet ou cible', [h('option', { value: '' }, '—'), groupesCibles(v, a.cible)], val => maj((x, c) => {
        if (val) x.cible = val; else delete x.cible;
        if (v.instruments && val) { const ins = val.split(':')[1]; if (x.sons && x.sons.length) x.sons.forEach(so => { so.instrument = ins; }); else x.sons = [{ instrument: ins, coups: 1 }]; assurerSons(x.sons); }
      })) : null,
      v ? liste('insp-lieu', 'Où (repère dans le dojo)', [h('option', { value: '' }, '—'), CASES.liste(c, 'lieux').map(x => h('option', { value: 'lieux:' + x.id, selected: a.lieu === 'lieux:' + x.id || null }, x.ou || x.nom))], val => maj(x => { if (val) x.lieu = val; else delete x.lieu; })) : null,
      v ? liste('insp-maniere', 'Manière', [h('option', { value: '' }, '—'), [...new Set([...(a.maniere ? [a.maniere] : []), ...CASES.MANIERES.map(m => m[0])])].map(m => h('option', { value: m, selected: a.maniere === m || null }, m))], val => maj(x => { if (val) x.maniere = val; else delete x.maniere; })) : null,
      v && v.id !== 'jouer' ? champ('Nombre de fois', a.nombre, ap((x, val) => { const n = parseInt(val, 10); if (n > 0) x.nombre = n; else delete x.nombre; }), { type: 'number' }) : null,
      liste('insp-condition', 'Condition', [h('option', { value: '' }, 'Aucune'), (c.conditions || []).concat(CASES.CONDITIONS).map(x => h('option', { value: x.id, selected: a.condition === x.id || null }, x.nom))], val => modifier(c => { const x = etape(s.etape).actions[s.index]; if (val) x.condition = val; else delete x.condition; })),
      champ('Référence (ex. GK p. 519)', a.ref, (c, val) => { const x = etape(s.etape).actions[s.index]; if (x) { if (val) x.ref = val; else delete x.ref; } }),
      v && !a.auto ? h('button', { type: 'button', class: 'lien', onclick: () => maj(() => {}) }, 'Refaire la phrase à partir des cases') : null,
      v && !a.auto ? h('p', { class: 'i-note' }, 'La phrase vient du tableau. Elle sera réécrite si vous changez une case.') : null);
  }
  function peindreInspecteur() {
    if (!inspecteur) return;
    const s = selection;
    const fermer = h('button', { type: 'button', class: 'i-fermer', 'aria-label': 'Fermer', onclick: () => { selection = null; peindreInspecteur(); peindreGrille(); } }, '✕');
    let corps = null, titre = '';
    if (s && s.type === 'action') {
      const e = etape(s.etape), a = e && e.actions[s.index];
      if (!a) { selection = null; return peindreInspecteur(); }
      titre = 'Action';
      const ap = (fn) => (c, v) => { const x = etape(s.etape).actions[s.index]; if (x) fn(x, v); };
      corps = [
        h('p', { class: 'i-ou' }, e.moment),
        champ('Ce qui se fait', a.texte, ap((x, v) => { x.texte = v; delete x.auto; }), { long: true }),
        casesAction(s, a),
        cases('Qui le fait', [...c.roles.map(r => ({ id: r.id, nom: r.nom })), { id: '*', nom: 'Tous les autres rôles' }], a.roles,
          (c, id, on) => { const x = etape(s.etape).actions[s.index]; x.roles = on ? [...new Set([...x.roles, id])] : x.roles.filter(r => r !== id); if (!x.roles.length) x.roles = [id]; }),
        h('fieldset', { class: 'i-sons' }, h('legend', null, 'Sons'),
          (a.sons || []).map((so, k) => {
            const maj = fn => modifier(c => { const x = etape(s.etape).actions[s.index]; fn(x.sons[k]); assurerSons([x.sons[k]]); if (x.auto && x.verbe) x.texte = CASES.phrase(c, x); });
            const nomI = (c.instruments || []).find(i => i.id === so.instrument);
            if (so.motif) return h('div', { class: 'i-son' },
              h('b', null, nomI ? nomI.nom : so.instrument),
              editeurMotif(so.motif, n => maj(x => { if (!n.length) { delete x.motif; delete x.coups; delete x.frappe; return; } const m = sonMotif(x.instrument, n); x.motif = m.motif; if (m.coups) x.coups = m.coups; else delete x.coups; if (m.frappe) x.frappe = m.frappe; else delete x.frappe; })),
              h('button', { type: 'button', class: 'lien', onclick: () => modifier(c => { const x = etape(s.etape).actions[s.index]; x.sons.splice(k, 1); if (!x.sons.length) delete x.sons; }) }, 'retirer'),
              so.quand ? h('small', null, so.quand) : null);
            return h('div', { class: 'i-son' },
              h('b', null, nomI ? nomI.nom : so.instrument),
              h('select', { 'aria-label': 'Nombre de coups', onchange: ev => maj(x => { const n = parseInt(ev.target.value, 10); if (n) x.coups = n; else delete x.coups; }) },
                h('option', { value: '' }, 'coups : —'), [1, 2, 3, 4, 5, 6, 7].map(n => h('option', { value: n, selected: so.coups === n || null }, '×' + n))),
              h('select', { 'aria-label': 'Frappe', onchange: ev => maj(x => { if (ev.target.value) x.frappe = ev.target.value; else delete x.frappe; }) },
                h('option', { value: '' }, 'frappe : —'), FRAPPES.map(f => h('option', { value: f.id, selected: so.frappe === f.id || null }, f.nom))),
              h('button', { type: 'button', class: 'lien', onclick: () => modifier(c => { const x = etape(s.etape).actions[s.index]; x.sons.splice(k, 1); if (!x.sons.length) delete x.sons; }) }, 'retirer'),
              so.quand ? h('small', null, so.quand) : null);
          }),
          h('select', { id: 'insp-ajout-son', onchange: ev => { const it = ev.target.value === 'motif' ? (JOUE.motif.length ? { son: sonMotif(JOUE.instrument, JOUE.motif) } : null) : SONS.some(x => x.id === ev.target.value) && sonRegle(ev.target.value); if (it) modifier(c => { const x = etape(s.etape).actions[s.index]; const so = sonPropre(it.son); assurerSons([so]); (x.sons = x.sons || []).push(so); }); } },
            h('option', { value: '' }, '+ Ajouter un son…'), SONS.map(x => h('option', { value: x.id }, x.nom)),
            h('option', { value: 'motif' }, 'Motif « Joue du… » de la palette'))),
        h('fieldset', { class: 'i-signal' }, h('legend', null, 'Signal (ce qui déclenche l’action)'),
          h('select', { id: 'insp-signal-role', onchange: ev => modifier(c => { const x = etape(s.etape).actions[s.index]; if (!ev.target.value) { delete x.signal; return; } x.signal = x.signal || { texte: 'sur le gasshō du ' + DG.nomRole(ev.target.value).toLowerCase() }; x.signal.role = ev.target.value; }) },
            h('option', { value: '' }, 'Aucun signal'), c.roles.map(r => h('option', { value: r.id, selected: a.signal && a.signal.role === r.id || null }, 'Donné par : ' + r.nom))),
          a.signal ? champ('Repère : quand exactement', a.signal.texte, ap((x, v) => { x.signal.texte = v; if (x.auto) x.texte = CASES.phrase(c, x); })) : null),
        h('label', { class: 'i-case' }, h('input', { type: 'checkbox', checked: a.optionnel || null, onchange: ev => modifier(c => { const x = etape(s.etape).actions[s.index]; if (ev.target.checked) x.optionnel = true; else delete x.optionnel; }) }), ' Facultatif'),
        h('div', { class: 'i-boutons' },
          h('button', { type: 'button', onclick: () => { let k; modifier(c => { const ee = etape(s.etape); ee.actions.splice(s.index + 1, 0, copie(ee.actions[s.index])); k = s.index + 1; }, { garderInspecteur: true }); choisirSel({ type: 'action', etape: s.etape, index: k }); } }, 'Dupliquer'),
          h('button', { type: 'button', class: 'danger', onclick: () => { selection = null; modifier(c => { etape(s.etape).actions.splice(s.index, 1); }); } }, 'Supprimer')),
      ];
    } else if (s && s.type === 'etape') {
      const e = etape(s.etape);
      if (!e) { selection = null; return peindreInspecteur(); }
      titre = 'Étape';
      const ap = fn => (c, v) => { const x = etape(s.etape); if (x) fn(x, v); };
      corps = [
        champ('Moment', e.moment, ap((x, v) => { x.moment = v; })),
        champ('Minute indicative (facultatif)', e.minute, ap((x, v) => { const n = parseInt(v, 10); if (isNaN(n)) delete x.minute; else x.minute = n; }), { type: 'number' }),
        h('label', { class: 'i-champ', for: 'insp-phase' }, h('span', null, 'Phase'),
          h('select', { id: 'insp-phase', onchange: ev => modifier(c => { etape(s.etape).phase = ev.target.value; }) }, c.phases.map(p => h('option', { value: p.id, selected: p.id === e.phase || null }, p.nom)))),
        (c.options || []).length ? h('label', { class: 'i-champ', for: 'insp-option' }, h('span', null, 'Option'),
          h('select', { id: 'insp-option', onchange: ev => modifier(c => { const x = etape(s.etape); if (ev.target.value) x.option = ev.target.value; else delete x.option; }) },
            h('option', { value: '' }, 'Tronc commun'), c.options.map(o => h('option', { value: o.id, selected: e.option === o.id || null }, o.nom + (o.description ? ' : ' + o.description : ''))))) : null,
        h('fieldset', { class: 'i-variantes' }, h('legend', null, 'Variantes (une autre façon de faire)'),
          (e.variantes || []).map((v, k) => h('div', { class: 'i-variante' },
            champ('Variante ' + (k + 1), v.texte, ap((x, val) => { x.variantes[k].texte = val; }), { long: true, lignes: 2 }),
            h('button', { type: 'button', class: 'lien', onclick: () => modifier(c => { etape(s.etape).variantes.splice(k, 1); }) }, 'retirer'))),
          h('button', { type: 'button', onclick: () => modifier(c => { const x = etape(s.etape); (x.variantes = x.variantes || []).push({ roles: [], texte: 'Autre façon de faire.' }); }) }, '+ Ajouter une variante')),
        h('div', { class: 'i-boutons' },
          h('button', { type: 'button', onclick: () => { let id; modifier(c => { const k = c.etapes.findIndex(x => x.id === s.etape); const d = copie(c.etapes[k]); d.id = id = nouvelId('e'); c.etapes.splice(k + 1, 0, d); }, { garderInspecteur: true }); choisirSel({ type: 'etape', etape: id }); } }, 'Dupliquer l’étape'),
          h('button', { type: 'button', class: 'danger', onclick: () => { selection = null; modifier(c => { c.etapes = c.etapes.filter(x => x.id !== s.etape); }); } }, 'Supprimer l’étape')),
      ];
    } else if (s && s.type === 'role') {
      const r = c.roles.find(x => x.id === s.role);
      if (!r) { selection = null; return peindreInspecteur(); }
      titre = 'Rôle';
      const ap = fn => (c, v) => { const x = c.roles.find(y => y.id === s.role); if (x) fn(x, v); };
      corps = [
        champ('Nom dans votre dojo', r.nom, ap((x, v) => { x.nom = v || '?'; })),
        champ('Kanji (facultatif)', r.kanji, ap((x, v) => { if (v) x.kanji = v; else delete x.kanji; })),
        champ('En une phrase', r.resume, ap((x, v) => { x.resume = v; }), { long: true, lignes: 2 }),
        champ('Place pendant le zazen', r.place && r.place.zazen, ap((x, v) => { x.place = x.place || {}; x.place.zazen = v; })),
        champ('Place pendant la cérémonie', r.place && r.place.ceremonie, ap((x, v) => { x.place = x.place || {}; x.place.ceremonie = v; })),
        champ('Tenue (facultatif)', r.tenue, ap((x, v) => { if (v) x.tenue = v; else delete x.tenue; })),
        champ('À préparer (un objet par ligne)', (r.objets || []).join('\n'), ap((x, v) => { x.objets = v.split('\n').map(t => t.trim()).filter(Boolean); }), { long: true }),
        (c.fonctions || []).length ? cases('Fonctions', c.fonctions, r.fonctions || [], (c, id, on) => { const x = c.roles.find(y => y.id === s.role); x.fonctions = on ? [...new Set([...(x.fonctions || []), id])] : (x.fonctions || []).filter(f => f !== id); }) : null,
        h('label', { class: 'i-case' }, h('input', { type: 'checkbox', checked: r.obligatoire || null, onchange: ev => modifier(c => { const x = c.roles.find(y => y.id === s.role); if (ev.target.checked) x.obligatoire = true; else delete x.obligatoire; }) }), ' Rôle obligatoire'),
        h('div', { class: 'i-boutons' }, h('button', { type: 'button', class: 'danger', onclick: () => supprimerRole(s.role) }, 'Retirer ce rôle')),
      ];
    } else if (s && s.type === 'phase') {
      const p = c.phases.find(x => x.id === s.phase);
      if (!p) { selection = null; return peindreInspecteur(); }
      titre = 'Phase';
      const ap = fn => (c, v) => { const x = c.phases.find(y => y.id === s.phase); if (x) fn(x, v); };
      corps = [
        champ('Nom de la phase', p.nom, ap((x, v) => { x.nom = v || '?'; })),
        champ('En bref (pour « Le déroulé en bref »)', p.bref, ap((x, v) => { if (v) x.bref = v; else delete x.bref; }), { long: true }),
        h('div', { class: 'i-boutons' }, h('button', { type: 'button', class: 'danger', onclick: () => supprimerPhase(s.phase) }, 'Supprimer la phase')),
        h('p', { class: 'i-note' }, 'Ses étapes rejoignent la phase précédente.'),
      ];
    } else if (s && s.type === 'ceremonie') {
      titre = 'Cérémonie';
      corps = [
        champ('Titre', c.titre, (c, v) => { c.titre = v || 'Sans titre'; }),
        champ('Résumé', c.resume, (c, v) => { c.resume = v; }, { long: true }),
        champ('Source ou tradition', c.source, (c, v) => { c.source = v; }, { long: true, lignes: 2 }),
        champ('Durée indicative', c.dureeIndicative, (c, v) => { c.dureeIndicative = v; }),
      ];
    }
    inspecteur.hidden = !corps;
    racine && racine.classList.toggle('inspecteur-ouvert', !!corps);
    if (corps) remplace(inspecteur, h('div', { class: 'i-tete' }, h('h2', null, titre), fermer), corps);
  }

  // ---------- Barre d'outils du constructeur ----------
  let outils = null;
  function peindreOutils() {
    if (!outils) return;
    const modele = DG.estModele(DG.cer);
    remplace(outils,
      h('div', { class: 'a-titre' },
        h('b', null, DG.cer.titre),
        h('span', { class: 'etat' }, modele ? 'Modèle : votre premier changement crée une copie à vous.' : 'Enregistré dans ce navigateur. Exportez le fichier pour le garder.')),
      h('div', { class: 'a-actions' },
        h('button', { type: 'button', disabled: !annuler.length || null, title: 'Annuler (Ctrl+Z)', onclick: () => defaire(-1) }, '↶ Annuler'),
        h('button', { type: 'button', disabled: !refaire.length || null, title: 'Rétablir (Ctrl+Maj+Z)', onclick: () => defaire(1) }, '↷ Rétablir'),
        h('button', { type: 'button', onclick: () => choisirSel({ type: 'ceremonie' }, true) }, 'Titre et infos'),
        h('button', { type: 'button', onclick: nouvelleVide }, 'Nouvelle cérémonie vide'),
        h('a', { class: 'bouton', href: '#direct' }, 'Essayer en direct →')));
  }
  function nouvelleVide() {
    const roles = rolesCatalogue();
    const pick = ids => ids.map(id => copie(roles.find(r => r.id === id))).filter(Boolean);
    const nv = {
      format: 'dharmagates-ceremonie', version: 2, id: DG.idLibre('ma-ceremonie'), langue: 'fr', titre: 'Ma cérémonie',
      resume: '', source: '', phases: [{ id: 'p1', nom: 'Zazen' }, { id: 'p2', nom: 'Cérémonie' }],
      fonctions: copie(DG.MODELES[0] ? DG.MODELES[0].fonctions || [] : []),
      roles: pick(['shuso', 'doshi', 'inkin', 'kokyo', 'sangha']), instruments: [], frappes: [], etapes: [],
    };
    DG.mettre(nv);
    c = copie(nv); annuler = []; refaire = []; selection = { type: 'ceremonie' };
    DG.route();
    DG.message('Nouvelle cérémonie créée. Glissez des blocs depuis la palette pour la remplir.');
  }

  document.addEventListener('keydown', ev => {
    if (!racine || !document.body.contains(racine)) return;
    const dansChamp = ev.target.closest('input,textarea,select');
    if (ev.key === 'Escape') { if (arme) desarmer(); else if (selection) { selection = null; peindreInspecteur(); peindreGrille(); } return; }
    if (dansChamp) return;
    const mod = ev.ctrlKey || ev.metaKey;
    if (mod && ev.key.toLowerCase() === 'z') { ev.preventDefault(); defaire(ev.shiftKey ? 1 : -1); }
    else if (mod && ev.key.toLowerCase() === 'y') { ev.preventDefault(); defaire(1); }
    else if ((ev.key === 'Delete' || ev.key === 'Backspace') && selection) {
      ev.preventDefault();
      const s = selection;
      if (s.type !== 'action' && s.type !== 'etape') return;
      selection = null;
      if (s.type === 'action') modifier(c => { etape(s.etape).actions.splice(s.index, 1); });
      else modifier(c => { c.etapes = c.etapes.filter(x => x.id !== s.etape); });
    }
  });

  // ---------- La vue « Construire » ----------
  window.DG_CONSTRUIRE = function () {
    h = DG.h; remplace = DG.remplace;
    chargerCourante();
    const palette = h('aside', { class: 'palette', 'aria-label': 'Palette' });
    outils = h('div', { class: 'a-outils' });
    grilleCadre = h('div', { class: 'grille-cadre' }, h('div', { class: 'grille' }));
    inspecteur = h('aside', { class: 'inspecteur', 'aria-label': 'Modifier la sélection', hidden: true });
    bandeau = h('div', { class: 'bandeau-arme', role: 'status', hidden: true });
    corbeille = h('div', { class: 'corbeille', 'aria-hidden': 'true' }, '🗑 Déposer ici pour supprimer');
    racine = h('div', { class: 'atelier' },
      h('p', { class: 'aide a-aide' }, 'Glissez les éléments de la palette dans la grille. Déplacez les tuiles, les lignes (poignée ⋮⋮) et les colonnes de rôles ; jetez-les dans la corbeille pour les supprimer. Touchez un élément pour le modifier. Au doigt : touchez un élément de la palette, puis l’endroit où le placer. Alt en glissant une tuile : la copier.'),
      outils,
      h('div', { class: 'a-corps' }, palette, h('section', { class: 'chantier', 'aria-label': 'Grille de la cérémonie' }, grilleCadre)),
      inspecteur, corbeille, bandeau);
    peindrePalette(palette);
    peindreOutils();
    peindreGrille();
    peindreInspecteur();
    return racine;
  };
})();
