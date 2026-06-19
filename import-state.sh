#!/bin/bash
export AWS_DEFAULT_REGION=us-west-2

cd /var/jenkins_home/workspace/portfolio-pipeline/V10-With-Jenkins-SonarQube-K8S-Terraform/terraform/01-infra

echo "=== Import IAM roles existants ==="
terraform import aws_iam_role.eks_cluster portfolio-eks-cluster-role
terraform import aws_iam_role.eks_nodes portfolio-eks-node-role

echo "=== Terraform Apply ==="
export TF_VAR_mongo_password=${TF_VAR_mongo_password:?Variable TF_VAR_mongo_password non définie}
terraform apply -input=false -auto-approve

echo "=== DONE ==="
