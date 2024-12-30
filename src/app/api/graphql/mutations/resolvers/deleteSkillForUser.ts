import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/app/api/graphql/util";

export const deleteSkillForUser = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  if ((await verifySessionOwnership(userId)) === false) {
    throw new Error("Unauthorized");
  }
  const existingSkill = await prisma.skillForUser.findFirst({
    where: { id },
  });
  if (!existingSkill) return null;

  return await prisma.skillForUser.delete({
    where: {
      id: existingSkill.id,
    },
  });
};
