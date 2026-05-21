import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject } from '../api';
import ProjectCard from '../components/ProjectCard';
import ConfirmModal from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';

const TYPES = ['Tous', 'Cloud', 'Web', 'Mobile', 'API', 'DevOps', 'IA', 'Desktop', 'Autre'];
const STATUSES = ['Tous', 'En cours', 'Terminé', 'Archivé'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: 'Tous', status: 'Tous', search: '' });
  const [toDelete, setToDelete] = useState(null);
  const { addToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter.type !== 'Tous') params.type = filter.type;
      if (filter.status !== 'Tous') params.status = filter.status;
      if (filter.search) params.search = filter.search;
      const r = await getProjects(params);
      setProjects(r.data || []);
    } catch {
      addToast('Erreur lors du chargement des projets', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const handleDelete = async () => {
    try {
      await deleteProject(toDelete);
      addToast('Projet supprimé avec succès', 'success');
      setToDelete(null);
      load();
    } catch {
      addToast('Erreur lors de la suppression', 'error');
    }
  };

  return (
    <div className="pt-24">
      <div className="container-app py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs mb-1" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
              // {projects.length} projet{projects.length !== 1 ? 's' : ''}
            </p>
            <h1 className="section-title mb-0">Tous les projets</h1>
          </div>
          <Link to="/projets/ajouter" className="btn-primary flex-shrink-0">+ Nouveau projet</Link>
        </div>

        {/* Filtres */}
        <div className="card mb-8 space-y-4">
          {/* Recherche */}
          <input className="input-field" placeholder="🔍 Rechercher un projet..."
            value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))} />

          {/* Filtres type */}
          <div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>Type</p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map(t => (
                <button key={t} onClick={() => setFilter(f => ({ ...f, type: t }))}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    background: filter.type === t ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: filter.type === t ? '#000' : 'var(--text-secondary)',
                    border: `1px solid ${filter.type === t ? 'var(--accent)' : 'var(--border-light)'}`,
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Filtres statut */}
          <div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>Statut</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map(s => (
                <button key={s} onClick={() => setFilter(f => ({ ...f, status: s }))}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    background: filter.status === s ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: filter.status === s ? '#000' : 'var(--text-secondary)',
                    border: `1px solid ${filter.status === s ? 'var(--accent)' : 'var(--border-light)'}`,
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card h-64 animate-pulse" style={{ background: 'var(--bg-card)' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 card">
            <p className="text-5xl mb-4">📂</p>
            <p className="font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
              Aucun projet trouvé
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Modifiez vos filtres ou ajoutez un nouveau projet
            </p>
            <Link to="/projets/ajouter" className="btn-primary inline-block">+ Ajouter un projet</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <ProjectCard key={p._id} project={p} onDelete={setToDelete} />
            ))}
          </div>
        )}
      </div>

      {toDelete && (
        <ConfirmModal
          title="Supprimer ce projet ?"
          message="Cette action est irréversible. Le projet sera définitivement supprimé."
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
