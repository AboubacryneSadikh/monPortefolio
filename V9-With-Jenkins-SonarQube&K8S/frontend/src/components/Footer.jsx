import { Link } from 'react-router-dom';

const STACK = ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'];

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/projets/ajouter', label: 'Ajouter un projet' },
];

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Email', href: 'mailto:diopaboubacryne@gmail.com' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black text-sm"
                style={{ background: 'linear-gradient(135deg, #FF9900, #FF6600)', fontFamily: 'JetBrains Mono, monospace' }}>
                AS
              </div>
              <div>
                <span className="font-semibold text-sm block leading-tight"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                  Aboubacryne S. Diop
                </span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Full-Stack & Cloud AWS
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              Développeur Full-Stack passionné par le Cloud AWS, le DevOps et la conception d'applications modernes.
            </p>
            {/* Social links */}
            <div className="flex gap-2">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  style={{ border: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {NAV.map(link => (
                <Link key={link.to} to={link.to}
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <h4 className="font-semibold text-sm mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
              Stack technique
            </h4>
            <div className="flex flex-wrap gap-2">
              {STACK.map(tech => (
                <span key={tech} className="tag text-xs">{tech}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid var(--border-light)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
            © 2026 Aboubacryne Sadikh Diop · Dakar, Sénégal
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
            Built with{' '}
            <span style={{ color: 'var(--accent)' }}>React</span> +{' '}
            <span style={{ color: 'var(--accent)' }}>Express</span> +{' '}
            <span style={{ color: 'var(--accent)' }}>MongoDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
