/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestProjectIds } from "./helpers/ids";

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
    if (!project?.positionId) {
      console.log(`No position found for id ${projectId}, skipping.`);
      continue;
    }

    const position = await prisma.position.findUnique({
      where: {
        id: project.positionId,
      },
      select: {
        companyId: true,
      },
    });
    if (!position?.companyId) {
      console.log(`No company found for id ${project.positionId}, skipping.`);
      continue;
    }

    const company = await prisma.company.findUnique({
      where: {
        id: position.companyId,
      },
      select: {
        userId: true,
      },
    });
    if (!company?.userId) {
      console.log(`No user found for id ${position.companyId}, skipping.`);
      continue;
    }

    const skillsForUser = await prisma.skillForUser.findMany({
      where: {
        userId: company.userId,
      },
    });

    const randomSkillsForUser = skillsForUser.sort(() => 0.5 - Math.random()).slice(0, 2);

    for (const skillForUser of randomSkillsForUser) {
      const existingSkillsForProject = await prisma.skillForProject.findMany({
        where: {
          projectId,
          skillForUserId: skillForUser.id,
        },
      });

      if (existingSkillsForProject) {
        for (const existingSkillForProject of existingSkillsForProject) {
          console.log(
            `Skill ${skillForUser.id} already exists for project ${projectId}. Deleting.`,
          );
          await prisma.skillForProject.delete({
            where: {
              id: existingSkillForProject.id,
            },
          });
        }
      }

      try {
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
      } catch (e) {
        console.log(e);
      }
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
