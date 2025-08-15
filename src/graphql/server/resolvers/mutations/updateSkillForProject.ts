import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const updateSkillForProject = async (
  _: string,
  {
    id,
    userId,
    description,
  }: {
    id: string;
    userId: string;
    description: string | null;
  }
) => {
  await verifySessionOwnership(userId);

  const existingSkillForProject = await prisma.skillForProject.findFirst({
    where: { id },
  });

  if (!existingSkillForProject) throw new Error("Skill not found");

  const existingProject = await prisma.project.findFirst({
    where: { id: existingSkillForProject.projectId },
  });

  if (!existingProject) throw new Error("Project not found");

  const existingPosition = await prisma.position.findFirst({
    where: { id: existingProject.positionId },
  });

  if (!existingPosition) throw new Error("Position not found");

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (existingCompany?.userId !== userId)
    throw new Error("Unauthorized: You do not own this skill");

  const skillForProject = await prisma.skillForProject.update({
    where: { id },
    data: {
      description,
    },
    include: {
      skillForUser: {
        include: { skill: true },
      },
    },
  });

  return skillForProject;
};
