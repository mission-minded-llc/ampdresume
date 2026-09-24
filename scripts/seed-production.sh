#!/usr/bin/env bash
#
# Seeds literary and industry-vertical demo resumes into production Neon.
# Fetches the connection string from Secret Manager for this process only:
# it does not write .env and does not export DATABASE_URL into your shell.
#
# Usage:
#   ./scripts/seed-production.sh [--yes] [--project PROJECT_ID]
#
# Requires gcloud auth with access to Secret Manager. Uses the direct Neon
# URL (same as CI migrations) so Prisma is not talking through the pooler.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

YES=0
PROJECT_ID="${GCP_PROJECT_ID:-}"
SERVICE_NAME="ampdresume"

usage() {
  echo "Usage: $0 [--yes] [--project PROJECT_ID]" >&2
  exit 2
}

while [ $# -gt 0 ]; do
  case "$1" in
    --yes | -y)
      YES=1
      shift
      ;;
    --project)
      [ $# -ge 2 ] || usage
      PROJECT_ID="$2"
      shift 2
      ;;
    --help | -h)
      usage
      ;;
    *)
      usage
      ;;
  esac
done

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
fi

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  echo "No GCP project set. Pass --project or set GCP_PROJECT_ID." >&2
  exit 1
fi

if ! command -v gcloud >/dev/null 2>&1; then
  echo "gcloud is not on PATH." >&2
  exit 1
fi

if ! gcloud auth print-access-token >/dev/null 2>&1; then
  echo "gcloud is not authenticated. Run gcloud auth login." >&2
  exit 1
fi

redact_database_url() {
  printf '%s\n' "$1" | sed -E 's#://([^:/]+):[^@]+@#://\1:***@#'
}

is_local_database_url() {
  case "$1" in
    *localhost* | *127.0.0.1* | *@postgres:* | *postgres:postgres@*)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

fetch_secret() {
  local suffix="$1"
  gcloud secrets versions access latest \
    --secret="${SERVICE_NAME}-${suffix}" \
    --project="$PROJECT_ID"
}

echo "Fetching production database URL from project ${PROJECT_ID}..." >&2

if ! PROD_DATABASE_URL="$(fetch_secret database-url-direct)"; then
  echo "Could not read ${SERVICE_NAME}-database-url-direct." >&2
  exit 1
fi

case "$PROD_DATABASE_URL" in
  "" | PLACEHOLDER*)
    echo "${SERVICE_NAME}-database-url-direct is missing or still a placeholder." >&2
    exit 1
    ;;
esac

if is_local_database_url "$PROD_DATABASE_URL"; then
  echo "Refusing to seed: the Secret Manager URL looks like a local database." >&2
  exit 1
fi

if [ -f .env ]; then
  LOCAL_DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | head -n 1 | cut -d= -f2-)"
  LOCAL_DATABASE_URL="${LOCAL_DATABASE_URL%\"}"
  LOCAL_DATABASE_URL="${LOCAL_DATABASE_URL#\"}"
  if [ -n "$LOCAL_DATABASE_URL" ] && [ "$PROD_DATABASE_URL" = "$LOCAL_DATABASE_URL" ]; then
    echo "Refusing to seed: the fetched URL matches DATABASE_URL in .env." >&2
    exit 1
  fi
fi

echo "Target: $(redact_database_url "$PROD_DATABASE_URL")" >&2
echo "This writes literary and industry-vertical demo users to production. Your .env and shell DATABASE_URL are not changed." >&2

if [ "$YES" -ne 1 ]; then
  if [ ! -t 0 ] && [ ! -r /dev/tty ]; then
    echo "Refusing to seed without a TTY. Re-run with --yes if this is intentional." >&2
    exit 1
  fi
  printf 'Type "production" to continue: ' >&2
  if [ -t 0 ]; then
    read -r confirmation
  else
    read -r confirmation </dev/tty
  fi
  if [ "$confirmation" != "production" ]; then
    echo "Aborted." >&2
    exit 1
  fi
fi

# Prefix only each child process. dotenv/config will not overwrite it.
# Do not `export` here: this script is meant to be executed, not sourced.
env DATABASE_URL="$PROD_DATABASE_URL" npm run prisma:seed:literary
env DATABASE_URL="$PROD_DATABASE_URL" npm run prisma:seed:verticals

echo "Production demo seed finished. Local DATABASE_URL is unchanged." >&2
