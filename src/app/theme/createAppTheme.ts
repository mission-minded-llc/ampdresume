import { createTheme, PaletteMode, Shadows } from "@mui/material/styles";

export const appBrand = {
  orange: "#FF8C28",
  purple: "#AE00FF",
  yellow: "#FFEE00",
  lavender: "#F2D7FF",
} as const;

const softShadows = [
  "none",
  "0 2px 8px rgba(42, 36, 48, 0.05)",
  "0 4px 14px rgba(42, 36, 48, 0.07)",
  "0 8px 24px rgba(42, 36, 48, 0.08)",
  "0 12px 32px rgba(42, 36, 48, 0.1)",
  "0 16px 40px rgba(42, 36, 48, 0.12)",
  "0 20px 48px rgba(42, 36, 48, 0.14)",
  "0 24px 56px rgba(42, 36, 48, 0.16)",
  "0 28px 64px rgba(42, 36, 48, 0.18)",
  "0 32px 72px rgba(42, 36, 48, 0.2)",
  "0 36px 80px rgba(42, 36, 48, 0.22)",
  "0 40px 88px rgba(42, 36, 48, 0.24)",
  "0 44px 96px rgba(42, 36, 48, 0.26)",
  "0 48px 104px rgba(42, 36, 48, 0.28)",
  "0 52px 112px rgba(42, 36, 48, 0.3)",
  "0 56px 120px rgba(42, 36, 48, 0.32)",
  "0 60px 128px rgba(42, 36, 48, 0.34)",
  "0 64px 136px rgba(42, 36, 48, 0.36)",
  "0 68px 144px rgba(42, 36, 48, 0.38)",
  "0 72px 152px rgba(42, 36, 48, 0.4)",
  "0 76px 160px rgba(42, 36, 48, 0.42)",
  "0 80px 168px rgba(42, 36, 48, 0.44)",
  "0 84px 176px rgba(42, 36, 48, 0.46)",
  "0 88px 184px rgba(42, 36, 48, 0.48)",
  "0 92px 192px rgba(42, 36, 48, 0.5)",
] as unknown as Shadows;

/**
 * App chrome theme: warmer surfaces, generous radius, and pill-shaped actions.
 * Resume templates keep their own themes.
 */
export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === "dark";

  const linkColor = isDark ? "#E0B0FF" : "#7A2FBE";
  const linkHover = isDark ? "#F0D4FF" : "#5C1F96";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#F4F0EA" : "#2A2430",
        light: isDark ? "#3A3344" : "#FFF8F2",
      },
      secondary: {
        main: appBrand.orange,
        light: appBrand.purple,
        dark: "#E06A10",
      },
      background: {
        default: isDark ? "#141118" : "#FFF8F3",
        paper: isDark ? "#1E1A24" : "#FFFFFF",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(42, 36, 48, 0.08)",
    },
    shape: {
      borderRadius: 16,
    },
    shadows: softShadows,
    typography: {
      fontSize: 16,
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      h1: {
        fontFamily: "var(--font-geist-mono), monospace",
        fontWeight: 700,
        letterSpacing: "-0.03em",
      },
      h2: {
        fontWeight: 750,
        letterSpacing: "-0.03em",
      },
      h3: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      button: {
        textTransform: "none",
        fontWeight: 650,
        letterSpacing: 0.15,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            backgroundColor: isDark ? "#141118" : "#FFF8F3",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 20,
            paddingBlock: 10,
            boxShadow: "none",
            "&:hover": {
              boxShadow: softShadows[2],
            },
          },
          contained: {
            "&:hover": {
              boxShadow: `0 8px 22px ${isDark ? "rgba(174, 0, 255, 0.28)" : "rgba(255, 140, 40, 0.28)"}`,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 20,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: softShadows[2],
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: "16px !important",
            boxShadow: "none",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(42, 36, 48, 0.08)"}`,
            backgroundColor: isDark ? "#1E1A24" : "#FFFFFF",
            "&:before": {
              display: "none",
            },
            overflow: "hidden",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
            border: "none",
            boxShadow: softShadows[6],
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          track: {
            borderRadius: 999,
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
              "&:visited": {
                color: isDark ? "#FFC48A" : "#C45A12",
              },
            },
          },
        },
      },
    },
  });
}
