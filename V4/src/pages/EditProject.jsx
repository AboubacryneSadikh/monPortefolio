import { useState, useEffect }   from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { api }                    from '../api'
import ProjectForm                from '../components/ProjectForm'
import { useToast }               from '../ToastContext'

export default function EditProject() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const toast    = useToast()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  /* ── Charger le projet ── */
  useEffect(() => {
    api.getOne(id)
      .then(setProject)
      .catch(() => {
        toast.error('Projet introuvable')
        navigate('/projets')
      })
      .finally(() => setFetching(false))
  }, [id])

  /* ── Sauvegarder les modifications ── */
  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await api.update(id, { ...data, id })
      toast.success('Projet modifié avec succès !')
      navigate(`/projets/${id}`)
    } catch {
      toast.error('Erreur lors de la modification')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg className="animate-spin w-8 h-8 text-blue" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto animate-fade-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted font-mono mb-8">
          <Link to="/" className="hover:text-blue transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/projets" className="hover:text-blue transition-colors">Projets</Link>
          <span>/</span>
          <Link to={`/projets/${id}`} className="hover:text-blue transition-colors truncate max-w-[140px]">
            {project?.title}
          </Link>
          <span>/</span>
          <span className="text-blue">Modifier</span>
        </div>

        <div className="mb-8">
          <p className="section-label">// édition</p>
          <h1 className="section-title">Modifier le projet</h1>
          <p className="text-muted text-sm mt-2">
            Mettez à jour les informations du projet.
          </p>
        </div>

        {project && (
          <ProjectForm
            initial={project}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Enregistrer les modifications"
            cancelTo={`/projets/${id}`}
          />
        )}

      </div>
    </main>
  )
}
