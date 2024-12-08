/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestUserIds } from "./helpers/users.mjs";

const prisma = new PrismaClient();

async function main() {
  const testUserIds = await getTestUserIds();

  const skills = await prisma.skill.findMany({
    where: {
      OR: [
        { name: { contains: "HTML", mode: "insensitive" } },
        { name: { contains: "CSS", mode: "insensitive" } },
        { name: { contains: "JavaScript", mode: "insensitive" } },
      ],
    },
  });

  for (const userId of testUserIds) {
    for (const skill of skills) {
      const existingSkillForUser = await prisma.skillForUser.findFirst({
        where: {
          userId,
          skillId: skill.id,
        },
      });

      if (existingSkillForUser) {
        console.log(`Skill ${skill.name} already exists for user ${userId}`);
        continue;
      }

      const createdSkill = await prisma.skillForUser.create({
        data: {
          skillId: skill.id,
          userId: userId,
        },
      });
      console.log(`Created skill ${skill.name} for user ${userId} with id: ${createdSkill.id}`);
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
