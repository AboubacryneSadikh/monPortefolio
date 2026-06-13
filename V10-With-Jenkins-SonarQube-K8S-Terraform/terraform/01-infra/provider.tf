terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend S3 (décommenter après création du bucket)
  # backend "s3" {
  #   bucket         = "portfolio-terraform-state"
  #   key            = "01-infra/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "portfolio-terraform-locks"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "portfolio"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
