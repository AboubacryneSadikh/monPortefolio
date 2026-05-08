import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TYPES = ['Web', 'Mobile', 'Desktop', 'API', 'Cloud', 'DevOps', 'IA', 'Autre'];
const STATUSES = ['En cours', 'Terminé', 'Archivé'];
const AWS_SERVICES_LIST = ['EC2', 'S3', 'Lambda', 'RDS', 'ECS', 'ECR', 'CloudFront', 'Route 53', 'SQS', 'SNS', 'DynamoDB', 'Cognito', 'API Gateway', 'CloudWatch', 'Amplify', 'SageMaker'];

export default function ProjectForm({ initial = {}, onSubmit, loading }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    short: '',
    description: '',
    type: 'Web',
    status: 'En cours',
    github: '',
    demo: '',
    awsServices: [],
    image: '',
    ...initial,
    tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : (initial.tags || ''),
    features: Array.isArray(initial.features) ? initial.features.join('\n') : (initial.features || ''),
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Image trop lourde (max 2 Mo)'); return; }
    const reader = new FileReader();
    reader.onload = () => set('image', reader.result);
    reader.readAsDataURL(file);
  };

  const toggleAWS = (svc) => {
    set('awsServices', form.awsServices.includes(svc)
      ? form.awsServices.filter(s => s !== svc)
      : [...form.awsServices, svc]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Infos principales */}
      <section className="card space-y-5">
        <h2 className="font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
          01 — Informations générales
        </h2>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Titre du projet *
          </label>
          <input className="input-field" placeholder="Ex: CloudTasker — Gestion de tâches"
            value={form.title} onChange={e => set('title', e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Résumé court * <span className="text-xs ml-1">(max 200 caractères)</span>
          </label>
          <input className="input-field" placeholder="Une phrase descriptive affichée sur la carte"
            maxLength={200} value={form.short} onChange={e => set('short', e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Description complète *
          </label>
          <textarea className="input-field resize-none" rows={5}
            placeholder="Description détaillée du projet, contexte, objectifs..."
            value={form.description} onChange={e => set('description', e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Type *</label>
            <select className="input-field" value={form.type} onChange={e => set('type', e.target.value)}>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Statut</label>
            <select className="input-field" value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Liens */}
      <section className="card space-y-5">
        <h2 className="font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
          02 — Liens & Tags
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>GitHub</label>
            <input className="input-field" type="url" placeholder="https://github.com/..."
              value={form.github} onChange={e => set('github', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Démo live</label>
            <input className="input-field" type="url" placeholder="https://..."
              value={form.demo} onChange={e => set('demo', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Technologies <span className="text-xs">(séparées par des virgules)</span>
          </label>
          <input className="input-field" placeholder="React, Node.js, MongoDB, Docker..."
            value={form.tags} onChange={e => set('tags', e.target.value)} />
        </div>
      </section>

      {/* AWS Services */}
      <section className="card space-y-4">
        <h2 className="font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
          03 — Services AWS utilisés
        </h2>
        <div className="flex flex-wrap gap-2">
          {AWS_SERVICES_LIST.map(svc => (
            <button type="button" key={svc}
              onClick={() => toggleAWS(svc)}
              className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                background: form.awsServices.includes(svc) ? 'var(--accent)' : 'var(--bg-secondary)',
                color: form.awsServices.includes(svc) ? '#000' : 'var(--text-secondary)',
                border: `1px solid ${form.awsServices.includes(svc) ? 'var(--accent)' : 'var(--border-light)'}`,
              }}>
              {svc}
            </button>
          ))}
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="card space-y-4">
        <h2 className="font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
          04 — Fonctionnalités clés
        </h2>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Une fonctionnalité par ligne
          </label>
          <textarea className="input-field resize-none" rows={5}
            placeholder={"Authentification JWT\nDashboard analytique temps réel\nPipeline CI/CD automatisé"}
            value={form.features} onChange={e => set('features', e.target.value)} />
        </div>
      </section>

      {/* Image */}
      <section className="card space-y-4">
        <h2 className="font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
          05 — Image du projet
        </h2>
        <label className="block w-full cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all hover:border-[var(--accent)]"
          style={{ borderColor: 'var(--border)' }}>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          {form.image ? (
            <img src={form.image} alt="Aperçu" className="max-h-40 mx-auto rounded-lg object-contain" />
          ) : (
            <div>
              <p className="text-3xl mb-2">🖼️</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Cliquer pour sélectionner (max 2 Mo)</p>
            </div>
          )}
        </label>
        {form.image && (
          <button type="button" onClick={() => set('image', '')}
            className="text-xs px-4 py-2 rounded-lg transition-all hover:bg-red-900/30"
            style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
            Supprimer l'image
          </button>
        )}
      </section>

      {/* Submit */}
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={() => navigate(-1)} className="btn-outline">
          Annuler
        </button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '⏳ Enregistrement...' : '✓ Enregistrer le projet'}
        </button>
      </div>
    </form>
  );
}
