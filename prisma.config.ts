import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prisma's env() helper throws if DATABASE_URL is unset, which breaks
    // `prisma generate` during builds that do not have a database. Read the
    // variable directly so generate can run; migrate still requires a real URL.
    url: process.env.DATABASE_URL,
  },
});
