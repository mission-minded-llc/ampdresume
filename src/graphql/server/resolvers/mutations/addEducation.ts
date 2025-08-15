import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

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
  const dateAwardedTimestamp = new Date(dateAwarded + "-02"); // "-02" is added to the date to avoid timezone issues.

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
