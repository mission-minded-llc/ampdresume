import { prisma } from "@/lib/prisma";

export const getProjects = async (_: string, { positionId }: { positionId: string }) => {
  const projects = await prisma.project.findMany({
    where: { positionId },
    include: {
      skillsForProject: { include: { skillForUser: { include: { skill: true } } } },
    },
  });

  return projects;
};
