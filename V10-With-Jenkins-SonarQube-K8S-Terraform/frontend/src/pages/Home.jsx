import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, sendContact } from '../api';
import ProjectCard from '../components/ProjectCard';
import { useToast } from '../context/ToastContext';

const SKILLS = [
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    items: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Node.js', 'Express.js', 'Spring Boot', 'Python'],
  },
  {
    category: 'Bases de données',
    icon: '🗄️',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'DynamoDB'],
  },
  {
    category: 'Mobile',
    icon: '📱',
    items: ['Flutter', 'React Native', 'Dart'],
  },
  {
    category: 'Outils',
    icon: '🛠️',
    items: ['Git', 'GitHub Actions', 'Nginx', 'Linux', 'Postman'],
  },
];

const STATS = [
  { value: '5+', label: 'Projets réalisés' },
  { value: '12+', label: 'Services AWS' },
  { value: '3+', label: "Années d'expérience" },
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    getProjects().then(r => setProjects(r.data?.slice(0, 3) || [])).catch(() => {});
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendContact(contactForm);
      addToast('Message envoyé avec succès !', 'success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      addToast("Erreur lors de l'envoi. Réessayez.", 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center grid-bg overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,153,0,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="container-app relative z-10 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Texte gauche ── */}
            <div>
              {/* Badge disponibilité */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-up"
                style={{ background: 'var(--accent-muted)', border: '1px solid rgba(255,153,0,0.3)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-glow" />
                <span className="text-xs font-medium" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Disponible · Dakar, Sénégal
                </span>
              </div>

              <h1 className="font-bold leading-tight mb-6 animate-fade-up stagger-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
                Bonjour, je suis<br />
                <span style={{ color: 'var(--accent)' }} className="glow-text">Aboubacryne</span><br />
                <span style={{ color: 'var(--text-secondary)', fontSize: '70%', fontWeight: 400 }}>
                  Sadikh Diop
                </span>
              </h1>

              {/* Rôle animé */}
              <div className="flex items-center gap-3 mb-6 animate-fade-up stagger-2">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Full-Stack Developer & Cloud AWS
                </span>
              </div>

              <p className="text-base mb-10 animate-fade-up stagger-2"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.9, maxWidth: '480px' }}>
                Je conçois, déploie et scale des applications modernes sur AWS — de la ligne de code à l'infrastructure, en passant par les pipelines CI/CD.
              </p>

              {/* CTA */}
              <div className="flex gap-4 flex-wrap mb-12 animate-fade-up stagger-3">
                <Link to="/projets" className="btn-primary">Voir mes projets →</Link>
                <Link to="/a-propos" className="btn-outline">À propos de moi</Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 animate-fade-up stagger-4">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Carte profil droite ── */}
            <div className="hidden lg:flex justify-center animate-fade-up stagger-2">
              <div className="relative">
                {/* Carte principale */}
                <div className="rounded-3xl p-8 w-80"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl font-bold float"
                    style={{ background: 'linear-gradient(135deg, #FF9900, #FF6600)', color: '#000', fontFamily: 'Space Grotesk, sans-serif' }}>
                    AS
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                      Aboubacryne S. Diop
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
                      Lead Developer & DevOps
                    </p>
                  </div>

                  {/* Tags stack */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {['React', 'Node.js', 'AWS', 'Docker'].map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>

                  {/* Liens */}
                  <div className="space-y-2" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    <a href="https://github.com/" target="_blank" rel="noreferrer"
                      className="flex items-center justify-between px-3 py-2 rounded-xl transition-all hover:bg-white/5 group"
                      style={{ border: '1px solid var(--border-light)' }}>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>GitHub</span>
                      <span className="text-xs group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-secondary)' }}>→</span>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer"
                      className="flex items-center justify-between px-3 py-2 rounded-xl transition-all hover:bg-white/5 group"
                      style={{ border: '1px solid var(--border-light)' }}>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>LinkedIn</span>
                      <span className="text-xs group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-secondary)' }}>→</span>
                    </a>
                    <a href="mailto:diopaboubacryne@gmail.com"
                      className="flex items-center justify-between px-3 py-2 rounded-xl transition-all hover:bg-white/5 group"
                      style={{ border: '1px solid var(--border-light)' }}>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>Email</span>
                      <span className="text-xs group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-secondary)' }}>→</span>
                    </a>
                  </div>
                </div>

                {/* Badge AWS flottant */}
                <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #FF9900, #FF6600)', boxShadow: '0 8px 24px rgba(255,153,0,0.3)' }}>
                  <span className="text-xs font-bold text-black" style={{ fontFamily: 'JetBrains Mono, monospace' }}>AWS ☁️</span>
                </div>

                {/* Badge open to work flottant */}
                <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid rgba(34,197,94,0.4)', boxShadow: '0 8px 24px rgba(34,197,94,0.1)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs font-medium text-green-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Open to work</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── COMPÉTENCES ──────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-app">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// mon stack</p>
          </div>
          <h2 className="section-title">Compétences techniques</h2>
          <p className="section-subtitle">Technologies que je maîtrise au quotidien</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, i) => (
              <div key={skill.category} className="card animate-fade-up group"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'var(--accent-muted)', border: '1px solid var(--border)' }}>
                    {skill.icon}
                  </div>
                  <h3 className="font-semibold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => <span key={item} className="tag">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJETS RÉCENTS ──────────────────────────────── */}
      <section className="section">
        <div className="container-app">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
                <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// derniers projets</p>
              </div>
              <h2 className="section-title mb-1">Projets récents</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Aperçu de mes dernières réalisations</p>
            </div>
            {projects.length > 0 && (
              <Link to="/projets" className="btn-outline text-sm">Voir tout →</Link>
            )}
          </div>

          {projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => <ProjectCard key={p._id} project={p} />)}
            </div>
          ) : (
            <div className="text-center py-20 card">
              <p className="text-5xl mb-4">📂</p>
              <p className="font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                Aucun projet pour le moment
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Commence par ajouter ton premier projet</p>
              <Link to="/projets/ajouter" className="btn-primary">+ Ajouter un projet</Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Texte gauche */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
                <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// me contacter</p>
              </div>
              <h2 className="section-title mb-4">Travaillons ensemble</h2>
              <p className="text-base mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Tu as un projet, une opportunité ou juste envie d'échanger ? Je suis disponible et ouvert à toute collaboration.
              </p>

              {/* Liens directs */}
              <div className="space-y-3">
                {[
                  { icon: '✉️', label: 'diopaboubacryne@gmail.com', href: 'mailto:diopaboubacryne@gmail.com' },
                  { icon: '🐙', label: 'github.com/aboubacryne', href: 'https://github.com/' },
                  { icon: '💼', label: 'linkedin.com/in/aboubacryne', href: 'https://linkedin.com/' },
                ].map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:border-[var(--accent)] group"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-sm group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {link.label}
                    </span>
                    <span className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--accent)' }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Formulaire droite */}
            <form onSubmit={handleContact} className="card space-y-5">
              <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                Envoyer un message
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    Nom *
                  </label>
                  <input className="input-field" placeholder="Votre nom" required
                    value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    Email *
                  </label>
                  <input className="input-field" type="email" placeholder="votre@email.com" required
                    value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Sujet *
                </label>
                <input className="input-field" placeholder="Collaboration, stage, question..." required
                  value={contactForm.subject} onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Message *
                </label>
                <textarea className="input-field resize-none" rows={5} placeholder="Votre message..." required
                  value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <button type="submit" className="btn-primary w-full" disabled={sending}>
                {sending ? '⏳ Envoi en cours...' : '✈️ Envoyer le message'}
              </button>
            </form>

          </div>
        </div>
      </section>
    </div>
  );
}
