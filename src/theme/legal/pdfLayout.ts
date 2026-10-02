import { PdfLayout } from "@/theme/default/components/pdf/pdfLayout";
import { LEGAL_FONT_FAMILY } from "./styles";

/** Print ink. Legal resumes are filed in black, so the PDF does not follow the site appearance. */
export const LEGAL_PDF_INK = "#1a1814";

/**
 * Black-letter print tokens: Times, centered small-cap captions, and oxford rules
 * in place of Classic's bold left-aligned headings.
 */
export const legalPdfLayout: PdfLayout = {
  fontFamily: LEGAL_FONT_FAMILY,
  fontSize: {
    body: 11,
    title: 12,
    subtitle: 12,
  },
  ink: LEGAL_PDF_INK,
  skillColor: LEGAL_PDF_INK,
  sectionSx: { mt: 2.25 },
  sectionTitleSx: {
    mb: 1.25,
    py: 0.6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    textAlign: "center",
    color: LEGAL_PDF_INK,
    borderTop: `3px solid ${LEGAL_PDF_INK}`,
    borderBottom: `1px solid ${LEGAL_PDF_INK}`,
  },
  sectionSubtitleSx: {
    fontSize: 12,
    fontWeight: 700,
  },
};
