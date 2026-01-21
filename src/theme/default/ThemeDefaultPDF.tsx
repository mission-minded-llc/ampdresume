"use client";

import { Box } from "@mui/material";
import {
  Certification,
  Company,
  Education as EducationType,
  FeaturedProject,
  SkillForUser,
  User,
} from "@/types";
import { Certifications } from "./components/pdf/Certifications";
import { Education } from "./components/pdf/Education";
import { FeaturedProjects } from "./components/pdf/FeaturedProjects";
import { Header } from "./components/pdf/Header";
import { Skills } from "./components/pdf/Skills";
import { WorkExperience } from "./components/pdf/WorkExperience";
import { MUIThemeProvider } from "./MUIThemeProvider";

interface ThemeDefaultPDFOptions {
  showSkillsInWorkExperience: boolean;
}

const defaultThemeOptions: ThemeDefaultPDFOptions = {
  showSkillsInWorkExperience: true,
};

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
  certifications: Certification[];
  featuredProjects: FeaturedProject[];
  themeOptions?: ThemeDefaultPDFOptions;
}

export const ThemeDefaultPDF = ({
  user,
  skillsForUser,
  companies,
  education,
  certifications,
  featuredProjects,
  themeOptions = defaultThemeOptions,
}: PDFViewProps) => {
  const options = { ...defaultThemeOptions, ...themeOptions };

  return (
    <MUIThemeProvider>
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
        <FeaturedProjects featuredProjects={featuredProjects} />
        <Education education={education} />
        <Certifications certifications={certifications} />
      </Box>
    </MUIThemeProvider>
  );
};
