const BASE = '/api/projects'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`Erreur ${res.status}: ${res.statusText}`)
  // DELETE renvoie 200 sans corps
  if (res.status === 200 && options.method === 'DELETE') return true
  return res.json()
}

export const api = {
  /** Récupérer tous les projets */
  getAll: () => request(BASE),

  /** Récupérer un projet par ID */
  getOne: (id) => request(`${BASE}/${id}`),

  /** Créer un nouveau projet */
  create: (data) =>
    request(BASE, { method: 'POST', body: JSON.stringify(data) }),

  /** Modifier un projet existant (remplacement complet) */
  update: (id, data) =>
    request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  /** Modifier partiellement un projet */
  patch: (id, data) =>
    request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  /** Supprimer un projet */
  delete: (id) =>
    request(`${BASE}/${id}`, { method: 'DELETE' }),
}
