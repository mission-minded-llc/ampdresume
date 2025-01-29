import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const updateProjectSortIndexes = async (
  _: string,
  {
    userId,
    positionId,
    projectSortIndexes,
  }: {
    userId: string;
    positionId: string;
    projectSortIndexes: Array<{ id: string; sortIndex: number }>;
  },
) => {
  await verifySessionOwnership(userId);

  const existingPosition = await prisma.position.findFirst({
    where: { id: positionId },
  });

  if (!existingPosition) throw new Error("Position not found");

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (existingCompany?.userId !== userId)
    throw new Error("Unauthorized: You do not own this position or company");

  // Update the sort indexes for each project.
  for (const { id, sortIndex } of projectSortIndexes) {
    await prisma.project.update({
      where: { id },
      data: { sortIndex },
    });
  }

  return true;
};
