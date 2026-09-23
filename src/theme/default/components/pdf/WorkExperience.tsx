import { Box, Divider, Typography } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { Company } from "@/types";
import { usePdfLayout } from "./pdfLayout";
import { Section, SectionSubtitle, SectionTitle } from "./styled";

interface SectionWorkExperienceProps {
  companies: Company[];
  showSkills: boolean;
}

export const WorkExperience = ({ companies, showSkills }: SectionWorkExperienceProps) => {
  const { fontSize, skillColor } = usePdfLayout();

  return (
    <Section>
      <SectionTitle>Work Experience</SectionTitle>
      {companies.map((company, companyIndex) => (
        <Box key={company.id} sx={{ mb: 2 }} data-testid={`company-${companyIndex}`}>
          <Box
            data-pdf-unit=""
            data-pdf-keep-with-next={company.positions?.length ? "true" : undefined}
          >
            <SectionSubtitle>
              {company.name}
              <span style={{ fontWeight: "normal" }}>
                {company?.location ? ` - ${company.location}` : ""}
              </span>
            </SectionSubtitle>
            <Divider sx={{ my: 0.75 }} />
          </Box>
          {company?.positions?.map((position, positionIndex) => {
            return (
              <Box
                key={position.id}
                sx={{ mb: 2 }}
                data-testid={`company-${companyIndex}-position-${positionIndex}`}
              >
                <Box
                  data-pdf-unit=""
                  data-pdf-keep-with-next={position.projects?.length ? "true" : undefined}
                >
                  <SectionSubtitle>
                    {position.title}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ fontSize: fontSize.subtitle }}
                    >
                      {" "}
                      &mdash; {formatLongDate(position.startDate)} to{" "}
                      {position?.endDate ? formatLongDate(position.endDate) : "present"}
                    </Typography>
                  </SectionSubtitle>
                </Box>
                {position?.projects?.map((project, projectIndex) => {
                  return (
                    <Box
                      key={project.id}
                      data-pdf-unit=""
                      data-testid={`company-${companyIndex}-position-${positionIndex}-project-${projectIndex}`}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        columnGap: "0.45em",
                        pl: 1,
                        fontSize: fontSize.body,
                        mt: projectIndex === 0 ? 0.5 : 0.1,
                      }}
                    >
                      <Box component="span" aria-hidden sx={{ flexShrink: 0, lineHeight: 1.5 }}>
                        {"\u2022"}
                      </Box>
                      <Typography
                        component="span"
                        sx={{ fontSize: fontSize.body, lineHeight: 1.5 }}
                      >
                        {project.name}{" "}
                        {showSkills && project.skillsForProject.length > 0 ? (
                          <>
                            {project.skillsForProject.map((skill, skillIndex) => (
                              <Typography
                                key={skill.skillForUser.skill.name}
                                component="span"
                                sx={{
                                  fontSize: fontSize.body,
                                  color: skillColor,
                                }}
                              >
                                {skill.skillForUser.skill.name}
                                {skillIndex < project.skillsForProject.length - 1 ? ", " : ""}
                              </Typography>
                            ))}
                          </>
                        ) : null}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      ))}
    </Section>
  );
};
