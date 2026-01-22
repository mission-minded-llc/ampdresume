"use client";

import { SessionProvider } from "next-auth/react";
import React, { useContext } from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { TanstackQueryProvider } from "./TanstackContext";
import { ThemeAppearanceContext } from "./ThemeContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: themeAppearance === "dark" ? "#eee" : "#333",
        light: themeAppearance === "dark" ? "#333" : "#eee",
      },
      secondary: {
        main: "#FF8C28",
        light: "#AE00FF",
      },
      background: {
        default: themeAppearance === "dark" ? "#151515" : "#fff",
        paper: themeAppearance === "dark" ? "#000" : "#eee",
      },
      mode: themeAppearance,
    },
    typography: {
      fontSize: 16,
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      h1: {
        fontFamily: "var(--font-geist-mono), monospace",
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            color:
              theme.palette.mode === "dark" ? theme.palette.info.light : theme.palette.info.main,
            textDecoration: "underline",
            "&:hover": {
              color:
                theme.palette.mode === "dark" ? theme.palette.info.main : theme.palette.info.dark,
            },
            "&:visited": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.light
                  : theme.palette.secondary.dark,
            },
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& a": {
              color:
                theme.palette.mode === "dark" ? theme.palette.info.light : theme.palette.info.main,
              textDecoration: "underline",
              "&:hover": {
                color:
                  theme.palette.mode === "dark" ? theme.palette.info.main : theme.palette.info.dark,
              },
              "&:visited": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.secondary.light
                    : theme.palette.secondary.dark,
              },
            },
          }),
        },
      },
    },
  });

  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <TanstackQueryProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <Header />
                <Container
                  sx={(theme) => ({
                    backgroundColor: theme.palette.background.default,
                  })}
                >
                  <CssBaseline />
                  {children}
                </Container>
                <Footer />
              </Box>
            </ThemeProvider>
          </LocalizationProvider>
        </TanstackQueryProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
};
