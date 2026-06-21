import { Link, useNavigate } from 'react-router-dom';

const SKILLS = [
  { category: 'Cloud & DevOps', icon: '☁️', items: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
  { category: 'Frontend', icon: '🎨', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'HTML/CSS'] },
  { category: 'Backend', icon: '⚙️', items: ['Node.js', 'Express.js', 'Spring Boot', 'Python', 'REST API'] },
  { category: 'Mobile', icon: '📱', items: ['Flutter', 'React Native', 'Dart'] },
  { category: 'Bases de données', icon: '🗄️', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'DynamoDB'] },
  { category: 'Outils', icon: '🛠️', items: ['Git', 'GitHub Actions', 'Nginx', 'Linux', 'Postman', 'Swagger'] },
];

const EXPERIENCES = [
  {
    period: '2024 – Présent',
    title: 'Lead Developer & DevOps',
    company: 'Promotion AWS · G2-P5',
    description: "Architecte des solutions Cloud AWS, développement Full-Stack et mise en place de pipelines CI/CD automatisés.",
    tags: ['AWS', 'Docker', 'React', 'Node.js'],
  },
  {
    period: '2023 – 2024',
    title: 'Développeur Full-Stack',
    company: 'Projets personnels & académiques',
    description: "Conception et déploiement d'applications web et mobiles avec React, Node.js et MongoDB.",
    tags: ['React', 'Node.js', 'MongoDB'],
  },
];

export default function About() {
  const navigate = useNavigate();

  const goToContact = (e) => {
    e.preventDefault();
    navigate('/');
    // Petit délai pour laisser la page charger avant de scroller
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  return (
    <div className="pt-24">

      {/* ─── HEADER ─────────────────────────────────────── */}
      <section className="section grid-bg" style={{ paddingBottom: '4rem' }}>
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Texte */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
                <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// à propos</p>
              </div>
              <h1 className="font-bold mb-4 animate-fade-up"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)' }}>
                Aboubacryne<br />
                <span style={{ color: 'var(--accent)' }}>Sadikh Diop</span>
              </h1>
              <p className="text-base mb-6 animate-fade-up stagger-1"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.9, maxWidth: '480px' }}>
                Développeur Full-Stack passionné par le Cloud AWS et le DevOps. J'aime concevoir des architectures robustes, déployer des applications scalables et automatiser les processus de livraison logicielle.
              </p>
              <p className="text-base mb-8 animate-fade-up stagger-2"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.9, maxWidth: '480px' }}>
                Mon approche couvre l'intégralité du cycle de vie d'une application : de l'interface utilisateur jusqu'à l'infrastructure cloud, en passant par les APIs et les pipelines CI/CD.
              </p>
              <div className="flex gap-3 flex-wrap animate-fade-up stagger-3">
                <Link to="/projets" className="btn-primary">Voir mes projets →</Link>
                <a href="mailto:diopaboubacryne@gmail.com" className="btn-outline">Me contacter</a>
              </div>
            </div>

            {/* Carte profil */}
            <div className="flex justify-center lg:justify-end animate-fade-up stagger-1">
              <div className="relative">
                <div className="rounded-3xl p-8 w-72"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl font-bold float"
                    style={{ background: 'linear-gradient(135deg, #FF9900, #FF6600)', color: '#000', fontFamily: 'Space Grotesk, sans-serif' }}>
                    AS
                  </div>
                  <div className="text-center mb-5">
                    <h3 className="font-bold mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                      Aboubacryne S. Diop
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
                      Lead Developer & DevOps
                    </p>
                  </div>

                  {/* Infos */}
                  <div className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                    {[
                      { icon: '📍', label: 'Dakar, Sénégal' },
                      { icon: '🌐', label: 'Français · Wolof · Anglais' },
                      { icon: '✅', label: 'Ouvert aux opportunités' },
                    ].map(info => (
                      <div key={info.label} className="flex items-center gap-3">
                        <span className="text-sm">{info.icon}</span>
                        <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {info.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Liens */}
                  <div className="flex gap-2 mt-5 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                    {[
                      { label: 'GitHub', href: 'https://github.com/' },
                      { label: 'LinkedIn', href: 'https://linkedin.com/' },
                      { label: 'Email', href: 'mailto:diopaboubacryne@gmail.com' },
                    ].map(link => (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                        className="flex-1 text-center py-2 rounded-xl text-xs transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        style={{ border: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Badge AWS */}
                <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #FF9900, #FF6600)', boxShadow: '0 6px 20px rgba(255,153,0,0.3)' }}>
                  <span className="text-xs font-bold text-black" style={{ fontFamily: 'JetBrains Mono, monospace' }}>AWS ☁️</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── EXPÉRIENCES ────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-app">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// parcours</p>
          </div>
          <h2 className="section-title">Expériences</h2>
          <p className="section-subtitle">Mon parcours professionnel</p>

          <div className="relative max-w-2xl">
            {/* Ligne verticale */}
            <div className="absolute left-4 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />

            <div className="space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="flex gap-8 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  {/* Dot */}
                  <div className="flex-shrink-0 w-8 flex justify-center pt-1">
                    <div className="w-3 h-3 rounded-full border-2 mt-1"
                      style={{ background: 'var(--accent)', borderColor: 'var(--bg-secondary)', boxShadow: '0 0 12px rgba(255,153,0,0.5)' }} />
                  </div>

                  {/* Contenu */}
                  <div className="card flex-1 hover:-translate-y-0">
                    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                      <div>
                        <h3 className="font-bold text-base mb-0.5"
                          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                          {exp.title}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{exp.company}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                        style={{ background: 'var(--accent-muted)', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', border: '1px solid rgba(255,153,0,0.25)' }}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPÉTENCES ────────────────────────────────── */}
      <section className="section">
        <div className="container-app">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
            <p className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>// compétences</p>
          </div>
          <h2 className="section-title">Stack technique</h2>
          <p className="section-subtitle">Technologies que je maîtrise</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, i) => (
              <div key={skill.category} className="card animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
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

      {/* ─── CTA CONTACT ────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-app">
          <div className="card text-center max-w-2xl mx-auto py-12"
            style={{ background: 'linear-gradient(135deg, rgba(255,153,0,0.05), rgba(99,102,241,0.03))', border: '1px solid rgba(255,153,0,0.15)' }}>
            <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl"
              style={{ background: 'var(--accent-muted)', border: '1px solid var(--border)' }}>
              💬
            </div>
            <h2 className="font-bold text-2xl mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
              Travaillons ensemble
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Tu as un projet ou une opportunité ? Je suis disponible et ouvert à toute collaboration.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="mailto:diopaboubacryne@gmail.com" className="btn-primary">✉️ Envoyer un email</a>
              <button onClick={goToContact} className="btn-outline">Formulaire de contact</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
