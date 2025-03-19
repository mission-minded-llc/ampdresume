# This Dockerfile is not used to build the image, but to document the steps to build the image.
# This project is currently deployed on Vercel, without using this Dockerfile at all.
# However, this is saved in the event we need to move off Vercel and host in Docker elsewhere.

# syntax=docker.io/docker/dockerfile:1

FROM node:18-bullseye-slim AS base

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run prisma:generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

# tsx is required for the Prisma seed.ts script
RUN npm install -g tsx

WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy prisma seed folder, used later to seed DB.
COPY --from=builder --chown=nextjs:nodejs /app/prisma/seed ./prisma/seed

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

COPY --chown=nextjs:nodejs ./entrypoint.sh ./entrypoint.sh
CMD ["./entrypoint.sh"]