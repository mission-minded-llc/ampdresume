import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const deleteSocial = async (_: string, { userId, id }: { userId: string; id: string }) => {
  await verifySessionOwnership(userId);

  const existingSocial = await prisma.social.findFirst({
    where: { id },
  });

  if (!existingSocial) return null;

  if (existingSocial.userId !== userId) throw new Error("Unauthorized: You do not own this social");

  const social = await prisma.social.delete({
    where: {
      id: existingSocial.id,
    },
  });

  await revalidatePublicResumeForUserId(userId);
  return social;
};
