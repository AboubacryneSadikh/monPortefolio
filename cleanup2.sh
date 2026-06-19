#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1

VPC_ID="vpc-005fe0521e1036ca0"

echo "=== Suppression ENIs dans $VPC_ID ==="
for eni in $(aws ec2 describe-network-interfaces --filters Name=vpc-id,Values=$VPC_ID --query 'NetworkInterfaces[?Status==`available`].NetworkInterfaceId' --output text); do
  aws ec2 delete-network-interface --network-interface-id $eni && echo "Deleted ENI $eni"
done

echo "=== Attente 15s ==="
sleep 15

echo "=== Suppression IGW ==="
for igw in $(aws ec2 describe-internet-gateways --filters Name=attachment.vpc-id,Values=$VPC_ID --query 'InternetGateways[].InternetGatewayId' --output text); do
  aws ec2 detach-internet-gateway --internet-gateway-id $igw --vpc-id $VPC_ID
  aws ec2 delete-internet-gateway --internet-gateway-id $igw && echo "Deleted IGW $igw"
done

echo "=== Suppression subnets ==="
for subnet in $(aws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC_ID --query 'Subnets[].SubnetId' --output text); do
  aws ec2 delete-subnet --subnet-id $subnet && echo "Deleted subnet $subnet"
done

echo "=== Suppression route tables ==="
for rtb in $(aws ec2 describe-route-tables --filters Name=vpc-id,Values=$VPC_ID --query 'RouteTables[?Associations[0].Main!=`true`].RouteTableId' --output text); do
  aws ec2 delete-route-table --route-table-id $rtb && echo "Deleted RTB $rtb"
done

echo "=== Suppression security groups ==="
for sg in $(aws ec2 describe-security-groups --filters Name=vpc-id,Values=$VPC_ID --query 'SecurityGroups[?GroupName!=`default`].GroupId' --output text); do
  aws ec2 delete-security-group --group-id $sg && echo "Deleted SG $sg"
done

echo "=== Suppression VPC ==="
aws ec2 delete-vpc --vpc-id $VPC_ID && echo "VPC $VPC_ID supprime"

echo "=== Liberation EIPs restantes ==="
for alloc_id in $(aws ec2 describe-addresses --query 'Addresses[?AssociationId==null].AllocationId' --output text); do
  aws ec2 release-address --allocation-id $alloc_id && echo "Released EIP $alloc_id"
done

echo "=== DONE ==="
