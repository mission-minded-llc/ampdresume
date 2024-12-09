/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestProjectIds } from "./helpers/ids.mjs";

const prisma = new PrismaClient();

export async function seedSkillsForProject() {
  const testProjectIds = await getTestProjectIds();

  // Loop through the projects, find the userId tied to each project, then add 2
  // random skills from SkillsForUser to the project.
  for (const projectId of testProjectIds) {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        positionId: true,
      },
    });
    const position = await prisma.position.findUnique({
      where: {
        id: project.positionId,
      },
      select: {
        companyId: true,
      },
    });
    const company = await prisma.company.findUnique({
      where: {
        id: position.companyId,
      },
      select: {
        userId: true,
      },
    });
    const skillsForUser = await prisma.skillForUser.findMany({
      where: {
        userId: company.userId,
      },
    });

    const randomSkillsForUser = skillsForUser.sort(() => 0.5 - Math.random()).slice(0, 2);

    for (const skillForUser of randomSkillsForUser) {
      const existingSkillForProject = await prisma.skillForProject.findFirst({
        where: {
          projectId,
          skillForUserId: skillForUser.id,
        },
      });

      if (existingSkillForProject) {
        await prisma.skillForProject.delete({
          where: {
            id: existingSkillForProject.id,
          },
        });
      }

      const createdSkill = await prisma.skillForProject.create({
        data: {
          skillForUserId: skillForUser.id,
          projectId,
          description: "This is a skill for a PROJECT",
        },
      });
      console.log(
        `Created skill ${skillForUser.id} for project ${projectId} with id: ${createdSkill.id}`,
      );
    }
  }
}

seedSkillsForProject()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
