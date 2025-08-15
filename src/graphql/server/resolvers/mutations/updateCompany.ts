import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const updateCompany = async (
  _: string,
  {
    id,
    userId,
    name,
    description,
    location,
    startDate,
    endDate,
  }: {
    id: string;
    userId: string;
    name: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  },
) => {
  await verifySessionOwnership(userId);

  const existingCompany = await prisma.company.findFirst({
    where: { id },
  });

  if (existingCompany?.userId !== userId)
    throw new Error("Unauthorized: You do not own this company");

  // Convert the startDate and endDate from "YYYY-MM" format to a Date.
  const startDateTimestamp = new Date(startDate + "-02"); // "-02" is added to the date to avoid timezone issues.
  const endDateTimestamp = endDate ? new Date(endDate + "-02") : null;

  const company = await prisma.company.update({
    where: { id },
    data: {
      name,
      description,
      location,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    },
  });

  return company;
};
