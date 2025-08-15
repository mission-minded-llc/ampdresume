import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const updatePosition = async (
  _: string,
  {
    id,
    userId,
    companyId,
    title,
    startDate,
    endDate,
  }: {
    id: string;
    userId: string;
    companyId: string;
    title: string;
    startDate: string;
    endDate: string;
  },
) => {
  await verifySessionOwnership(userId);

  const existingCompany = await prisma.company.findFirst({
    where: { id: companyId },
  });

  if (existingCompany?.userId !== userId)
    throw new Error("Unauthorized: You do not own this position or company");

  // Convert the startDate and endDate from "YYYY-MM" format to a Date.
  const startDateTimestamp = new Date(startDate + "-02"); // "-02" is added to the date to avoid timezone issues.
  const endDateTimestamp = endDate ? new Date(endDate + "-02") : null;

  const position = await prisma.position.update({
    where: { id },
    data: {
      title,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    },
  });

  return position;
};
