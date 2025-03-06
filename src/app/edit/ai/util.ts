import { ResumeData } from "openresume-theme/dist/exports";
import { formatLongDate } from "@/lib/format";
import { groupSkillsForUserByYearExperience } from "openresume-theme";

export const parseResumeToText = (resume: ResumeData) => {
  const { skillsForUser, companies } = resume;

  const skillsForUserByYearExperience = groupSkillsForUserByYearExperience(skillsForUser);

  let skillsText = "";
  for (const [yearExperience, skills] of skillsForUserByYearExperience) {
    skillsText += `${yearExperience} year${parseInt(yearExperience, 10) > 1 ? "s" : ""}: `;
    skillsText += skills.map((skill) => `${skill.skill.name}`).join(", ") + "\n";
  }

  const companiesText = companies
    .map((company) => {
      let companyText = "";
      companyText += company.name + "\n";

      company?.positions?.forEach((position) => {
        companyText += `\n${position.title}\n${formatLongDate(position.startDate)} - ${formatLongDate(position.endDate)}\n\n`;

        position?.projects?.forEach((project) => {
          companyText += `- ${project.name}\n`;
        });
      });

      return companyText;
    })
    .join("\n");

  return `Skills:\n\n${skillsText}\n\nProfessional Experience:\n\n${companiesText}`;
};
