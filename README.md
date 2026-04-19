# 🌿 Portfolio — Aboubacryne Sadikh DIOP

Portfolio personnel présentant mes projets académiques et personnels, mes compétences techniques et mes informations de contact.

---

## 👤 Présentation

**Aboubacryne Sadikh DIOP**  
Développeur Full-Stack Junior | Passionné du Cloud & DevOps  
📍 Dakar, Sénégal  
📧 diopaboubacryne@gmail.com  
📞 +221 78 525 06 65  

---

## 📁 Structure du projet

```
portfolio/
│
├── ── V1, V2, V3 (HTML statique / SPA vanilla) ─────────────────────
│   ├── index.html
│   ├── README.md
│   ├── db.json                     # V3 — Base de données json-server
│   ├── package.json                # V3 — Dépendances & scripts npm
│   ├── src/
│   │   ├── main.js                 # V3 — Point d'entrée JS
│   │   ├── css/
│   │   │   ├── style.css           # V1 — styles personnalisés
│   │   │   ├── input.css           # V2/V3 — fichier source Tailwind CLI
│   │   │   └── output.css          # V2/V3 — fichier compilé par Tailwind CLI
│   │   ├── images/
│   │   │   └── profile.jpg         # Photo de profil
│   │   └── js/                     # V3 — Modules JavaScript
│   │       ├── api.js              # Appels HTTP vers json-server
│   │       ├── projet.js           # Modèle Projet + utilitaires
│   │       ├── ui.js               # Rendu HTML des cartes, modals, toasts
│   │       ├── gestionProjets.js   # Logique ajout, suppression, upload image
│   │       └── detailProjet.js     # Modal de détail d'un projet
│   └── pages/
│       ├── ajouter-projet.html
│       ├── lister-projets.html
│       ├── validForm.html
│       ├── validContact.html
│       └── details-project/
│           ├── details-projet1.html
│           └── details-projet2.html
│
└── ── V4 React (dossier portfolio-react-v2/) ───────────────────────
    ├── index.html
    ├── db.json                     # Base de données json-server
    ├── package.json                # Dépendances & scripts npm
    ├── vite.config.js              # Config Vite + proxy /api → json-server
    ├── tailwind.config.js          # Config Tailwind
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.jsx                # Point d'entrée React
        ├── App.jsx                 # Routes React Router v6
        ├── api.js                  # Service CRUD (fetch vers json-server)
        ├── ToastContext.jsx        # Notifications toast globales
        ├── input.css               # Source Tailwind CLI
        ├── output.css              # CSS compilé (regénérez avec npm run css:build)
        ├── assets/img/
        │   └── profile.svg         # Placeholder — remplacez par votre vraie photo
        ├── components/
        │   ├── Navbar.jsx          # Navigation responsive (burger mobile)
        │   ├── ProjectCard.jsx     # Carte projet avec boutons Modifier/Supprimer
        │   ├── ProjectForm.jsx     # Formulaire partagé Ajout + Modification
        │   └── ConfirmModal.jsx    # Modale de confirmation avant suppression
        └── pages/
            ├── Home.jsx            # / — Hero, Compétences, Aperçu projets, Contact
            ├── Projects.jsx        # /projets — Liste + filtres par type
            ├── AddProject.jsx      # /projets/ajouter
            ├── EditProject.jsx     # /projets/:id/modifier
            ├── ProjectDetail.jsx   # /projets/:id
            └── FormSuccess.jsx     # /merci — Confirmation formulaire contact
```

---

## 🔀 Versions

### V1 — HTML / CSS pur
- Intégration avec un fichier `style.css` entièrement fait à la main
- Palette sombre inspirée de GitHub (`#0d1117`, `#161b22`, `#58a6ff`)
- Mise en page avec Flexbox et CSS Grid natifs
- Aucune dépendance externe

### V2 — HTML / Tailwind CSS
- Réécriture complète avec les classes utilitaires **Tailwind CSS**
- Utilisation de **Tailwind CLI** pour compiler `input.css` → `output.css`
- Styles custom (fonts, animations, effets) centralisés dans `input.css` via `@layer components`
- Typographie avec **Space Mono** (titres) + **Sora** (corps de texte) via Google Fonts
- Même charte graphique que la V1

### V3 — Single Page App + API REST (json-server)
- **Single Page Application** : tout se passe sur `index.html` sans rechargement
- **API REST** avec **json-server** : les projets sont persistés dans `db.json`
- Architecture JS modulaire en **ES Modules** (`import/export`)
- **Ajout de projet** via formulaire modal avec validation
- **Upload et compression automatique** des images via Canvas (cible < 60 Ko)
- **Suppression** de projet avec confirmation
- **Modal de détail** : image, technologies, taille fichier, liens GitHub/Démo
- **Filtres** par statut : Tous / En cours / Terminés / Archivés
- **Statistiques** en temps réel : total, en cours, terminés, taille des images
- **Formulaire de contact** avec validation JS côté client

### V4 — React + Vite + json-server + Tailwind CLI ✅ version actuelle
- **Single Page Application** avec navigation sans rechargement via **React Router v6**
- **API REST** avec **json-server** : les projets sont persistés dans `db.json`
- **Proxy Vite** : `/api/*` redirigé vers `http://localhost:3001` (zéro problème CORS)
- Architecture **React** modulaire avec composants réutilisables
- **CRUD complet** sur les projets :
  - ✅ Ajout via formulaire dédié avec validation (`/projets/ajouter`)
  - ✅ Modification avec formulaire pré-rempli (`/projets/:id/modifier`)
  - ✅ Suppression avec modale de confirmation (depuis la liste et la page de détail)
  - ✅ Listing avec filtres par type (Mobile / Web / Desktop / API / IA)
- **Upload d'image** : zone glisser-déposer ou clic, validation type + taille (max 2 Mo), aperçu immédiat avec overlay, conversion base64 stockée dans `db.json`
- **Notifications toast** : retours visuels sur chaque action CRUD (succès / erreur)
- **Formulaire de contact** avec validation et page de confirmation (`/merci`)
- Typographie avec **Syne** (display) + **Fira Code** (mono) via Google Fonts

---

## ⚙️ Installation & Lancement — V2 (HTML + Tailwind CLI)

### Prérequis
- [Node.js](https://nodejs.org/) installé sur ta machine

### Étapes

```bash
# 1. Installer Tailwind CLI
npm install -D tailwindcss

# 2. Initialiser la config Tailwind
npx tailwindcss init

# 3. Configurer tailwind.config.js
# Ajouter les chemins de tes fichiers HTML dans "content" :
content: ["./**/*.html"]

# 4. Compiler le CSS (mode watch)
npx tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --watch
```

> Ouvre ensuite `index.html` directement dans ton navigateur.

---

## ⚙️ Installation & Lancement — V3 (SPA Vanilla + json-server)

### Prérequis
- [Node.js](https://nodejs.org/) installé sur ta machine

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Terminal 1 — Lancer l'API json-server (port 3001)
json-server --port 3001 db.json

# 3. Terminal 2 — Recompiler Tailwind automatiquement
npm run watch:css

# 4. Terminal 3 — Lancer le serveur web (port 3000)
npm run dev
```

> Ouvre ensuite **http://localhost:3000** dans ton navigateur.

### Scripts disponibles (V3)

| Commande            | Description                           |
|---------------------|---------------------------------------|
| `npm run api`       | Lance json-server sur le port 3001    |
| `npm run build:css` | Compile Tailwind une fois             |
| `npm run watch:css` | Compile Tailwind en mode watch        |
| `npm run dev`       | Lance le serveur web sur le port 3000 |

---

## ⚙️ Installation & Lancement — V4 (React + Vite + json-server)

### Prérequis
- [Node.js](https://nodejs.org/) ≥ 18 installé sur ta machine

### Étapes

```bash
# Se placer dans le dossier V4
cd portfolio-react-v2

# 1. Installer les dépendances
npm install

# Terminal 1 — Compiler Tailwind en continu
npm run css:watch

# Terminal 2 — Lancer json-server (base de données)
npm run server
# → http://localhost:3001/projects

# Terminal 3 — Lancer React via Vite
npm run dev
# → http://localhost:5173
```

> Le proxy Vite redirige automatiquement `/api/*` vers json-server.  
> Il n'est **pas nécessaire** de configurer le CORS manuellement.

### Scripts disponibles (V4)

| Commande              | Description                                   |
|-----------------------|-----------------------------------------------|
| `npm run dev`         | Lance Vite (React) sur le port 5173           |
| `npm run build`       | Build de production React                     |
| `npm run server`      | Lance json-server sur le port 3001            |
| `npm run css:watch`   | Compile Tailwind en continu                   |
| `npm run css:build`   | Compile Tailwind une seule fois               |
| `npm run css:minify`  | Compile + minifie pour la production          |

---

## 🌐 Routes API — json-server (V3 & V4)

| Méthode  | V3 Route        | V4 Route               | Description                  |
|----------|-----------------|------------------------|------------------------------|
| `GET`    | `/projets`      | `/api/projects`        | Récupérer tous les projets   |
| `GET`    | `/projets/:id`  | `/api/projects/:id`    | Récupérer un projet par id   |
| `POST`   | `/projets`      | `/api/projects`        | Ajouter un nouveau projet    |
| `PUT`    | `/projets/:id`  | `/api/projects/:id`    | Modifier un projet           |
| `DELETE` | `/projets/:id`  | `/api/projects/:id`    | Supprimer un projet          |

---

## 🌐 Routes React — React Router v6 (V4)

| Route                      | Page           | Description                               |
|----------------------------|----------------|-------------------------------------------|
| `/`                        | Home           | Hero + Compétences + Aperçu + Contact     |
| `/projets`                 | Projects       | Liste complète avec filtres par type      |
| `/projets/ajouter`         | AddProject     | Formulaire d'ajout de projet              |
| `/projets/:id`             | ProjectDetail  | Détail complet d'un projet                |
| `/projets/:id/modifier`    | EditProject    | Formulaire de modification                |
| `/merci`                   | FormSuccess    | Confirmation envoi formulaire contact     |

---

## 🛠️ Stack technique

| Catégorie        | Technologies                                         |
|------------------|------------------------------------------------------|
| Langages         | JavaScript, PHP, Java, C#, Windev/Webdev             |
| Frameworks       | Angular, Spring Boot, Laravel                        |
| Mobile           | Flutter                                              |
| Cloud            | AWS (EC2, S3, Lambda)                                |
| DevOps           | Docker, Kubernetes, CI/CD                            |
| Base de données  | MySQL, json-server (`db.json`)                       |
| Frontend V4      | React 18, React Router v6, Vite 5                    |
| CSS              | Tailwind CSS CLI (`input.css` → `output.css`)        |
| Typographie V4   | Syne (display) + Fira Code (mono)                    |
| Outils           | Node.js, npm, json-server, Vite                      |

---

## 📌 Projets présentés

| # | Projet                               | Stack                              |
|---|--------------------------------------|------------------------------------|
| 01 | Application de gestion de tâches   | Flutter + Laravel + MySQL          |
| 02 | Application de gestion de présence | Angular + Spring Boot + MySQL      |

---

## 📄 Pages — V1, V2, V3 (HTML statique)

| Fichier                                          | Description                             |
|--------------------------------------------------|-----------------------------------------|
| `index.html`                                     | Page principale (profil, compétences, projets, contact) |
| `pages/lister-projets.html`                      | Liste complète des projets              |
| `pages/ajouter-projet.html`                      | Formulaire d'ajout de projet            |
| `pages/validForm.html`                           | Page de confirmation après ajout        |
| `pages/validContact.html`                        | Page de confirmation formulaire contact |
| `pages/details-project/details-projet1.html`     | Détails du projet 1                     |
| `pages/details-project/details-projet2.html`     | Détails du projet 2                     |

---

## 🖼️ Ajouter votre photo de profil (V4)

Remplacez `src/assets/img/profile.svg` par votre vraie photo (`profile.jpg` ou `profile.png`), puis mettez à jour l'import dans `src/pages/Home.jsx` :

```jsx
// src/pages/Home.jsx — ligne 3
import profileImg from '../assets/img/profile.jpg'
```

---

## 📦 Format d'un projet dans db.json (V4)

```json
{
  "projects": [
    {
      "id": "1",
      "title": "Nom du projet",
      "short": "Résumé affiché sur la carte projet",
      "description": "Description complète et détaillée du projet",
      "image": "data:image/jpeg;base64,...",
      "tags": ["React", "Laravel", "MySQL"],
      "type": "Web",
      "github": "https://github.com/utilisateur/projet",
      "features": [
        "Authentification JWT",
        "Dashboard administrateur",
        "Export PDF"
      ]
    }
  ]
}
```

> **Note :** l'image est convertie en base64 via `FileReader` et stockée directement dans `db.json` après upload.  
> Taille maximale autorisée : **2 Mo** par image.

---

© 2026 Aboubacryne Sadikh DIOP