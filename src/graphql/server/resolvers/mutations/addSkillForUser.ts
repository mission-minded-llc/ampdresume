import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const addSkillForUser = async (
  _: string,
  {
    userId,
    skillId,
    yearStarted,
    totalYears,
  }: {
    userId: string;
    skillId: string;
    yearStarted: number;
    totalYears: number;
  },
) => {
  await verifySessionOwnership(userId);

  const existingSkill = await prisma.skillForUser.findFirst({
    where: { userId, skillId },
  });

  if (existingSkill) {
    return {
      id: existingSkill.id,
    };
  }

  const skillForUser = await prisma.skillForUser.create({
    data: {
      userId,
      skillId,
      yearStarted,
      totalYears,
    },
    include: { skill: true }, // Include skill details
  });

  return skillForUser;
};
