import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const addSkill = async (
  _: string,
  { userId, name, icon }: { userId: string; name: string; icon: string }
) => {
  await verifySessionOwnership(userId);

  // Before adding the skill, check if it already exists with a case-insensitive match.
  const existingSkill = await prisma.skill.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
  });
  if (existingSkill) return existingSkill;

  const skill = await prisma.skill.create({
    data: { name, icon, published: false },
  });

  await prisma.skillContribution.create({
    data: { skillId: skill.id, userId },
  });

  return skill;
};
