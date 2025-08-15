import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const deleteCompany = async (
  _: string,
  { userId, id }: { userId: string; id: string }
) => {
  await verifySessionOwnership(userId);

  const existingCompany = await prisma.company.findFirst({
    where: { id },
  });

  if (!existingCompany) return null;

  if (existingCompany.userId !== userId)
    throw new Error("Unauthorized: You do not own this company");

  // TODO: Additional checks to ensure all related positions and projects are removed
  // first. Do not support delete cascade on companies!

  const company = await prisma.company.delete({
    where: {
      id: existingCompany.id,
    },
  });

  return company;
};
