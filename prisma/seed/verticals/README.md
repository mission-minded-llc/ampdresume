# Industry-vertical seed

Idempotent seed that creates public demo resumes for 25 hiring-critical industries, with four unique
profiles in each vertical (two women, two men). It is **not** part of `npm run prisma:seed` (the
John/Jane demo data). Run it separately:

```bash
npm run prisma:seed:verticals
```

Production uses the same Neon wrapper as the literary seed so the URL never lands in `.env` or your
shell. It reads `ampdresume-database-url-direct` from Secret Manager and runs both demo seeds:

```bash
./scripts/seed-production.sh
```

Pass `--project` if your gcloud default is not the production project, and `--yes` only when you
cannot type the confirmation prompt.

Re-running the script leaves records untouched when the seed data matches the database. Changed
fields are updated; records removed from the seed are deleted for those vertical users only.

## Identity

Each profile is a `User` keyed by slug `{firstname}-{lastname}` with no account email. Profiles are
viewable at `/r/{slug}` after seed (for example `/r/maya-chen`). Display emails use the
`example.com` domain so PDFs render a contact line without creating login accounts. Every vertical
user is tagged `isDemo: true` so the app can tell seeded resumes apart from real accounts.

Every resume includes the supported Amp'd Resume sections: profile info, professional summary,
skills, work experience (companies, positions, projects), featured projects, education, and
certifications. Social links and featured-project links are omitted from the seed; themes inject
dummy social placeholders when a demo user is loaded.

## Adding a profile

1. Add the resume with `defineProfile()` in the matching file under `profiles/`.
2. Reference only skill names that exist in `skills.ts` (or add the skill there first). Existing
   catalog skills (for example `Python`) are reused and their icons are not overwritten.
3. Every project skill must also appear on that profile's `skills` list.
4. Keep each vertical at two women and two men.
5. Run `npm run prisma:seed:verticals` again. Validation runs before any writes.
