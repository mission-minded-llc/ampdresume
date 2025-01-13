import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/app/api/graphql/util";

export const deleteSkillForUser = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  await verifySessionOwnership(userId);

  const existingSkill = await prisma.skillForUser.findFirst({
    where: { id },
  });

  if (!existingSkill) return null;

  if (existingSkill.userId !== userId) {
    throw new Error("Unauthorized: You do not own this skill");
  }

  return await prisma.skillForUser.delete({
    where: {
      id: existingSkill.id,
    },
  });
};
