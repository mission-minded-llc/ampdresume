import { prisma } from "@/lib/prisma";

export const getResume = async (_: string, { slug }: { slug: string }) => {
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
    include: {
      positions: {
        include: {
          projects: {
            include: {
              skillsForProject: { include: { skillForUser: { include: { skill: true } } } },
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
    user,
    socials,
    skillsForUser,
    companies,
    education,
  };
};
