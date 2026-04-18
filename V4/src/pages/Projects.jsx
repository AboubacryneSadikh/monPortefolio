import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import ProjectCard   from '../components/ProjectCard'
import ConfirmModal  from '../components/ConfirmModal'
import { useToast }  from '../ToastContext'

const TYPES = ['Tous', 'Mobile', 'Web', 'Desktop', 'API', 'IA / Data']

export default function Projects() {
  const toast                   = useToast()
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('Tous')
  const [toDelete, setToDelete] = useState(null) // id du projet à supprimer

  /* ── Chargement initial ── */
  useEffect(() => {
    api.getAll()
      .then(setProjects)
      .catch(() => toast.error('Impossible de charger les projets'))
      .finally(() => setLoading(false))
  }, [])

  /* ── Suppression ── */
  const confirmDelete = async () => {
    try {
      await api.delete(toDelete)
      setProjects(prev => prev.filter(p => p.id !== toDelete))
      toast.success('Projet supprimé avec succès')
    } catch {
      toast.error('Erreur lors de la suppression')
    } finally {
      setToDelete(null)
    }
  }

  /* ── Filtre ── */
  const displayed = filter === 'Tous'
    ? projects
    : projects.filter(p => p.type === filter)

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 animate-fade-up">
          <div>
            <p className="section-label">// portfolio complet</p>
            <h1 className="section-title">Mes Projets</h1>
            <p className="text-muted text-sm mt-1">{projects.length} projet{projects.length > 1 ? 's' : ''}</p>
          </div>
          <Link to="/projets/ajouter" className="btn-green">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un projet
          </Link>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-up">
          {TYPES.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                filter === t
                  ? 'bg-blue text-deep'
                  : 'border border-border text-muted hover:border-blue hover:text-blue'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* États */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <svg className="animate-spin w-8 h-8 text-blue" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((p, i) => (
              <div key={p.id} className={`animate-fade-up delay-${Math.min(i + 1, 4)}`}>
                <ProjectCard
                  project={p}
                  showActions
                  onDelete={id => setToDelete(id)}
                />
              </div>
            ))}

            {/* Carte "Ajouter" */}
            <Link
              to="/projets/ajouter"
              className="border-2 border-dashed border-border hover:border-blue/50 rounded-xl
                         flex flex-col items-center justify-center p-10 text-center
                         transition-all group min-h-[240px]"
            >
              <div className="w-12 h-12 rounded-full bg-card border border-border group-hover:border-blue
                              flex items-center justify-center mb-3 transition-all">
                <svg className="w-5 h-5 text-muted group-hover:text-blue transition-colors"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-muted group-hover:text-blue transition-colors">
                Ajouter un projet
              </p>
            </Link>
          </div>
        )}

        {/* Aucun résultat */}
        {!loading && displayed.length === 0 && filter !== 'Tous' && (
          <div className="text-center py-16">
            <p className="text-muted text-sm">Aucun projet de type <strong className="text-white">{filter}</strong>.</p>
            <button onClick={() => setFilter('Tous')} className="btn-secondary mt-4">
              Voir tous les projets
            </button>
          </div>
        )}

      </div>

      {/* Modal de confirmation */}
      {toDelete && (
        <ConfirmModal
          message="Cette action est irréversible. Le projet sera définitivement supprimé."
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </main>
  )
}
