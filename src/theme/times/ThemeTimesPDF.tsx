"use client";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import { PdfLayoutContext } from "@/theme/default/components/pdf/pdfLayout";
import { Certifications } from "@/theme/default/components/pdf/Certifications";
import { Education } from "@/theme/default/components/pdf/Education";
import { FeaturedProjects } from "@/theme/default/components/pdf/FeaturedProjects";
import { ProfessionalSummary } from "@/theme/default/components/pdf/ProfessionalSummary";
import { Skills } from "@/theme/default/components/pdf/Skills";
import { WorkExperience } from "@/theme/default/components/pdf/WorkExperience";
import { PdfThemeProps } from "@/types";
import { Header } from "./components/pdf/Header";
import { TIMES_FONT_FAMILY, timesPdfLayout } from "./pdfLayout";

const timesTheme = createTheme({
  typography: {
    fontFamily: TIMES_FONT_FAMILY,
    allVariants: {
      color: timesPdfLayout.ink,
    },
  },
  palette: {
    text: {
      primary: timesPdfLayout.ink,
    },
    divider: timesPdfLayout.ink,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: timesPdfLayout.ink,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "& a": {
            color: timesPdfLayout.ink,
          },
        },
      },
    },
  },
});

/**
 * Print layout that follows Classic's single-column sections with a
 * traditional Times serif treatment.
 */
export const ThemeTimesPDF = ({
  user,
  skillsForUser,
  companies,
  education,
  certifications,
  featuredProjects,
}: PdfThemeProps) => (
  <ThemeProvider theme={timesTheme}>
    <PdfLayoutContext.Provider value={timesPdfLayout}>
      <Box
        data-testid="pdf-theme-times"
        sx={{
          padding: 0,
          lineHeight: 1.45,
          fontFamily: TIMES_FONT_FAMILY,
          color: timesPdfLayout.ink,
          letterSpacing: 0,
        }}
      >
        <Header user={user} />
        <ProfessionalSummary user={user} />
        <Skills skillsForUser={skillsForUser} />
        <WorkExperience companies={companies} showSkills />
        <FeaturedProjects featuredProjects={featuredProjects} />
        <Education education={education} />
        <Certifications certifications={certifications} />
      </Box>
    </PdfLayoutContext.Provider>
  </ThemeProvider>
);
