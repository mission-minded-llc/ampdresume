/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestUserIds } from "./helpers/users.mjs";

const prisma = new PrismaClient();

export async function seedEducation() {
  const testUserIds = await getTestUserIds();

  for (const userId of testUserIds) {
    const existingEducation = await prisma.education.findFirst({
      where: {
        userId,
      },
    });

    if (existingEducation) {
      console.log(`Education already exists for user ${userId}`);
      continue;
    }

    const createdEducation = await prisma.education.create({
      data: {
        school: "University of Southern California",
        degree: "B.S. Computer Science",
        dateAwarded: new Date(),
        userId,
      },
    });
    console.log(`Created education for user ${userId} with id: ${createdEducation.id}`);
  }
}

seedEducation()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
