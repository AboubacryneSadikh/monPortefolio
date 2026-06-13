import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProject, deleteProject } from '../api';
import ConfirmModal from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';

const TYPE_ICONS = {
  'Cloud': '☁️', 'Web': '🌐', 'Mobile': '📱', 'API': '⚡',
  'DevOps': '⚙️', 'IA': '🤖', 'Desktop': '🖥️', 'Autre': '📦'
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    getProject(id)
      .then(r => setProject(r.data))
      .catch(() => addToast('Projet introuvable', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      addToast('Projet supprimé', 'success');
      navigate('/projets');
    } catch {
      addToast('Erreur lors de la suppression', 'error');
    }
  };

  if (loading) return (
    <div className="pt-24 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-t-[var(--accent)] rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: 'var(--border-light)', borderTopColor: 'var(--accent)' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Chargement...</p>
      </div>
    </div>
  );

  if (!project) return (
    <div className="pt-24 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
          Projet introuvable
        </p>
        <Link to="/projets" className="btn-primary">← Retour aux projets</Link>
      </div>
    </div>
  );

  return (
    <div className="pt-24">
      <div className="container-app py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
          <Link to="/projets" className="hover:text-[var(--accent)] transition-colors">Projets</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{project.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="card">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{TYPE_ICONS[project.type] || '📦'}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>{project.type}</span>
                      {project.awsServices?.length > 0 && <span className="aws-badge">AWS</span>}
                    </div>
                    <h1 className="font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.25rem, 3vw, 2rem)', color: 'var(--text-primary)' }}>
                      {project.title}
                    </h1>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link to={`/projets/${id}/modifier`} className="btn-outline text-xs py-2 px-3">✏️ Modifier</Link>
                  <button onClick={() => setConfirmDelete(true)}
                    className="text-xs py-2 px-3 rounded-xl transition-all hover:bg-red-900/30"
                    style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    🗑️
                  </button>
                </div>
              </div>

              {project.image && (
                <div className="w-full h-56 rounded-xl overflow-hidden mb-4"
                  style={{ border: '1px solid var(--border-light)' }}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
            </div>

            {/* Fonctionnalités */}
            {project.features?.length > 0 && (
              <div className="card">
                <h2 className="font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
                  Fonctionnalités clés
                </h2>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }}>✓</span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Infos */}
            <div className="card space-y-4">
              <h3 className="font-semibold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>Informations</h3>

              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>Statut</p>
                <span className="text-sm font-medium" style={{ color: project.status === 'Terminé' ? '#86efac' : project.status === 'En cours' ? 'var(--accent)' : '#a5b4fc' }}>
                  {project.status}
                </span>
              </div>

              {project.tags?.length > 0 && (
                <div>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              )}
            </div>

            {/* AWS */}
            {project.awsServices?.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-sm mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
                  Services AWS
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.awsServices.map(s => (
                    <span key={s} className="aws-badge">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Liens */}
            {(project.github || project.demo) && (
              <div className="card space-y-3">
                <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>Liens</h3>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                    style={{ border: '1px solid var(--border-light)' }}>
                    <span>🐙</span>
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>GitHub</span>
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                    style={{ border: '1px solid var(--border-light)' }}>
                    <span>🚀</span>
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Démo live</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmModal
          title="Supprimer ce projet ?"
          message={`"${project.title}" sera définitivement supprimé.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}
