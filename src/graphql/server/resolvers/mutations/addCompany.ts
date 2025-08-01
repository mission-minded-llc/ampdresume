import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

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
  const startDateTimestamp = new Date(startDate + "-02"); // "-02" is added to the date to avoid timezone issues.
  const endDateTimestamp = endDate ? new Date(endDate + "-02") : null;

  const company = await prisma.company.create({
    data: {
      userId,
      name,
      location,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    },
  });

  return company;
};
