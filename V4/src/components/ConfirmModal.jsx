export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm animate-fade-up">
        <div className="w-12 h-12 rounded-full bg-red/10 border border-red/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <p className="text-center text-white font-semibold mb-1">Confirmer la suppression</p>
        <p className="text-center text-muted text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1 justify-center py-2.5">
            Annuler
          </button>
          <button onClick={onConfirm} className="btn-red flex-1 justify-center py-2.5">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
