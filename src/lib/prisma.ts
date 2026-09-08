/**
 * This should be the ONLY prisma import in your codebase.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Prevent multiple Prisma Client instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Configure SSL for the database connection. Production runs against Neon, which
// presents a certificate from a public CA, so the chain is verified by default.
const databaseUrl = process.env.DATABASE_URL || "";

// Detect if this is a localhost connection
const isLocalhost =
  databaseUrl.includes("localhost") ||
  databaseUrl.includes("127.0.0.1") ||
  databaseUrl.includes("postgres://postgres:postgres@");

// Check if connection string explicitly requires SSL
const connectionRequiresSSL =
  databaseUrl.includes("sslmode=require") ||
  databaseUrl.includes("sslmode=prefer") ||
  databaseUrl.includes("sslmode=verify-ca") ||
  databaseUrl.includes("sslmode=verify-full");

// Determine SSL configuration
// When sslmode=require is in the connection string, SSL is mandatory
// We must configure rejectUnauthorized: false to accept self-signed certificates
let sslConfig: boolean | { rejectUnauthorized: boolean } | undefined;

if (process.env.DATABASE_SSL === "false") {
  // Explicitly disabled via env var (may cause issues if connection string requires SSL)
  sslConfig = false;
} else if (connectionRequiresSSL || process.env.DATABASE_SSL === "true" || !isLocalhost) {
  // Enable SSL with self-signed certificate support when:
  // 1. Connection string requires SSL (sslmode=require, etc.) - HIGHEST PRIORITY
  // 2. Explicitly enabled via DATABASE_SSL=true
  // 3. Remote databases (not localhost) - most managed DB services require SSL
  sslConfig = {
    // Verify the certificate chain unless explicitly disabled, which is only
    // needed for a provider using a self-signed certificate.
    rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
  };
} else {
  // Localhost without SSL requirements - no SSL config needed
  sslConfig = undefined;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
