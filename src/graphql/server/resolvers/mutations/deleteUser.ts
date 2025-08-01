import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const deleteUser = async (_: string, { userId }: { userId: string }) => {
  await verifySessionOwnership(userId);

  // Delete the user and all related records will be cascaded due to onDelete: Cascade
  // This includes: accounts, sessions, socials, skillForUser, companies (and their positions/projects), education, etc.
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return true;
};
