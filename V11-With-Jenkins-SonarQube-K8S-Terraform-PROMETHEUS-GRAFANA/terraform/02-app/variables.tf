variable "aws_region" {
  description = "Région AWS"
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "Nom du cluster EKS existant (créé par 01-infra)"
  type        = string
  default     = "portfolio-eks"
}

variable "k8s_namespace" {
  description = "Namespace Kubernetes pour l'application"
  type        = string
  default     = "portfolio"
}

variable "dockerhub_username" {
  description = "Nom d'utilisateur DockerHub"
  type        = string
  default     = "aboubacryne"
}

variable "backend_image_tag" {
  description = "Tag de l'image backend (ex: build-42)"
  type        = string
  default     = "latest"
}

variable "frontend_image_tag" {
  description = "Tag de l'image frontend (ex: build-42)"
  type        = string
  default     = "latest"
}

variable "mongo_username" {
  description = "Nom d'utilisateur MongoDB"
  type        = string
  sensitive   = true
  default     = "mongo"
}

variable "mongo_password" {
  description = "Mot de passe MongoDB"
  type        = string
  sensitive   = true
}
