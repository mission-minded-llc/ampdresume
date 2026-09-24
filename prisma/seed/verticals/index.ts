/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { logTitle } from "../helpers/util";
import {
  addCounts,
  emptyCounts,
  formatCounts,
  upsertResumeProfile,
  upsertSkillCatalog,
} from "../literary/upsert";
import { verticalProfiles } from "./profiles";
import { VERTICAL_SKILLS } from "./skills";
import { VERTICALS } from "./types";
import { validateVerticalProfile, validateVerticalRoster } from "./validate";

export async function seedVerticals() {
  logTitle("Seeding Industry-Vertical Resumes");

  const errors = [
    ...validateVerticalRoster(verticalProfiles),
    ...verticalProfiles.flatMap(validateVerticalProfile),
  ];
  if (errors.length > 0) {
    for (const error of errors) {
      console.error(error);
    }
    throw new Error(`Vertical seed data failed validation (${errors.length} issue(s)).`);
  }

  console.log(`Profiles in seed: ${verticalProfiles.length}`);
  console.log(`Verticals: ${VERTICALS.length}`);

  const skillCounts = await upsertSkillCatalog(VERTICAL_SKILLS, { updateExisting: false });
  console.log(`Vertical skills: ${formatCounts(skillCounts)}`);

  const totals = emptyCounts();
  const genders = { woman: 0, man: 0 };

  for (const profile of verticalProfiles) {
    genders[profile.gender] += 1;
    const counts = await upsertResumeProfile(profile);
    addCounts(totals, counts);

    const changed = counts.created + counts.updated + counts.removed;
    if (changed === 0) {
      console.log(`Unchanged: ${profile.name} (${profile.slug})`);
    } else {
      console.log(`${profile.name} (${profile.slug}): ${formatCounts(counts)}`);
    }
  }

  console.log("\nVertical seed complete.");
  console.log(
    `Roster: ${genders.woman} women, ${genders.man} men across ${VERTICALS.length} verticals`,
  );
  console.log(`Records: ${formatCounts(totals)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedVerticals()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
