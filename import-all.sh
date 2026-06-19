#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1
export TF_VAR_mongo_password=${TF_VAR_mongo_password:?Variable TF_VAR_mongo_password non définie}

cd /var/jenkins_home/workspace/portfolio-pipeline/V10-With-Jenkins-SonarQube-K8S-Terraform/terraform/01-infra

echo "=== Terraform init ==="
terraform init -reconfigure -input=false

echo "=== Import EKS cluster ==="
terraform import aws_eks_cluster.main portfolio-eks || true

echo "=== Terraform Apply ==="
terraform apply -input=false -auto-approve

echo "=== DONE ==="
