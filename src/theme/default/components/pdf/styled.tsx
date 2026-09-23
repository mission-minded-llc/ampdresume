import React from "react";
import { Box, Typography } from "@mui/material";
import { classicPdfLayout, usePdfLayout } from "./pdfLayout";

export const fontSize = classicPdfLayout.fontSize;

export const Section = ({ children }: { children: React.ReactNode }) => {
  const { sectionSx } = usePdfLayout();
  return <Box sx={sectionSx}>{children}</Box>;
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const { sectionTitleSx } = usePdfLayout();
  return <Typography sx={sectionTitleSx}>{children}</Typography>;
};

export const SectionSubtitle = ({ children }: { children: React.ReactNode }) => {
  const { sectionSubtitleSx } = usePdfLayout();
  return <Typography sx={sectionSubtitleSx}>{children}</Typography>;
};
