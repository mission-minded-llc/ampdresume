import { prisma } from "@/lib/prisma";

export const getUser = async (_: string, { slug }: { slug: string }) =>
  await prisma.user.findUnique({
    where: { slug },
  });
