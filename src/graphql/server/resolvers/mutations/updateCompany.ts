import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const updateCompany = async (
  _: string,
  {
    id,
    userId,
    name,
    location,
    startDate,
    endDate,
  }: {
    id: string;
    userId: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
  },
) => {
  await verifySessionOwnership(userId);

  const existingCompany = await prisma.company.findFirst({
    where: { id },
  });

  if (existingCompany?.userId !== userId) {
    prisma.$disconnect();

    throw new Error("Unauthorized: You do not own this company");
  }

  // Convert the startDate and endDate from "YYYY-MM" format to a Date.
  const startDateTimestamp = new Date(startDate);
  const endDateTimestamp = endDate ? new Date(endDate) : null;

  const company = await prisma.company
    .update({
      where: { id },
      data: {
        name,
        location,
        startDate: startDateTimestamp,
        endDate: endDateTimestamp,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return company;
};
