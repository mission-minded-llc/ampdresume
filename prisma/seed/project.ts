/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestPositionIds } from "./helpers/ids";
import { randomLoremIpsumDescriptions } from "./helpers/data";

const prisma = new PrismaClient();

export async function seedProjects() {
  const testPositionIds = await getTestPositionIds();

  const projects = [
    {
      name: "I contributed to project 1 significantly by doing X, Y, and Z.",
      description: "This is the first project description. " + randomLoremIpsumDescriptions[0],
    },
    {
      name: "Expanded the project 2 by adding A, B, and C.",
      description: "This is the second project description. " + randomLoremIpsumDescriptions[1],
    },
    {
      name: "Increased annual sign-ups by 20% in project 3.",
      description: "This is the third project description. " + randomLoremIpsumDescriptions[2],
    },
  ];

  for (const positionId of testPositionIds) {
    await prisma.project.deleteMany({
      where: {
        positionId,
      },
    });

    for (const project of projects) {
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
