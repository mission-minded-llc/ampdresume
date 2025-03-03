"use client";

import { SkillForUser, groupSkillsForUserByYearExperience } from "@openresume/theme";

import { Box } from "@mui/material";
import React from "react";
import { SkillItem } from "./SkillItem";

export const SkillsExperience = ({ skills }: { skills: SkillForUser[] }) => {
  const skillsExperienceList = groupSkillsForUserByYearExperience(skills);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto",
        width: "100%",
        gap: "5px",
        marginTop: "5px",
      }}
    >
      {skillsExperienceList.map((skillsExperience) => {
        const totalYears = skillsExperience[0];
        const skillsList = skillsExperience[1];

        return (
          <React.Fragment key={`skill-group-${skillsExperience[0]}`}>
            <Box
              sx={{
                fontWeight: "bold",
                padding: "4px 14px 4px 0",
                textAlign: "right",
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
              {skillsList.map((skill) => (
                <SkillItem key={`skill-${skill.skill.name}`} skill={skill as SkillForUser} />
              ))}
            </Box>
          </React.Fragment>
        );
      })}
    </Box>
  );
};
