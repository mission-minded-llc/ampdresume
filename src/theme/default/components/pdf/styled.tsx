import React from "react";
import { Box, Typography } from "@mui/material";
import { classicPdfLayout, usePdfLayout } from "./pdfLayout";

export const fontSize = classicPdfLayout.fontSize;

export const Section = ({ children }: { children: React.ReactNode }) => {
  const { sectionSx } = usePdfLayout();
  return (
    <Box sx={sectionSx} data-pdf-section="">
      {children}
    </Box>
  );
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const { sectionTitleSx } = usePdfLayout();
  return (
    <Typography sx={sectionTitleSx} data-pdf-unit="" data-pdf-keep-with-next="true">
      {children}
    </Typography>
  );
};

export const SectionSubtitle = ({ children }: { children: React.ReactNode }) => {
  const { sectionSubtitleSx } = usePdfLayout();
  return <Typography sx={sectionSubtitleSx}>{children}</Typography>;
};
