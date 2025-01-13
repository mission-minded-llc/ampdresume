import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/app/api/graphql/util";

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

  if (existingCompany?.userId !== userId) {
    throw new Error("Unauthorized: You do not own this position or company");
  }

  // Convert the startDate and endDate from "YYYY-MM" format to a Date.
  const startDateTimestamp = new Date(startDate);
  const endDateTimestamp = endDate ? new Date(endDate) : null;

  return await prisma.position.update({
    where: { id },
    data: {
      title,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    },
  });
};
