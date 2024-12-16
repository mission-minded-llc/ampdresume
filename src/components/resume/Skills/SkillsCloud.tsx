"use client";

import { Box } from "@mui/material";
import { EditSkillMutation } from "@/app/resume/edit/components/sections/skills/EditSkills";
import React from "react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItem } from "./SkillItem";
import { SkillType } from "@/graphql/getSkills";

export const SkillsCloud = ({
  skills,
  skillType,
  editMutation,
}: {
  skills: SkillForUserWithSkill[];
  skillType: SkillType;
  editMutation?: EditSkillMutation;
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
        <SkillItem
          key={`skill-${skill.skill.name}`}
          skill={skill}
          skillType={skillType}
          editMutation={editMutation}
        />
      ) : null,
    )}
  </Box>
);
