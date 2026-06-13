// AddProject.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api';
import ProjectForm from '../components/ProjectForm';
import { useToast } from '../context/ToastContext';

export function AddProject() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await createProject(data);
      addToast('Projet créé avec succès !', 'success');
      navigate('/projets');
    } catch (err) {
      addToast(err.message || 'Erreur lors de la création', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <div className="container-app py-12 max-w-3xl">
        <p className="text-xs mb-1" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// nouveau projet</p>
        <h1 className="section-title mb-8">Ajouter un projet</h1>
        <ProjectForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default AddProject;
