import { PdfLayout } from "@/theme/default/components/pdf/pdfLayout";

export const TIMES_FONT_FAMILY = '"Times New Roman", Times, "Liberation Serif", Georgia, serif';

/**
 * Classic single-column structure with a more formal serif treatment:
 * smaller letter-spaced section titles, italic company names, and a deep ink color.
 */
export const timesPdfLayout: PdfLayout = {
  fontFamily: TIMES_FONT_FAMILY,
  fontSize: {
    body: 11.5,
    title: 13,
    subtitle: 13,
  },
  ink: "#1c1917",
  skillColor: "#5c1a1a",
  sectionSx: { mt: 2.5 },
  sectionTitleSx: {
    mb: 1,
    pb: 0.4,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    borderBottom: "1px solid #1c1917",
  },
  sectionSubtitleSx: {
    fontSize: 13,
    fontWeight: 700,
    fontStyle: "italic",
  },
};
