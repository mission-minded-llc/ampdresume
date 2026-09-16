import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const updateSocialSortIndexes = async (
  _: string,
  {
    userId,
    socialSortIndexes,
  }: {
    userId: string;
    socialSortIndexes: Array<{ id: string; sortIndex: number }>;
  },
) => {
  await verifySessionOwnership(userId);

  const socialIds = socialSortIndexes.map(({ id }) => id);
  const existingSocials = await prisma.social.findMany({
    where: { id: { in: socialIds } },
  });

  if (existingSocials.length !== socialIds.length) {
    throw new Error("Social not found");
  }

  if (existingSocials.some((social) => social.userId !== userId)) {
    throw new Error("Unauthorized: You do not own this social");
  }

  await Promise.all(
    socialSortIndexes.map(({ id, sortIndex }) =>
      prisma.social.update({
        where: { id },
        data: { sortIndex },
      }),
    ),
  );

  await revalidatePublicResumeForUserId(userId);
  return true;
};
