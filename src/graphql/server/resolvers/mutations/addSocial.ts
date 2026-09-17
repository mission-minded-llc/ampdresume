import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const addSocial = async (
  _: string,
  { userId, platform, ref }: { userId: string; platform: string; ref: string },
) => {
  await verifySessionOwnership(userId);

  const { _max } = await prisma.social.aggregate({
    where: { userId },
    _max: { sortIndex: true },
  });
  const sortIndex = (_max.sortIndex ?? -1) + 1;

  const social = await prisma.social.create({
    data: {
      userId,
      platform,
      ref,
      sortIndex,
    },
  });

  await revalidatePublicResumeForUserId(userId);
  return social;
};
