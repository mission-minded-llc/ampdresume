import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeAppearance } from "@/types";

/**
 * Classic resume theme: warm surfaces, soft radius, and clear type hierarchy.
 */
export const MUIThemeProvider = ({
  children,
  themeAppearance = "light",
}: {
  children: React.ReactNode;
  themeAppearance?: ThemeAppearance;
}) => {
  const isDark = themeAppearance === "dark";

  const linkColor = isDark ? "#E0B0FF" : "#7A2FBE";
  const linkHover = isDark ? "#F0D4FF" : "#5C1F96";

  const theme = createTheme({
    palette: {
      mode: themeAppearance,
      primary: {
        main: isDark ? "#F4F0EA" : "#2A2430",
        light: isDark ? "#2C2733" : "#F4EEE8",
        dark: isDark ? "#FFFFFF" : "#1A161E",
      },
      secondary: {
        main: isDark ? "#cf75ff" : "#690e9c",
        light: isDark ? "#690e9c" : "#cf75ff",
      },
      background: {
        default: isDark ? "#141118" : "#FFF8F3",
        paper: isDark ? "#1E1A24" : "#FFFFFF",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(42, 36, 48, 0.1)",
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontSize: 16,
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      h1: {
        fontFamily: "var(--font-geist-mono), monospace",
        fontWeight: 700,
        letterSpacing: "-0.03em",
      },
      h2: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      button: {
        textTransform: "none",
        fontWeight: 650,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            boxShadow: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 16,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            backgroundImage: "none",
            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: linkColor,
            textDecoration: "underline",
            textDecorationColor: isDark ? "rgba(224, 176, 255, 0.45)" : "rgba(122, 47, 190, 0.35)",
            textUnderlineOffset: "3px",
            "&:hover": {
              color: linkHover,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            "& a": {
              color: linkColor,
              textDecoration: "underline",
              textDecorationColor: isDark
                ? "rgba(224, 176, 255, 0.45)"
                : "rgba(122, 47, 190, 0.35)",
              textUnderlineOffset: "3px",
              "&:hover": {
                color: linkHover,
              },
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
