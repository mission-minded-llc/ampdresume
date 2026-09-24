import { fileURLToPath } from "url";
import { logTitle } from "../helpers/util";
import { literaryCharacters, RETIRED_LITERARY_SLUGS } from "./characters";
import { prisma } from "@/lib/prisma";
import { LITERARY_SKILLS } from "./skills";
import {
  addCounts,
  emptyCounts,
  formatCounts,
  upsertLiteraryCharacter,
  upsertLiterarySkills,
} from "./upsert";
import { validateLiteraryCharacter } from "./validate";

export async function seedLiterary() {
  logTitle("Seeding Public-Domain Literary Resumes");

  const errors = literaryCharacters.flatMap(validateLiteraryCharacter);
  if (errors.length > 0) {
    for (const error of errors) {
      console.error(error);
    }
    throw new Error(`Literary seed data failed validation (${errors.length} issue(s)).`);
  }

  const slugs = literaryCharacters.map((character) => character.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    throw new Error(`Duplicate literary slugs: ${Array.from(new Set(duplicateSlugs)).join(", ")}`);
  }

  console.log(`Characters in seed: ${literaryCharacters.length}`);

  const stale = await prisma.user.deleteMany({
    where: {
      isDemo: true,
      slug: { in: [...RETIRED_LITERARY_SLUGS] },
    },
  });
  if (stale.count > 0) {
    console.log(`Removed retired literary resumes: ${stale.count}`);
  }

  const skillCounts = await upsertLiterarySkills(LITERARY_SKILLS);
  console.log(`Literary skills: ${formatCounts(skillCounts)}`);

  const totals = emptyCounts();
  const affiliations = { hero: 0, villain: 0, antihero: 0 };

  for (const character of literaryCharacters) {
    affiliations[character.affiliation] += 1;
    const counts = await upsertLiteraryCharacter(character);
    addCounts(totals, counts);

    const changed = counts.created + counts.updated + counts.removed;
    if (changed === 0) {
      console.log(`Unchanged: ${character.name} (${character.slug})`);
    } else {
      console.log(`${character.name} (${character.slug}): ${formatCounts(counts)}`);
    }
  }

  console.log("\nLiterary seed complete.");
  console.log(
    `Roster: ${affiliations.hero} heroes, ${affiliations.antihero} anti-heroes, ${affiliations.villain} villains`,
  );
  console.log(`Records: ${formatCounts(totals)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedLiterary()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
