import { Box, Divider, Typography } from "@mui/material";
import { Section, SectionSubtitle, SectionTitle } from "../styled";

import { Company } from "@/graphql/getCompanies";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { formatLongDate } from "@/lib/format";

interface SectionWorkExperienceProps {
  companies: Company[];
  positionsWithSkillsForProjects: PositionWithSkillsForProjects[];
}

export const WorkExperience = ({
  companies,
  positionsWithSkillsForProjects,
}: SectionWorkExperienceProps) => {
  return (
    <Section>
      <SectionTitle>Work Experience</SectionTitle>
      {companies.map((company) => {
        const positions = positionsWithSkillsForProjects.filter(
          (position) => position.company.id === company.id && position.title !== null,
        );

        return (
          <Box key={company.id} sx={{ mb: 2 }}>
            <SectionSubtitle>{company.name}</SectionSubtitle>
            <Divider />
            {positions.map((position) => {
              return (
                <Box key={position.id} sx={{ mb: 2 }}>
                  <SectionSubtitle>
                    {position.title}
                    <Typography component="span" variant="body2">
                      {" "}
                      &mdash; {formatLongDate(position.startDate)} to{" "}
                      {position?.endDate ? formatLongDate(position.endDate) : "present"}
                    </Typography>
                  </SectionSubtitle>
                  {position.projects.map((project) => {
                    return (
                      <Typography
                        key={project.id}
                        sx={{
                          pl: 2,
                          fontSize: 14,
                          mt: 0.5,
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
                        {project.skillsForProject.length > 0 ? (
                          <>
                            {project.skillsForProject.map((skill, index) => (
                              <Typography
                                key={skill.skillForUser.skill.name}
                                component="span"
                                sx={{
                                  fontSize: 14,
                                  color: "#666",
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
        );
      })}
    </Section>
  );
};
