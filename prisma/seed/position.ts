/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { prisma } from "@/lib/prisma";
import { getTestUserIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";

export async function seedPositions() {
  logTitle("Seeding Demo Positions");

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
        console.log(
          `Updating position for user ${userId}, company ${company.id}`
        );

        await prisma.position.update({
          where: {
            id: existingPosition.id,
          },
          data: { ...positionData },
        });

        continue;
      }

      const createdPosition = await prisma.position.create({
        data: { ...positionData, companyId: company.id },
      });
      console.log(
        `Created position for user ${userId} with id: ${createdPosition.id}`
      );
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedPositions().catch((e) => {
    throw e;
  });
}
