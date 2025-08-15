import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const deleteEducation = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  await verifySessionOwnership(userId);

  const existingEducation = await prisma.education.findFirst({
    where: {
      id,
    },
  });

  if (!existingEducation) throw new Error("Education not found");

  if (existingEducation.userId !== userId)
    throw new Error("Unauthorized: you do not own this education");

  const education = await prisma.education.delete({
    where: {
      id,
    },
  });

  return education;
};
