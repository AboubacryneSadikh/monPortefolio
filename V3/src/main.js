// ============================================================
// main.js — Point d'entrée de l'application
// ============================================================

import { initGestionProjets, changerFiltre, ouvrirFormulaireAjout } from './js/gestionProjets.js';
import { initModals, initFiltres, afficherToast } from './js/ui.js';

document.addEventListener('DOMContentLoaded', async () => {

  // 1. Modals
  initModals();

  // 2. Charger et afficher les projets depuis json-server
  await initGestionProjets();

  // 3. Filtres
  initFiltres((filtre) => changerFiltre(filtre));

  // 4. Bouton ouvrir modal ajout
  document.getElementById('btn-ouvrir-ajout')
    .addEventListener('click', ouvrirFormulaireAjout);

  // 5. Formulaire contact
  initContact();
});

// ─── CONTACT ───────────────────────────────────────────────────
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom     = this.elements['nom'].value.trim();
    const email   = this.elements['email'].value.trim();
    const message = this.elements['message'].value.trim();

    if (!nom)    { afficherToast('Le nom est obligatoire !', 'error'); return; }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) { afficherToast('Email invalide !', 'error'); return; }
    if (!message){ afficherToast('Le message est obligatoire !', 'error'); return; }

    const msg = document.getElementById('contact-msg');
    msg.textContent = `✅ Merci ${nom}, votre message a bien été reçu !`;
    form.reset();
    setTimeout(() => { msg.textContent = ''; }, 5000);
  });
}
