import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeAppearance } from "@/types";
import { getRetroPalette, MONO_FONT, PIXEL_FONT, pixelPressEffect, pixelShadow } from "./styles";

/**
 * Retro 80s resume theme: synthwave palette, zero border radius, and hard
 * offset shadows instead of blur. Both appearances are neon; light mode is the
 * pastel "Miami" variant and dark mode is the late-night arcade.
 */
export const MUIThemeProvider = ({
  children,
  themeAppearance = "dark",
}: {
  children: React.ReactNode;
  themeAppearance?: ThemeAppearance;
}) => {
  const retro = getRetroPalette(themeAppearance);

  const theme = createTheme({
    palette: {
      mode: themeAppearance,
      primary: {
        main: retro.ink,
        light: retro.surfaceAlt,
        dark: retro.ink,
      },
      secondary: {
        main: retro.accent,
        light: retro.dim,
        dark: retro.accent,
      },
      info: {
        main: retro.accentAlt,
        light: retro.accentAlt,
        dark: retro.dim,
      },
      background: {
        default: retro.background,
        paper: retro.surface,
      },
      text: {
        primary: retro.ink,
        secondary: retro.inkMuted,
      },
      divider: retro.border,
    },
    shape: {
      // Nothing in an 8-bit interface is rounded.
      borderRadius: 0,
    },
    typography: {
      fontSize: 16,
      fontFamily: MONO_FONT,
      // Press Start 2P only ships one weight and needs generous leading.
      h1: { fontFamily: PIXEL_FONT, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 },
      h2: { fontFamily: PIXEL_FONT, fontWeight: 400, lineHeight: 1.6, letterSpacing: 0 },
      h3: { fontFamily: PIXEL_FONT, fontWeight: 400, lineHeight: 1.7, letterSpacing: 0 },
      h4: { fontFamily: PIXEL_FONT, fontWeight: 400, lineHeight: 1.7, letterSpacing: 0 },
      h5: { fontFamily: PIXEL_FONT, fontWeight: 400, lineHeight: 1.8, letterSpacing: 0 },
      h6: { fontFamily: PIXEL_FONT, fontWeight: 400, lineHeight: 1.8, letterSpacing: 0 },
      button: {
        fontFamily: PIXEL_FONT,
        fontWeight: 400,
        fontSize: "0.65rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: `1px solid ${retro.border}`,
            padding: "8px 14px",
            ...pixelPressEffect(retro),
          },
          outlined: {
            backgroundColor: retro.surface,
            color: retro.ink,
          },
          contained: {
            backgroundColor: retro.accent,
            color: retro.onAccent,
            "&:hover": {
              backgroundColor: retro.accent,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 0,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
            border: `3px solid ${retro.accent}`,
            boxShadow: pixelShadow(retro, 10),
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily: PIXEL_FONT,
            fontSize: "0.9rem",
            backgroundColor: retro.surfaceAlt,
            borderBottom: `2px solid ${retro.accent}`,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            // MUI zeros this when a DialogTitle precedes the content.
            ".MuiDialogTitle-root + &": {
              paddingTop: "24px",
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 0,
            boxShadow: "none",
            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: retro.accentAlt,
            fontWeight: 700,
            textDecoration: "underline",
            textDecorationStyle: "dashed",
            textUnderlineOffset: "4px",
            "&:hover": {
              color: retro.accent,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            "& a": {
              color: retro.accentAlt,
              fontWeight: 700,
              textDecoration: "underline",
              textDecorationStyle: "dashed",
              textUnderlineOffset: "4px",
              "&:hover": {
                color: retro.accent,
              },
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
