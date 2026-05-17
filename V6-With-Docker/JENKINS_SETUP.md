# Configuration Jenkins CI/CD

## Prérequis sur le serveur Jenkins

- Jenkins installé avec les plugins suivants :
  - **Pipeline** (inclus par défaut)
  - **Git** / **GitHub** (ou GitLab selon votre hébergeur)
  - **Docker Pipeline** (`docker pipeline`)
  - **Credentials Binding**

- Docker installé sur l'agent Jenkins
- L'utilisateur Jenkins doit appartenir au groupe `docker` :
  ```bash
  sudo usermod -aG docker jenkins
  sudo systemctl restart jenkins
  ```

---

## 1. Configurer les credentials Docker Hub

1. Jenkins → **Manage Jenkins** → **Credentials** → **System** → **Global credentials**
2. Cliquer **Add Credentials**
3. Remplir :
   - **Kind** : `Username with password`
   - **Username** : votre nom d'utilisateur Docker Hub
   - **Password** : votre mot de passe (ou token Docker Hub)
   - **ID** : `dockerhub-credentials`  ← doit correspondre au Jenkinsfile

---

## 2. Créer le Pipeline Jenkins

1. Jenkins → **New Item** → **Pipeline**
2. Dans la section **Pipeline** :
   - **Definition** : `Pipeline script from SCM`
   - **SCM** : Git
   - **Repository URL** : URL de votre dépôt
   - **Branch** : `*/main` (ou `*/master`)
   - **Script Path** : `Jenkinsfile`
3. Sauvegarder

---

## 3. Comportement du pipeline

| Branche       | Audit | Build Docker | Test | Push Hub | Deploy |
|---------------|-------|--------------|------|----------|--------|
| `main/master` | ✅    | ✅           | ✅   | ✅       | ✅     |
| autre branche | ✅    | ✅           | ✅   | ❌       | ❌     |

---

## 4. Variables d'environnement utilisées

| Variable               | Description                              |
|------------------------|------------------------------------------|
| `DOCKERHUB_CREDENTIALS`| Credentials Jenkins (ID: `dockerhub-credentials`) |
| `BACKEND_IMAGE`        | Nom complet de l'image backend           |
| `FRONTEND_IMAGE`       | Nom complet de l'image frontend          |
| `IMAGE_TAG`            | Tag = `build-<numéro_build>`             |

---

## 5. Notifications email (optionnel)

Décommenter dans le `Jenkinsfile` la section `mail` dans le bloc `post > failure`,
et configurer le serveur SMTP dans :
**Manage Jenkins** → **Configure System** → **E-mail Notification**
