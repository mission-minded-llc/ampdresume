import { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import QRCode from "qrcode";
import { User } from "@/types";
import { DavidsSectionTitle } from "./DavidsSectionTitle";

interface QRGeneratorProps {
  url: string;
  user?: User;
}

export const QRGenerator = ({ url, user }: QRGeneratorProps) => {
  const theme = useTheme();
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrDataURL = await QRCode.toDataURL(url, {
          width: 150,
          margin: 2,
          color: {
            dark: theme.palette.mode === "dark" ? "#f8fafc" : "#000000",
            light: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
          },
          errorCorrectionLevel: "M",
        });
        setQrCodeDataURL(qrDataURL);
        setError("");
      } catch {
        setError("Failed to generate QR code");
      }
    };

    if (url) {
      generateQR();
    }
  }, [url, theme.palette.mode]);

  const downloadQRCode = () => {
    if (qrCodeDataURL) {
      const link = document.createElement("a");
      link.href = qrCodeDataURL;
      link.download = `${user?.name || "resume"}-resume.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
        mb: 4,
        pt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <DavidsSectionTitle>Share Your Resume</DavidsSectionTitle>

      {qrCodeDataURL && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
            px: 3,
            py: 3,
            borderRadius: 3,
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(30, 41, 59, 0.55)" : "rgba(227, 242, 253, 0.7)",
            border: `1px solid ${
              theme.palette.mode === "dark" ? "rgba(96, 165, 250, 0.18)" : "rgba(13, 71, 161, 0.1)"
            }`,
          }}
        >
          {/**
           * This is a valid image element, but Next.js doesn't like it. Since this source
           * gets bundled into an npm package and isn't directly hosted, we can disable the
           * Next.js image element linting rule.
           */}
          <img
            src={qrCodeDataURL}
            alt="QR Code to share resume"
            style={{
              display: "block",
              borderRadius: "12px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 20px rgba(0, 0, 0, 0.35)"
                  : "0 8px 20px rgba(13, 71, 161, 0.12)",
              margin: "0 auto",
            }}
          />
          <Button
            variant="outlined"
            onClick={downloadQRCode}
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: 999,
              px: 3,
              py: 1,
            }}
          >
            Download QR Code
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            Scan with your phone to view this resume
          </Typography>
        </Box>
      )}
    </Box>
  );
};
