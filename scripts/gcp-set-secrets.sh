#!/usr/bin/env bash
#
# Writes application secrets into Secret Manager. Terraform creates the secret
# containers with placeholder values; this adds the real ones as new versions,
# which keeps them out of Terraform state entirely.
#
# Values are read from the environment, or prompted for interactively when the
# variable is unset. Cloud Run resolves the `latest` version, so a new revision
# is not required for the change to take effect on the next cold start; run
# `gcloud run services update ampdresume --region REGION` to force it sooner.
#
# Usage: ./scripts/gcp-set-secrets.sh PROJECT_ID [SERVICE_NAME]

set -euo pipefail

PROJECT_ID="${1:-}"
SERVICE_NAME="${2:-ampdresume}"

if [ -z "$PROJECT_ID" ]; then
  echo "Usage: $0 PROJECT_ID [SERVICE_NAME]" >&2
  exit 1
fi

# Secret Manager id suffix -> environment variable holding the value.
SECRETS=(
  "nextauth-secret:NEXTAUTH_SECRET"
  "google-client-id:GOOGLE_CLIENT_ID"
  "google-client-secret:GOOGLE_CLIENT_SECRET"
  "linkedin-client-id:LINKEDIN_CLIENT_ID"
  "linkedin-client-secret:LINKEDIN_CLIENT_SECRET"
  "email-server-host:EMAIL_SERVER_HOST"
  "email-server-user:EMAIL_SERVER_USER"
  "email-server-password:EMAIL_SERVER_PASSWORD"
  "openai-api-key:OPENAI_API_KEY"
)

for entry in "${SECRETS[@]}"; do
  suffix="${entry%%:*}"
  env_var="${entry##*:}"
  secret_id="${SERVICE_NAME}-${suffix}"
  value="${!env_var:-}"

  if [ -z "$value" ]; then
    read -r -s -p "Value for ${env_var} (blank to skip): " value
    echo
  fi

  if [ -z "$value" ]; then
    echo "Skipped ${secret_id}."
    continue
  fi

  printf '%s' "$value" | gcloud secrets versions add "$secret_id" \
    --project "$PROJECT_ID" \
    --data-file=- >/dev/null

  echo "Updated ${secret_id}."
done

echo
echo "Done. DATABASE_URL is managed by Terraform and is not set here."
