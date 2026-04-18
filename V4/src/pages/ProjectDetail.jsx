import { useState, useEffect }             from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { api }          from '../api'
import ConfirmModal     from '../components/ConfirmModal'
import { useToast }     from '../ToastContext'

export default function ProjectDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const toast    = useToast()
  const [project,  setProject]  = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [confirm,  setConfirm]  = useState(false)

  useEffect(() => {
    api.getOne(id)
      .then(setProject)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    try {
      await api.delete(id)
      toast.success('Projet supprimé')
      navigate('/projets')
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <svg className="animate-spin w-8 h-8 text-blue" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  )

  if (notFound) return <Navigate to="/projets" replace />

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted font-mono mb-8 animate-fade-up">
          <Link to="/" className="hover:text-blue transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/projets" className="hover:text-blue transition-colors">Projets</Link>
          <span>/</span>
          <span className="text-blue truncate max-w-[200px]">{project.title}</span>
        </div>

        {/* Header */}
        <div className="animate-fade-up mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.tags?.map(t => <span key={t} className="badge">{t}</span>)}
            <span className="badge-green">{project.type}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {project.title}
            </h1>
            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <Link to={`/projets/${id}/modifier`} className="btn-secondary btn-sm gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </Link>
              <button onClick={() => setConfirm(true)} className="btn-red btn-sm gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
            </div>
          </div>
          <p className="text-muted text-base mt-3 leading-relaxed">{project.short}</p>
        </div>

        {/* Image */}
        <div className="animate-fade-up rounded-2xl overflow-hidden border border-border mb-10 h-64 md:h-96">
          <img
            src={project.image || 'https://placehold.co/800x400/161b22/58a6ff?text=Projet'}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = 'https://placehold.co/800x400/161b22/58a6ff?text=Projet' }}
          />
        </div>

        {/* Contenu */}
        <div className="animate-fade-up grid md:grid-cols-3 gap-6">

          {/* Gauche */}
          <div className="md:col-span-2 space-y-5">

            <div className="card">
              <h2 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                <span className="text-blue">📋</span> Description
              </h2>
              <p className="text-muted text-sm leading-relaxed">{project.description}</p>
            </div>

            {project.features?.length > 0 && (
              <div className="card">
                <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                  <span className="text-blue">⚡</span> Fonctionnalités
                </h2>
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-blue/10 flex items-center justify-center text-blue text-xs mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-muted text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Droite */}
          <div className="space-y-4">

            <div className="card">
              <h3 className="font-bold text-white text-sm mb-3">Informations</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted font-mono uppercase tracking-wide mb-1">Type</p>
                  <span className="badge-green">{project.type}</span>
                </div>
                {project.tags?.length > 0 && (
                  <div>
                    <p className="text-xs text-muted font-mono uppercase tracking-wide mb-1.5">Technologies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
                    </div>
                  </div>
                )}
                {project.github && (
                  <div>
                    <p className="text-xs text-muted font-mono uppercase tracking-wide mb-1">GitHub</p>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                       className="text-blue hover:underline text-xs font-mono break-all">
                      {project.github}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Link to="/projets" className="btn-secondary w-full justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux projets
            </Link>

          </div>
        </div>

      </div>

      {/* Modale suppression */}
      {confirm && (
        <ConfirmModal
          message={`Voulez-vous vraiment supprimer "${project.title}" ?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirm(false)}
        />
      )}
    </main>
  )
}
