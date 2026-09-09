# Image for the Cloud Run service. Built and pushed by .github/workflows/cd-app.yml.
#
# syntax=docker.io/docker/dockerfile:1

FROM node:22-bookworm-slim AS base

# --- Dependencies -----------------------------------------------------------

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# --- Build ------------------------------------------------------------------

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the browser bundle at build time, so they
# have to be present here rather than only in the Cloud Run environment.
ARG NEXT_PUBLIC_ENVIRONMENT_NAME=production
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_SENTRY_DSN

ENV NEXT_PUBLIC_ENVIRONMENT_NAME=$NEXT_PUBLIC_ENVIRONMENT_NAME \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_GRAPHQL_ENDPOINT \
    NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN \
    NEXT_TELEMETRY_DISABLED=1

# `prisma generate` does not open a database connection. Leave DATABASE_URL unset
# here; prisma.config.ts reads it only when present. The real URL is injected at
# runtime from Secret Manager.

# Uploading source maps needs a token, but the build has to succeed without one
# so the image can be built locally. Mounted as a secret to keep it out of the
# image layers.
RUN --mount=type=secret,id=sentry_auth_token,required=false \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token 2>/dev/null || true)" \
    npm run build

# --- Runtime ----------------------------------------------------------------

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# The standalone output already contains a minimal node_modules and server.js.
# https://nextjs.org/docs/app/api-reference/config/next-config-js/output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

# Migrations and seeding run in the CD pipeline, not here: Cloud Run starts a new
# container on every cold start, and running them per-container would be both
# slow and unsafe under concurrency.
CMD ["node", "server.js"]
