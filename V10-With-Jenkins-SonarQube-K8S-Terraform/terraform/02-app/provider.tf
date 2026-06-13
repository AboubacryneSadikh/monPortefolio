terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }

  # Backend S3 (décommenter après création du bucket)
  # backend "s3" {
  #   bucket         = "portfolio-terraform-state"
  #   key            = "02-app/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "portfolio-terraform-locks"
  # }
}

provider "aws" {
  region = var.aws_region
}

# Data source pour récupérer les infos du cluster EKS existant
data "aws_eks_cluster" "main" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "main" {
  name = var.cluster_name
}

# Provider Kubernetes — se connecte au cluster EKS déjà créé par 01-infra
provider "kubernetes" {
  host                   = data.aws_eks_cluster.main.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.main.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.main.token
}
