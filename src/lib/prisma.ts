/**
 * This should be the ONLY prisma import in your codebase.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Prevent multiple Prisma Client instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Configure SSL for database connection
// This handles self-signed certificates commonly used by managed database services (e.g., AWS RDS)
// SSL is typically required in production environments
const shouldUseSSL =
  process.env.DATABASE_URL?.includes("sslmode=require") ||
  process.env.DATABASE_URL?.includes("sslmode=prefer") ||
  process.env.DATABASE_SSL === "true" ||
  (process.env.NODE_ENV === "production" && process.env.DATABASE_SSL !== "false");

const sslConfig = shouldUseSSL
  ? {
      // Allow self-signed certificates (common for managed database services)
      // Set DATABASE_SSL_REJECT_UNAUTHORIZED=true to enforce certificate validation
      rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true",
    }
  : undefined;

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
