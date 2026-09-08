#!/usr/bin/env bash
#
# One-time setup that has to happen before the first `terraform apply`, because
# Terraform cannot create the bucket that stores its own state.
#
# Usage: ./scripts/gcp-bootstrap.sh PROJECT_ID [REGION]

set -euo pipefail

PROJECT_ID="${1:-}"
REGION="${2:-us-west1}"
STATE_BUCKET="ampdresume-tf-state"

if [ -z "$PROJECT_ID" ]; then
  echo "Usage: $0 PROJECT_ID [REGION]" >&2
  exit 1
fi

echo "Using project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

echo "Enabling the APIs needed to run Terraform..."
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  iam.googleapis.com \
  serviceusage.googleapis.com \
  storage.googleapis.com \
  --project "$PROJECT_ID"

if gcloud storage buckets describe "gs://${STATE_BUCKET}" --project "$PROJECT_ID" >/dev/null 2>&1; then
  echo "State bucket gs://${STATE_BUCKET} already exists."
else
  echo "Creating state bucket gs://${STATE_BUCKET}..."
  gcloud storage buckets create "gs://${STATE_BUCKET}" \
    --project "$PROJECT_ID" \
    --location "$REGION" \
    --uniform-bucket-level-access \
    --public-access-prevention

  # State contains connection strings, so keep every revision recoverable.
  gcloud storage buckets update "gs://${STATE_BUCKET}" --versioning
fi

cat <<EOF

Bootstrap complete.

Next steps:
  1. export NEON_API_KEY=...            # from https://console.neon.tech
  2. cp terraform/terraform.tfvars.example terraform/terraform.tfvars
  3. cd terraform && terraform init && terraform apply
  4. ../scripts/gcp-set-secrets.sh $PROJECT_ID   # replace the secret placeholders
EOF
