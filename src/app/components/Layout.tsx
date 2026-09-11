"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createAppTheme } from "@/app/theme/createAppTheme";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { TanstackQueryProvider } from "./TanstackContext";
import { ThemeAppearanceContext } from "./ThemeContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const theme = createAppTheme(themeAppearance);

  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <TanstackQueryProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                  overflowX: "clip",
                }}
              >
                <Header />
                <Container
                  maxWidth={isHome ? false : "lg"}
                  disableGutters={isHome}
                  sx={(theme) => ({
                    backgroundColor: theme.palette.background.default,
                    flex: 1,
                  })}
                >
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
