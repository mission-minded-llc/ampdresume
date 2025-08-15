import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const deleteSkillForProject = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  await verifySessionOwnership(userId);

  const existingSkillForProject = await prisma.skillForProject.findFirst({
    where: { id },
  });

  if (!existingSkillForProject) return null;

  const existingProject = await prisma.project.findFirst({
    where: { id: existingSkillForProject.projectId },
  });

  if (!existingProject) return null;

  const existingPosition = await prisma.position.findFirst({
    where: { id: existingProject.positionId },
  });

  if (!existingPosition) return null;

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (!existingCompany) return null;

  if (existingCompany.userId !== userId) throw new Error("Unauthorized: You do not own this skill");

  const skillForProject = await prisma.skillForProject.delete({
    where: {
      id: existingSkillForProject.id,
    },
  });

  return skillForProject;
};
