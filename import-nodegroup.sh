#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1
export TF_VAR_mongo_password=${TF_VAR_mongo_password:?Variable TF_VAR_mongo_password non définie}

cd /var/jenkins_home/workspace/portfolio-pipeline/V10-With-Jenkins-SonarQube-K8S-Terraform/terraform/01-infra

echo "=== Lister les node groups ==="
aws eks list-nodegroups --cluster-name portfolio-eks --output text

echo "=== Import node group ==="
terraform import aws_eks_node_group.main portfolio-eks:portfolio-eks-nodes || true

echo "=== Terraform Plan ==="
terraform plan -input=false

echo "=== DONE ==="
