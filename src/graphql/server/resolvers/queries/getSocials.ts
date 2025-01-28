import { prisma } from "@/lib/prisma";

export const getSocials = async (_: string, { userId }: { userId: string }) => {
  const social = await prisma.social
    .findMany({
      where: { userId },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return social;
};
