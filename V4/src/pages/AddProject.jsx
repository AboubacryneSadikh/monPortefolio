import { useState }       from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api }            from '../api'
import ProjectForm        from '../components/ProjectForm'
import { useToast }       from '../ToastContext'

export default function AddProject() {
  const navigate = useNavigate()
  const toast    = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await api.create(data)
      toast.success('Projet ajouté avec succès !')
      navigate('/projets')
    } catch {
      toast.error('Erreur lors de l\'ajout du projet')
    } finally {
      setLoading(false)
    }
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
          <span className="text-blue">Ajouter</span>
        </div>

        <div className="mb-8">
          <p className="section-label">// nouveau projet</p>
          <h1 className="section-title">Ajouter un projet</h1>
          <p className="text-muted text-sm mt-2">
            Remplissez le formulaire pour ajouter un projet à votre portfolio.
          </p>
        </div>

        <ProjectForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Ajouter le projet"
          cancelTo="/projets"
        />

      </div>
    </main>
  )
}
