import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProject } from '../api';
import ProjectForm from '../components/ProjectForm';
import { useToast } from '../context/ToastContext';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProject(id).then(r => setProject(r.data)).catch(() => addToast('Projet introuvable', 'error'));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProject(id, data);
      addToast('Projet mis à jour !', 'success');
      navigate(`/projets/${id}`);
    } catch (err) {
      addToast(err.message || 'Erreur lors de la mise à jour', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!project) return (
    <div className="pt-24 flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-t-[var(--accent)] rounded-full animate-spin"
        style={{ borderColor: 'var(--border-light)', borderTopColor: 'var(--accent)' }} />
    </div>
  );

  return (
    <div className="pt-24">
      <div className="container-app py-12 max-w-3xl">
        <p className="text-xs mb-1" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// modifier</p>
        <h1 className="section-title mb-8">Modifier le projet</h1>
        <ProjectForm initial={project} onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
