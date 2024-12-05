"use client";

import React, { useContext } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Footer } from "./Footer";
import { ThemeAppearanceContext } from "@/context/ThemeContext";
import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { SessionProvider } from "next-auth/react";

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
      background: {
        default: themeAppearance === "dark" ? "#151515" : "#fff",
        paper: themeAppearance === "dark" ? "#000" : "#eee",
      },
      mode: themeAppearance,
    },
    typography: {
      fontSize: 16,
    },
  });

  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Container
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              paddingBottom: "100px",
            })}
          >
            <CssBaseline />
            {children}
            <Footer />
          </Container>
        </ThemeProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
};
