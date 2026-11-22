// Module « Cérémonies et rôles du dojo » de DharmaGates.
// Tout se passe dans le navigateur : pas de compte ni de serveur. Une cérémonie est un objet JSON
// (format décrit dans FORMAT.md) ; les modèles sont dans modeles/, les cérémonies importées sont
// gardées dans le navigateur (localStorage) et peuvent être réexportées en fichier.
(function () {
  'use strict';

  // Textes de l'interface, regroupés pour pouvoir traduire plus tard.
  const T = {
    vues: { bref: 'En bref', deroule: 'Déroulé', role: 'Rôles', instrument: 'Instruments', direct: 'En direct', construire: 'Construire' },
    modele: 'modèle', importee: 'ma cérémonie',
    moment: 'Moment', minute: 'min', variante: 'Variante', optionnel: 'facultatif', signal: 'Signal',
    obligatoire: 'Rôle obligatoire', zazen: 'Pendant le zazen', ceremonie: 'Pendant la cérémonie',
    objets: 'À préparer', fonctions: 'Fonctions', autres: 'Voir aussi les autres rôles',
    rien: 'Rien de particulier pour toi à cette étape.', pendant: 'Pendant ce temps',
    ensuite: 'Ensuite pour toi', fini: 'C’est la fin de la cérémonie.',
    precedent: '← Précédent', suivant: 'Suivant →', etape: 'Étape',
    ecran: 'Garder l’écran allumé', ecouter: 'Écouter',
    joue: 'Joué par', sons: 'Les sons, dans l’ordre', frappes: 'Les frappes',
    importOk: 'Cérémonie importée : ', importKo: 'Ce fichier n’est pas une cérémonie DharmaGates lisible.',
    importXlsxKo: 'Ce tableau Excel n’a pas la forme attendue : rôles en ligne 1, colonnes « Option », « phase » et « moment » en ligne 3, une étape par ligne.',
    retirerOk: 'Cérémonie retirée de ce navigateur.', stockageKo: 'Le navigateur n’a pas pu garder la cérémonie : exportez-la pour ne pas la perdre.',
  };

  const CASES = window.DG_CASES || null;
  const MODELES = (window.DG_MODELES || []).map(c => ({ ...c, _modele: true }));
  const CLE_IMPORTS = 'dg-ceremonies-importees', CLE_COURANTE = 'dg-ceremonie-courante', CLE_DIRECT = 'dg-ceremonie-direct', CLE_OPTIONS = 'dg-ceremonie-options';

  // ---------- Stockage local (toujours protégé : navigation privée, stockage bloqué…) ----------
  const lire = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } };
  const ecrire = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  let imports = lire(CLE_IMPORTS, []).filter(valide);
  let cer = null;          // cérémonie affichée
  let reglage = { options: [], choix: {} };   // options cochées et choix (« qui officie ? ») pour la cérémonie affichée
  let etapesVues = null;
  let idx = {};            // index des rôles, instruments, phases, frappes par id

  // ---------- Petit utilitaire DOM (aucun contenu de fichier n'est injecté en HTML) ----------
  function h(tag, attrs, ...enfants) {
    const e = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of enfants.flat(Infinity)) if (c != null && c !== false) e.append(c.nodeType ? c : String(c));
    return e;
  }
  const $ = s => document.querySelector(s);
  // replaceChildren sans les valeurs vides (sinon « null » s'affiche)
  const remplace = (el, ...k) => el.replaceChildren(...k.flat(Infinity).filter(x => x != null && x !== false));

  // ---------- Validation d'un fichier importé ----------
  function valide(c) {
    return c && c.format === 'dharmagates-ceremonie' && typeof c.id === 'string' && typeof c.titre === 'string'
      && Array.isArray(c.roles) && c.roles.every(r => r && typeof r.id === 'string' && typeof r.nom === 'string')
      && Array.isArray(c.etapes) && c.etapes.every(e => e && Array.isArray(e.actions)
        && e.actions.every(a => a && Array.isArray(a.roles) && typeof a.texte === 'string'));
  }

  function toutes() { return [...MODELES, ...imports]; }

  function choisir(id) {
    cer = toutes().find(c => c.id === id) || MODELES[0] || imports[0];
    if (!cer) return;
    ecrire(CLE_COURANTE, cer.id);
    idx = { role: {}, instrument: {}, phase: {}, frappe: {}, fonction: {} };
    (cer.roles || []).forEach(r => idx.role[r.id] = r);
    (cer.instruments || []).forEach(i => idx.instrument[i.id] = i);
    (cer.phases || []).forEach(p => idx.phase[p.id] = p);
    (cer.frappes || []).forEach(f => idx.frappe[f.id] = f);
    (cer.fonctions || []).forEach(f => idx.fonction[f.id] = f);
    chargerReglage();
    remplirChoix();
  }

  // ---------- Options (A, B, C…) et choix : ce que le lecteur veut voir ----------
  function chargerReglage() {
    const r = lire(CLE_OPTIONS, {})[cer.id] || {}, ids = (cer.options || []).map(o => o.id);
    reglage = { options: (r.options || (cer.options || []).filter(o => o.defaut).map(o => o.id)).filter(id => ids.includes(id)), choix: {} };
    for (const ch of cer.choix || []) reglage.choix[ch.id] = r.choix && ch.valeurs.some(v => v.id === r.choix[ch.id]) ? r.choix[ch.id] : (ch.defaut || ch.valeurs[0].id);
    etapesVues = null;
  }
  function reglerOptions(fn) {
    fn(reglage); etapesVues = null;
    const tout = lire(CLE_OPTIONS, {}); tout[cer.id] = reglage; ecrire(CLE_OPTIONS, tout);
    route();
  }
  // Les étapes à montrer : le tronc commun, plus les options cochées ; les actions liées à un choix sont triées.
  function etapes() {
    if (etapesVues) return etapesVues;
    const on = new Set(reglage.options);
    const garde = a => !a.si || (a.si.est != null ? reglage.choix[a.si.choix] === a.si.est : reglage.choix[a.si.choix] !== a.si.pas);
    etapesVues = cer.etapes.filter(e => !e.option || on.has(e.option)).map(e => e.actions.every(garde) ? e : { ...e, actions: e.actions.filter(garde) });
    return etapesVues;
  }
  let optionsOuvertes = true;
  function barreOptions() {
    const opts = cer.options || [], choix = cer.choix || [];
    if (!opts.length && !choix.length) return null;
    const on = reglage.options, pareil = f => f.options.length === on.length && f.options.every(o => on.includes(o));
    const resume = on.length ? 'tronc commun + ' + on.join(', ') : 'tronc commun seul';
    return h('details', { class: 'options', open: optionsOuvertes || null, ontoggle: ev => { optionsOuvertes = ev.currentTarget.open; } },
      h('summary', null, h('b', null, 'Options'), ' : ' + resume),
      (cer.formules || []).length ? h('div', { class: 'o-formules' }, h('span', null, 'Formules : '),
        cer.formules.map(f => h('button', { type: 'button', class: pareil(f) ? 'actif' : null, 'aria-pressed': pareil(f) ? 'true' : 'false',
          title: f.options.length ? 'Options ' + f.options.join(', ') : 'Aucune option',
          onclick: () => reglerOptions(r => { r.options = f.options.slice(); }) }, f.nom + (f.options.length ? ' (' + f.options.join(' + ') + ')' : '')))) : null,
      opts.length ? h('ul', { class: 'o-liste' }, opts.map(o => h('li', null, h('label', null,
        h('input', { type: 'checkbox', id: 'opt-' + o.id, checked: on.includes(o.id) || null, onchange: ev => reglerOptions(r => {
          r.options = r.options.filter(x => x !== o.id && !(ev.target.checked && (o.exclut || []).includes(x)));
          if (ev.target.checked) r.options.push(o.id);
          r.options.sort();
        }) }),
        h('b', null, ' ' + o.nom), o.description ? ' : ' + o.description : '',
        (o.exclut || []).length ? h('small', null, ' (à la place de l’option ' + o.exclut.join(', ') + ')') : null)))) : null,
      choix.map(ch => h('label', { class: 'o-choix' }, ch.nom + ' ', h('select', { id: 'choix-' + ch.id, onchange: ev => reglerOptions(r => { r.choix[ch.id] = ev.target.value; }) },
        ch.valeurs.map(v => h('option', { value: v.id, selected: reglage.choix[ch.id] === v.id || null }, v.nom))))));
  }

  // ---------- Qui fait quoi à une étape ----------
  // Renvoie une Map rôle → liste d'actions. "*" = tous les rôles sans autre action à cette étape.
  function resoudre(etape) {
    const nommes = new Set();
    etape.actions.forEach(a => a.roles.forEach(r => { if (r !== '*') nommes.add(r); }));
    const m = new Map();
    for (const a of etape.actions) {
      let rs = a.roles.filter(r => r !== '*');
      if (a.roles.includes('*')) rs = rs.concat(cer.roles.map(r => r.id).filter(id => !nommes.has(id)));
      for (const r of rs) { if (!idx.role[r]) continue; if (!m.has(r)) m.set(r, []); m.get(r).push(a); }
    }
    return m;
  }
  const nomRole = id => (idx.role[id] || { nom: id }).nom;
  const nomPhase = id => (idx.phase[id] || { nom: id || '' }).nom;

  function texteSon(s) {
    const i = idx.instrument[s.instrument];
    let t = i ? i.nom : s.instrument;
    if (s.motif && s.motif.length) return t + ' · ' + s.motif.map(m => (idx.frappe[m] ? idx.frappe[m].nom : m).replace(/ \(.*\)$/, '')).join(', ');
    if (s.serie) return t + ' · ' + s.serie;
    if (s.continu) return t + ' · en continu';
    if (s.coups) t += ' ×' + s.coups;
    if (s.frappe) t += ' · ' + (idx.frappe[s.frappe] ? idx.frappe[s.frappe].nom : s.frappe);
    return t;
  }
  function puces(a) {
    return (a.sons || []).map(s => h('span', { class: 'son', title: s.quand || null }, texteSon(s)));
  }
  function blocAction(a, opts = {}) {
    return h('div', { class: 'action' + (a.optionnel ? ' optionnelle' : '') },
      opts.roles ? h('span', { class: 'qui' }, opts.roles + ' : ') : null,
      h('span', { class: 'quoi' }, a.texte),
      a.optionnel ? h('span', { class: 'tag' }, T.optionnel) : null,
      a.condition && CASES && CASES.condition(cer, a.condition) ? h('span', { class: 'tag condition' }, CASES.condition(cer, a.condition).nom) : null,
      (a.sons && a.sons.length) ? h('span', { class: 'sons' }, puces(a)) : null,
      a.signal && !a.texte.toLowerCase().includes(a.signal.texte.toLowerCase()) ? h('span', { class: 'signal' }, '↳ ' + a.signal.texte) : null,
      a.ref ? h('span', { class: 'ref', title: a.ref.replace(/^GK/, 'Gyōji kihan (trad. Foulk, 2008),') }, a.ref) : null);
  }

  // Regroupe les étapes par phase, en gardant l'ordre.
  function parPhase(etapes) {
    const out = [];
    for (const e of etapes) {
      const last = out[out.length - 1];
      if (!last || last.phase !== e.phase) out.push({ phase: e.phase, etapes: [e] }); else last.etapes.push(e);
    }
    return out;
  }

  // ---------- Vue : le déroulé en bref (la page la plus simple) ----------
  const MOTS = [
    ['Gasshō', 'les mains jointes devant le visage ; sert à saluer.'],
    ['Shashu', 'les mains posées l\u2019une sur l\u2019autre contre la poitrine, pour marcher ou se tenir debout.'],
    ['Zafu', 'le coussin rond sur lequel on s\u2019assoit.'],
    ['Kinhin', 'la marche lente entre deux assises.'],
    ['Kusen', 'l\u2019enseignement donné oralement pendant le zazen.'],
    ['Sanpai', 'trois prosternations, front au sol.'],
    ['Ekō', 'la dédicace récitée après le chant.'],
  ];
  function vueBref() {
    const groupes = parPhase(etapes());
    const objets = cer.roles.filter(r => r.objets && r.objets.length);
    return h('div', { class: 'bref' },
      h('section', { class: 'intro' },
        h('h2', null, cer.titre),
        cer.resume ? h('p', { class: 'resume' }, cer.resume) : null,
        h('p', { class: 'meta' }, [cer.dureeIndicative, cer.source].filter(Boolean).join(' · '))),
      h('p', { class: 'bref-intro' }, 'La pratique suit toujours le même ordre, en ' + groupes.length + ' temps. Pas besoin de tout retenir : il suffit de faire comme les autres et de suivre les sons.'),
      h('ol', { class: 'temps' }, groupes.map(g => {
        const p = idx.phase[g.phase] || { nom: g.phase };
        const moments = [...new Set(g.etapes.map(e => e.moment))];
        const min = g.etapes.find(e => e.minute != null);
        return h('li', null,
          h('div', { class: 't-tete' }, h('h3', null, p.nom), min ? h('span', { class: 'minute' }, (min.minute < 0 ? min.minute : '+' + min.minute) + ' min') : null),
          p.bref ? h('p', null, p.bref) : null,
          h('p', { class: 't-moments' }, moments.join(' · ')));
      })),
      h('section', null,
        h('h2', null, 'Les rôles'),
        h('ul', { class: 'cartes' }, cer.roles.map(r => h('li', null,
          h('a', { class: 'carte', href: '#role/' + r.id },
            h('b', null, r.nom, r.kanji ? h('span', { class: 'kanji', lang: 'ja' }, r.kanji) : null),
            r.obligatoire ? h('span', { class: 'tag' }, T.obligatoire) : null,
            r.resume ? h('small', null, r.resume) : null))))),
      objets.length ? h('section', null,
        h('h2', null, 'À préparer avant la pratique'),
        h('ul', { class: 'prepa' }, objets.map(r => h('li', null, h('b', null, r.nom + ' : '), r.objets.join(', ') + '.')))) : null,
      (cer.glossaire || []).length
        ? h('section', { class: 'mots glossaire' }, h('h2', null, 'Le vocabulaire'),
          [...new Set(cer.glossaire.map(g => g.categorie || ''))].map(cat => [cat ? h('h3', null, cat) : null,
            h('dl', null, cer.glossaire.filter(g => (g.categorie || '') === cat).map(g => [h('dt', null, g.terme), h('dd', null, g.definition)]))]))
        : h('section', { class: 'mots' }, h('h2', null, 'Les mots à connaître'),
          h('dl', null, MOTS.map(([m, d]) => [h('dt', null, m), h('dd', null, d)]))));
  }

  // ---------- Vue : déroulé (matrice étapes × rôles) ----------
  function vueDeroule() {
    const roles = cer.roles;
    const thead = h('thead', null, h('tr', null, h('th', { class: 'col-moment', scope: 'col' }, T.moment),
      roles.map(r => h('th', { scope: 'col' }, h('a', { href: '#role/' + r.id }, r.nom), r.kanji ? h('span', { class: 'kanji', lang: 'ja' }, r.kanji) : null))));
    const tbody = h('tbody');
    let momentPrec = null;
    for (const g of parPhase(etapes())) {
      tbody.append(h('tr', { class: 'phase' }, h('th', { colspan: roles.length + 1, scope: 'colgroup' }, h('span', null, nomPhase(g.phase)))));
      momentPrec = null;
      for (const e of g.etapes) {
        const m = resoudre(e);
        const nouveau = e.moment !== momentPrec; momentPrec = e.moment;
        const tr = h('tr', { class: nouveau ? 'debut' : 'suite' },
          h('th', { class: 'col-moment', scope: 'row' }, nouveau ? e.moment : h('span', { class: 'idem', 'aria-label': e.moment }, '〃'),
            e.minute != null ? h('span', { class: 'minute' }, e.minute + ' ' + T.minute) : null,
            e.option ? h('span', { class: 'tag opt' }, 'Option ' + e.option) : null));
        // Fusionne les cases voisines qui partagent la même action, comme dans le tableur.
        for (let i = 0; i < roles.length;) {
          const acts = m.get(roles[i].id) || [];
          let j = i + 1;
          if (acts.length === 1) while (j < roles.length && (m.get(roles[j].id) || []).length === 1 && m.get(roles[j].id)[0] === acts[0]) j++;
          tr.append(h('td', { colspan: j - i > 1 ? j - i : null, class: acts.length ? (j - i > 1 ? 'fusion' : '') : 'vide' }, acts.map(a => blocAction(a))));
          i = j;
        }
        tbody.append(tr);
        for (const v of e.variantes || []) tbody.append(h('tr', { class: 'variante' }, h('th', { scope: 'row' }, T.variante),
          h('td', { colspan: roles.length }, blocAction(v, { roles: v.roles.map(nomRole).join(', ') }))));
      }
    }
    return h('div', null,
      h('p', { class: 'aide' }, 'Chaque ligne est une étape, chaque colonne un rôle. Les minutes sont indicatives (0 = début du zazen). Sur téléphone, faites glisser le tableau de côté.'),
      h('div', { class: 'defile matrice-cadre' }, h('table', { class: 'matrice' }, thead, tbody)));
  }

  // ---------- Vue : par rôle ----------
  function selecteur(liste, actif, base) {
    return h('div', { class: 'puces-choix', role: 'list' }, liste.map(x =>
      h('a', { role: 'listitem', href: '#' + base + '/' + x.id, class: x.id === actif ? 'actif' : null, 'aria-current': x.id === actif ? 'true' : null }, x.nom)));
  }
  let voirAutres = lire('dg-voir-autres', false);
  function caseAutres(rerender) {
    return h('label', { class: 'option' }, h('input', { type: 'checkbox', checked: voirAutres || null,
      onchange: ev => { voirAutres = ev.target.checked; ecrire('dg-voir-autres', voirAutres); rerender(); } }), ' ' + T.autres);
  }
  function autresActions(m, sauf) {
    const out = [];
    const vu = new Set();
    for (const [rid, acts] of m) for (const a of acts) {
      if (rid === sauf || vu.has(a)) continue; vu.add(a);
      const qui = [...m.entries()].filter(([r, l]) => r !== sauf && l.includes(a)).map(([r]) => nomRole(r));
      out.push(blocAction(a, { roles: qui.length === cer.roles.length - (sauf ? 1 : 0) && qui.length > 2 ? 'Tous' : qui.join(', ') }));
    }
    return out;
  }
  function vueRole(id) {
    const r = idx.role[id] || cer.roles[0];
    const fonctions = (r.fonctions || []).map(f => idx.fonction[f] ? idx.fonction[f].nom : null).filter(Boolean);
    const zone = h('div');
    const remplir = () => {
      zone.replaceChildren(caseAutres(remplir));
      for (const g of parPhase(etapes())) {
        const items = [];
        for (const e of g.etapes) {
          const m = resoudre(e);
          const miennes = m.get(r.id) || [];
          const vars = (e.variantes || []).filter(v => v.roles.includes(r.id));
          if (!miennes.length && !vars.length && !voirAutres) continue;
          items.push(h('li', { class: miennes.length ? '' : 'pas-moi' },
            h('div', { class: 'moment' }, e.moment, e.minute != null ? h('span', { class: 'minute' }, e.minute + ' ' + T.minute) : null),
            miennes.map(a => blocAction(a)),
            vars.map(v => h('div', { class: 'variante' }, h('b', null, T.variante + ' : '), blocAction(v))),
            voirAutres ? h('div', { class: 'autres' }, autresActions(m, r.id)) : null));
        }
        if (items.length) zone.append(h('h3', { class: 'phase-titre' }, nomPhase(g.phase)), h('ol', { class: 'fil' }, items));
      }
    };
    remplir();
    return h('div', null,
      selecteur(cer.roles, r.id, 'role'),
      h('article', { class: 'fiche' },
        h('h2', null, r.nom, r.kanji ? h('span', { class: 'kanji', lang: 'ja' }, r.kanji) : null, r.obligatoire ? h('span', { class: 'tag' }, T.obligatoire) : null),
        r.resume ? h('p', { class: 'resume' }, r.resume) : null,
        h('dl', null,
          fonctions.length ? [h('dt', null, T.fonctions), h('dd', null, fonctions.join(' ; '))] : null,
          r.place && r.place.zazen ? [h('dt', null, T.zazen), h('dd', null, r.place.zazen)] : null,
          r.place && r.place.ceremonie ? [h('dt', null, T.ceremonie), h('dd', null, r.place.ceremonie)] : null,
          r.tenue ? [h('dt', null, 'Tenue'), h('dd', null, r.tenue)] : null,
          r.objets && r.objets.length ? [h('dt', null, T.objets), h('dd', null, r.objets.join(', ') + '.')] : null),
        h('a', { class: 'cta-direct', href: '#direct/' + r.id }, 'Suivre en direct comme ' + r.nom + ' →')),
      zone);
  }

  // ---------- Vue : par instrument ----------
  function vueInstrument(id) {
    const insts = cer.instruments || [];
    if (!insts.length) return h('p', null, 'Cette cérémonie ne décrit pas d’instrument.');
    const ins = idx.instrument[id] || insts[0];
    const lignes = [], joueurs = new Set();
    for (const e of etapes()) {
      const m = resoudre(e);
      const vus = new Set();
      for (const [rid, acts] of m) for (const a of acts) {
        if (vus.has(a)) continue; vus.add(a);
        const sons = (a.sons || []).filter(s => s.instrument === ins.id);
        if (!sons.length) continue;
        const qui = [...m.entries()].filter(([, l]) => l.includes(a)).map(([r]) => r);
        qui.forEach(q => joueurs.add(q));
        lignes.push({ e, a, sons, qui, variante: false });
      }
      for (const v of e.variantes || []) {
        const sons = (v.sons || []).filter(s => s.instrument === ins.id);
        if (sons.length) lignes.push({ e, a: v, sons, qui: v.roles, variante: true });
      }
    }
    let phasePrec = null, liste = null;
    const zone = h('div', null);
    for (const l of lignes) {
      if (l.e.phase !== phasePrec) {
        phasePrec = l.e.phase;
        liste = h('ol', { class: 'fil sons-liste' });
        zone.append(h('h3', { class: 'phase-titre' }, nomPhase(l.e.phase)), liste);
      }
      liste.append(h('li', { class: l.variante ? 'pas-moi' : '' },
        h('div', { class: 'moment' }, l.e.moment, l.e.minute != null ? h('span', { class: 'minute' }, l.e.minute + ' ' + T.minute) : null),
        h('div', { class: 'son-ligne' }, l.sons.map(s => h('span', { class: 'son grand' }, texteSon(s))),
          h('span', { class: 'qui' }, (l.variante ? T.variante + ' · ' : '') + l.qui.map(nomRole).join(', '))),
        l.sons.some(s => s.quand) ? h('div', { class: 'signal' }, l.sons.filter(s => s.quand).map(s => s.quand).join(' ; ')) : null,
        l.a.signal ? h('div', { class: 'signal' }, '↳ ' + l.a.signal.texte) : null,
        h('div', { class: 'quoi' }, l.a.texte)));
    }
    const frappes = (cer.frappes || []).filter(f => lignes.some(l => l.sons.some(s => s.frappe === f.id)));
    return h('div', null,
      selecteur(insts, ins.id, 'instrument'),
      h('article', { class: 'fiche' },
        h('h2', null, ins.nom, ins.kanji ? h('span', { class: 'kanji', lang: 'ja' }, ins.kanji) : null),
        ins.description ? h('p', { class: 'resume' }, ins.description) : null,
        ins.son ? h('button', { type: 'button', class: 'ecouter', onclick: () => { try { new Audio(ins.son).play(); } catch (e) {} } }, '▶ ' + T.ecouter) : null,
        h('dl', null,
          ins.technique ? [h('dt', null, 'Technique'), h('dd', null, ins.technique)] : null,
          joueurs.size ? [h('dt', null, T.joue), h('dd', null, [...joueurs].map(nomRole).join(', '))] : null,
          frappes.length ? [h('dt', null, T.frappes), h('dd', null, frappes.map(f => f.nom + ' : ' + f.description).join(' '))] : null,
          ins.source ? [h('dt', null, 'Source'), h('dd', null, ins.source)] : null)),
      h('h2', { class: 'sous' }, T.sons + ' (' + lignes.length + ')'),
      zone);
  }

  // ---------- Vue : en direct (téléphone, on avance à la main) ----------
  let verrou = null;
  async function garderEcran(oui) {
    try {
      if (oui && 'wakeLock' in navigator) { verrou = await navigator.wakeLock.request('screen'); }
      else if (verrou) { await verrou.release(); verrou = null; }
    } catch (e) { verrou = null; }
  }
  function vueDirect(roleId) {
    const etat = lire(CLE_DIRECT, {});
    const r = idx.role[roleId] || idx.role[etat.role] || cer.roles.find(x => x.id === 'sangha') || cer.roles[0];
    const pos = etat.ceremonie === cer.id ? etat : {};
    let i = Math.min(Math.max(pos.i || 0, 0), etapes().length - 1);
    const carte = h('div', { class: 'direct-carte', 'aria-live': 'polite' });
    const compteur = h('span', { class: 'compteur' });
    const bPrec = h('button', { type: 'button', class: 'nav', onclick: () => aller(-1) }, T.precedent);
    const bSuiv = h('button', { type: 'button', class: 'nav principal', onclick: () => aller(1) }, T.suivant);

    function aller(d) { i = Math.min(Math.max(i + d, 0), etapes().length - 1); peindre(); }
    function peindre() {
      ecrire(CLE_DIRECT, { ceremonie: cer.id, role: r.id, i });
      const e = etapes()[i];
      const m = resoudre(e);
      const miennes = m.get(r.id) || [];
      const vars = (e.variantes || []).filter(v => v.roles.includes(r.id));
      let ensuite = null;
      for (let k = i + 1; k < etapes().length; k++) {
        const mm = resoudre(etapes()[k]).get(r.id);
        if (mm && mm.length) { ensuite = { e: etapes()[k], a: mm[0] }; break; }
      }
      remplace(carte, 
        h('div', { class: 'ou' }, nomPhase(e.phase), e.minute != null ? h('span', { class: 'minute' }, e.minute + ' ' + T.minute) : null),
        h('h2', null, e.moment),
        miennes.length
          ? h('div', { class: 'moi' }, miennes.map(a => blocAction(a)))
          : h('div', { class: 'moi rien' }, h('p', null, T.rien)),
        vars.map(v => h('div', { class: 'variante' }, h('b', null, T.variante + ' : '), blocAction(v))),
        (voirAutres || !miennes.length) ? h('div', { class: 'autres' }, h('h3', null, T.pendant), autresActions(m, r.id)) : null,
        ensuite ? h('p', { class: 'ensuite' }, h('b', null, T.ensuite + ' (' + ensuite.e.moment + ') : '), ensuite.a.texte)
          : (i === etapes().length - 1 ? h('p', { class: 'ensuite' }, T.fini) : null));
      compteur.textContent = T.etape + ' ' + (i + 1) + ' / ' + etapes().length;
      bPrec.disabled = i === 0; bSuiv.disabled = i === etapes().length - 1;
    }
    // Clavier (flèches, espace) et balayage du doigt
    onTouche = ev => {
      if (ev.target.closest('select,input,textarea')) return;
      if (ev.key === 'ArrowRight' || ev.key === ' ' || ev.key === 'PageDown') { ev.preventDefault(); aller(1); }
      else if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') { ev.preventDefault(); aller(-1); }
    };
    let x0 = null, y0 = null;
    carte.addEventListener('touchstart', ev => { x0 = ev.touches[0].clientX; y0 = ev.touches[0].clientY; }, { passive: true });
    carte.addEventListener('touchend', ev => {
      if (x0 == null) return;
      const dx = ev.changedTouches[0].clientX - x0, dy = ev.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) aller(dx < 0 ? 1 : -1);
      x0 = null;
    });
    const choixRole = h('select', { id: 'direct-role', onchange: ev => { location.hash = '#direct/' + ev.target.value; } },
      cer.roles.map(x => h('option', { value: x.id, selected: x.id === r.id || null }, x.nom)));
    const peindreTout = () => peindre();
    peindre();
    return h('div', { class: 'direct' },
      h('div', { class: 'direct-reglages' },
        h('label', null, 'Je suis ', choixRole),
        caseAutres(peindreTout),
        'wakeLock' in navigator ? h('label', { class: 'option' }, h('input', { type: 'checkbox', onchange: ev => garderEcran(ev.target.checked) }), ' ' + T.ecran) : null,
        h('button', { type: 'button', class: 'lien', onclick: () => { i = 0; peindre(); } }, 'Recommencer')),
      carte,
      h('div', { class: 'direct-nav' }, bPrec, compteur, bSuiv));
  }
  let onTouche = null;
  document.addEventListener('keydown', ev => { if (onTouche) onTouche(ev); });

  // ---------- Impression : la cérémonie complète, en liste ----------
  function peindreImpression() {
    const z = $('#impression');
    remplace(z, h('h1', null, cer.titre), cer.source ? h('p', null, cer.source) : null);
    for (const g of parPhase(etapes())) {
      z.append(h('h2', null, nomPhase(g.phase)));
      let momentPrec = null, ol = null;
      for (const e of g.etapes) {
        if (e.moment !== momentPrec) { momentPrec = e.moment; z.append(h('h3', null, e.moment, e.minute != null ? ' (' + e.minute + ' ' + T.minute + ')' : '')); ol = h('ul'); z.append(ol); }
        const m = resoudre(e);
        ol.append(h('li', null, autresActions(m, null)));
        for (const v of e.variantes || []) ol.append(h('li', { class: 'variante' }, T.variante + ' — ', blocAction(v, { roles: v.roles.map(nomRole).join(', ') })));
      }
    }
  }
  window.addEventListener('beforeprint', peindreImpression);

  // ---------- Barre : choix, import, export ----------
  function remplirChoix() {
    const s = $('#choix-ceremonie');
    s.replaceChildren(...toutes().map(c => h('option', { value: c.id, selected: c.id === cer.id || null }, c.titre + ' (' + (c._modele ? T.modele : T.importee) + ')')));
    $('#b-retirer').hidden = !!cer._modele;
  }
  function message(t) { const p = $('#message'); p.textContent = t; p.hidden = false; clearTimeout(message.t); message.t = setTimeout(() => { p.hidden = true; }, 6000); }
  function propre(c) { const o = { ...c }; delete o._modele; return o; }

  $('#choix-ceremonie').addEventListener('change', ev => { choisir(ev.target.value); route(); });
  $('#b-exporter').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(propre(cer), null, 2)], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: cer.id + '.json' });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  $('#b-importer').addEventListener('change', ev => {
    const f = ev.target.files[0]; ev.target.value = '';
    if (!f) return;
    const tableur = /\.xlsx$/i.test(f.name) && window.DG_EXCEL;
    const lecture = tableur
      ? f.arrayBuffer().then(b => window.DG_EXCEL.lire(b)).then(cl => window.DG_EXCEL.convertir(cl, { id: 'tableau-' + Date.now().toString(36), titre: f.name.replace(/\.xlsx$/i, ''), source: 'Importé du tableau Excel « ' + f.name + ' ».' })).catch(() => null)
      : f.text().then(txt => { try { return JSON.parse(txt); } catch (e) { return null; } });
    lecture.then(c => {
      if (!valide(c)) { message(tableur ? T.importXlsxKo : T.importKo); return; }
      // Un import ne remplace jamais un modèle : on lui donne un autre identifiant si besoin.
      if (MODELES.some(x => x.id === c.id)) c.id = c.id + '-importee';
      imports = imports.filter(x => x.id !== c.id).concat([c]);
      const ok = ecrire(CLE_IMPORTS, imports);
      choisir(c.id); route();
      message(T.importOk + c.titre + (ok ? '' : '. ' + T.stockageKo));
    });
  });
  $('#b-retirer').addEventListener('click', () => {
    if (cer._modele) return;
    imports = imports.filter(x => x.id !== cer.id); ecrire(CLE_IMPORTS, imports);
    choisir(MODELES[0] && MODELES[0].id); route(); message(T.retirerOk);
  });
  $('#b-imprimer').addEventListener('click', () => { peindreImpression(); window.print(); });

  // ---------- Navigation par l'adresse (#deroule, #role/doshi, #direct/inkin…) ----------
  function route() {
    let [vue, arg] = (location.hash.slice(1) || 'bref').split('/');
    if (vue === 'apercu') vue = 'bref';   // ancienne adresse
    const v = T.vues[vue] ? vue : 'bref';
    onTouche = null;
    document.body.classList.toggle('mode-direct', v === 'direct');
    document.body.classList.toggle('mode-construire', v === 'construire');
    if (v !== 'direct') garderEcran(false);
    document.querySelectorAll('.onglets a').forEach(a => {
      const on = a.dataset.vue === v;
      a.classList.toggle('actif', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const z = $('#vue');
    remplace(z, v === 'construire' ? null : barreOptions(),
      v === 'deroule' ? vueDeroule() :
      v === 'role' ? vueRole(arg) :
      v === 'instrument' ? vueInstrument(arg) :
      v === 'direct' ? vueDirect(arg) :
      v === 'construire' && window.DG_CONSTRUIRE ? window.DG_CONSTRUIRE(arg) : vueBref());
    document.title = T.vues[v] + ' · ' + cer.titre + ' · DharmaGates';
  }
  window.addEventListener('hashchange', () => { route(); if (!location.hash.startsWith('#direct')) $('.onglets').scrollIntoView({ block: 'nearest' }); });

  // ---------- Ce que le constructeur (construire.js) utilise ----------
  window.DG = {
    T, h, remplace, lire, ecrire, valide, resoudre, nomRole, texteSon, message, route, propre, CASES,
    MODELES,
    get cer() { return cer; },
    get idx() { return idx; },
    estModele: c => !!(c && c._modele),
    // Enregistre (ou remplace) une de « mes cérémonies » dans le navigateur et l'affiche.
    mettre(c) {
      imports = imports.filter(x => x.id !== c.id).concat([c]);
      const ok = ecrire(CLE_IMPORTS, imports);
      choisir(c.id);
      return ok;
    },
    idLibre(base) { let id = base, n = 2; while (toutes().some(x => x.id === id)) id = base + '-' + n++; return id; },
  };

  choisir(lire(CLE_COURANTE, null));
  if (cer) route(); else $('#vue').textContent = 'Aucune cérémonie à afficher.';
})();
