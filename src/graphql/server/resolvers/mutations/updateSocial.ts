import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const updateSocial = async (
  _: string,
  {
    id,
    userId,
    ref,
  }: {
    id: string;
    userId: string;
    ref: string;
  },
) => {
  await verifySessionOwnership(userId);

  const existingSocial = await prisma.social.findFirst({
    where: { id },
  });

  if (!existingSocial) throw new Error("Social not found");

  if (existingSocial.userId !== userId) throw new Error("Unauthorized: You do not own this social");

  const social = await prisma.social.update({
    where: { id },
    data: {
      ref,
    },
  });

  return social;
};
