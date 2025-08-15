import { prisma } from "@/lib/prisma";

export const getSkillsForUser = async (_: string, { userId }: { userId: string }) =>
  await prisma.skillForUser.findMany({
    where: { userId },
    include: { skill: true }, // Include skill details
  });
