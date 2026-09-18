import { Box } from "@mui/material";
import { getRetroPalette } from "../styles";

/**
 * Decorative synthwave backdrop: a pixel-stepped sun sitting on a perspective grid,
 * with CRT scanlines layered over the whole resume. Purely presentational, so it is
 * hidden from assistive tech and ignores pointer events.
 */
export const ArcadeBackdrop = () => (
  <Box
    aria-hidden="true"
    sx={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    {/* Sun: horizontal slices cut out of a gradient disc, clipped to an octagon so the
        silhouette stays blocky rather than perfectly round. */}
    <Box
      sx={(theme) => {
        const retro = getRetroPalette(theme.palette.mode);

        return {
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          width: 260,
          height: 260,
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          backgroundImage: [
            `repeating-linear-gradient(180deg, transparent 0 14px, ${retro.background} 14px 20px)`,
            `linear-gradient(180deg, ${retro.highlight} 0%, ${retro.accent} 70%, ${retro.dim} 100%)`,
          ].join(", "),
          opacity: theme.palette.mode === "dark" ? 0.55 : 0.35,
          "@media screen and (max-width: 600px)": {
            width: 180,
            height: 180,
          },
        };
      }}
    />
    {/* Horizon grid. */}
    <Box
      sx={(theme) => {
        const retro = getRetroPalette(theme.palette.mode);

        return {
          position: "absolute",
          top: 220,
          left: "-50%",
          width: "200%",
          height: 260,
          backgroundImage: [
            `repeating-linear-gradient(90deg, ${retro.grid} 0 2px, transparent 2px 64px)`,
            `repeating-linear-gradient(180deg, ${retro.grid} 0 2px, transparent 2px 48px)`,
          ].join(", "),
          transform: "perspective(200px) rotateX(64deg)",
          transformOrigin: "50% 0%",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 85%)",
          "@media screen and (max-width: 600px)": {
            top: 150,
          },
        };
      }}
    />
    {/* CRT scanlines across the full resume. */}
    <Box
      sx={(theme) => {
        const retro = getRetroPalette(theme.palette.mode);

        return {
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(180deg, ${retro.scanline} 0 2px, transparent 2px 5px)`,
        };
      }}
    />
  </Box>
);
