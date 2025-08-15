/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { prisma } from "@/lib/prisma";
import { getTestUserIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";

export async function seedEducation() {
  logTitle("Seeding Demo Education");

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
    console.log(
      `Created education for user ${userId} with id: ${createdEducation.id}`
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedEducation().catch((e) => {
    throw e;
  });
}
