// ============================================================
// detailProjet.js — Modal de détail avec classes Tailwind
// ============================================================

import { statutLabel, formatTaille } from './projet.js';
import { ouvrirModal } from './ui.js';

export function afficherDetail(projet) {
  const { titre, description, technologies, statut, image, imageNom, imageTaille, github, demo, date } = projet;

  document.getElementById('detail-contenu').innerHTML = `
    ${image
      ? `<img class="w-full h-52 object-cover rounded-xl mb-5" src="${image}" alt="${titre}">`
      : `<div class="w-full h-36 flex items-center justify-center text-5xl rounded-xl mb-5" style="background:linear-gradient(135deg,#1c2128,#30363d)">🗂️</div>`}

    <div class="flex gap-2 flex-wrap mb-3 items-center">
      <span class="font-mono-custom text-[10px] px-2 py-0.5 rounded-full font-semibold status-${statut}">
        ${statutLabel(statut)}
      </span>
      ${imageTaille ? `<span class="font-mono-custom text-[10px] text-[#8b949e] bg-[#1c2128] px-2 py-0.5 rounded">${formatTaille(imageTaille)}</span>` : ''}
    </div>

    <h2 class="text-2xl font-extrabold text-[#58a6ff] mb-3">${titre}</h2>
    <p class="text-[#c9d1d9] text-sm leading-relaxed mb-4">${description || 'Aucune description.'}</p>

    <div class="grid grid-cols-2 gap-3 mb-4">
      <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
        <div class="font-mono-custom text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Date d'ajout</div>
        <div class="text-sm font-semibold">${date || '—'}</div>
      </div>
      <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
        <div class="font-mono-custom text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Technologies</div>
        <div class="text-sm font-semibold">${technologies?.join(', ') || '—'}</div>
      </div>
      ${imageNom ? `
      <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
        <div class="font-mono-custom text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Fichier image</div>
        <div class="text-xs font-semibold truncate">${imageNom}</div>
      </div>` : ''}
      ${imageTaille ? `
      <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
        <div class="font-mono-custom text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Taille image</div>
        <div class="text-sm font-semibold">${formatTaille(imageTaille)}</div>
      </div>` : ''}
    </div>

    <div class="flex gap-4 flex-wrap mt-2">
      ${github ? `<a href="${github}" target="_blank" class="text-[#58a6ff] text-sm font-mono-custom hover:underline">⬡ GitHub →</a>` : ''}
      ${demo   ? `<a href="${demo}"   target="_blank" class="text-[#58a6ff] text-sm font-mono-custom hover:underline">🌐 Démo →</a>`   : ''}
    </div>
  `;

  ouvrirModal('modal-detail');
}
