import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const addCertification = async (
  _: string,
  {
    userId,
    name,
    issuer,
    dateAwarded,
    credentialUrl,
    credentialId,
  }: {
    userId: string;
    name: string;
    issuer: string;
    dateAwarded: string;
    credentialUrl?: string | null;
    credentialId?: string | null;
  },
) => {
  await verifySessionOwnership(userId);

  // Convert the dateAwarded from "YYYY-MM" format to a Date.
  const dateAwardedTimestamp = new Date(dateAwarded + "-02"); // "-02" is added to the date to avoid timezone issues.

  const certification = await prisma.certification.create({
    data: {
      userId,
      name,
      issuer,
      dateAwarded: dateAwardedTimestamp,
      credentialUrl: credentialUrl || null,
      credentialId: credentialId || null,
    },
  });

  return certification;
};
