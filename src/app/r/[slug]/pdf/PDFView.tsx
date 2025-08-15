"use client";

import { Company, Education, SkillForUser, User } from "@/types";
import { themeDefinitions } from "@/theme";
import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}

export const PDFView = ({
  user,
  skillsForUser,
  companies,
  education,
}: PDFViewProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [html2pdf, setHtml2pdf] = useState<typeof import("html2pdf.js") | null>(
    null
  );

  useEffect(() => {
    // Dynamically import html2pdf only on the client side
    import("html2pdf.js").then((module) => {
      setHtml2pdf(() => module.default);
    });
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

  const ThemeDefaultPDF = themeDefinitions.default.pdfComponent;

  return (
    <Box sx={{ color: "#000", pb: 12 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
        <Button
          onClick={handleGeneratePdf}
          variant="contained"
          disabled={!html2pdf}
        >
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
