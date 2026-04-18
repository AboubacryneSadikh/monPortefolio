import { Link } from 'react-router-dom'

export default function ProjectCard({ project, onDelete, showActions = false }) {
  return (
    <div className="project-card group">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image || 'https://placehold.co/400x200/161b22/58a6ff?text=Projet'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.target.src = 'https://placehold.co/400x200/161b22/58a6ff?text=Projet' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {project.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="badge text-[10px] px-2 py-0.5">{tag}</span>
          ))}
        </div>
        {/* Boutons action (modifier / supprimer) */}
        {showActions && (
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Link
              to={`/projets/${project.id}/modifier`}
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-lg bg-card/90 border border-border flex items-center justify-center text-blue hover:bg-blue hover:text-deep transition-all"
              title="Modifier"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button
              onClick={e => { e.stopPropagation(); onDelete(project.id) }}
              className="w-8 h-8 rounded-lg bg-card/90 border border-border flex items-center justify-center text-red hover:bg-red hover:text-white transition-all"
              title="Supprimer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-white text-base leading-snug">{project.title}</h3>
          <span className="badge-type shrink-0">{project.type}</span>
        </div>
        <p className="text-muted text-sm mb-4 leading-relaxed line-clamp-2">{project.short}</p>
        <Link
          to={`/projets/${project.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-blue hover:text-white font-semibold transition-colors"
        >
          Voir les détails
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
