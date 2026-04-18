import { createContext, useContext, useState, useCallback } from 'react'

const ToastCtx = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const success = useCallback((msg) => show(msg, 'success'), [show])
  const error   = useCallback((msg) => show(msg, 'error'),   [show])

  return (
    <ToastCtx.Provider value={{ success, error }}>
      {children}
      {/* Conteneur des toasts */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold animate-slide-in ${
              t.type === 'success'
                ? 'bg-[#238636]/10 border-[#238636]/30 text-[#238636]'
                : 'bg-[#f85149]/10 border-[#f85149]/30 text-[#f85149]'
            }`}
          >
            <span>{t.type === 'success' ? '✓' : '✕'}</span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast doit être dans ToastProvider')
  return ctx
}
