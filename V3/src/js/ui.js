// ============================================================
// ui.js — Rendu HTML avec classes Tailwind CSS
// ============================================================

import { statutLabel, formatTaille } from './projet.js';

// ─── CARTES ──────────────────────────────────────────────────
export function creerCarteHTML(projet) {
  const { id, titre, description, technologies, statut, image, imageTaille } = projet;

  // On s'assure que l'id est bien présent dans les data-attributes
  const idStr = String(id);

  return `
    <div class="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden transition-all duration-200 card-hover relative">

      <span class="absolute top-3 right-3 font-mono-custom text-[10px] px-2 py-0.5 rounded-full font-semibold z-10 status-${statut}">
        ${statutLabel(statut)}
      </span>

      ${image
        ? `<img class="w-full h-44 object-cover" src="${image}" alt="${titre}">`
        : `<div class="w-full h-44 flex items-center justify-center text-3xl text-[#8b949e]" style="background:linear-gradient(135deg,#1c2128,#30363d)">🗂️</div>`}

      <div class="p-5">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-[#58a6ff] text-sm flex-1 mr-2">${titre}</h3>
          ${imageTaille ? `<span class="font-mono-custom text-[10px] text-[#8b949e] bg-[#1c2128] px-2 py-0.5 rounded whitespace-nowrap">${formatTaille(imageTaille)}</span>` : ''}
        </div>

        <p class="text-[#8b949e] text-xs leading-relaxed mb-3 line-clamp-2">${description || 'Aucune description.'}</p>

        ${technologies?.length
          ? `<div class="flex gap-1.5 flex-wrap mb-4">${technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>`
          : '<div class="mb-4"></div>'}

        <div class="flex gap-2">
          <button
            class="btn-detail flex-1 bg-blue-500/10 text-[#58a6ff] border border-blue-500/20 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer hover:bg-[#58a6ff] hover:text-[#0d1117] transition-all"
            data-id="${idStr}">
            Voir détails
          </button>
          <button
            class="btn-delete bg-red-500/10 text-[#da3633] border border-red-500/20 px-3 py-2 rounded-lg text-xs cursor-pointer hover:bg-[#da3633] hover:text-white transition-all"
            data-id="${idStr}">
            🗑
          </button>
        </div>
      </div>
    </div>
  `;
}

export function afficherGrille(projets) {
  const grid = document.getElementById('projets-grid');
  if (projets.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-16 text-[#8b949e]">
        <div class="text-5xl mb-4 opacity-40">📂</div>
        <p class="text-sm">Aucun projet trouvé.<br>Ajoutes-en un !</p>
      </div>`;
    return;
  }
  grid.innerHTML = projets.map(creerCarteHTML).join('');
}

// ─── STATS ───────────────────────────────────────────────────
export function afficherStats({ total, enCours, termines, tailleImages }) {
  document.getElementById('stat-total').textContent   = total;
  document.getElementById('stat-cours').textContent   = enCours;
  document.getElementById('stat-termine').textContent = termines;
  document.getElementById('stat-taille').textContent  = formatTaille(tailleImages);
}

// ─── MODALS ───────────────────────────────────────────────────
export function ouvrirModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.classList.add('flex');
}

export function fermerModal(id) {
  const el = document.getElementById(id);
  el.classList.add('hidden');
  el.classList.remove('flex');
}

export function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.add('hidden');
      btn.closest('.modal-overlay').classList.remove('flex');
    });
  });
}

// ─── TOAST ───────────────────────────────────────────────────
export function afficherToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.borderColor = type === 'success' ? '#238636' : '#da3633';
  toast.style.transform   = 'translateY(0)';
  toast.style.opacity     = '1';
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity   = '0';
  }, 3000);
}

// ─── FILTRES ─────────────────────────────────────────────────
export function initFiltres(onFiltre) {
  const btns = document.querySelectorAll('.filter-btn');

  // Activer "Tous" au démarrage
  btns.forEach(b => {
    b.classList.remove('bg-[#58a6ff]', 'text-[#0d1117]', 'border-[#58a6ff]');
    b.classList.add('text-[#8b949e]');
  });
  const defaut = document.querySelector('.filter-btn[data-filter="tous"]');
  if (defaut) {
    defaut.classList.add('bg-[#58a6ff]', 'text-[#0d1117]', 'border-[#58a6ff]');
    defaut.classList.remove('text-[#8b949e]');
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('bg-[#58a6ff]', 'text-[#0d1117]', 'border-[#58a6ff]');
        b.classList.add('text-[#8b949e]');
      });
      btn.classList.add('bg-[#58a6ff]', 'text-[#0d1117]', 'border-[#58a6ff]');
      btn.classList.remove('text-[#8b949e]');
      onFiltre(btn.dataset.filter);
    });
  });
}
