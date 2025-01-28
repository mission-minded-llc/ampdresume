import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const updateProject = async (
  _: string,
  {
    id,
    userId,
    description,
  }: {
    id: string;
    userId: string;
    description: string;
  },
) => {
  await verifySessionOwnership(userId);

  const existingProject = await prisma.project.findFirst({
    where: { id },
  });

  if (!existingProject) {
    prisma.$disconnect();

    throw new Error("Project not found");
  }

  const existingPosition = await prisma.position.findFirst({
    where: { id: existingProject.positionId },
  });

  if (!existingPosition) {
    prisma.$disconnect();

    throw new Error("Position not found");
  }

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (!existingCompany) {
    prisma.$disconnect();

    throw new Error("Company not found");
  }

  if (existingCompany?.userId !== userId) {
    prisma.$disconnect();

    throw new Error("Unauthorized: You do not own this project");
  }

  const project = await prisma.project
    .update({
      where: { id },
      data: {
        description,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return project;
};
