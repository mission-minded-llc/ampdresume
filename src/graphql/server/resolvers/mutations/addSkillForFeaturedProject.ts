import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const addSkillForFeaturedProject = async (
  _: string,
  {
    userId,
    featuredProjectId,
    skillForUserId,
  }: { userId: string; featuredProjectId: string; skillForUserId: string },
) => {
  await verifySessionOwnership(userId);

  const existingSkillForFeaturedProject = await prisma.skillForFeaturedProject.findFirst({
    where: { featuredProjectId, skillForUserId },
  });

  if (existingSkillForFeaturedProject) {
    return {
      id: existingSkillForFeaturedProject.id,
    };
  }

  const skillForFeaturedProjects = await prisma.skillForFeaturedProject.create({
    data: {
      featuredProjectId,
      skillForUserId,
    },
    include: {
      skillForUser: {
        include: { skill: true },
      },
    },
  });

  await revalidatePublicResumeForUserId(userId);
  return skillForFeaturedProjects;
};
