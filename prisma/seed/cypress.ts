/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { prisma } from "@/lib/prisma";
import { logTitle } from "./helpers/util";

/**
 * Published catalog skills that Cypress searches for. Keep in sync with
 * `cypress/integration/account/skills.cy.ts` and
 * `cypress/integration/featured-project-skills/`.
 *
 * Icons match `prisma/seed/skills.csv` so the selector looks the same as a
 * full local seed.
 */
const cypressCatalogSkills = [
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "TypeScript", icon: "devicon:typescript" },
  { name: "React", icon: "devicon:react" },
  { name: "Node.js", icon: "akar-icons:node-fill" },
];

export async function seedCypress() {
  logTitle("Seeding Cypress catalog skills");

  const result = await prisma.skill.createMany({
    data: cypressCatalogSkills.map((skill) => ({
      ...skill,
      published: true,
    })),
    skipDuplicates: true,
  });

  console.log(`Skills created: ${result.count}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedCypress()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
