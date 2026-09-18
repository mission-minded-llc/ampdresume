import React from "react";
import { Box } from "@mui/material";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import { getRetroPalette, sectionSkin } from "../styles";

/**
 * Wraps the shared resume sections (summary, skills, education, certifications,
 * featured projects) so they inherit the 8-bit skin without forking their logic.
 * Theme-specific components style themselves and should not be wrapped.
 */
export const PixelSection = ({ children }: { children: React.ReactNode }) => (
  <Box sx={(theme) => sectionSkin(getRetroPalette(theme.palette.mode))}>{children}</Box>
);

/**
 * The shared section title under the same skin, so theme-specific sections headline
 * identically to the shared ones.
 */
export const PixelSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <PixelSection>
    <ResumeTitle>{children}</ResumeTitle>
  </PixelSection>
);
