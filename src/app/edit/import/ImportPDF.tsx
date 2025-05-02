"use client";

import * as Sentry from "@sentry/react";
import * as pdfjsLib from "pdfjs-dist";

import { FileUploadEvent, PDFFile, TextItem } from "./types";

import { ExtractedInformation } from "./ExtractedInformation";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { PageHeading } from "./PageHeading";
import { UploadPDF } from "./UploadPDF";
import { getParsedResumeAi } from "@/graphql/getParsedResumeAi";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export const ImportPDF = () => {
  const { data: session, status } = useSession();
  const isAuthenticatedUser =
    status === "authenticated" && !!session?.user.id && !!session?.user.slug;

  const [extractedText, setExtractedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const shouldFetchResume = isAuthenticatedUser && !!extractedText && extractedText.length > 200;

  // Fetch the parsed resume from AI
  const { data: parsedResumeAi, isPending } = useQuery({
    enabled: shouldFetchResume,
    queryKey: ["parsedResumeAi"],
    queryFn: async () => {
      if (!session?.user?.id || !extractedText) return null;
      return await getParsedResumeAi(session.user.id, extractedText);
    },
  });

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
      Sentry.captureException(err);
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
      <PageHeading />
      <UploadPDF onFileUpload={handleFileUpload} />
      {isPending && shouldFetchResume ? (
        <LoadingOverlay open={true} message="Analyzing your resume..." />
      ) : (
        <ExtractedInformation data={parsedResumeAi || null} error={error} />
      )}
    </>
  );
};
