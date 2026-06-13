# Terraform — V10

Ce dossier contiendra les fichiers de configuration Terraform
pour provisionner l'infrastructure cloud (AWS/GCP/Azure) une fois
le pipeline Jenkins + SonarQube + Kubernetes validé.

## Prévision

- `main.tf`       — ressources principales
- `variables.tf`  — variables d'entrée
- `outputs.tf`    — valeurs de sortie
- `provider.tf`   — configuration du provider cloud

## Statut

⏳ En attente — le pipeline V10 doit passer en succès avant l'implémentation Terraform.
