/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestPositionIds } from "./helpers/ids";

const prisma = new PrismaClient();

export async function seedProjects() {
  const testPositionIds = await getTestPositionIds();

  const projects = [
    {
      name: "Project 1",
      description: "This is the first project",
    },
    {
      name: "Project 2",
      description: "This is the second project",
    },
    {
      name: "Project 3",
      description: "This is the third project",
    },
  ];

  for (const positionId of testPositionIds) {
    for (const project of projects) {
      const existingProject = await prisma.project.findFirst({
        where: {
          positionId,
          name: project.name,
        },
      });

      if (existingProject) {
        console.log(`Project ${project.name} already exists for position ${positionId}`);

        const updatedProject = await prisma.project.update({
          where: {
            id: existingProject.id,
          },
          data: { ...project },
        });
        console.log(
          `Updated project ${project.name} for position ${positionId} with id: ${updatedProject.id}`,
        );
        continue;
      }

      const createdProject = await prisma.project.create({
        data: {
          positionId,
          ...project,
        },
      });
      console.log(
        `Created project ${project.name} for position ${positionId} with id: ${createdProject.id}`,
      );
    }
  }
}

seedProjects()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
