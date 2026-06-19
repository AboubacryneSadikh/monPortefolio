#!/bin/bash
# Les credentials AWS sont gérés via les variables d'environnement ou le fichier ~/.aws/credentials
# Ne jamais mettre de clés en dur dans ce fichier
export AWS_DEFAULT_REGION=us-east-1

echo "=== Recherche du cluster portfolio-eks dans toutes les régions ==="
for region in us-east-1 us-east-2 us-west-1 us-west-2 eu-west-1 eu-west-2 eu-central-1 ap-southeast-1 ap-northeast-1; do
  result=$(AWS_DEFAULT_REGION=$region aws eks describe-cluster --name portfolio-eks --query 'cluster.status' --output text 2>/dev/null)
  if [ -n "$result" ]; then
    echo "TROUVE dans $region : status=$result"
  fi
done
echo "=== Fin de la recherche ==="
