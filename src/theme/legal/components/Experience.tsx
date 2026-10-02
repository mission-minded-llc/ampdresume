import { Box } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import { Company, Project } from "@/types";
import { firmLineTrailing, formatTenure } from "../tenure";
import { DocketLine } from "./DocketLine";

/**
 * Skill names cited on a single engagement, in resume order.
 *
 * @param project Engagement whose skills should be cited.
 * @returns Skill names that have a label. Unnamed skills are omitted.
 */
const projectSkillNames = (project: Project): string[] =>
  (project.skillsForProject ?? [])
    .map((skill) => skill.skillForUser?.skill?.name)
    .filter((name): name is string => Boolean(name));

/**
 * Experience as a docket: firm and office on one line, italic title and tenure
 * on the next, then each engagement as a bullet.
 *
 * @param companies Employers and roles from the resume.
 * @returns The experience section, or nothing when there are no employers.
 */
export const Experience = ({ companies }: { companies: Company[] }) => {
  if (!companies?.length) return null;

  return (
    <Box component="section">
      <ResumeTitle>Experience</ResumeTitle>
      {companies.map((company) => (
        <Box key={company.id} sx={{ mt: 2.5 }}>
          <DocketLine primary={company.name} trailing={firmLineTrailing(company)} emphasize />
          {company.description ? (
            <Box sx={{ mt: 0.5, color: "text.secondary" }}>
              <RichTextBlock content={company.description} />
            </Box>
          ) : null}
          {company.positions?.map((position) => (
            <Box key={position.id} sx={{ mt: 1.5 }}>
              <DocketLine
                primary={
                  <Box component="span" sx={{ fontStyle: "italic" }}>
                    {position.title}
                  </Box>
                }
                trailing={formatTenure(position.startDate, position.endDate)}
              />
              {position.projects?.map((project) => {
                const skillNames = projectSkillNames(project);

                return (
                  <Box key={project.id} sx={{ display: "flex", gap: 1, mt: 0.75, pl: 0.5 }}>
                    <Box component="span" aria-hidden="true" sx={{ flexShrink: 0 }}>
                      {"\u2022"}
                    </Box>
                    <Box>
                      {project.name}
                      {skillNames.length > 0 ? (
                        <Box component="span" sx={{ fontStyle: "italic", color: "text.secondary" }}>
                          {" "}
                          ({skillNames.join(", ")})
                        </Box>
                      ) : null}
                      {project.description ? (
                        <Box sx={{ mt: 0.5 }}>
                          <RichTextBlock content={project.description} />
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
