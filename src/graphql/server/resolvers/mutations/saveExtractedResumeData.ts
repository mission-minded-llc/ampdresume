import { ExtractedCompany, ExtractedEducation, ExtractedUser } from "@/app/edit/import/types";

import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const saveExtractedResumeData = async (
  _: string,
  {
    userId,
    user,
    skills,
    companies,
    education,
  }: {
    userId: string;
    user: ExtractedUser;
    skills: string[];
    companies: ExtractedCompany[];
    education: ExtractedEducation[];
  },
) => {
  await verifySessionOwnership(userId);

  // Start a transaction to ensure all operations succeed or fail together
  await prisma.$transaction(async (tx) => {
    // Delete existing data
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

    // Update user data
    await tx.user.update({
      where: { id: userId },
      data: {
        name: user.name,
        email: user.email,
        location: user.location,
        title: user.title,
      },
    });

    // Add skills
    for (const skillName of skills) {
      // Find or create skill
      let skill = await tx.skill.findFirst({
        where: { name: skillName },
      });

      if (!skill) {
        skill = await tx.skill.create({
          data: { name: skillName },
        });
      }

      // Add skill for user
      await tx.skillForUser.create({
        data: {
          userId,
          skillId: skill.id,
          yearStarted: new Date().getFullYear(),
          totalYears: 1,
        },
      });
    }

    // Add companies and their positions/projects
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

    // Add education
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
