#!/usr/bin/env bash
#
# Reads Secret Manager values into the current environment. Terraform creates
# the secret containers; real values are added in the Cloud Console. This script
# never writes secrets back.
#
# Load into the current shell:
#   eval "$(./scripts/gcp-fetch-secrets.sh [PROJECT_ID] [SERVICE_NAME])"
#   source ./scripts/gcp-fetch-secrets.sh [PROJECT_ID] [SERVICE_NAME]
#
# PROJECT_ID defaults to the active gcloud project. Status goes to stderr so
# `eval "$(...)"` only sees export statements.

# Detect `source` vs execute. When sourced, exports apply to the caller; when
# executed, stdout is eval-safe `export` lines. Do not `set -e` while sourced:
# that would change the caller's shell options.
_gcp_fetch_sourced=0
if [ -n "${ZSH_EVAL_CONTEXT:-}" ]; then
  case $ZSH_EVAL_CONTEXT in *:file*) _gcp_fetch_sourced=1 ;; esac
elif [ -n "${BASH_VERSION:-}" ] && [ "${BASH_SOURCE[0]}" != "$0" ]; then
  _gcp_fetch_sourced=1
fi

if [ "$_gcp_fetch_sourced" -eq 0 ]; then
  set -euo pipefail
fi

PROJECT_ID="${1:-}"
SERVICE_NAME="${2:-ampdresume}"

if [ -z "$PROJECT_ID" ]; then
  PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
fi

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  echo "Usage: $0 [PROJECT_ID] [SERVICE_NAME]" >&2
  echo "PROJECT_ID is required when no gcloud project is configured." >&2
  if [ "$_gcp_fetch_sourced" -eq 1 ]; then
    unset _gcp_fetch_sourced PROJECT_ID SERVICE_NAME
    return 1
  fi
  exit 1
fi

# Secret Manager id suffix -> environment variable.
# Keep in sync with terraform/secrets.tf.
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
  "neon-api-key:NEON_API_KEY"
  "database-url:DATABASE_URL"
  "database-url-direct:DATABASE_URL_DIRECT"
)

_gcp_fetch_quote() {
  printf "'%s'" "$(printf '%s' "$1" | sed "s/'/'\\\\''/g")"
}

echo "Fetching secrets from project ${PROJECT_ID}..." >&2

_gcp_fetch_loaded=0
_gcp_fetch_skipped=0

for _gcp_fetch_entry in "${SECRETS[@]}"; do
  _gcp_fetch_suffix="${_gcp_fetch_entry%%:*}"
  _gcp_fetch_env_var="${_gcp_fetch_entry##*:}"
  _gcp_fetch_secret_id="${SERVICE_NAME}-${_gcp_fetch_suffix}"

  if ! _gcp_fetch_value="$(gcloud secrets versions access latest \
    --secret="$_gcp_fetch_secret_id" \
    --project="$PROJECT_ID" 2>/dev/null)"; then
    echo "Skipped ${_gcp_fetch_secret_id}: not found or no access." >&2
    _gcp_fetch_skipped=$((_gcp_fetch_skipped + 1))
    continue
  fi

  case "$_gcp_fetch_value" in
    PLACEHOLDER*)
      echo "Skipped ${_gcp_fetch_secret_id}: still a placeholder; set it in Secret Manager." >&2
      _gcp_fetch_skipped=$((_gcp_fetch_skipped + 1))
      continue
      ;;
  esac

  if [ "$_gcp_fetch_sourced" -eq 1 ]; then
    export "${_gcp_fetch_env_var}=${_gcp_fetch_value}"
  else
    printf 'export %s=%s\n' "$_gcp_fetch_env_var" "$(_gcp_fetch_quote "$_gcp_fetch_value")"
  fi

  echo "Loaded ${_gcp_fetch_env_var}." >&2
  _gcp_fetch_loaded=$((_gcp_fetch_loaded + 1))
done

if [ "$_gcp_fetch_loaded" -gt 0 ]; then
  echo "Loaded ${_gcp_fetch_loaded} secret(s)." >&2
  echo "DATABASE_URL is the production Neon URL, not local Docker Postgres." >&2
fi

if [ "$_gcp_fetch_skipped" -gt 0 ]; then
  echo "Skipped ${_gcp_fetch_skipped} secret(s)." >&2
fi

unset _gcp_fetch_sourced PROJECT_ID SERVICE_NAME SECRETS
unset _gcp_fetch_loaded _gcp_fetch_skipped _gcp_fetch_entry
unset _gcp_fetch_suffix _gcp_fetch_env_var _gcp_fetch_secret_id _gcp_fetch_value
unset -f _gcp_fetch_quote 2>/dev/null || true
