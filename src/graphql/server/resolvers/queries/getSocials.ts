import { prisma } from "@/lib/prisma";

export const getSocials = async (_: string, { userId }: { userId: string }) =>
  await prisma.social.findMany({
    where: { userId },
  });
