/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { getTestUserIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";
import { prisma } from "@/lib/prisma";

export async function seedSkillsForUser() {
  logTitle("Seeding Demo Skills for Users");

  const testUserIds = await getTestUserIds();

  // Find the exact skills HTML, CSS, JavaScript, TypeScript, PHP, Python,
  // PostgreSQL, MySQL, MongoDB, and Redis.
  const skills = await prisma.skill.findMany({
    where: {
      OR: [
        { name: { equals: "HTML" } },
        { name: { equals: "CSS" } },
        { name: { equals: "JavaScript" } },
        { name: { equals: "TypeScript" } },
        { name: { equals: "PHP" } },
        { name: { equals: "Python" } },
        { name: { equals: "PostgreSQL" } },
        { name: { equals: "MySQL" } },
        { name: { equals: "MongoDB" } },
        { name: { equals: "Redis" } },
        { name: { equals: "React" } },
        { name: { equals: "React Redux" } },
        { name: { equals: "Node.js" } },
      ],
    },
  });

  for (const userId of testUserIds) {
    console.log(`Deleting existing skills for user ${userId}`);
    await prisma.skillForUser.deleteMany({
      where: {
        userId,
      },
    });

    for (const skill of skills) {
      const randomYearInLastDecade = new Date().getFullYear() - Math.floor(Math.random() * 5) - 1;

      const createdSkill = await prisma.skillForUser.create({
        data: {
          skillId: skill.id,
          userId: userId,
          description: "This is a skill for a USER",
          yearStarted: randomYearInLastDecade,
        },
      });
      console.log(`Created skill ${skill.name} for user ${userId} with id: ${createdSkill.id}`);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedSkillsForUser().catch((e) => {
    throw e;
  });
}
