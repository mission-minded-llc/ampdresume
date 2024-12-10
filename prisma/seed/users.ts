/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { testUsers } from "./helpers/data";

const prisma = new PrismaClient();

export async function seedUsers() {
  for (const user of testUsers) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      console.log(`User ${user.email} already exists, attempting update.`);

      const updatedUser = await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: { ...user },
      });
      console.log(`Updated user with id: ${updatedUser.id}`);

      continue;
    }

    const createdUser = await prisma.user.create({
      data: {
        emailVerified: new Date(),
        ...user,
      },
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }
}

seedUsers()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
