"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { Html2PdfFn, loadHtml2Pdf } from "@/lib/loadHtml2Pdf";
import { paginatePdfContent } from "@/lib/paginatePdfContent";

export const PdfDocumentFrame = ({ children }: { children: ReactNode }) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [html2pdf, setHtml2pdf] = useState<Html2PdfFn | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Wrap the function so React stores it instead of treating it as a setState updater.
    loadHtml2Pdf().then((html2pdfFn) => setHtml2pdf(() => html2pdfFn));
  }, []);

  const handleGeneratePdf = async () => {
    if (!pdfRef.current || !html2pdf || isGenerating) return;

    setIsGenerating(true);

    const options = {
      margin: [0.75, 0.75, 0.75, 0.75] as [number, number, number, number], // top, right, bottom, left
      filename: "resume.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        onclone: (clonedDoc: Document, clonedElement?: HTMLElement) => {
          const root =
            clonedElement ||
            clonedDoc.querySelector<HTMLElement>(".html2pdf__container") ||
            clonedDoc.body;
          if (root) {
            paginatePdfContent(root);
          }
        },
      },
      jsPDF: { unit: "in", format: "letter" as const, orientation: "portrait" as const },
      // Pagination is planned in onclone so html2pdf does not also move large sections.
      pagebreak: { mode: [] as string[] },
    };

    try {
      const pdfUrl = await html2pdf().from(pdfRef.current).set(options).outputPdf("bloburl");
      window.open(pdfUrl, "_blank");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ color: "#000", pb: 12 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
        <Button
          onClick={handleGeneratePdf}
          variant="contained"
          disabled={!html2pdf || isGenerating}
        >
          {isGenerating ? "Generating PDF..." : "Generate PDF"}
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
        <Box ref={pdfRef}>{children}</Box>
      </Box>
    </Box>
  );
};
