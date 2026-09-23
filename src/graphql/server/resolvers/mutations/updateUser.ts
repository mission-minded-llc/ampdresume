import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeForUserId } from "@/lib/revalidatePublicResume";

export const updateUser = async (
  _: string,
  {
    userId,
    webThemeName,
    pdfThemeName,
  }: {
    userId: string;
    webThemeName?: string;
    pdfThemeName?: string;
  },
) => {
  await verifySessionOwnership(userId);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(webThemeName !== undefined ? { webThemeName } : {}),
      ...(pdfThemeName !== undefined ? { pdfThemeName } : {}),
    },
  });

  await revalidatePublicResumeForUserId(userId);
  return user;
};
