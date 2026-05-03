# 🔧 G2-AWS-P2026 — Backend

API REST construite avec **Express.js** et **MongoDB Atlas** via **Mongoose**.

---

## 📁 Architecture

```
backend/
├── controllers/
│   └── projectController.js   # Logique CRUD (getAllProjects, createProject…)
├── models/
│   └── Project.js             # Schéma Mongoose (titre, tags, type, image…)
├── routes/
│   └── projectRoutes.js       # Définition des routes Express
├── .env.example               # Template des variables d'environnement
├── .gitignore
├── package.json
├── seed.js                    # Script d'initialisation de la BDD
└── server.js                  # Point d'entrée — connexion Mongo + démarrage
```

---

## ⚙️ Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env
# Ouvrez .env et renseignez votre MONGO_URI MongoDB Atlas
```

---

## 🔑 Configuration `.env`

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/g2_aws_portfolio?retryWrites=true&w=majority
PORT=3001
FRONTEND_URL=http://localhost:5173
```

> **Important :** dans MongoDB Atlas → **Network Access**, ajoutez votre adresse IP (ou `0.0.0.0/0` pour tout autoriser en développement).

---

## 🚀 Démarrage

```bash
# Mode développement (rechargement automatique)
npm run dev

# Mode production
npm start

# Initialiser la base de données avec des données de démo
npm run seed
```

---

## 🌐 Routes API

| Méthode  | Route                | Description                   | Code retour    |
|----------|----------------------|-------------------------------|----------------|
| `GET`    | `/api/projects`      | Récupérer tous les projets    | `200`          |
| `GET`    | `/api/projects/:id`  | Récupérer un projet par id    | `200` / `404`  |
| `POST`   | `/api/projects`      | Créer un nouveau projet       | `201`          |
| `PUT`    | `/api/projects/:id`  | Modifier un projet (complet)  | `200` / `404`  |
| `PATCH`  | `/api/projects/:id`  | Modifier partiellement        | `200` / `404`  |
| `DELETE` | `/api/projects/:id`  | Supprimer un projet           | `200` / `404`  |
| `GET`    | `/`                  | Santé du serveur              | `200`          |

---

## 📦 Modèle `Project`

| Champ         | Type       | Obligatoire | Description                              |
|---------------|------------|-------------|------------------------------------------|
| `title`       | String     | ✅           | Titre du projet (max 120 caractères)     |
| `short`       | String     | ✅           | Résumé court (max 250 caractères)        |
| `description` | String     | ✅           | Description complète                     |
| `image`       | String     | ❌           | Image en base64 ou URL                   |
| `tags`        | [String]   | ❌           | Technologies utilisées                   |
| `type`        | String     | ❌           | Cloud / DevOps / Web / Mobile / API…    |
| `github`      | String     | ❌           | Lien vers le dépôt GitHub               |
| `features`    | [String]   | ❌           | Liste des fonctionnalités                |
| `createdAt`   | Date       | auto        | Date de création (Mongoose timestamps)  |
| `updatedAt`   | Date       | auto        | Date de modification                    |

---

## 🛠️ Stack

| Technologie | Rôle                          |
|-------------|-------------------------------|
| Node.js     | Environnement d'exécution     |
| Express.js  | Framework HTTP                |
| Mongoose    | ODM pour MongoDB              |
| MongoDB Atlas | Base de données cloud       |
| dotenv      | Gestion des variables d'env   |
| cors        | Gestion du CORS               |
