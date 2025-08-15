import { ExtractedCompany, ExtractedEducation } from "@/app/edit/import/types";
import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

export const saveExtractedResumeData = async (
  _: string,
  {
    userId,
    user,
    skillIds,
    companies,
    education,
  }: {
    userId: string;
    user: {
      name: string;
      email: string;
      location: string;
      title: string;
    };
    skillIds: string[];
    companies: ExtractedCompany[];
    education: ExtractedEducation[];
  }
) => {
  await verifySessionOwnership(userId);

  // Clean up existing data
  await prisma.skillForProject.deleteMany({
    where: {
      project: {
        position: {
          company: {
            userId,
          },
        },
      },
    },
  });

  await prisma.project.deleteMany({
    where: {
      position: {
        company: {
          userId,
        },
      },
    },
  });

  await prisma.position.deleteMany({
    where: {
      company: {
        userId,
      },
    },
  });

  await prisma.company.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.education.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.skillForUser.deleteMany({
    where: {
      userId,
    },
  });

  // Update user data
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: user.name,
      displayEmail: user.email,
      location: user.location,
      title: user.title,
    },
  });

  // Add skills
  for (const id of skillIds) {
    const skill = await prisma.skill.findFirst({
      where: { id },
    });

    if (!skill) {
      throw new Error(`Skill with id ${id} not found`);
    }

    await prisma.skillForUser.create({
      data: {
        userId,
        skillId: skill.id,
        yearStarted: new Date().getFullYear(),
      },
    });
  }

  // Add companies, positions, and projects
  for (const company of companies) {
    const newCompany = await prisma.company.create({
      data: {
        userId,
        name: company.name,
        location: company.location,
        startDate: new Date(company.startDate),
        endDate: company.endDate ? new Date(company.endDate) : null,
      },
    });

    for (const position of company.positions ?? []) {
      const newPosition = await prisma.position.create({
        data: {
          companyId: newCompany.id,
          title: position.title,
          startDate: new Date(position.startDate),
          endDate: position.endDate ? new Date(position.endDate) : null,
        },
      });

      for (const project of position.projects ?? []) {
        await prisma.project.create({
          data: {
            positionId: newPosition.id,
            name: project.name,
            description: project.description ?? "",
          },
        });
      }
    }
  }

  // Add education
  for (const edu of education) {
    await prisma.education.create({
      data: {
        userId,
        school: edu.school,
        degree: edu.degree,
        dateAwarded: new Date(edu.dateAwarded),
      },
    });
  }

  return true;
};
