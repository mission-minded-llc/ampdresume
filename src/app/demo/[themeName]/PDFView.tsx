"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { Html2PdfFn, loadHtml2Pdf } from "@/lib/loadHtml2Pdf";
import { ThemeDefaultPDF } from "@/theme/default/ThemeDefaultPDF";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { ThemeName } from "@/types";

interface PDFViewProps {
  themeName: ThemeName;
}

export const PDFView = ({ themeName }: PDFViewProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [html2pdf, setHtml2pdf] = useState<Html2PdfFn | null>(null);

  useEffect(() => {
    // Wrap the function so React stores it instead of treating it as a setState updater.
    loadHtml2Pdf().then((html2pdfFn) => setHtml2pdf(() => html2pdfFn));
  }, []);

  const handleGeneratePdf = () => {
    if (!pdfRef.current || !html2pdf) return;

    const options = {
      margin: [0.75, 0.75, 0.75, 0.75], // top, right, bottom, left
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf()
      .from(pdfRef.current)
      .set(options)
      .outputPdf("bloburl")
      .then((pdfUrl: string) => {
        window.open(pdfUrl, "_blank");
      });
  };

  const PDFViewThemeTemplate = () => {
    switch (themeName) {
      case "davids":
      case "default":
      default:
        return (
          <ThemeDefaultPDF
            user={{ ...themeDefaultSampleData.data.resume.user, displayEmail: null }}
            skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
            companies={themeDefaultSampleData.data.resume.companies}
            education={themeDefaultSampleData.data.resume.education}
            certifications={themeDefaultSampleData.data.resume.certifications || []}
            featuredProjects={themeDefaultSampleData.data.resume.featuredProjects || []}
            themeOptions={{ showSkillsInWorkExperience: false }}
          />
        );
    }
  };

  return (
    <Box sx={{ color: "#000", pb: 12 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
        <Button onClick={handleGeneratePdf} variant="contained" disabled={!html2pdf}>
          Generate PDF
        </Button>
      </Box>
      <Box
        sx={{
          padding: "0.75in",
          width: "8.5in",
          minHeight: "11in",
          margin: "auto",
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Box ref={pdfRef}>
          <PDFViewThemeTemplate />
        </Box>
      </Box>
    </Box>
  );
};
