import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const updateCertification = async (
  _: string,
  {
    id,
    userId,
    name,
    issuer,
    dateAwarded,
    credentialUrl,
    credentialId,
  }: {
    id: string;
    userId: string;
    name: string;
    issuer: string;
    dateAwarded: string;
    credentialUrl?: string | null;
    credentialId?: string | null;
  },
) => {
  await verifySessionOwnership(userId);

  const existingCertification = await prisma.certification.findFirst({
    where: { id },
  });

  if (existingCertification?.userId !== userId)
    throw new Error("Unauthorized: You do not own this certification");

  // Convert the dateAwarded from "YYYY-MM" format to a Date.
  const dateAwardedTimestamp = new Date(dateAwarded + "-02"); // "-02" is added to the date to avoid timezone issues.

  const certification = await prisma.certification.update({
    where: { id },
    data: {
      name,
      issuer,
      dateAwarded: dateAwardedTimestamp,
      credentialUrl: credentialUrl || null,
      credentialId: credentialId || null,
    },
  });

  return certification;
};
