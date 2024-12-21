#!/bin/bash

# Define the environments
environments=("test" "prod")

# Loop through each environment
for env in "${environments[@]}"; do
  # Get the ARN of the secret
  secret_arn=$(aws secretsmanager list-secrets --query "SecretList[?Name=='${env}/postgresql/credentials'].ARN" --output text)
  
  # Check if the secret exists
  if [ -n "$secret_arn" ]; then
    echo "Importing secret for environment: $env"
    terraform import "aws_secretsmanager_secret.db_secrets[\"$env\"]" "$secret_arn"
  else
    echo "Secret for environment: $env does not exist"
  fi
done
