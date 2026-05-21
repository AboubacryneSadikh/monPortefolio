# Pipeline CI/CD Jenkins — Documentation complète

## Architecture du projet

```
GitHub Push
    │
    ▼
Jenkins Pipeline
    │
    ├── 1. Checkout          → Récupère le code source
    ├── 2. Build Docker      → Construit les images backend et frontend
    ├── 3. Test conteneurs   → Vérifie que le backend démarre correctement
    ├── 4. Push Docker Hub   → Publie les images (branche main uniquement)
    └── 5. Déploiement       → Lance les conteneurs via docker compose
```

---

## Prérequis

- Jenkins installé (via Docker recommandé)
- Docker installé sur le serveur Jenkins
- L'utilisateur Jenkins doit avoir accès au socket Docker :

```bash
# Solution permanente
docker exec -u root jenkins usermod -aG docker jenkins
docker restart jenkins

# Solution temporaire (se réinitialise au redémarrage)
docker exec -u root jenkins chmod 666 /var/run/docker.sock
```

---

## Plugins Jenkins requis

- **Pipeline** (inclus par défaut)
- **Git** / **GitHub**
- **Credentials Binding**

---

## Configuration des credentials Docker Hub

1. Jenkins → **Manage Jenkins** → **Credentials** → **System** → **Global credentials**
2. Cliquer **Add Credentials**
3. Remplir :
   - **Kind** : `Username with password`
   - **Username** : votre nom d'utilisateur Docker Hub
   - **Password** : votre mot de passe ou token Docker Hub
   - **ID** : `dockerhub-credentials` ← doit correspondre exactement au Jenkinsfile

---

## Créer le Pipeline Jenkins

1. Jenkins → **New Item** → **Pipeline**
2. Section **Build Triggers** : cocher **GitHub hook trigger for GITScm polling**
3. Section **Pipeline** :
   - **Definition** : `Pipeline script from SCM`
   - **SCM** : Git
   - **Repository URL** : URL de votre dépôt GitHub
   - **Branch** : `*/main`
   - **Script Path** : `Jenkinsfile`
4. Sauvegarder

---

## Configurer le Webhook GitHub

1. GitHub → dépôt → **Settings** → **Webhooks** → **Add webhook**
2. **Payload URL** : `http://<IP_JENKINS>:8080/github-webhook/`
3. **Content type** : `application/json`
4. **Events** : `Just the push event`
5. Sauvegarder

À chaque `git push`, GitHub notifie Jenkins qui déclenche automatiquement le pipeline.

---

## Explication du Jenkinsfile

### Variables d'environnement

```groovy
DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')  // Credentials Jenkins
BACKEND_IMAGE         = "username/portfolio-backend"           // Nom de l'image backend
FRONTEND_IMAGE        = "username/portfolio-frontend"          // Nom de l'image frontend
IMAGE_TAG             = "build-14"                             // Tag unique par build
```

### Options globales

```groovy
buildDiscarder(logRotator(numToKeepStr: '5'))  // Garde seulement les 5 derniers builds
timeout(time: 30, unit: 'MINUTES')             // Annule le pipeline après 30 min
disableConcurrentBuilds()                       // Interdit 2 builds simultanés
```

### Stage 1 — Checkout

Récupère le code source depuis GitHub.

### Stage 2 — Build Images Docker

Construit les deux images en parallèle pour gagner du temps.
Chaque image reçoit deux tags : le tag du build (`build-14`) et `latest`.

### Stage 3 — Test conteneurs

Lance le conteneur backend en mode test et vérifie qu'il tourne toujours après 10 secondes.
Le conteneur est supprimé dans tous les cas (bloc `post > always`).

### Stage 4 — Push Docker Hub

Publie les 4 images sur Docker Hub (backend:build-N, backend:latest, frontend:build-N, frontend:latest).
Ce stage ne s'exécute que sur la branche `main` ou `master`.

### Stage 5 — Déploiement

1. Installe `docker compose` v2 si absent (dans `~/.docker/cli-plugins/`)
2. Arrête les conteneurs existants (`docker compose down`)
3. Supprime les conteneurs en conflit de nom
4. Relance tout avec les nouvelles images (`docker compose up`)

Ce stage ne s'exécute que sur la branche `main` ou `master`.

### Post-actions

- **always** : supprime les images locales pour libérer de l'espace disque
- **success** : affiche un message de succès
- **failure** : affiche un message d'erreur et envoie un email

---

## Explication du docker-compose.yml

Trois services sont définis :

| Service    | Image              | Port  | Rôle                        |
|------------|--------------------|-------|-----------------------------|
| `mongodb`  | `mongo:7.0`        | 27017 | Base de données              |
| `backend`  | image Docker Hub   | 5000  | API Node.js                  |
| `frontend` | image Docker Hub   | 5173  | Application React (nginx)    |

Le backend attend que MongoDB soit **healthy** avant de démarrer (`depends_on: condition: service_healthy`).
Le healthcheck de MongoDB utilise `mongosh --eval "db.adminCommand('ping')"` avec un délai de démarrage de 30 secondes.

---

## Notifications email

### Configuration SMTP Gmail dans Jenkins

1. Jenkins → **Manage Jenkins** → **System** → section **E-mail Notification**
2. Remplir :
   - **SMTP server** : `smtp.gmail.com`
   - **Use SMTP Authentication** : coché
   - **User** : votre adresse Gmail
   - **Password** : mot de passe d'application Gmail (pas votre mot de passe normal)
   - **Use SSL** : coché
   - **Port** : `465`

Pour créer un mot de passe d'application Gmail :
Google Account → Sécurité → Authentification à 2 facteurs → Mots de passe des applications

### Dans le Jenkinsfile

Remplacer `ton-email@gmail.com` par votre adresse dans le bloc `post > failure`.

---

## Comportement selon la branche

| Étape          | Branche `main` | Autre branche |
|----------------|:--------------:|:-------------:|
| Checkout       | ✅             | ✅            |
| Build Docker   | ✅             | ✅            |
| Test           | ✅             | ✅            |
| Push Docker Hub| ✅             | ❌            |
| Déploiement    | ✅             | ❌            |
