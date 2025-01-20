import { prisma } from "@/lib/prisma";

export const getPositions = async (
  _: string,
  {
    companyIds,
    sort,
  }: { companyIds: string[]; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
) => {
  // Map the sort array into Prisma-compatible orderBy
  const orderBy =
    sort?.map(({ field, direction }) => ({
      [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
    })) || [];

  return await prisma.position.findMany({
    where: { companyId: { in: companyIds } },
    orderBy, // Apply sorting
    include: {
      company: true, // Include company details
      projects: {
        orderBy: {
          sortIndex: "asc",
        },
        include: {
          skillsForProject: { include: { skillForUser: { include: { skill: true } } } },
        },
      },
    }, // Include project and skill details
  });
};
