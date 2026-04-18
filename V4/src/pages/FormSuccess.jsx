import { Link } from 'react-router-dom'

export default function FormSuccess() {
  return (
    <main className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-up">

        {/* Icône animée */}
        <div className="animate-check-in w-24 h-24 mx-auto mb-8 rounded-full
                        bg-green/10 border-2 border-green/30
                        flex items-center justify-center">
          <svg className="w-12 h-12 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="animate-fade-up delay-1 text-3xl font-extrabold text-white mb-3">
          Message envoyé !
        </h1>
        <p className="animate-fade-up delay-2 text-muted text-base leading-relaxed mb-10">
          Merci pour votre message. Je vous répondrai dans les plus brefs délais à l'adresse email fournie.
        </p>

        <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">Retour à l'accueil</Link>
          <Link to="/projets" className="btn-secondary">Voir mes projets</Link>
        </div>

        <p className="mt-10 text-xs text-muted font-mono">
          diopaboubacryne@gmail.com · +221 78 525 06 65
        </p>

      </div>
    </main>
  )
}
