import { ResumeData } from "openresume-theme/dist/exports";
import { formatLongDate } from "@/lib/format";

export const parseResumeToText = (resume: ResumeData) => {
  const { companies } = resume;

  const companiesText = companies
    .map((company) => {
      let companyText = company.name;

      company?.positions?.forEach((position) => {
        companyText += `\n${position.title}\n${formatLongDate(position.startDate)} - ${formatLongDate(position.endDate)}\n\n`;

        position?.projects?.forEach((project) => {
          companyText += `- ${project.name}\n`;
        });
      });

      return companyText;
    })
    .join("\n");

  return companiesText;
};
