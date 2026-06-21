import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/a-propos', label: 'À propos' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10, 15, 30, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 153, 0, 0.08)' : 'none',
      }}
    >
      <div className="container-app">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black text-sm"
                style={{ background: 'linear-gradient(135deg, #FF9900, #FF6600)', fontFamily: 'JetBrains Mono, monospace' }}>
                AS
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-primary)]"
                style={{ background: '#22c55e' }} />
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-sm block leading-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                Aboubacryne S. Diop
              </span>
              <span className="text-xs leading-tight"
                style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                Full-Stack & Cloud AWS
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent-muted)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                  }`
                }
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/projets/ajouter" className="btn-primary text-xs py-2 px-4">
              + Ajouter un projet
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--accent)' }} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${open ? 'opacity-0' : ''}`}
              style={{ background: 'var(--accent)' }} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--accent)' }} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t"
          style={{ background: 'rgba(10, 15, 30, 0.98)', borderColor: 'var(--border)' }}>
          <div className="container-app py-4 flex flex-col gap-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive ? 'text-[var(--accent)] bg-[var(--accent-muted)]' : 'text-[var(--text-secondary)]'
                  }`
                }
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/projets/ajouter" className="btn-primary text-center mt-2">
              + Ajouter un projet
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
