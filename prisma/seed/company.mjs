/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";
import { getTestUserIds } from "./helpers/ids.mjs";

const prisma = new PrismaClient();

export async function seedCompanies() {
  const testUserIds = await getTestUserIds();

  const companies = [
    {
      name: "OpenResume, Inc.",
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

seedCompanies()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
