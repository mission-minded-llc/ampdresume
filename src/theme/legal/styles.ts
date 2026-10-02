import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { ThemeAppearance } from "@/types";

/**
 * Times is the typeface of filed paper. Palatino and Georgia cover machines
 * that do not ship Times New Roman.
 */
export const LEGAL_FONT_FAMILY =
  '"Times New Roman", Times, "Liberation Serif", Palatino, "Palatino Linotype", Georgia, serif';

/**
 * Colours for the chambers page. Light mode is bond paper and sealing wax.
 * Dark mode is a reading room: cream type and brass rules on a dark ground.
 */
export interface LegalPalette {
  background: string;
  ink: string;
  inkMuted: string;
  seal: string;
  rule: string;
  onSeal: string;
}

/**
 * Resolves the chambers palette for the site appearance toggle.
 *
 * @param appearance Light or dark, as chosen on the parent site.
 * @returns Bond-paper colours in light mode, and brass-on-ink colours in dark mode.
 */
export const getLegalPalette = (appearance: ThemeAppearance): LegalPalette =>
  appearance === "dark"
    ? {
        background: "#12151c",
        ink: "#f3efe6",
        inkMuted: "#c4bbae",
        seal: "#d4b483",
        rule: "#d4b483",
        onSeal: "#1a1814",
      }
    : {
        background: "#f4f0e6",
        ink: "#1a1814",
        inkMuted: "#5e584e",
        seal: "#722433",
        rule: "#1a1814",
        onSeal: "#fbf8f2",
      };

/**
 * Restyles shared section headings as captions: small caps over a full oxford rule.
 *
 * @param palette Ink and rule colours for the active appearance.
 * @returns Styles for the chambers column, including caption and body treatment.
 */
export const chambersContentSx = (palette: LegalPalette): SystemStyleObject<Theme> => ({
  color: palette.ink,
  fontFamily: LEGAL_FONT_FAMILY,
  "& a": {
    color: palette.seal,
    textDecorationColor: palette.seal,
  },
  "& .MuiBox-root:has(> h2.MuiTypography-root)": {
    marginTop: "28px",
    marginBottom: "10px",
  },
  "& p": {
    textAlign: "justify",
    hyphens: "auto",
  },
  "& h2.MuiTypography-root": {
    fontFamily: LEGAL_FONT_FAMILY,
    fontWeight: 600,
    fontSize: "0.95rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    textAlign: "center",
    color: palette.ink,
  },
  "& h2.MuiTypography-root + .MuiBox-root": {
    width: "100%",
    height: "auto",
    minHeight: 0,
    marginTop: "10px",
    marginLeft: 0,
    marginRight: 0,
    paddingTop: "3px",
    paddingBottom: "1px",
    borderRadius: 0,
    backgroundColor: "transparent",
    backgroundImage: "none",
    borderTop: `3px solid ${palette.rule}`,
    borderBottom: `1px solid ${palette.rule}`,
    boxSizing: "content-box",
  },
  "& h3.MuiTypography-root, & h4.MuiTypography-root": {
    fontFamily: LEGAL_FONT_FAMILY,
    fontWeight: 600,
    letterSpacing: "0.01em",
    textAlign: "left",
    color: palette.ink,
  },
});
