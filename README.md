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
├── src/
│   ├── css/
│   │   ├── style.css       # V1 — styles personnalisés
│   │   ├── input.css       # V2 — fichier source Tailwind CLI
│   │   └── output.css      # V2 — fichier compilé par Tailwind CLI
│   └── images/
│       └── profile.jpg     # Photo de profil
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

## 🛠️ Stack technique

| Catégorie     | Technologies                              |
|---------------|-------------------------------------------|
| Langages      | JavaScript, PHP, Java, C#, Windev/Webdev  |
| Frameworks    | Angular, Spring Boot, Laravel             |
| Mobile        | Flutter                                   |
| Cloud         | AWS (EC2, S3, Lambda)                     |
| DevOps        | Docker, Kubernetes, CI/CD                 |
| Base de données | MySQL                                   |

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