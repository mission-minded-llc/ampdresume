# Migration Reset Steps

1. Point `DATABASE_URL` to the correct env.
1. Remove migrations table:
   `psql $DATABASE_URL -c 'DROP TABLE IF EXISTS "ampdresume"._prisma_migrations;'`
1. Generate migration that matches current schema:
   `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > migration.sql`
1. Create migrations directory and move migration:

- `mkdir -p prisma/migrations/0_init`
- `mv migration.sql prisma/migrations/0_init/migration.sql`

1. Run `npx prisma migrate resolve --applied 0_init`
