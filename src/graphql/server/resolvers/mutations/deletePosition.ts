import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const deletePosition = async (_: string, { userId, id }: { userId: string; id: string }) => {
  await verifySessionOwnership(userId);

  const existingPosition = await prisma.position.findFirst({
    where: { id },
  });

  if (!existingPosition) {
    prisma.$disconnect();

    return null;
  }

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (!existingCompany) {
    prisma.$disconnect();

    throw new Error("Company not found");
  }

  if (existingCompany.userId !== userId) {
    prisma.$disconnect();

    throw new Error("Unauthorized: You do not own this position");
  }

  const position = await prisma.position
    .delete({
      where: {
        id: existingPosition.id,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return position;
};
