export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="card max-w-sm w-full animate-fade-up">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <span className="text-xl">⚠️</span>
        </div>
        <h3 className="text-center font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p className="text-center text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-outline">Annuler</button>
          <button onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all hover:scale-105"
            style={{ background: '#ef4444', color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
