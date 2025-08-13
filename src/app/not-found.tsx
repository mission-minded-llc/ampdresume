"use client";

import { Box, Typography, Container } from "@mui/material";
import Link from "next/link";

import { ThemeAwareLogo } from "./components/ThemeAwareLogo";

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
            <ThemeAwareLogo />
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
