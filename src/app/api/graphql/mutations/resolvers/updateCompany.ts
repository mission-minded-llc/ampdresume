import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/app/api/graphql/util";

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
  if ((await verifySessionOwnership(userId)) === false) {
    throw new Error("Unauthorized: Session ownership verification failed");
  }

  const existingCompany = await prisma.company.findFirst({
    where: { id },
  });

  if (existingCompany?.userId !== userId) {
    throw new Error("Unauthorized: You do not own this company");
  }

  // Convert the startDate and endDate from "YYYY-MM" format to a Date.
  const startDateTimestamp = new Date(startDate);
  const endDateTimestamp = endDate ? new Date(endDate) : null;

  return await prisma.company.update({
    where: { id },
    data: {
      name,
      location,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    },
  });
};
