import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/#a-propos',   label: 'À propos' },
  { to: '/#competences',label: 'Compétences' },
  { to: '/projets',     label: 'Projets',  exact: true },
  { to: '/#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand">&lt;ASD /&gt;</Link>

        {/* Burger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted hover:text-white transition-colors p-1"
          aria-label="Menu"
        >
          {open
            ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          }
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, exact }) => (
            <li key={to}>
              {exact
                ? <NavLink to={to} className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}>{label}</NavLink>
                : <a href={to} className="nav-link">{label}</a>
              }
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1 border-t border-border mt-1 pt-3 animate-fade-in">
          {links.map(({ to, label, exact }) => (
            exact
              ? <NavLink key={to} to={to} onClick={() => setOpen(false)} className="nav-link">{label}</NavLink>
              : <a key={to} href={to} onClick={() => setOpen(false)} className="nav-link">{label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}
