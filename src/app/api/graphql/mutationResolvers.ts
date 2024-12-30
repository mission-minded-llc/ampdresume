import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const mutationResolvers = {
  // User-specific mutations.
  addSkillForUser: async (
    _: string,
    {
      userId,
      skillId,
      yearStarted,
      totalYears,
    }: { userId: string; skillId: string; yearStarted: number; totalYears: number },
  ) => {
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
  },

  updateSkillForUser: async (
    _: string,
    {
      id,
      userId,
      yearStarted,
      totalYears,
      description,
    }: {
      id: string;
      userId: string;
      yearStarted: number;
      totalYears: number;
      description: string;
    },
  ) => {
    /// TODO: verify that userId matches the current session user.

    return await prisma.skillForUser.update({
      where: { id },
      data: {
        userId,
        description,
        yearStarted,
        totalYears,
      },
      include: { skill: true }, // Include skill details
    });
  },
};
