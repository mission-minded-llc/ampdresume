import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const updateEducation = async (
  _: string,
  {
    id,
    userId,
    school,
    degree,
    dateAwarded,
  }: {
    id: string;
    userId: string;
    school: string;
    degree: string;
    dateAwarded: string;
  },
) => {
  await verifySessionOwnership(userId);

  const existingEducation = await prisma.education.findFirst({
    where: { id },
  });

  if (existingEducation?.userId !== userId)
    throw new Error("Unauthorized: You do not own this education");

  // Convert the dateAwarded and endDate from "YYYY-MM" format to a Date.
  const dateAwardedTimestamp = new Date(dateAwarded);

  const education = await prisma.education.update({
    where: { id },
    data: {
      school,
      degree,
      dateAwarded: dateAwardedTimestamp,
    },
  });

  return education;
};
