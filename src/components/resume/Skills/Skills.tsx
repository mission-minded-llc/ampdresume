"use client";

import { Box, Button } from "@mui/material";
import React, { MouseEvent, useState } from "react";

import { ResumeContext } from "../ResumeContext";
import { SkillType } from "@/graphql/getSkills";
import { SkillsCloud } from "./SkillsCloud";
import { SkillsExperience } from "./SkillsExperience";
import { useContext } from "react";

export const Skills = ({ skillType }: { skillType: SkillType }) => {
  const { skillsForUser } = useContext(ResumeContext);

  const [skillsLayout, setSkillsLayout] = useState<"experience" | "cloud">("experience");

  const toggleSkillsLayout = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target;

    if (!(target instanceof HTMLButtonElement)) return;

    const layout = target.dataset.layout;

    if (!layout || (layout !== "experience" && layout !== "cloud")) return;

    setSkillsLayout(layout);
  };

  return (
    <section>
      <Box>
        Group by:{" "}
        <Button
          data-active={skillsLayout === "experience"}
          data-layout="experience"
          onClick={toggleSkillsLayout}
          color={skillsLayout === "experience" ? "primary" : "secondary"}
        >
          Experience
        </Button>{" "}
        |{" "}
        <Button
          data-active={skillsLayout === "cloud"}
          data-layout="cloud"
          onClick={toggleSkillsLayout}
          color={skillsLayout === "cloud" ? "primary" : "secondary"}
        >
          Cloud
        </Button>
      </Box>
      {skillsLayout === "experience" ? (
        <SkillsExperience skills={skillsForUser} skillType={skillType} />
      ) : (
        <SkillsCloud skills={skillsForUser} skillType={skillType} />
      )}
    </section>
  );
};
