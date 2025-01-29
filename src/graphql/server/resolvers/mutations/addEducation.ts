import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const addEducation = async (
  _: string,
  {
    userId,
    school,
    degree,
    dateAwarded,
  }: {
    userId: string;
    school: string;
    degree: string;
    dateAwarded: string;
  },
) => {
  await verifySessionOwnership(userId);

  // Convert the dateAwarded and endDate from "YYYY-MM" format to a Date.
  const dateAwardedTimestamp = new Date(dateAwarded);

  const education = await prisma.education.create({
    data: {
      userId,
      school,
      degree,
      dateAwarded: dateAwardedTimestamp,
    },
  });

  return education;
};
