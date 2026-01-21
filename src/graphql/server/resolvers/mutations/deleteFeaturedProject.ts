import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const deleteFeaturedProject = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  await verifySessionOwnership(userId);

  const existingFeaturedProject = await prisma.featuredProject.findFirst({
    where: {
      id,
    },
  });

  if (!existingFeaturedProject) throw new Error("Featured project not found");

  if (existingFeaturedProject.userId !== userId)
    throw new Error("Unauthorized: you do not own this featured project");

  const featuredProject = await prisma.featuredProject.delete({
    where: {
      id,
    },
  });

  return featuredProject;
};
