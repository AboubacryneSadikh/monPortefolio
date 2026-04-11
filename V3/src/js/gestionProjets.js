// ============================================================
// gestionProjets.js
// ============================================================

import { getProjets, ajouterProjet, supprimerProjet } from './api.js';
import { creerProjet, filtrerProjets, calculerStats } from './projet.js';
import { afficherGrille, afficherStats, afficherToast, ouvrirModal, fermerModal } from './ui.js';
import { afficherDetail } from './detailProjet.js';

let projetsEnMemoire = [];
let filtreActif = 'tous';

let imageBase64 = null;
let imageTaille = 0;
let imageNom    = '';

// ─── INIT ──────────────────────────────────────────────────────
export async function initGestionProjets() {
  afficherChargement();
  try {
    projetsEnMemoire = await getProjets();
    console.log('✅ Projets chargés :', projetsEnMemoire);
  } catch (err) {
    console.error('❌ Erreur chargement :', err);
    afficherToast('❌ json-server inaccessible ! Lance : json-server --port 3001 db.json', 'error');
    projetsEnMemoire = [];
  }

  rafraichir();
  initEvenementsCarte();
  initFormulaireAjout();
  initUploadImage();
}

function afficherChargement() {
  document.getElementById('projets-grid').innerHTML = `
    <div class="col-span-full text-center py-16 text-[#8b949e]">
      <div class="text-4xl mb-3 animate-pulse">⏳</div>
      <p class="text-sm font-mono-custom">Chargement depuis l'API...</p>
    </div>`;
}

export function rafraichir() {
  afficherGrille(filtrerProjets(projetsEnMemoire, filtreActif));
  afficherStats(calculerStats(projetsEnMemoire));
}

export function changerFiltre(filtre) {
  filtreActif = filtre;
  rafraichir();
}

// ─── ÉVÉNEMENTS CARTES ─────────────────────────────────────────
function initEvenementsCarte() {
  const conteneur = document.getElementById('projets-section');
  if (!conteneur) return;

  conteneur.addEventListener('click', async (e) => {
    const btnDetail = e.target.closest('.btn-detail');
    if (btnDetail) {
      const id = String(btnDetail.dataset.id);
      const projet = projetsEnMemoire.find(p => String(p.id) === id);
      if (projet) afficherDetail(projet);
      else afficherToast('Projet introuvable', 'error');
      return;
    }

    const btnDelete = e.target.closest('.btn-delete');
    if (btnDelete) {
      const id = String(btnDelete.dataset.id);
      if (!confirm('Supprimer ce projet ?')) return;
      btnDelete.textContent = '...';
      btnDelete.disabled = true;
      try {
        await supprimerProjet(id);
        projetsEnMemoire = projetsEnMemoire.filter(p => String(p.id) !== id);
        rafraichir();
        afficherToast('🗑 Projet supprimé', 'error');
      } catch (err) {
        console.error('Erreur suppression :', err);
        afficherToast('❌ Erreur suppression', 'error');
        btnDelete.textContent = '🗑';
        btnDelete.disabled = false;
      }
    }
  });
}

// ─── FORMULAIRE AJOUT ──────────────────────────────────────────
function initFormulaireAjout() {
  const form = document.getElementById('form-projet');
  if (form) form.addEventListener('submit', soumettreFormulaire);
}

export function ouvrirFormulaireAjout() {
  document.getElementById('form-projet').reset();
  document.getElementById('img-preview').classList.add('hidden');
  document.getElementById('img-info').textContent = '';
  imageBase64 = null; imageTaille = 0; imageNom = '';
  ouvrirModal('modal-ajout');
}

async function soumettreFormulaire(e) {
  e.preventDefault();

  const titre = document.getElementById('f-titre').value.trim();
  if (!titre) { afficherToast('Le titre est obligatoire !', 'error'); return; }

  const btnSubmit = e.target.querySelector('button[type="submit"]');
  const texteOriginal = btnSubmit.textContent;
  btnSubmit.textContent = 'Envoi en cours...';
  btnSubmit.disabled = true;

  try {
    const projet = creerProjet({
      titre,
      description:  document.getElementById('f-desc').value,
      technologies: document.getElementById('f-tech').value,
      statut:       document.getElementById('f-statut').value,
      github:       document.getElementById('f-github').value,
      demo:         document.getElementById('f-demo').value,
      image:        imageBase64,   // déjà compressée via compresserImage()
      imageNom,
      imageTaille,
    });

    console.log('📤 Taille payload :', JSON.stringify(projet).length, 'octets');

    const projetCree = await ajouterProjet(projet);
    console.log('✅ Projet créé :', projetCree);

    projetsEnMemoire = [projetCree, ...projetsEnMemoire];
    rafraichir();
    fermerModal('modal-ajout');
    afficherToast('✅ Projet ajouté avec succès !', 'success');

  } catch (err) {
    console.error('❌ Erreur ajout :', err);
    afficherToast(`❌ ${err.message}`, 'error');
  } finally {
    btnSubmit.textContent = texteOriginal;
    btnSubmit.disabled = false;
  }
}

// ─── UPLOAD IMAGE + COMPRESSION ────────────────────────────────
function initUploadImage() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('f-image');
  if (!dropZone || !fileInput) return;

  fileInput.addEventListener('change', () => chargerImage(fileInput.files[0]));

  dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('drop-zone-active'); });
  dropZone.addEventListener('dragleave', ()  => dropZone.classList.remove('drop-zone-active'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drop-zone-active');
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) chargerImage(file);
  });
}

function chargerImage(file) {
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    afficherToast('Image trop lourde (max 10 Mo)', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (ev) => {
    try {
      // Compression avant stockage — cible < 60 Ko en base64
      const base64Compresse = await compresserImage(ev.target.result, 400, 0.6);

      imageBase64 = base64Compresse;
      imageTaille = file.size;  // taille originale pour affichage
      imageNom    = file.name;

      const tailleBase64 = Math.round(base64Compresse.length * 0.75); // taille réelle en octets
      console.log(`🖼️ Image compressée : ${(tailleBase64 / 1024).toFixed(1)} Ko (base64)`);

      const preview = document.getElementById('img-preview');
      preview.src = base64Compresse;
      preview.classList.remove('hidden');
      document.getElementById('img-info').textContent =
        `${file.name} — original: ${(file.size / 1024).toFixed(0)} Ko → compressé: ${(tailleBase64 / 1024).toFixed(0)} Ko`;

    } catch (err) {
      console.error('Erreur compression :', err);
      afficherToast('Erreur lors du traitement de l\'image', 'error');
    }
  };
  reader.readAsDataURL(file);
}

/**
 * Compresse une image via Canvas.
 * @param {string} base64Source  - image originale en base64
 * @param {number} largeurMax    - largeur max en pixels (défaut 400)
 * @param {number} qualite       - qualité JPEG entre 0 et 1 (défaut 0.6)
 * @returns {Promise<string>}    - base64 compressée
 */
function compresserImage(base64Source, largeurMax = 400, qualite = 0.6) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Calculer les nouvelles dimensions en gardant le ratio
      let largeur = img.width;
      let hauteur = img.height;

      if (largeur > largeurMax) {
        hauteur = Math.round((hauteur * largeurMax) / largeur);
        largeur = largeurMax;
      }

      // Dessiner sur un canvas aux nouvelles dimensions
      const canvas = document.createElement('canvas');
      canvas.width  = largeur;
      canvas.height = hauteur;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, largeur, hauteur);

      // Exporter en JPEG compressé
      const base64Compresse = canvas.toDataURL('image/jpeg', qualite);
      resolve(base64Compresse);
    };
    img.onerror = () => reject(new Error('Impossible de charger l\'image'));
    img.src = base64Source;
  });
}