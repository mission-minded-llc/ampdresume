import { prisma } from "@/lib/prisma";

export const getUser = async (_: string, { slug }: { slug: string }) => {
  const user = await prisma.user
    .findUnique({
      where: { slug },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return user;
};
