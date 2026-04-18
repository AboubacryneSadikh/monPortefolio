import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const TYPES  = ['Mobile', 'Web', 'Desktop', 'API', 'IA / Data']
const EMPTY  = { title: '', short: '', description: '', image: '', tags: '', type: 'Web', github: '', features: '' }
const MAX_MB = 2 // taille max de l'image

export default function ProjectForm({ initial = EMPTY, onSubmit, loading, submitLabel, cancelTo }) {
  const [form, setForm] = useState({
    ...EMPTY,
    ...initial,
    tags:     Array.isArray(initial.tags)     ? initial.tags.join(', ')     : initial.tags     || '',
    features: Array.isArray(initial.features) ? initial.features.join('\n') : initial.features || '',
  })
  const [errors,   setErrors]   = useState({})
  const [imgError, setImgError] = useState('')
  const fileRef = useRef(null)

  /* ── Champ générique ── */
  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  /* ── Upload image → base64 ── */
  const handleFile = e => {
    setImgError('')
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setImgError('Le fichier doit être une image (JPG, PNG, WebP…)')
      if (fileRef.current) fileRef.current.value = ''
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setImgError(`L'image dépasse ${MAX_MB} Mo (taille : ${(file.size / 1024 / 1024).toFixed(1)} Mo)`)
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload  = ev  => set('image', ev.target.result)
    reader.onerror = ()  => setImgError('Erreur lors de la lecture du fichier')
    reader.readAsDataURL(file)
  }

  /* ── Supprimer l'image ── */
  const removeImage = () => {
    set('image', '')
    setImgError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  /* ── Validation ── */
  const validate = () => {
    const e = {}
    if (!form.title.trim())       e.title       = 'Le titre est obligatoire'
    if (!form.short.trim())       e.short       = 'Le résumé est obligatoire'
    if (!form.description.trim()) e.description = 'La description est obligatoire'
    if (!form.type)               e.type        = 'Choisissez un type'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* ── Submit ── */
  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      tags:     form.tags.split(',').map(t => t.trim()).filter(Boolean),
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-7 space-y-5">

      {/* Titre */}
      <div>
        <label className="form-label">Titre du projet <span className="text-blue">*</span></label>
        <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="Ex: Application de gestion scolaire" className="form-input" />
        {errors.title && <p className="text-red text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Résumé */}
      <div>
        <label className="form-label">Résumé court <span className="text-blue">*</span></label>
        <input type="text" value={form.short} onChange={e => set('short', e.target.value)}
          placeholder="Une phrase courte décrivant le projet" className="form-input" />
        {errors.short && <p className="text-red text-xs mt-1">{errors.short}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="form-label">Description complète <span className="text-blue">*</span></label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          rows={4} placeholder="Description détaillée du projet…" className="form-input resize-none" />
        {errors.description && <p className="text-red text-xs mt-1">{errors.description}</p>}
      </div>

      {/* ── Upload image ── */}
      <div>
        <label className="form-label">
          Image du projet
          <span className="text-muted font-normal ml-1">(optionnel · max {MAX_MB} Mo)</span>
        </label>

        {/* Input caché — toujours présent */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />

        {!form.image ? (
          /* Zone de dépôt vide */
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileRef.current?.click()}
            onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault()
              const file = e.dataTransfer.files[0]
              if (file) handleFile({ target: { files: [file], value: '' } })
            }}
            className="border-2 border-dashed border-border hover:border-blue/60
                       rounded-xl p-8 text-center cursor-pointer transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-blue/10 border border-blue/20
                            flex items-center justify-center mx-auto mb-3
                            group-hover:bg-blue/20 transition-colors">
              <svg className="w-6 h-6 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white mb-1">
              Cliquez pour choisir une image
            </p>
            <p className="text-xs text-muted">
              ou glissez-déposez ici · JPG, PNG, WebP, GIF
            </p>
          </div>
        ) : (
          /* Aperçu avec overlay */
          <div className="relative rounded-xl overflow-hidden border border-border h-52 group">
            <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
            {/* Overlay au survol */}
            <div className="absolute inset-0 bg-deep/70 opacity-0 group-hover:opacity-100
                            transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue hover:bg-blueDark
                           text-deep font-bold text-xs rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Changer
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red hover:bg-redDark
                           text-white font-bold text-xs rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
            </div>
          </div>
        )}

        {/* Message d'erreur image */}
        {imgError && (
          <p className="text-red text-xs mt-2 flex items-center gap-1.5 font-medium">
            <span>⚠</span> {imgError}
          </p>
        )}
      </div>

      {/* Tags + Type */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Technologies</label>
          <input type="text" value={form.tags} onChange={e => set('tags', e.target.value)}
            placeholder="React, Laravel, Docker…" className="form-input" />
          <p className="text-xs text-muted mt-1 font-mono">Séparées par des virgules</p>
        </div>
        <div>
          <label className="form-label">Type <span className="text-blue">*</span></label>
          <select value={form.type} onChange={e => set('type', e.target.value)} className="form-input">
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <p className="text-red text-xs mt-1">{errors.type}</p>}
        </div>
      </div>

      {/* Fonctionnalités */}
      <div>
        <label className="form-label">
          Fonctionnalités
          <span className="text-muted font-normal ml-1">(optionnel)</span>
        </label>
        <textarea value={form.features} onChange={e => set('features', e.target.value)}
          rows={4} placeholder={"Authentification JWT\nGestion des rôles\nDashboard admin"}
          className="form-input resize-none font-mono text-xs" />
        <p className="text-xs text-muted mt-1 font-mono">Une fonctionnalité par ligne</p>
      </div>

      {/* GitHub */}
      <div>
        <label className="form-label">
          Lien GitHub
          <span className="text-muted font-normal ml-1">(optionnel)</span>
        </label>
        <input type="url" value={form.github} onChange={e => set('github', e.target.value)}
          placeholder="https://github.com/…" className="form-input" />
      </div>

      {/* Boutons */}
      <div className="flex gap-3 pt-2">
        <Link to={cancelTo || '/projets'} className="btn-secondary flex-1 justify-center py-3">
          Annuler
        </Link>
        <button type="submit" disabled={loading} className="btn-green flex-1 justify-center py-3">
          {loading
            ? <><Spinner /> En cours…</>
            : <><CheckIcon /> {submitLabel || 'Enregistrer'}</>
          }
        </button>
      </div>

    </form>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}
