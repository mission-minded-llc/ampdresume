import { Box, Typography } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { usePdfLayout } from "@/theme/default/components/pdf/pdfLayout";
import { Section, SectionTitle } from "@/theme/default/components/pdf/styled";
import { Company, Project } from "@/types";
import { firmLineTrailing, formatTenure } from "../../tenure";
import { DocketLine } from "./docket";

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
 * Printed experience docket. A firm line stays with the role beneath it, and a
 * role stays with its first bullet.
 *
 * @param companies Employers and roles from the resume.
 * @returns The experience section, or nothing when there are no employers.
 */
export const Experience = ({ companies }: { companies: Company[] }) => {
  const { fontSize, ink } = usePdfLayout();
  if (!companies?.length) return null;

  return (
    <Section>
      <SectionTitle>Experience</SectionTitle>
      {companies.map((company) => (
        <Box key={company.id} sx={{ mb: 1.5 }}>
          <Box
            data-pdf-unit=""
            data-pdf-keep-with-next={company.positions?.length ? "true" : undefined}
          >
            <DocketLine primary={company.name} trailing={firmLineTrailing(company)} emphasize />
            {company.description ? (
              <Box sx={{ fontSize: fontSize.body, color: ink }}>
                <RichTextBlock content={company.description} />
              </Box>
            ) : null}
          </Box>
          {company.positions?.map((position) => (
            <Box key={position.id}>
              <Box
                data-pdf-unit=""
                data-pdf-keep-with-next={position.projects?.length ? "true" : undefined}
              >
                <DocketLine
                  primary={
                    <Box component="span" sx={{ fontStyle: "italic" }}>
                      {position.title}
                    </Box>
                  }
                  trailing={formatTenure(position.startDate, position.endDate)}
                />
              </Box>
              {position.projects?.map((project) => {
                const skillNames = projectSkillNames(project);

                return (
                  <Box
                    key={project.id}
                    data-pdf-unit=""
                    sx={{
                      display: "flex",
                      gap: 0.75,
                      mt: 0.35,
                      pl: 1.25,
                      fontSize: fontSize.body,
                      color: ink,
                    }}
                  >
                    <Box component="span" aria-hidden="true" sx={{ flexShrink: 0 }}>
                      {"\u2022"}
                    </Box>
                    <Box>
                      {project.name}
                      {skillNames.length > 0 ? (
                        <Typography
                          component="span"
                          sx={{ fontSize: fontSize.body, fontStyle: "italic" }}
                        >
                          {" "}
                          ({skillNames.join(", ")})
                        </Typography>
                      ) : null}
                      {project.description ? <RichTextBlock content={project.description} /> : null}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      ))}
    </Section>
  );
};
