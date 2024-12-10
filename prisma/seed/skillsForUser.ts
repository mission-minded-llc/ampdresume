/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestUserIds } from "./helpers/ids";

const prisma = new PrismaClient();

export async function seedSkillsForUser() {
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
        console.log(`Skill ${skill.name} already exists for user ${userId}. Deleting.`);
        await prisma.skillForUser.delete({
          where: {
            id: existingSkillForUser.id,
          },
        });
      }

      const createdSkill = await prisma.skillForUser.create({
        data: {
          skillId: skill.id,
          userId: userId,
          description: "This is a skill for a USER",
        },
      });
      console.log(`Created skill ${skill.name} for user ${userId} with id: ${createdSkill.id}`);
    }
  }
}

seedSkillsForUser()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
