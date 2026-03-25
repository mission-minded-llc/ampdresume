import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const addSocial = async (
  _: string,
  { userId, platform, ref }: { userId: string; platform: string; ref: string },
) => {
  await verifySessionOwnership(userId);

  const social = await prisma.social.create({
    data: {
      userId,
      platform,
      ref,
    },
  });

  await revalidatePublicResumeForUserId(userId);
  return social;
};
