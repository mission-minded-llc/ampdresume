import { filterUserData } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { GraphQLContext } from "@/types/graphql";

export const getResume = async (
  _: string,
  { slug }: { slug: string },
  context: GraphQLContext
) => {
  const user = await prisma.user.findUnique({
    where: { slug },
  });

  if (!user) return null;

  const socials = await prisma.social.findMany({
    where: { userId: user.id },
  });

  const skillsForUser = await prisma.skillForUser.findMany({
    where: { userId: user.id },
    include: { skill: true },
  });

  const companies = await prisma.company.findMany({
    where: { userId: user.id },
    orderBy: { endDate: "desc" },
    include: {
      positions: {
        include: {
          projects: {
            orderBy: { sortIndex: "asc" },
            include: {
              skillsForProject: {
                include: { skillForUser: { include: { skill: true } } },
              },
            },
          },
        },
      },
    },
  });

  const education = await prisma.education.findMany({
    where: { userId: user.id },
  });

  return {
    user: filterUserData(user, context),
    socials,
    skillsForUser,
    companies,
    education,
  };
};
