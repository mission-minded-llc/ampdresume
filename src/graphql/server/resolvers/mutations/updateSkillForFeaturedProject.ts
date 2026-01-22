import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { sanitizeHtmlServer } from "@/lib/secureHtmlParser";

export const updateSkillForFeaturedProject = async (
  _: string,
  {
    id,
    userId,
    description,
  }: {
    id: string;
    userId: string;
    description: string | null;
  },
) => {
  await verifySessionOwnership(userId);

  const existingSkillForFeaturedProject = await prisma.skillForFeaturedProject.findFirst({
    where: { id },
  });

  if (!existingSkillForFeaturedProject) throw new Error("Skill not found");

  const existingFeaturedProject = await prisma.featuredProject.findFirst({
    where: { id: existingSkillForFeaturedProject.featuredProjectId },
  });

  if (!existingFeaturedProject) throw new Error("Featured project not found");

  if (existingFeaturedProject.userId !== userId)
    throw new Error("Unauthorized: You do not own this skill");

  const skillForFeaturedProject = await prisma.skillForFeaturedProject.update({
    where: { id },
    data: {
      description: await sanitizeHtmlServer(description),
    },
    include: {
      skillForUser: {
        include: { skill: true },
      },
    },
  });

  return skillForFeaturedProject;
};
