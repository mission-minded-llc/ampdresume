import { Box, Typography } from "@mui/material";
import { Section, SectionTitle } from "../styled";

import React from "react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { groupSkillsForUserByYearExperience } from "../../util";

export const Skills = ({ skillsForUser }: { skillsForUser: SkillForUserWithSkill[] }) => {
  const skillsForUserBySkill = groupSkillsForUserByYearExperience(skillsForUser);

  return (
    <Section>
      <SectionTitle>Skills</SectionTitle>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridTemplateRows: "auto",
          width: "100%",
          gap: "5px",
          mb: 3,
        }}
      >
        {skillsForUserBySkill.map((skillsExperience) => {
          const totalYears = skillsExperience[0];
          const skillsList = skillsExperience[1];

          return (
            <React.Fragment key={`skill-group-${skillsExperience[0]}`}>
              <Box
                sx={{
                  fontWeight: "bold",
                  textAlign: "right",
                  pr: 1,
                  fontSize: 14,
                }}
              >
                {totalYears ? `${totalYears} year${parseInt(totalYears, 10) > 1 ? "s" : ""}:` : ""}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                {skillsList.map((skill, index) => (
                  <Typography key={`skill-${skill.skill.name}`} sx={{ fontSize: 14 }}>
                    {skill.skill.name}
                    {index < skillsList.length - 1 ? "," : ""}
                  </Typography>
                ))}
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Section>
  );
};
