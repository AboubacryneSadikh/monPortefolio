import { Link } from 'react-router-dom';

const STATUS_COLORS = {
  'Terminé': { bg: '#0d2818', border: '#22c55e', text: '#86efac', dot: '#22c55e' },
  'En cours': { bg: '#1a1200', border: '#FF9900', text: '#FFB84D', dot: '#FF9900' },
  'Archivé': { bg: '#1a1a2a', border: '#6366f1', text: '#a5b4fc', dot: '#6366f1' },
};

const TYPE_ICONS = {
  'Cloud': '☁️', 'Web': '🌐', 'Mobile': '📱', 'API': '⚡',
  'DevOps': '⚙️', 'IA': '🤖', 'Desktop': '🖥️', 'Autre': '📦'
};

export default function ProjectCard({ project, onDelete }) {
  const statusStyle = STATUS_COLORS[project.status] || STATUS_COLORS['En cours'];

  return (
    <div className="card flex flex-col h-full group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: 'var(--accent-muted)', border: '1px solid var(--border)' }}>
            {TYPE_ICONS[project.type] || '📦'}
          </div>
          <div>
            <span className="text-xs mb-1 block" style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
              {project.type}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusStyle.dot }} />
              <span className="text-xs" style={{ color: statusStyle.text, fontFamily: 'JetBrains Mono, monospace' }}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
        {project.awsServices?.length > 0 && (
          <span className="aws-badge flex-shrink-0">AWS</span>
        )}
      </div>

      {/* Image */}
      {project.image && (
        <div className="w-full h-36 rounded-xl overflow-hidden mb-4 flex-shrink-0"
          style={{ border: '1px solid var(--border-light)' }}>
          <img src={project.image} alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}

      {/* Content */}
      <div className="flex-grow">
        <h3 className="font-semibold text-base mb-2 leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {project.short}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
            {project.tags.length > 4 && (
              <span className="tag">+{project.tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Members */}
        {project.members?.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((m, i) => (
                <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2"
                  style={{ background: 'var(--accent)', color: '#000', borderColor: 'var(--bg-card)', fontFamily: 'JetBrains Mono, monospace', zIndex: 3 - i }}>
                  {m[0]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
        <Link to={`/projets/${project._id}`} className="flex-grow text-center py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ background: 'var(--accent-muted)', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', border: '1px solid var(--border)' }}>
          Voir détails
        </Link>
        <Link to={`/projets/${project._id}/modifier`}
          className="py-2 px-3 rounded-xl text-sm transition-all duration-200 hover:bg-white/5"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-light)' }}
          title="Modifier">
          ✏️
        </Link>
        {onDelete && (
          <button onClick={() => onDelete(project._id)}
            className="py-2 px-3 rounded-xl text-sm transition-all duration-200 hover:bg-red-900/30"
            style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
            title="Supprimer">
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
