#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1

echo "=== Suppression lock DynamoDB ==="
aws dynamodb delete-item \
  --table-name portfolio-terraform-locks \
  --key '{"LockID":{"S":"portfolio-terraform-state-aboubacryne/01-infra/terraform.tfstate-md5"}}'

echo "=== Done ==="
