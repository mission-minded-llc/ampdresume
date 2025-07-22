"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { ThemeAwareImage } from "./components/ThemeAwareImage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <html>
      <body style={{ backgroundColor: darkTheme.palette.background.default }}>
        <ThemeProvider theme={darkTheme}>
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
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: "white" }}>
                Yikes.
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, color: "white" }}>
                Something broke. Sorry about that.
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: "white" }}>
                We have been notified. Please try again later. If the problem persists, please
                message{" "}
                <a
                  href="mailto:contact@ampdresume.com"
                  style={{ color: "orange", textDecoration: "none" }}
                >
                  contact@ampdresume.com
                </a>
                .
              </Typography>
              <Typography sx={{ color: "white" }}>
                <a
                  href="/"
                  style={{
                    border: "1px solid white",
                    padding: 10,
                    borderRadius: 5,
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Return Home
                </a>
              </Typography>
            </Box>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
