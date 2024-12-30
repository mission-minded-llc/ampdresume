/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { getTestProjectIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";
import { prisma } from "@/lib/prisma";

export async function seedSkillsForProject() {
  logTitle("Seeding Demo Skills for Projects");

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

    // Delete all skills in project if found.
    console.log(`Deleting existing skills for project ${projectId}`);
    await prisma.skillForProject.deleteMany({
      where: {
        projectId,
      },
    });

    const randomSkillsForUser = skillsForUser.sort(() => 0.5 - Math.random()).slice(0, 2);

    for (const skillForUser of randomSkillsForUser) {
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedSkillsForProject()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
