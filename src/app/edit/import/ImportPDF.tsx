"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getParsedResumeAi } from "@/graphql/getParsedResumeAi";
import { ExtractedInformation } from "./ExtractedInformation";
import { PageHeading } from "./PageHeading";
import { FileUploadEvent, PDFFile, TextItem } from "./types";
import { UploadPDF } from "./UploadPDF";

let pdfjsLib: typeof import("pdfjs-dist") | null = null;

export const ImportPDF = () => {
  const { data: session, status } = useSession();
  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const [extractedText, setExtractedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPdfJs = async () => {
      if (typeof window === "undefined") return;

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib = pdfjs;
      } catch (err) {
        setError("Failed to load PDF processing library");
        Sentry.captureException(err);
      }
    };
    loadPdfJs();
  }, []);

  const shouldFetchResume = isAuthenticatedUser && !!extractedText && extractedText.length > 200;

  // Fetch the parsed resume from AI
  const {
    data: parsedResumeAi,
    isPending,
    isError,
  } = useQuery({
    enabled: shouldFetchResume,
    queryKey: ["parsedResumeAi"],
    queryFn: async () => {
      if (!session?.user?.id || !extractedText) return null;
      return await getParsedResumeAi(session.user.id, extractedText);
    },
  });

  const extractTextFromPDF = async (file: PDFFile): Promise<void> => {
    if (!pdfjsLib) {
      setError("PDF processing library not loaded yet. Please try again.");
      return;
    }

    try {
      const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = "";

      // Iterate through each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
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

      // Ensure the text's maximum length is 20000 characters.
      fullText = fullText.slice(0, 10000);

      setExtractedText(fullText);
    } catch (err: unknown) {
      Sentry.captureException(err);
      setError("Error extracting text from PDF. Please try again or use a different file.");
    }
  };

  const handleFileUpload = (event: FileUploadEvent): void => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file as PDFFile);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  return (
    <>
      <PageHeading />
      <UploadPDF onFileUpload={handleFileUpload} />
      {isError && <Typography>Error loading resume</Typography>}
      {isPending && shouldFetchResume ? (
        <LoadingOverlay open={true} message="Analyzing your resume..." />
      ) : (
        <ExtractedInformation data={parsedResumeAi || null} error={error} />
      )}
    </>
  );
};
