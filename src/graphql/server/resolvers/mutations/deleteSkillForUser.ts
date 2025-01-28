import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const deleteSkillForUser = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  await verifySessionOwnership(userId);

  const existingSkill = await prisma.skillForUser.findFirst({
    where: { id },
  });

  if (!existingSkill) {
    prisma.$disconnect();

    return null;
  }

  if (existingSkill.userId !== userId) {
    prisma.$disconnect();

    throw new Error("Unauthorized: You do not own this skill");
  }

  const skillForUser = await prisma.skillForUser
    .delete({
      where: {
        id: existingSkill.id,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return skillForUser;
};
