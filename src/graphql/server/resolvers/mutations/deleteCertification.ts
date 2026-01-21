import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const deleteCertification = async (
  _: string,
  { userId, id }: { userId: string; id: string },
) => {
  await verifySessionOwnership(userId);

  const existingCertification = await prisma.certification.findFirst({
    where: {
      id,
    },
  });

  if (!existingCertification) throw new Error("Certification not found");

  if (existingCertification.userId !== userId)
    throw new Error("Unauthorized: you do not own this certification");

  const certification = await prisma.certification.delete({
    where: {
      id,
    },
  });

  return certification;
};
