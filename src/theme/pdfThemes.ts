import { PdfThemeDefinition, PdfThemeName } from "@/types";
import { ThemeDefaultPDF } from "./default/ThemeDefaultPDF";

export const DEFAULT_PDF_THEME_NAME: PdfThemeName = "default";

/**
 * PDF views are registered independently from interactive web themes.
 * A resume owner can pick any published PDF view for job-application exports
 * without changing the public web theme visitors see.
 */
export const pdfThemeDefinitions: Record<PdfThemeName, PdfThemeDefinition> = {
  default: {
    name: "Classic",
    published: true,
    component: ThemeDefaultPDF,
    description:
      "A print-optimized single-column resume for job applications. Independent from the interactive web theme.",
    iconifyIcon: "fluent-emoji-flat:high-voltage",
    authors: [
      {
        name: "Michael R. Dinerstein",
        gitHubUrl: "https://github.com/missionmike",
        linkedInUrl: "https://www.linkedin.com/in/michaeldinerstein/",
      },
    ],
  },
};

export const isPdfThemeName = (name: string | null | undefined): name is PdfThemeName =>
  Boolean(name && name in pdfThemeDefinitions);

export const resolvePdfThemeName = (name: string | null | undefined): PdfThemeName =>
  isPdfThemeName(name) ? name : DEFAULT_PDF_THEME_NAME;

export const getPdfThemeDefinition = (name: string | null | undefined): PdfThemeDefinition =>
  pdfThemeDefinitions[resolvePdfThemeName(name)];
