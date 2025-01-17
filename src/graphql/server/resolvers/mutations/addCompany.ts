import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const addCompany = async (
  _: string,
  {
    userId,
    name,
    location,
    startDate,
    endDate,
  }: { userId: string; name: string; location: string; startDate: string; endDate: string },
) => {
  await verifySessionOwnership(userId);

  // Convert the startDate and endDate from "YYYY-MM" format to a Date.
  const startDateTimestamp = new Date(startDate);
  const endDateTimestamp = endDate ? new Date(endDate) : null;

  return await prisma.company.create({
    data: {
      userId,
      name,
      location,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    },
  });
};
