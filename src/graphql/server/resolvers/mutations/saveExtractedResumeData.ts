import { ExtractedCompany, ExtractedEducation } from "@/app/edit/import/types";

import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

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
  },
) => {
  await verifySessionOwnership(userId);

  // Transaction 1: Clean up existing data
  await prisma.$transaction(async (tx) => {
    await tx.skillForProject.deleteMany({
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

    await tx.project.deleteMany({
      where: {
        position: {
          company: {
            userId,
          },
        },
      },
    });

    await tx.position.deleteMany({
      where: {
        company: {
          userId,
        },
      },
    });

    await tx.company.deleteMany({
      where: {
        userId,
      },
    });

    await tx.education.deleteMany({
      where: {
        userId,
      },
    });

    await tx.skillForUser.deleteMany({
      where: {
        userId,
      },
    });
  });

  // Transaction 2: Update user and add skills
  await prisma.$transaction(async (tx) => {
    // Update user data
    await tx.user.update({
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
      const skill = await tx.skill.findFirst({
        where: { id },
      });

      if (!skill) {
        throw new Error(`Skill with id ${id} not found`);
      }

      await tx.skillForUser.create({
        data: {
          userId,
          skillId: skill.id,
          yearStarted: new Date().getFullYear(),
        },
      });
    }
  });

  // Transaction 3: Add companies, positions, and projects
  await prisma.$transaction(async (tx) => {
    for (const company of companies) {
      const newCompany = await tx.company.create({
        data: {
          userId,
          name: company.name,
          location: company.location,
          startDate: new Date(company.startDate),
          endDate: company.endDate ? new Date(company.endDate) : null,
        },
      });

      for (const position of company.positions ?? []) {
        const newPosition = await tx.position.create({
          data: {
            companyId: newCompany.id,
            title: position.title,
            startDate: new Date(position.startDate),
            endDate: position.endDate ? new Date(position.endDate) : null,
          },
        });

        for (const project of position.projects ?? []) {
          await tx.project.create({
            data: {
              positionId: newPosition.id,
              name: project.name,
              description: project.description ?? "",
            },
          });
        }
      }
    }
  });

  // Transaction 4: Add education
  await prisma.$transaction(async (tx) => {
    for (const edu of education) {
      await tx.education.create({
        data: {
          userId,
          school: edu.school,
          degree: edu.degree,
          dateAwarded: new Date(edu.dateAwarded),
        },
      });
    }
  });

  return true;
};
