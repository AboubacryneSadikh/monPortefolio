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
├── index.html
├── README.md
├── db.json                 # V3 — Base de données json-server
├── package.json            # V3 — Dépendances & scripts npm
├── src/
│   ├── main.js             # V3 — Point d'entrée JS
│   ├── css/
│   │   ├── style.css       # V1 — styles personnalisés
│   │   ├── input.css       # V2/V3 — fichier source Tailwind CLI
│   │   └── output.css      # V2/V3 — fichier compilé par Tailwind CLI
│   ├── images/
│   │   └── profile.jpg     # Photo de profil
│   └── js/                 # V3 — Modules JavaScript
│       ├── api.js          # Appels HTTP vers json-server
│       ├── projet.js       # Modèle Projet + utilitaires
│       ├── ui.js           # Rendu HTML des cartes, modals, toasts
│       ├── gestionProjets.js  # Logique ajout, suppression, upload image
│       └── detailProjet.js    # Modal de détail d'un projet
└── pages/
    ├── ajouter-projet.html
    ├── lister-projets.html
    ├── validForm.html
    ├── validContact.html
    └── details-project/
        ├── details-projet1.html
        └── details-projet2.html
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

### V3 — Single Page App + API REST (json-server) ✅ version actuelle
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

---

## ⚙️ Installation & Lancement (V2 — Tailwind CLI)

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

## ⚙️ Installation & Lancement (V3 — json-server)

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

| Commande | Description |
|---|---|
| `npm run api` | Lance json-server sur le port 3001 |
| `npm run build:css` | Compile Tailwind une fois |
| `npm run watch:css` | Compile Tailwind en mode watch |
| `npm run dev` | Lance le serveur web sur le port 3000 |

---

## 🌐 Routes API — json-server (V3)

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/projets` | Récupérer tous les projets |
| `GET` | `/projets/:id` | Récupérer un projet par id |
| `POST` | `/projets` | Ajouter un nouveau projet |
| `PUT` | `/projets/:id` | Modifier un projet |
| `DELETE` | `/projets/:id` | Supprimer un projet |

---

## 🛠️ Stack technique

| Catégorie     | Technologies                              |
|---------------|-------------------------------------------|
| Langages      | JavaScript, PHP, Java, C#, Windev/Webdev  |
| Frameworks    | Angular, Spring Boot, Laravel             |
| Mobile        | Flutter                                   |
| Cloud         | AWS (EC2, S3, Lambda)                     |
| DevOps        | Docker, Kubernetes, CI/CD                 |
| Base de données | MySQL, json-server (db.json)            |
| CSS           | Tailwind CSS v4 (CLI)                     |
| Outils        | Node.js, npm, json-server                 |

---

## 📌 Projets présentés

| # | Projet | Stack |
|---|--------|-------|
| 01 | Application de gestion de tâches | Flutter + Laravel + MySQL |
| 02 | Application de gestion de présence | Angular + Spring Boot + MySQL |

---

## 📄 Pages

| Fichier | Description |
|--------|-------------|
| `index.html` | Page principale (profil, compétences, projets, contact) |
| `pages/lister-projets.html` | Liste complète des projets |
| `pages/ajouter-projet.html` | Formulaire d'ajout de projet |
| `pages/validForm.html` | Page de confirmation après ajout |
| `pages/details-project/details-projet1.html` | Détails du projet 1 |
| `pages/details-project/details-projet2.html` | Détails du projet 2 |

---

© 2026 Aboubacryne Sadikh DIOP