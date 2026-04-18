import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import ProjectCard from '../components/ProjectCard'
import profileImg from '../assets/img/profile.svg'

function SkillCard({ icon, title, tags }) {
  return (
    <div className="skill-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue text-lg">{icon}</div>
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
      </div>
    </div>
  )
}

export default function Home() {
  const [projects, setProjects] = useState([])
  const [form, setForm]         = useState({ name: '', email: '', message: '', conditions: false })

  useEffect(() => {
    api.getAll().then(data => setProjects(data.slice(0, 3))).catch(() => {})
  }, [])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    window.location.href = '/merci'
  }

  return (
    <>
      {/* ══ HERO ══ */}
      <section id="a-propos" className="relative min-h-screen flex items-center dot-grid overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue/5 blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-[300px] h-[300px] rounded-full bg-green/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

            {/* Photo */}
            <div className="animate-fade-up flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-blue/20 scale-110 animate-ping-slow" />
                {/* ⬇ Remplacez profile.svg par profile.jpg après avoir ajouté votre photo */}
                <img
                  src={profileImg}
                  alt="Photo de profil — Aboubacryne Sadikh DIOP"
                  className="photo-glow w-44 h-44 md:w-56 md:h-56 rounded-full object-cover relative z-10"
                />
                <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1.5 bg-card border border-border rounded-full px-2.5 py-1 text-xs font-mono text-green">
                  <span className="w-2 h-2 rounded-full bg-green inline-block animate-pulse" />
                  Disponible
                </div>
              </div>
            </div>

            {/* Texte */}
            <div className="text-center md:text-left">
              <p className="animate-fade-up section-label">Développeur Full-Stack Junior</p>
              <h1 className="animate-fade-up delay-1 text-4xl md:text-5xl font-extrabold leading-tight text-white">
                Aboubacryne<br /><span className="text-blue">Sadikh DIOP</span>
              </h1>
              <p className="animate-fade-up delay-2 mt-4 text-muted text-base max-w-md leading-relaxed">
                Passionné par la création de solutions innovantes et efficaces. Spécialisé en Cloud &amp; DevOps.
              </p>
              <div className="animate-fade-up delay-3 flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
                {['JavaScript', 'PHP', 'Laravel', 'Angular', 'AWS', 'Docker'].map(t => (
                  <span key={t} className="badge-tag">{t}</span>
                ))}
              </div>
              <div className="animate-fade-up delay-4 flex gap-3 mt-8 justify-center md:justify-start">
                <Link to="/projets" className="btn-primary">Voir mes projets</Link>
                <a href="#contact" className="btn-secondary">Me contacter</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ COMPÉTENCES ══ */}
      <section id="competences" className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label">// ce que je maîtrise</p>
            <h2 className="section-title">Compétences</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <SkillCard icon="⚡" title="Langages"   tags={['JavaScript', 'PHP', 'Java', 'C#', 'Windev & Webdev']} />
            <SkillCard icon="🏗️" title="Frameworks" tags={['Angular', 'Spring Boot', 'Laravel']} />
            <SkillCard icon="☁️" title="Cloud"      tags={['AWS EC2', 'AWS S3', 'AWS Lambda']} />
            <SkillCard icon="🛠️" title="DevOps"     tags={['Docker', 'Kubernetes', 'CI/CD']} />
          </div>
        </div>
      </section>

      {/* ══ PROJETS APERÇU ══ */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="section-label">// ce que j'ai construit</p>
              <h2 className="section-title">Projets récents</h2>
            </div>
            <Link to="/projets/ajouter" className="btn-green">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un projet
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="text-muted text-sm text-center py-12">Aucun projet pour l'instant.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/projets" className="btn-secondary">
              Voir tous les projets
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <footer id="contact" className="border-t border-border py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label">// travaillons ensemble</p>
            <h2 className="section-title">Contactez-moi</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Nom</label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  required placeholder="Votre nom complet" className="form-input" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  required placeholder="vous@exemple.com" className="form-input" />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  required rows={5} placeholder="Décrivez votre projet…"
                  className="form-input resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="conditions" name="conditions"
                  checked={form.conditions} onChange={handleChange}
                  required className="w-4 h-4 accent-blue" />
                <label htmlFor="conditions" className="text-sm text-muted">
                  J'accepte les conditions d'utilisation
                </label>
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3">
                Envoyer le message
              </button>
            </form>

            <div className="space-y-4">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Email</p>
                  <a href="mailto:diopaboubacryne@gmail.com" className="text-blue hover:underline text-sm font-mono font-medium">
                    diopaboubacryne@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📱</div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Téléphone</p>
                  <a href="tel:+221785250665" className="text-blue hover:underline text-sm font-mono font-medium">
                    +221 78 525 06 65
                  </a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Localisation</p>
                  <p className="text-white text-sm font-mono font-medium">Dakar, Sénégal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-border text-center">
            <p className="text-muted text-xs font-mono">© 2026 Aboubacryne Sadikh DIOP — Dakar, Sénégal</p>
          </div>
        </div>
      </footer>
    </>
  )
}
