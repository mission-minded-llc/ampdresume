"use client";

import { Box, Container, ThemeProvider } from "@mui/material";
import React, { useContext } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SessionProvider } from "next-auth/react";
import { TanstackQueryProvider } from "./TanstackContext";
import { ThemeAppearanceContext } from "./ThemeContext";
import { createTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  // If we're rendering a Sanity Studio page, return the children
  // immediately because we don't need to augment the layout at all.
  if (usePathname().startsWith("/studio/")) return children;

  const theme = createTheme({
    palette: {
      primary: {
        main: themeAppearance === "dark" ? "#eee" : "#333",
        light: themeAppearance === "dark" ? "#333" : "#eee",
      },
      secondary: {
        main: themeAppearance === "dark" ? "#cf75ff" : "#350052",
        light: themeAppearance === "dark" ? "#350052" : "#cf75ff",
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
  });

  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <TanstackQueryProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
        </TanstackQueryProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
};
