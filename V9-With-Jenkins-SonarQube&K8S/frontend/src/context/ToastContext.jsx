import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2" aria-live="polite">
        {toasts.map(toast => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className="animate-fade-up cursor-pointer flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl max-w-sm"
            style={{
              background: toast.type === 'success' ? '#0d2818' : toast.type === 'error' ? '#2a0d0d' : '#1a1a2e',
              border: `1px solid ${toast.type === 'success' ? '#22c55e' : toast.type === 'error' ? '#ef4444' : '#FF9900'}`,
              color: toast.type === 'success' ? '#86efac' : toast.type === 'error' ? '#fca5a5' : '#FFB84D',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
            </span>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être utilisé dans ToastProvider');
  return ctx;
};
