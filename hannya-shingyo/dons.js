// Page de dons de DharmaGates (Ko-fi). Tant que l'adresse est vide, les liens de don restent cachés.
// Chaque élément marqué data-don est montré, et reçoit l'adresse s'il s'agit d'un lien.
window.DHARMA_DONS = '';
(function(){
  const url = window.DHARMA_DONS;
  if (!url) return;
  const show = () => document.querySelectorAll('[data-don]').forEach(e => {
    if (e.tagName === 'A'){ e.href = url; e.target = '_blank'; e.rel = 'noopener'; }
    e.hidden = false;
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
