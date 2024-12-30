import { PrismaClient } from "@prisma/client";
import { verifySessionOwnership } from "../../util";

const prisma = new PrismaClient();

export const updateSkillForUser = async (
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
  if ((await verifySessionOwnership(userId)) === false) {
    throw new Error("Unauthorized");
  }

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
};
