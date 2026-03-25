import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const updateUser = async (
  _: string,
  {
    userId,
    webThemeName,
  }: {
    userId: string;
    webThemeName?: string;
  },
) => {
  await verifySessionOwnership(userId);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      webThemeName,
    },
  });

  await revalidatePublicResumeForUserId(userId);
  return user;
};
