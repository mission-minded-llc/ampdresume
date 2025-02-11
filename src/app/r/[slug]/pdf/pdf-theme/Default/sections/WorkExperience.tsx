import { Box, Divider, Typography } from "@mui/material";
import { Section, SectionSubtitle, SectionTitle, fontSize } from "../styled";

import { CompanyWithPositionsWithProjectsWithSkills } from "@/graphql/getCompanies";
import { formatLongDate } from "@/lib/format";

interface SectionWorkExperienceProps {
  companies: CompanyWithPositionsWithProjectsWithSkills[];
  showSkills: boolean;
}

export const WorkExperience = ({ companies, showSkills }: SectionWorkExperienceProps) => {
  return (
    <Section>
      <SectionTitle>Work Experience</SectionTitle>
      {companies.map((company) => (
        <Box key={company.id} sx={{ mb: 2 }}>
          <SectionSubtitle>
            {company.name}
            <span style={{ fontWeight: "normal" }}>
              {company?.location ? ` - ${company.location}` : ""}
            </span>
          </SectionSubtitle>
          <Divider />
          {company?.positions.map((position) => {
            return (
              <Box key={position.id} sx={{ mb: 2 }}>
                <SectionSubtitle>
                  {position.title}
                  <Typography component="span" variant="body2" sx={{ fontSize: fontSize.subtitle }}>
                    {" "}
                    &mdash; {formatLongDate(position.startDate)} to{" "}
                    {position?.endDate ? formatLongDate(position.endDate) : "present"}
                  </Typography>
                </SectionSubtitle>
                {position.projects.map((project, index) => {
                  return (
                    <Typography
                      key={project.id}
                      sx={{
                        pl: 2,
                        fontSize: fontSize.body,
                        mt: index === 0 ? 0.5 : 0.1,
                        "&:before": {
                          content: '"\\2022"',
                          paddingRight: "0.5em",
                          position: "absolute",
                          marginTop: "-0.1em",
                          marginLeft: "-0.5em",
                        },
                      }}
                    >
                      {project.name}{" "}
                      {showSkills && project.skillsForProject.length > 0 ? (
                        <>
                          {project.skillsForProject.map((skill, index) => (
                            <Typography
                              key={skill.skillForUser.skill.name}
                              component="span"
                              sx={{
                                fontSize: fontSize.body,
                                color: "maroon",
                              }}
                            >
                              {skill.skillForUser.skill.name}
                              {index < project.skillsForProject.length - 1 ? ", " : ""}
                            </Typography>
                          ))}
                        </>
                      ) : null}
                    </Typography>
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
