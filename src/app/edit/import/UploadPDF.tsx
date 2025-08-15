import { Box, Typography } from "@mui/material";
import { FileUploadEvent } from "./types";

/**
 * The component for the upload PDF page.
 *
 * @param onFileUpload - The function to call when the file is uploaded.
 * @returns The upload PDF page.
 */
export const UploadPDF = ({ onFileUpload }: { onFileUpload: (event: FileUploadEvent) => void }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 4,
      }}
    >
      <Typography variant="h6">Upload PDF</Typography>
      <input type="file" accept="application/pdf" onChange={onFileUpload} />
      <Typography variant="body2" color="textSecondary">
        Please upload a PDF file. The file size should not exceed 5MB.
      </Typography>
    </Box>
  );
};
