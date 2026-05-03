import Project from '../models/Project.js'

/* ── GET /api/projects ────────────────────────────────────
   Récupérer tous les projets (du plus récent au plus ancien)
─────────────────────────────────────────────────────────── */
export const getAllProjects = async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', detail: err.message })
  }
}

/* ── GET /api/projects/:id ────────────────────────────────
   Récupérer un projet par son identifiant MongoDB
─────────────────────────────────────────────────────────── */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Projet introuvable' })
    res.json(project)
  } catch (err) {
    // ID mal formaté → cast error Mongoose
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Identifiant invalide' })
    }
    res.status(500).json({ error: 'Erreur serveur', detail: err.message })
  }
}

/* ── POST /api/projects ───────────────────────────────────
   Créer un nouveau projet
─────────────────────────────────────────────────────────── */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    // Erreur de validation Mongoose
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ error: 'Validation échouée', details: messages })
    }
    res.status(500).json({ error: 'Erreur serveur', detail: err.message })
  }
}

/* ── PUT /api/projects/:id ────────────────────────────────
   Modifier un projet (remplacement complet)
─────────────────────────────────────────────────────────── */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:              true,   // retourner le document mis à jour
        runValidators:    true,   // valider les données avant sauvegarde
        overwrite:        false,  // ne pas supprimer les champs non envoyés
      }
    )
    if (!project) return res.status(404).json({ error: 'Projet introuvable' })
    res.json(project)
  } catch (err) {
    if (err.name === 'CastError')       return res.status(400).json({ error: 'Identifiant invalide' })
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ error: 'Validation échouée', details: messages })
    }
    res.status(500).json({ error: 'Erreur serveur', detail: err.message })
  }
}

/* ── PATCH /api/projects/:id ──────────────────────────────
   Modifier partiellement un projet
─────────────────────────────────────────────────────────── */
export const patchProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!project) return res.status(404).json({ error: 'Projet introuvable' })
    res.json(project)
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'Identifiant invalide' })
    res.status(500).json({ error: 'Erreur serveur', detail: err.message })
  }
}

/* ── DELETE /api/projects/:id ─────────────────────────────
   Supprimer un projet
─────────────────────────────────────────────────────────── */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ error: 'Projet introuvable' })
    res.json({ success: true, message: 'Projet supprimé avec succès' })
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'Identifiant invalide' })
    res.status(500).json({ error: 'Erreur serveur', detail: err.message })
  }
}
