import { prisma } from "@/lib/prisma";

export const getCertifications = async (
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

  const certifications = await prisma.certification.findMany({
    where: { userId },
    orderBy, // Apply sorting
  });

  return certifications;
};
