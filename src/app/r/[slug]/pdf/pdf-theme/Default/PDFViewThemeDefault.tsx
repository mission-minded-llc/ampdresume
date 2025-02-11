"use client";

import { Box } from "@mui/material";
import { CompanyWithPositionsWithProjectsWithSkills } from "@/graphql/getCompanies";
import { Education } from "./sections/Education";
import { Education as EducationType } from "@/graphql/getEducation";
import { Header } from "./sections/Header";
import React from "react";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { Skills } from "./sections/Skills";
import { User } from "@prisma/client";
import { WorkExperience } from "./sections/WorkExperience";

interface PDFViewThemeDefaultOptions {
  showSkillsInWorkExperience: boolean;
}

const defaultThemeOptions: PDFViewThemeDefaultOptions = {
  showSkillsInWorkExperience: true,
};

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUserWithSkill[];
  companies: CompanyWithPositionsWithProjectsWithSkills[];
  education: EducationType[];
  themeOptions?: PDFViewThemeDefaultOptions;
}

export const PDFViewThemeDefault = ({
  user,
  skillsForUser,
  companies,
  education,
  themeOptions = defaultThemeOptions,
}: PDFViewProps) => {
  const options = { ...defaultThemeOptions, ...themeOptions };

  return (
    <Box
      sx={{
        padding: 0,
        lineHeight: 1.5,
        fontFamily: "Arial",
        color: "#000",
        letterSpacing: 0,
      }}
    >
      <Header user={user} />
      <Skills skillsForUser={skillsForUser} />
      <WorkExperience companies={companies} showSkills={options.showSkillsInWorkExperience} />
      <Education education={education} />
    </Box>
  );
};
