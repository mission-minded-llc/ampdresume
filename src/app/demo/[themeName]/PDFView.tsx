"use client";

import { PdfDocumentFrame } from "@/app/components/PdfDocumentFrame";
import { getPdfThemeDefinition, resolvePdfThemeName } from "@/theme";
import { ThemeDefaultPDF } from "@/theme/default/ThemeDefaultPDF";
import { themeDefaultSampleData } from "@/theme/sampleData";

interface PDFViewProps {
  themeName: string;
}

export const PDFView = ({ themeName }: PDFViewProps) => {
  const pdfThemeName = resolvePdfThemeName(themeName);
  const PdfComponent = getPdfThemeDefinition(pdfThemeName).component;
  const resume = themeDefaultSampleData.data.resume;
  const pdfProps = {
    user: { ...resume.user, displayEmail: null },
    skillsForUser: resume.skillsForUser,
    companies: resume.companies,
    education: resume.education,
    certifications: resume.certifications || [],
    featuredProjects: resume.featuredProjects || [],
  };

  return (
    <PdfDocumentFrame showDemoTag>
      {pdfThemeName === "default" ? (
        <ThemeDefaultPDF {...pdfProps} themeOptions={{ showSkillsInWorkExperience: false }} />
      ) : (
        <PdfComponent {...pdfProps} />
      )}
    </PdfDocumentFrame>
  );
};
