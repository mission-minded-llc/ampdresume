"use client";

import { useEffect, useState } from "react";
import { DemoThemePicker } from "@/app/components/DemoThemePicker";
import { PdfDocumentFrame } from "@/app/components/PdfDocumentFrame";
import { getPdfThemeDefinition, pdfThemeDefinitions, resolvePdfThemeName } from "@/theme";
import { ThemeDefaultPDF } from "@/theme/default/ThemeDefaultPDF";
import { demoSampleForRoute } from "@/theme/demoSample";
import { PdfThemeName } from "@/types";

interface PDFViewProps {
  themeName: string;
}

/**
 * Print demo for one theme route. The example resume stays fixed to the route.
 * The PDF menu starts on that route's print layout, or Classic when the route
 * has no print layout of its own, and can switch layouts immediately.
 *
 * @param themeName Theme slug from the demo URL.
 * @returns The example resume in a PDF layout, with a live PDF theme menu.
 */
export const PDFView = ({ themeName }: PDFViewProps) => {
  const [selectedPdfTheme, setSelectedPdfTheme] = useState<PdfThemeName>(
    resolvePdfThemeName(themeName),
  );

  useEffect(() => {
    setSelectedPdfTheme(resolvePdfThemeName(themeName));
  }, [themeName]);

  const resume = demoSampleForRoute(themeName).data.resume;
  const pdfProps = {
    user: { ...resume.user, displayEmail: null },
    skillsForUser: resume.skillsForUser,
    companies: resume.companies,
    education: resume.education,
    certifications: resume.certifications || [],
    featuredProjects: resume.featuredProjects || [],
  };
  const PdfComponent = getPdfThemeDefinition(selectedPdfTheme).component;
  const options = Object.entries(pdfThemeDefinitions).map(([value, theme]) => ({
    value,
    label: theme.name,
    icon: theme.iconifyIcon,
  }));

  return (
    <>
      <DemoThemePicker
        label="PDF Theme"
        value={selectedPdfTheme}
        options={options}
        onChange={(next) => setSelectedPdfTheme(next as PdfThemeName)}
      />
      <PdfDocumentFrame showDemoTag>
        {selectedPdfTheme === "default" ? (
          <ThemeDefaultPDF {...pdfProps} themeOptions={{ showSkillsInWorkExperience: false }} />
        ) : (
          <PdfComponent {...pdfProps} />
        )}
      </PdfDocumentFrame>
    </>
  );
};
