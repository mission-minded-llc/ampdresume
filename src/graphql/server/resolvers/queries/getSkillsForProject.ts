import { prisma } from "@/lib/prisma";

export const getSkillsForProject = async (_: string, { projectId }: { projectId: string }) => {
  const skillForProject = await prisma.skillForProject
    .findMany({
      where: { projectId },
      include: {
        skillForUser: {
          include: {
            skill: true,
          },
        },
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return skillForProject;
};
