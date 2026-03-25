import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const addSkillForProject = async (
  _: string,
  {
    userId,
    projectId,
    skillForUserId,
  }: { userId: string; projectId: string; skillForUserId: string },
) => {
  await verifySessionOwnership(userId);

  const existingSkillForProject = await prisma.skillForProject.findFirst({
    where: { projectId, skillForUserId },
  });

  if (existingSkillForProject) {
    return {
      id: existingSkillForProject.id,
    };
  }

  const skillForProjects = await prisma.skillForProject.create({
    data: {
      projectId,
      skillForUserId,
    },
    include: {
      skillForUser: {
        include: { skill: true },
      },
    },
  });

  await revalidatePublicResumeForUserId(userId);
  return skillForProjects;
};
