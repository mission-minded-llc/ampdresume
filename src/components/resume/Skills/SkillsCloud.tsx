"use client";

import { Box } from "@mui/material";
import React from "react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItem } from "./SkillItem";
import { SkillType } from "@/graphql/getSkills";

export const SkillsCloud = ({
  skills,
  skillType,
}: {
  skills: SkillForUserWithSkill[];
  skillType: SkillType;
}) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      alignItems: "center",
    }}
  >
    {skills.map((skill) =>
      skill?.skill?.name ? (
        <SkillItem key={`skill-${skill.skill.name}`} skill={skill} skillType={skillType} />
      ) : null,
    )}
  </Box>
);
