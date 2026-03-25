import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { revalidatePublicResumeBySlug } from "@/lib/revalidatePublicResume";

export const deleteUser = async (_: string, { userId }: { userId: string }) => {
  await verifySessionOwnership(userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { slug: true },
  });

  // Delete the user and all related records will be cascaded due to onDelete: Cascade
  // This includes: accounts, sessions, socials, skillForUser, companies (and their positions/projects), education, etc.
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePublicResumeBySlug(user?.slug);
  return true;
};
