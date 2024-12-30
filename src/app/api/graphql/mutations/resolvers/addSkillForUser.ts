import { PrismaClient } from "@prisma/client";
import { verifySessionOwnership } from "../../util";

const prisma = new PrismaClient();

export const addSkillForUser = async (
  _: string,
  {
    userId,
    skillId,
    yearStarted,
    totalYears,
  }: { userId: string; skillId: string; yearStarted: number; totalYears: number },
) => {
  if ((await verifySessionOwnership(userId)) === false) {
    throw new Error("Unauthorized");
  }

  // Check if this skill already exists for this user.
  const existingSkill = await prisma.skillForUser.findFirst({
    where: { userId, skillId },
  });

  if (existingSkill) {
    return {
      id: existingSkill.id,
    };
  }

  return await prisma.skillForUser.create({
    data: {
      userId,
      skillId,
      yearStarted,
      totalYears,
    },
    include: { skill: true }, // Include skill details
  });
};
