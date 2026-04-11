// ============================================================
// api.js — Couche API REST avec json-server
// URL : http://localhost:3001/projets
// ============================================================

const API_URL = 'http://localhost:3001/projets';

// Headers communs pour éviter les problèmes CORS
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/**
 * Récupère tous les projets.
 */
export async function getProjets() {
  const reponse = await fetch(API_URL, { headers: HEADERS });
  if (!reponse.ok) throw new Error(`GET /projets échoué : ${reponse.status}`);
  return reponse.json();
}

/**
 * Ajoute un projet via POST.
 * ⚠️ Ne jamais envoyer id:null — json-server v1 le refuse avec 500
 */
export async function ajouterProjet(projet) {
  // Sécurité : on retire l'id si présent pour laisser json-server le générer
  const { id, ...projetSansId } = projet;

  const reponse = await fetch(API_URL, {
    method:  'POST',
    headers: HEADERS,
    body:    JSON.stringify(projetSansId),
  });

  if (!reponse.ok) {
    const texte = await reponse.text();
    throw new Error(`POST /projets échoué (${reponse.status}) : ${texte}`);
  }

  return reponse.json();
}

/**
 * Supprime un projet via DELETE.
 */
export async function supprimerProjet(id) {
  const reponse = await fetch(`${API_URL}/${id}`, {
    method:  'DELETE',
    headers: HEADERS,
  });
  if (!reponse.ok) throw new Error(`DELETE /projets/${id} échoué : ${reponse.status}`);
}

/**
 * Met à jour un projet via PUT.
 */
export async function modifierProjet(id, donnees) {
  const reponse = await fetch(`${API_URL}/${id}`, {
    method:  'PUT',
    headers: HEADERS,
    body:    JSON.stringify(donnees),
  });
  if (!reponse.ok) throw new Error(`PUT /projets/${id} échoué : ${reponse.status}`);
  return reponse.json();
}
