import { prisma } from "@/lib/prisma";

export const getSkillsFuzzyMatch = async (_: unknown, { skills }: { skills: string[] }) => {
  const skillsFound = await prisma.skill.findMany({
    where: {
      OR: skills
        .filter((skill) => skill.length > 4)
        .map((skill) => ({
          name: {
            contains: skill,
            mode: "insensitive",
          },
        })),
    },
    take: 30,
  });

  return skillsFound;
};
