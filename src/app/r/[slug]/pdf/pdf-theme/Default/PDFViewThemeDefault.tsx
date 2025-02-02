"use client";

import { Box } from "@mui/material";
import { Company } from "@/graphql/getCompanies";
import { Education } from "./sections/Education";
import { Education as EducationType } from "@/graphql/getEducation";
import { Header } from "./sections/Header";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import React from "react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { Skills } from "./sections/Skills";
import { User } from "@prisma/client";
import { WorkExperience } from "./sections/WorkExperience";

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUserWithSkill[];
  companies: Company[];
  positionsWithSkillsForProjects: PositionWithSkillsForProjects[];
  education: EducationType[];
}

export const PDFViewThemeDefault = ({
  user,
  skillsForUser,
  companies,
  positionsWithSkillsForProjects,
  education,
}: PDFViewProps) => (
  <Box
    sx={{
      padding: 3,
      pb: "1in",
      lineHeight: 1.5,
      fontFamily: "Arial",
      color: "#000",
      letterSpacing: 0,
    }}
  >
    <Header user={user} />
    <Skills skillsForUser={skillsForUser} />
    <WorkExperience
      companies={companies}
      positionsWithSkillsForProjects={positionsWithSkillsForProjects}
    />
    <Education education={education} />
  </Box>
);
