"use client";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import { PdfLayoutContext } from "@/theme/default/components/pdf/pdfLayout";
import { FeaturedProjects } from "@/theme/default/components/pdf/FeaturedProjects";
import { ProfessionalSummary } from "@/theme/default/components/pdf/ProfessionalSummary";
import { Skills } from "@/theme/default/components/pdf/Skills";
import { PdfThemeProps } from "@/types";
import { Certifications } from "./components/pdf/Certifications";
import { Education } from "./components/pdf/Education";
import { Experience } from "./components/pdf/Experience";
import { Header } from "./components/pdf/Header";
import { LEGAL_FONT_FAMILY } from "./styles";
import { LEGAL_PDF_INK, legalPdfLayout } from "./pdfLayout";

const legalPdfTheme = createTheme({
  typography: {
    fontFamily: LEGAL_FONT_FAMILY,
    allVariants: {
      color: LEGAL_PDF_INK,
    },
  },
  palette: {
    text: {
      primary: LEGAL_PDF_INK,
    },
    divider: LEGAL_PDF_INK,
    info: {
      main: LEGAL_PDF_INK,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: LEGAL_PDF_INK,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "& a": {
            color: LEGAL_PDF_INK,
          },
        },
      },
    },
  },
});

/**
 * Black-letter print resume: a centered letterhead, credentials before experience,
 * and a two-column docket. Print stays in ink on white and ignores the site appearance.
 *
 * @param user Profile shown in the letterhead and summary.
 * @param skillsForUser Skills listed after experience.
 * @param companies Employers and roles in the experience docket.
 * @param education Degrees, placed before experience.
 * @param certifications Credentials listed after education.
 * @param featuredProjects Selected work after the skills list.
 * @returns The legal PDF document.
 */
export const ThemeLegalPDF = ({
  user,
  skillsForUser,
  companies,
  education,
  certifications,
  featuredProjects,
}: PdfThemeProps) => (
  <ThemeProvider theme={legalPdfTheme}>
    <PdfLayoutContext.Provider value={legalPdfLayout}>
      <Box
        data-testid="pdf-theme-legal"
        sx={{
          padding: 0,
          lineHeight: 1.4,
          fontFamily: LEGAL_FONT_FAMILY,
          color: LEGAL_PDF_INK,
          letterSpacing: 0,
          "& p:not([data-pdf-keep-with-next])": {
            textAlign: "justify",
            hyphens: "auto",
          },
        }}
      >
        <Header user={user} />
        <ProfessionalSummary user={user} />
        <Education education={education} />
        <Certifications certifications={certifications} />
        <Experience companies={companies} />
        <Skills skillsForUser={skillsForUser} />
        <FeaturedProjects featuredProjects={featuredProjects} />
      </Box>
    </PdfLayoutContext.Provider>
  </ThemeProvider>
);
