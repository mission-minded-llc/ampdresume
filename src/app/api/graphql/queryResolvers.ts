import { prisma } from "@/lib/prisma";

export const queryResolvers = {
  // General queries.
  skills: async () => {
    return await prisma.skill.findMany();
  },

  // User-specific queries.
  user: async (_: string, { slug }: { slug: string }) => {
    return await prisma.user.findUnique({
      where: { slug },
    });
  },

  skillsForUser: async (_: string, { userId }: { userId: string }) => {
    return await prisma.skillForUser.findMany({
      where: { userId },
      include: { skill: true }, // Include skill details
    });
  },

  companies: async (
    _: string,
    { userId, sort }: { userId: string; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
  ) => {
    // Map the sort array into Prisma-compatible orderBy
    const orderBy =
      sort?.map(({ field, direction }) => ({
        [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
      })) || [];

    return await prisma.company.findMany({
      where: { userId },
      orderBy, // Apply sorting
    });
  },

  positions: async (
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
        projects: { include: { skillsForProject: { include: { skillForUser: true } } } },
      }, // Include project and skill details
    });
  },

  education: async (
    _: string,
    { userId, sort }: { userId: string; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
  ) => {
    // Map the sort array into Prisma-compatible orderBy
    const orderBy =
      sort?.map(({ field, direction }) => ({
        [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
      })) || [];

    return await prisma.education.findMany({
      where: { userId },
      orderBy, // Apply sorting
    });
  },
};
