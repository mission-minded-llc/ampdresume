import { prisma } from "@/lib/prisma";

export const getCompanies = async (
  _: string,
  { userId, sort }: { userId: string; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
) => {
  const orderBy =
    sort?.map(({ field, direction }) => ({
      [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
    })) || [];

  const companies = await prisma.company.findMany({
    where: { userId },
    orderBy, // Apply sorting
  });

  return companies;
};
