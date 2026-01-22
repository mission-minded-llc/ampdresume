import { prisma } from "@/lib/prisma";

export const getSkillsForFeaturedProject = async (
  _: string,
  { featuredProjectId }: { featuredProjectId: string },
) =>
  await prisma.skillForFeaturedProject.findMany({
    where: { featuredProjectId },
    include: {
      skillForUser: {
        include: {
          skill: true,
        },
      },
    },
  });
