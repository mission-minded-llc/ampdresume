/* eslint-disable no-console */

import { fileURLToPath } from "url";
import { prisma } from "@/lib/prisma";
import { getTestUserIds } from "./helpers/ids";
import { logTitle } from "./helpers/util";

export async function seedCompanies() {
  logTitle("Seeding Demo Companies");

  const testUserIds = await getTestUserIds();

  const companies = [
    {
      name: "Amp'd Resume",
      location: "Los Angeles, CA",
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      endDate: null,
    },
    {
      name: "Google",
      location: "Mountain View, CA",
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    },
    {
      name: "Facebook",
      location: "Menlo Park, CA",
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
    },
  ];

  for (const userId of testUserIds) {
    for (const company of companies) {
      const existingCompany = await prisma.company.findFirst({
        where: {
          userId,
          name: company.name,
        },
      });

      if (existingCompany) {
        console.log(`Company ${company.name} already exists for user ${userId}`);
        continue;
      }

      const createdCompany = await prisma.company.create({
        data: {
          userId,
          ...company,
        },
      });
      console.log(
        `Created company ${company.name} for user ${userId} with id: ${createdCompany.id}`,
      );
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedCompanies().catch((e) => {
    throw e;
  });
}
