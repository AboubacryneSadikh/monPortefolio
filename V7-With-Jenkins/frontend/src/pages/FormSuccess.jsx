import { Link } from 'react-router-dom';

export default function FormSuccess() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center card max-w-md mx-auto p-12 animate-fade-up">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow"
          style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e' }}>
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', color: 'var(--text-primary)' }}>
          Message envoyé !
        </h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          Merci pour votre message. L'équipe G2-AWS-P5 vous répondra dans les meilleurs délais.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary">← Retour à l'accueil</Link>
          <Link to="/projets" className="btn-outline">Voir les projets</Link>
        </div>
      </div>
    </div>
  );
}
