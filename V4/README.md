# Portfolio React v2 — Aboubacryne Sadikh DIOP

Portfolio personnel avec **CRUD complet** (Ajout / Modification / Suppression de projets).

## Stack technique
- **React 18** + **React Router v6** (SPA)
- **Vite** (bundler + proxy dev)
- **json-server** (base de données locale `db.json`)
- **Tailwind CSS CLI** (`input.css` → `output.css`)
- Polices : **Syne** + **Fira Code**

## Structure complète
```
portfolio-react-v2/
├── db.json                    ← Base de données json-server
├── index.html
├── vite.config.js             ← Proxy /api → localhost:3001
├── tailwind.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx                ← Routes React Router
    ├── api.js                 ← Service CRUD (getAll, getOne, create, update, delete)
    ├── ToastContext.jsx       ← Notifications toast globales
    ├── input.css              ← Source Tailwind
    ├── output.css             ← CSS compilé (à regénérer avec npm run css:build)
    ├── assets/img/
    │   └── profile.svg       ← Remplacez par votre photo
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProjectCard.jsx    ← Carte avec boutons Modifier/Supprimer
    │   ├── ProjectForm.jsx    ← Formulaire partagé Ajout + Modification
    │   └── ConfirmModal.jsx   ← Modale de confirmation suppression
    └── pages/
        ├── Home.jsx           → /
        ├── Projects.jsx       → /projets (liste + filtres + suppression)
        ├── AddProject.jsx     → /projets/ajouter
        ├── EditProject.jsx    → /projets/:id/modifier
        ├── ProjectDetail.jsx  → /projets/:id
        └── FormSuccess.jsx    → /merci
```

## Installation et démarrage

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer en mode développement (3 terminaux)

**Terminal 1 — json-server (base de données)**
```bash
npm run server
# → http://localhost:3001/projects
```

**Terminal 2 — Tailwind CSS (compilation auto)**
```bash
npm run css:watch
```

**Terminal 3 — Vite (React)**
```bash
npm run dev
# → http://localhost:5173
```

> Le proxy Vite redirige automatiquement `/api/*` → `http://localhost:3001/*`
> donc `fetch('/api/projects')` fonctionne sans configuration CORS.

## Scripts disponibles
| Commande           | Description                                |
|--------------------|--------------------------------------------|
| `npm run dev`      | Serveur Vite (React)                       |
| `npm run server`   | json-server sur le port 3001               |
| `npm run build`    | Build production React                     |
| `npm run css:watch`| Compile Tailwind en continu                |
| `npm run css:build`| Compile Tailwind une seule fois            |
| `npm run css:minify`| Compile + minifie pour la production      |

## Fonctionnalités CRUD

| Action        | Route                      | Méthode API |
|---------------|----------------------------|-------------|
| Lister        | GET /api/projects          | `api.getAll()` |
| Détail        | GET /api/projects/:id      | `api.getOne(id)` |
| Créer         | POST /api/projects         | `api.create(data)` |
| Modifier      | PUT /api/projects/:id      | `api.update(id, data)` |
| Supprimer     | DELETE /api/projects/:id   | `api.delete(id)` |

## Ajouter votre photo de profil
Remplacez `src/assets/img/profile.svg` par `profile.jpg`, puis mettez à jour :
```jsx
// Dans src/pages/Home.jsx — ligne 3
import profileImg from '../assets/img/profile.jpg'
```

## Ajouter un projet via l'interface
1. Cliquez sur **"Ajouter un projet"** depuis la page `/projets`
2. Remplissez le formulaire (titre, résumé, description, URL image, technologies, type)
3. Cliquez sur **"Ajouter le projet"** → redirigé vers `/projets`

## Format du db.json
```json
{
  "projects": [
    {
      "id": "1",
      "title": "Nom du projet",
      "short": "Résumé court (affiché sur la carte)",
      "description": "Description complète",
      "image": "https://url-de-image.com/img.png",
      "tags": ["React", "Laravel"],
      "type": "Web",
      "github": "https://github.com/...",
      "features": ["Feature 1", "Feature 2"]
    }
  ]
}
```
