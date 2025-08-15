import { prisma } from "@/lib/prisma";

export const getSkillsForProject = async (
  _: string,
  { projectId }: { projectId: string }
) =>
  await prisma.skillForProject.findMany({
    where: { projectId },
    include: {
      skillForUser: {
        include: {
          skill: true,
        },
      },
    },
  });
