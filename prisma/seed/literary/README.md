# Public-domain literary seed

Idempotent seed that creates public resumes for characters from public-domain
books and folklore. It is **not** part of `npm run prisma:seed` (the John/Jane
demo data). Run it separately when you want the literary roster in a local
database.

```bash
npm run prisma:seed:literary
```

Production uses a separate script so the Neon URL never lands in `.env` or your
shell. It reads `ampdresume-database-url-direct` from Secret Manager and runs
the seed with `DATABASE_URL` set for that process only:

```bash
./scripts/seed-literary-production.sh
```

Pass `--project` if your gcloud default is not the production project, and
`--yes` only when you cannot type the confirmation prompt.

Re-running the script leaves records untouched when the seed data matches the
database. Changed fields are updated; records removed from the seed are deleted
for those literary users only.

## Identity

Each character is a `User` keyed by slug `{slug}` with no account or display
email. Profiles are viewable at `/r/{slug}` after seed (for example
`/r/sherlock-holmes`).

Dates follow the source text's internal chronology or first-publication era.
Ancient and legendary figures use early calendar dates so PostgreSQL can store
them. Featured-project links point at Project Gutenberg copies of the
public-domain texts when one exists.

This seed uses book and folklore versions only — not later films, musicals, or
trademarked retellings. Cthulhu and other still-copyright-sensitive Mythos
figures are omitted.

## Adding a character

1. Add the resume with `defineCharacter()` in the matching file under `characters/`.
2. Reference only skill names that exist in `skills.ts` (or add the skill there first).
3. Every project skill must also appear on that character's `skills` list.
4. Run `npm run prisma:seed:literary` again. Validation runs before any writes.
