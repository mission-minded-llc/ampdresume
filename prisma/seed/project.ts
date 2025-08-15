/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { prisma } from "@/lib/prisma";
import { randomLoremIpsumDescriptions } from "./helpers/data";
import { getTestPositionIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";

export async function seedProjects() {
  logTitle("Seeding Demo Projects");

  const testPositionIds = await getTestPositionIds();

  const projects = [
    {
      name: "I contributed to project 1 significantly by doing X, Y, and Z.",
      description:
        "This is the first project description. " +
        randomLoremIpsumDescriptions[0],
    },
    {
      name: "Expanded the project 2 by adding A, B, and C.",
      description:
        "This is the second project description. " +
        randomLoremIpsumDescriptions[1],
    },
    {
      name: "Increased annual sign-ups by 20% in project 3.",
      description:
        "This is the third project description. " +
        randomLoremIpsumDescriptions[2],
    },
  ];

  for (const positionId of testPositionIds) {
    console.log(`Deleting existing projects for position ${positionId}`);
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
        `Created project ${project.name} for position ${positionId} with id: ${createdProject.id}`
      );
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedProjects().catch((e) => {
    throw e;
  });
}
