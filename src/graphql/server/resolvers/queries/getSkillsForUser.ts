import { prisma } from "@/lib/prisma";

export const getSkillsForUser = async (_: string, { userId }: { userId: string }) => {
  const skillForUser = await prisma.skillForUser
    .findMany({
      where: { userId },
      include: { skill: true }, // Include skill details
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return skillForUser;
};
