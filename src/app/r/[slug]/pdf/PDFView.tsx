"use client";

import { Company, Education, SkillForUser, User } from "@/types";
import { themeDefinitions } from "@/theme";
import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";

type Html2PdfType = typeof import("html2pdf.js").default;

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}

export const PDFView = ({ user, skillsForUser, companies, education }: PDFViewProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [html2pdf, setHtml2pdf] = useState<Html2PdfType | null>(null);

  useEffect(() => {
    // Dynamically import html2pdf only on the client side
    import("html2pdf.js").then((module) => {
      setHtml2pdf(module.default as Html2PdfType);
    });
  }, []);

  const handleGeneratePdf = () => {
    if (!pdfRef.current || !html2pdf) return;

    const options = {
      margin: [0.75, 0.75, 0.75, 0.75] as [number, number, number, number], // top, right, bottom, left
      filename: "resume.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter" as const, orientation: "portrait" as const },
      pagebreak: { mode: ["avoid-all"] as const },
    };

    html2pdf()
      .from(pdfRef.current)
      .set(options)
      .outputPdf("bloburl")
      .then((pdfUrl: string) => {
        window.open(pdfUrl, "_blank");
      });
  };

  const ThemeDefaultPDF = themeDefinitions.default.pdfComponent;

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
          {ThemeDefaultPDF && (
            <ThemeDefaultPDF
              themeAppearance="light"
              user={user}
              socials={[]}
              skillsForUser={skillsForUser}
              companies={companies}
              education={education}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
