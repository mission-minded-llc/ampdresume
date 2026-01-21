import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { sanitizeHtmlServer } from "@/lib/secureHtmlParser";

export const updateProject = async (
  _: string,
  {
    id,
    userId,
    projectName,
    description,
  }: {
    id: string;
    userId: string;
    projectName: string;
    description: string;
  },
) => {
  await verifySessionOwnership(userId);

  const existingProject = await prisma.project.findFirst({
    where: { id },
  });

  if (!existingProject) throw new Error("Project not found");

  const existingPosition = await prisma.position.findFirst({
    where: { id: existingProject.positionId },
  });

  if (!existingPosition) throw new Error("Position not found");

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (!existingCompany) throw new Error("Company not found");

  if (existingCompany?.userId !== userId)
    throw new Error("Unauthorized: You do not own this project");

  const project = await prisma.project.update({
    where: { id },
    data: {
      name: projectName,
      description: sanitizeHtmlServer(description),
    },
  });

  return project;
};
