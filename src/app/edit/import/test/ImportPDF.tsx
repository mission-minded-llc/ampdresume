"use client";

import * as pdfjsLib from "pdfjs-dist";

import { useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

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

const extractTextFromPDF = async (file: PDFFile): Promise<string> => {
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

      return fullText;
    }
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error("Error extracting text from PDF:", err);
  }

  return "";
};

const fetchSampleFile = async (): Promise<File> => {
  const response = await fetch("/sample-resume-v1.pdf");
  const blob = await response.blob();
  return new File([blob], "sampleResume.pdf", { type: "application/pdf" });
};

export const ImportPDF = () => {
  const [extractedText, setExtractedText] = useState<string>(""); // State to store extracted text

  (async () => {
    const sampleFileInstance = await fetchSampleFile();
    const extractedText = await extractTextFromPDF(sampleFileInstance);
    setExtractedText(extractedText);
  })();

  return <>{extractedText || "No text extracted yet."}</>;
};
