import { Box, Typography } from "@mui/material";
import { FileUploadEvent, PDFFile } from "./types";

interface UploadPDFProps {
  onFileUpload: (event: FileUploadEvent) => void;
}

export const UploadPDF = ({ onFileUpload }: UploadPDFProps) => {
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
