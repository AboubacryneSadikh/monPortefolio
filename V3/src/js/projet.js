// ============================================================
// projet.js — Modèle Projet + fonctions utilitaires
// ============================================================

/**
 * Crée un objet projet normalisé SANS id (json-server le génère).
 */
export function creerProjet({ titre, description, technologies, statut, github, demo, image, imageNom, imageTaille }) {
  
  return {
    titre: titre.trim(),
    description: description?.trim() || '',
    technologies: Array.isArray(technologies)
      ? technologies
      : technologies.split(',').map(t => t.trim()).filter(Boolean),
    statut: statut || 'en_cours',
    github: github?.trim() || '',
    demo:   demo?.trim()   || '',
    image:  image  || null,
    imageNom:    imageNom    || '',
    imageTaille: imageTaille || 0,
    date: new Date().toLocaleDateString('fr-FR'),
  };
}

export function statutLabel(statut) {
  return { en_cours: 'En cours', termine: 'Terminé', archive: 'Archivé' }[statut] || statut;
}

export function formatTaille(octets) {
  if (!octets) return '0 Ko';
  if (octets < 1024)           return `${octets} o`;
  if (octets < 1024 * 1024)    return `${(octets / 1024).toFixed(1)} Ko`;
  return `${(octets / (1024 * 1024)).toFixed(2)} Mo`;
}

export function calculerStats(projets) {
  return {
    total:       projets.length,
    enCours:     projets.filter(p => p.statut === 'en_cours').length,
    termines:    projets.filter(p => p.statut === 'termine').length,
    tailleImages: projets.reduce((acc, p) => acc + (p.imageTaille || 0), 0),
  };
}

export function filtrerProjets(projets, filtre) {
  if (filtre === 'tous') return projets;
  return projets.filter(p => p.statut === filtre);
}
