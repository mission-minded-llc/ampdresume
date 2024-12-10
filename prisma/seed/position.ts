/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestUserIds } from "./helpers/ids";

const prisma = new PrismaClient();

export async function seedPositions() {
  const testUserIds = await getTestUserIds();

  for (const userId of testUserIds) {
    const companies = await prisma.company.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
      },
    });

    if (!companies.length) {
      console.log(`No companies found for user ${userId}, skipping positions.`);
      continue;
    }

    for (const company of companies) {
      const existingPosition = await prisma.position.findFirst({
        where: {
          companyId: company.id,
        },
      });

      const positionData = {
        title: "Software Engineer",
        startDate: company.startDate ?? null,
        endDate: company.endDate ?? null,
      };

      if (existingPosition) {
        console.log(`Updating position for user ${userId}, company ${company.id}`);

        await prisma.position.update({
          where: {
            id: existingPosition.id,
          },
          data: { ...positionData },
        });

        continue;
      }

      const createdPosition = await prisma.position.create({
        data: { ...positionData },
      });
      console.log(`Created position for user ${userId} with id: ${createdPosition.id}`);
    }
  }
}

seedPositions()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
