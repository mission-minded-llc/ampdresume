import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const updateSkillForUser = async (
  _: string,
  {
    id,
    userId,
    yearStarted,
    totalYears,
    description,
    icon,
  }: {
    id: string;
    userId: string;
    yearStarted: number;
    totalYears: number;
    description: string | null;
    icon: string | null;
  },
) => {
  await verifySessionOwnership(userId);

  const existingSkill = await prisma.skillForUser.findFirst({
    where: { id },
  });

  if (existingSkill?.userId !== userId) {
    throw new Error("Unauthorized: User does not own this skill");
  }

  return await prisma.skillForUser.update({
    where: { id },
    data: {
      userId,
      description,
      yearStarted,
      totalYears,
      icon,
    },
    include: { skill: true }, // Include skill details
  });
};
