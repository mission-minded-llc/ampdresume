"use client";

import { Box, Typography, Container } from "@mui/material";
import { ThemeAwareImage } from "./components/ThemeAwareImage";
import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <head>
        <title>Amp&apos;d Resume | Page Not Found</title>
      </head>
      <body>
        <Container
          maxWidth="sm"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <ThemeAwareImage
              lightSrc="/images/ampd-resume-logo.png"
              darkSrc="/images/ampd-resume-dark-mode-logo.png"
              alt="Amp'd Resume Logo"
              width={300}
              height={180}
              style={{ marginBottom: 32, width: "100%", height: "auto" }}
              ariaLabel="Amp'd Resume"
            />
            <Typography variant="h5" sx={{ mb: 2, color: "secondary.main" }}>
              Sorry, we couldn&apos;t find that page.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              The page you are looking for might have been removed, had its name changed, or is
              temporarily unavailable.
            </Typography>
            <Typography>
              <Link
                href="/"
                style={{
                  border: "1px solid white",
                  padding: 10,
                  borderRadius: 5,
                  textDecoration: "none",
                  color: "inherit",
                  fontFamily: "inherit",
                }}
              >
                Return Home
              </Link>
            </Typography>
          </Box>
        </Container>
      </body>
    </html>
  );
}
