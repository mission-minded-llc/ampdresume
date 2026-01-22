import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const deleteSkillForFeaturedProject = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  await verifySessionOwnership(userId);

  const existingSkillForFeaturedProject = await prisma.skillForFeaturedProject.findFirst({
    where: { id },
  });

  if (!existingSkillForFeaturedProject) return null;

  const existingFeaturedProject = await prisma.featuredProject.findFirst({
    where: { id: existingSkillForFeaturedProject.featuredProjectId },
  });

  if (!existingFeaturedProject) return null;

  if (existingFeaturedProject.userId !== userId)
    throw new Error("Unauthorized: You do not own this skill");

  const skillForFeaturedProject = await prisma.skillForFeaturedProject.delete({
    where: {
      id: existingSkillForFeaturedProject.id,
    },
  });

  return skillForFeaturedProject;
};
