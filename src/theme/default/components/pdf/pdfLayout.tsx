import { createContext, useContext } from "react";
import { SxProps, Theme } from "@mui/material";

export type PdfLayout = {
  fontFamily: string;
  fontSize: {
    body: number;
    title: number;
    subtitle: number;
  };
  ink: string;
  skillColor: string;
  sectionSx: SxProps<Theme>;
  sectionTitleSx: SxProps<Theme>;
  sectionSubtitleSx: SxProps<Theme>;
};

/**
 * Visual tokens for the Classic PDF view. Other PDF themes can provide a
 * different layout through PdfLayoutContext without rewriting the sections.
 */
export const classicPdfLayout: PdfLayout = {
  fontFamily: "Arial",
  fontSize: {
    body: 12,
    title: 16,
    subtitle: 14,
  },
  ink: "#000",
  skillColor: "maroon",
  sectionSx: { mt: 2 },
  sectionTitleSx: { mb: 1, fontSize: 16, fontWeight: "bold" },
  sectionSubtitleSx: { fontSize: 14, fontWeight: "bold" },
};

export const PdfLayoutContext = createContext<PdfLayout>(classicPdfLayout);

export const usePdfLayout = () => useContext(PdfLayoutContext);
