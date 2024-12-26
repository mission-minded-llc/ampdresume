/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import { logTitle } from "./helpers/util";
import { testUsers } from "./helpers/data";

const prisma = new PrismaClient();

export async function seedUsers() {
  logTitle("Seeding Demo Users");

  let usersUpdatedCount = 0;
  let usersCreatedCount = 0;

  for (const user of testUsers) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: { ...user },
      });
      usersUpdatedCount += 1;

      continue;
    }

    await prisma.user.create({
      data: {
        emailVerified: new Date(),
        ...user,
      },
    });
    usersCreatedCount += 1;
  }

  console.log(`Users created: ${usersCreatedCount}`);
  console.log(`Users updated: ${usersUpdatedCount}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedUsers()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
