import { prisma } from "@/lib/prisma";

export const getPositions = async (
  _: string,
  {
    companyId,
    sort,
  }: { companyId: string; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
) => {
  const orderBy =
    sort?.map(({ field, direction }) => ({
      [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
    })) || [];

  const positions = await prisma.position.findMany({
    where: { companyId },
    include: {
      company: {
        select: {
          id: true,
        },
      },
    },
    orderBy, // Apply sorting
  });

  return positions;
};
