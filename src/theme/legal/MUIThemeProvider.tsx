import { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeAppearance } from "@/types";
import { getLegalPalette, LEGAL_FONT_FAMILY } from "./styles";

/**
 * Chambers theme: Times, square corners, and sealing-wax emphasis. The parent
 * site owns the light/dark toggle; this only applies that choice.
 *
 * @param children Resume content rendered in the chambers palette.
 * @param themeAppearance Light or dark, passed in from the parent site.
 * @returns The MUI theme provider for the legal resume.
 */
export const MUIThemeProvider = ({
  children,
  themeAppearance = "light",
}: {
  children: ReactNode;
  themeAppearance?: ThemeAppearance;
}) => {
  const legal = getLegalPalette(themeAppearance);

  const theme = createTheme({
    palette: {
      mode: themeAppearance,
      primary: {
        main: legal.ink,
      },
      secondary: {
        main: legal.seal,
      },
      info: {
        main: legal.seal,
        light: legal.seal,
        dark: legal.ink,
      },
      background: {
        default: legal.background,
        paper: legal.background,
      },
      text: {
        primary: legal.ink,
        secondary: legal.inkMuted,
      },
      divider: legal.rule,
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: LEGAL_FONT_FAMILY,
      button: {
        fontFamily: LEGAL_FONT_FAMILY,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
          outlined: {
            borderColor: legal.ink,
            color: legal.ink,
            "&:hover": {
              borderColor: legal.seal,
              color: legal.seal,
              backgroundColor: "transparent",
            },
          },
          contained: {
            backgroundColor: legal.seal,
            color: legal.onSeal,
            "&:hover": {
              backgroundColor: legal.seal,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: legal.seal,
            textDecorationColor: legal.seal,
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
            border: `1px solid ${legal.rule}`,
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
