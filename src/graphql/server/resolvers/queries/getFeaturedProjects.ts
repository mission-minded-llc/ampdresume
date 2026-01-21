import { prisma } from "@/lib/prisma";

export const getFeaturedProjects = async (
  _: string,
  {
    userId,
    sort,
  }: {
    userId: string;
    sort: Array<{ field: string; direction: "ASC" | "DESC" }>;
  },
) => {
  // Map the sort array into Prisma-compatible orderBy
  const orderBy =
    sort?.map(({ field, direction }) => ({
      [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
    })) || [];

  const featuredProjects = await prisma.featuredProject.findMany({
    where: { userId },
    include: {
      skillsForFeaturedProject: {
        include: {
          skillForUser: {
            include: {
              skill: true,
            },
          },
        },
      },
    },
    orderBy: orderBy.length > 0 ? orderBy : { name: "asc" }, // Default sort by name
  });

  return featuredProjects;
};
