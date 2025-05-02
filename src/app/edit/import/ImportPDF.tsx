"use client";

import * as Sentry from "@sentry/react";
import * as pdfjsLib from "pdfjs-dist";

import { Box, Typography } from "@mui/material";

import { SectionTitle } from "../components/SectionTitle";
import { useState } from "react"; // Added for state management

interface PDFFile extends File {
  arrayBuffer: () => Promise<ArrayBuffer>;
}

interface TextItem {
  str: string;
  hasEOL: boolean;
  transform: number[];
  width: number;
  height: number;
  fontName: string;
}

interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export const ImportPDF = () => {
  const [extractedText, setExtractedText] = useState<string>(""); // State to store extracted text
  const [error, setError] = useState<string | null>(null);

  const extractTextFromPDF = async (file: PDFFile): Promise<void> => {
    try {
      const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf: pdfjsLib.PDFDocumentProxy = await loadingTask.promise;

      let fullText = "";

      // Iterate through each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page: pdfjsLib.PDFPageProxy = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        let pageText = "";

        // Concatenate the text items into a single string
        for (const item of textContent.items) {
          const textItem = item as TextItem;
          // Check if the item has a string property
          if (textItem?.str?.length > 0) {
            pageText += textItem.str + " ";
          }
        }

        // Remove extra spaces and newlines
        pageText = pageText.replace(/\s+/g, " ").trim();

        // Remove any non-ASCII characters.
        pageText = pageText.replace(/[^\x00-\x7F]/g, "");

        fullText += pageText;
      }

      // Ensure the text's maximum length is 10000 characters.
      fullText = fullText.slice(0, 10000);

      setExtractedText(fullText);
    } catch (err: unknown) {
      Sentry.captureException(err); // Capture the error with Sentry
      setError("Error extracting text from PDF. Please try again or use a different file.");
    }
  };

  const handleFileUpload = (event: FileUploadEvent): void => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file as PDFFile);
    }
  };

  return (
    <>
      <SectionTitle title="Import from PDF" />

      <Box sx={{ mb: 4 }}>
        <Typography>
          Do you have a PDF resume that you want to import? Upload it here and we will extract the
          information for you. Please note that the extraction may not be perfect, and you may need
          to review and edit the information after import.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        <Typography variant="h6">Upload PDF</Typography>
        <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        <Typography variant="body2" color="textSecondary">
          Please upload a PDF file. The file size should not exceed 5MB.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        <Typography variant="h6">Extracted Information</Typography>
        <Typography variant="body2" color="textSecondary">
          The extracted information will be displayed here after the file is processed. Please
          review and edit the information as needed.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            padding: 2,
          }}
        >
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Typography component="pre">{extractedText || "No text extracted yet."}</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
