import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/app/api/graphql/util";

export const addProject = async (
  _: string,
  { userId, positionId, name }: { userId: string; positionId: string; name: string },
) => {
  await verifySessionOwnership(userId);

  const existingPosition = await prisma.position.findFirst({
    where: { id: positionId },
  });

  if (!existingPosition) {
    throw new Error("Position not found");
  }

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (existingCompany?.userId !== userId) {
    throw new Error("Unauthorized: You do not own this position or company");
  }

  return await prisma.project.create({
    data: {
      positionId,
      name,
    },
  });
};
