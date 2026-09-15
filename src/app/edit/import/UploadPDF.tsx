import { Box, Typography } from "@mui/material";
import { FileUploadEvent } from "./types";

/**
 * The component for the upload PDF page.
 *
 * @param onFileUpload - The function to call when the file is uploaded.
 * @param disabled - When true, the file input cannot be used (PDF library still loading).
 * @returns The upload PDF page.
 */
export const UploadPDF = ({
  onFileUpload,
  disabled = false,
}: {
  onFileUpload: (event: FileUploadEvent) => void;
  disabled?: boolean;
}) => {
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
      <input type="file" accept="application/pdf" onChange={onFileUpload} disabled={disabled} />
      <Typography variant="body2" color="textSecondary">
        Please upload a PDF file. The file size should not exceed 5MB.
      </Typography>
    </Box>
  );
};
