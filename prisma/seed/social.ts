/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { getTestUserIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";
import { prisma } from "@/lib/prisma";

export async function seedSocials() {
  logTitle("Seeding Demo Social Media Links");

  const testUserIds = await getTestUserIds();

  const socials = [
    {
      name: "GitHub",
      url: "missionmike",
    },
    {
      name: "LinkedIn",
      url: "michael-dinerstein",
    },
    {
      name: "X",
      url: "missionmikedev",
    },
    {
      name: "Website",
      url: "https://www.missionmike.dev",
    },
  ];

  for (const userId of testUserIds) {
    console.log(`Deleting existing socials for user ${userId}`);
    await prisma.social.deleteMany({
      where: {
        userId,
      },
    });

    for (const social of socials) {
      const createdSocial = await prisma.social.create({
        data: {
          userId,
          ...social,
        },
      });
      console.log(`Created social ${social.name} for user ${userId} with id: ${createdSocial.id}`);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedSocials()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
