import { ThemeAppearance } from "@/types";

/**
 * Press Start 2P is loaded in src/app/layout.tsx. It only ships a 400 weight and
 * renders very wide, so it is reserved for headings, labels, and buttons. Body copy
 * falls back to a monospace stack, which keeps the terminal feel while staying legible.
 */
export const PIXEL_FONT = "var(--font-press-start), var(--font-geist-mono), monospace";
export const MONO_FONT = "var(--font-geist-mono), 'Courier New', monospace";

/**
 * Colours are named by role rather than by hue, because the two appearances are not
 * tints of each other: dark mode is a green phosphor terminal, light mode is a muted
 * pastel arcade flyer.
 */
export interface RetroPalette {
  background: string;
  surface: string;
  surfaceAlt: string;
  // Translucent panel fill for the header and stage cards, so the backdrop shows through.
  panel: string;
  // Body copy, and the dimmer variant used for secondary lines.
  ink: string;
  inkMuted: string;
  // Primary emphasis: borders, the filled button, active states.
  accent: string;
  // Text drawn on top of an accent fill.
  onAccent: string;
  // Secondary emphasis: links, entry headings, the company name in a sticky bar.
  accentAlt: string;
  // Small glyphs and HUD labels.
  highlight: string;
  // Low-contrast rules and dividers.
  dim: string;
  // The hard offset behind heading type. Sits between ink and background so it reads
  // as CRT misconvergence rather than a second colour.
  ghost: string;
  border: string;
  shadow: string;
  grid: string;
  scanline: string;
}

/**
 * P1 phosphor green on near-black, with amber as the warm secondary the way dual-phosphor
 * terminals handled highlights.
 */
const DARK: RetroPalette = {
  background: "#040B06",
  surface: "#081409",
  surfaceAlt: "#0D2011",
  panel: "rgba(8, 20, 9, 0.85)",
  ink: "#A6FFB4",
  inkMuted: "#5FBE7C",
  accent: "#2BE86A",
  onAccent: "#040B06",
  accentAlt: "#FFB000",
  highlight: "#FFD166",
  dim: "#1C5C33",
  ghost: "#14743A",
  border: "#2BE86A",
  shadow: "#010603",
  grid: "rgba(43, 232, 106, 0.30)",
  scanline: "rgba(0, 0, 0, 0.30)",
};

const LIGHT: RetroPalette = {
  background: "#FAF5FF",
  surface: "#FFFFFF",
  surfaceAlt: "#F3E9FF",
  panel: "rgba(255, 255, 255, 0.88)",
  ink: "#2B0B52",
  inkMuted: "#6B4B96",
  accent: "#9C2E7A",
  onAccent: "#FFFFFF",
  accentAlt: "#00768C",
  highlight: "#B87A00",
  dim: "#7E6BC4",
  ghost: "#C79BBC",
  border: "#33245C",
  shadow: "#33245C",
  grid: "rgba(126, 107, 196, 0.28)",
  scanline: "rgba(43, 11, 82, 0.06)",
};

export const getRetroPalette = (appearance: ThemeAppearance): RetroPalette =>
  appearance === "dark" ? DARK : LIGHT;

/**
 * The hard, offset drop shadow that gives every surface its chunky arcade-cabinet edge.
 * Nothing in this theme uses a blurred shadow or a rounded corner.
 */
export const pixelShadow = (palette: RetroPalette, offset = 6) =>
  `${offset}px ${offset}px 0 ${palette.shadow}`;

export const pixelPanel = (palette: RetroPalette, accent?: string) => ({
  backgroundColor: palette.surface,
  border: `2px solid ${accent ?? palette.border}`,
  borderRadius: 0,
  boxShadow: pixelShadow(palette),
});

/**
 * Small uppercase pixel label, as used for HUD readouts like "SELECT PLAYER" or "STAGE 01".
 */
export const pixelLabel = (color: string) => ({
  fontFamily: PIXEL_FONT,
  fontSize: "0.6rem",
  lineHeight: 1.6,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color,
});

/**
 * Buttons and social links "press in" when clicked, losing their offset shadow.
 */
export const pixelPressEffect = (palette: RetroPalette, offset = 4) => ({
  boxShadow: pixelShadow(palette, offset),
  transition: "transform 80ms steps(2), box-shadow 80ms steps(2)",
  "&:hover": {
    transform: `translate(${offset / 2}px, ${offset / 2}px)`,
    boxShadow: pixelShadow(palette, offset / 2),
  },
  "&:active": {
    transform: `translate(${offset}px, ${offset}px)`,
    boxShadow: "none",
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
  },
});

/**
 * Skill tags render as pill-shaped MUI buttons. Square them off and keep them in the
 * monospace face, since the pixel face is far too wide for a dense tag cloud.
 */
export const pixelChipSkin = (palette: RetroPalette) => ({
  // SkillItem hard-codes the Classic dark-mode chip colours, so the disabled selector is
  // matched here too in order to win on specificity.
  "& .MuiButton-root, & .MuiButton-root.Mui-disabled": {
    fontFamily: MONO_FONT,
    fontSize: "0.8rem",
    fontWeight: 700,
    textTransform: "none" as const,
    borderRadius: 0,
    color: palette.ink,
    backgroundColor: palette.surfaceAlt,
    border: `1px solid ${palette.dim}`,
    boxShadow: `3px 3px 0 ${palette.shadow}`,
  },
  // Chips that open a detail dialog get the bright border so the clickable ones read as
  // clickable, which is the distinction SkillItem draws with its own border colour.
  "& .MuiButton-root[data-interactive='true']": {
    borderColor: palette.accent,
  },
  // The skills layout toggle is the one button group that keeps the pixel face.
  "& .MuiButton-root[data-layout]": {
    fontFamily: PIXEL_FONT,
    fontSize: "0.6rem",
    textTransform: "uppercase" as const,
  },
  "& .MuiButton-root[data-active='true']": {
    color: palette.onAccent,
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
});

/**
 * The shared sections in src/theme/components render with the Classic look: soft
 * radii, pill-shaped tags, and a rounded accent bar under each title. This re-skins
 * them from the outside so the whole resume reads as one 8-bit cabinet, without
 * forking the section logic. Applied by the PixelSection wrapper.
 */
export const sectionSkin = (palette: RetroPalette) => ({
  "& h2": {
    fontFamily: PIXEL_FONT,
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: palette.ink,
    textShadow: `3px 3px 0 ${palette.ghost}`,
    "@media screen and (max-width: 600px)": {
      fontSize: "1rem",
    },
  },
  // ResumeTitle renders a short accent bar after the heading. This theme leans on the
  // heading's own pixel type and drop shadow instead, so the bar is hidden.
  "& h2 + div": {
    display: "none",
  },
  // Education / Certifications / Featured Projects entry headings.
  "& h3": {
    fontFamily: PIXEL_FONT,
    fontSize: "0.9rem",
    fontWeight: 400,
    lineHeight: 1.8,
    letterSpacing: 0,
    color: palette.accentAlt,
  },
  "& h4": {
    fontFamily: MONO_FONT,
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: 0,
    color: palette.ink,
  },
  "& h4 span": {
    fontFamily: MONO_FONT,
    fontSize: "1rem",
    color: palette.inkMuted,
  },
  ...pixelChipSkin(palette),
  // Featured project skill tags are plain boxes with pill radii rather than buttons.
  "& .MuiBox-root": {
    borderRadius: 0,
  },
  "& img": {
    imageRendering: "pixelated",
  },
});
