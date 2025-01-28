import { prisma } from "@/lib/prisma";

export const getSkills = async () => {
  const skills = await prisma.skill.findMany().finally(() => {
    prisma.$disconnect();
  });

  return skills;
};
