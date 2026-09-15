"use client";

import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTourTargetRect } from "./tourTarget";

const SPOTLIGHT_PADDING = 4;

/**
 * Dims the page and rings the element with `data-tour-id={targetId}`.
 * Four blocking panes catch clicks outside the hole.
 */
export const OnboardingSpotlight = ({
  targetId,
  zIndex = 1300,
  showRing = true,
}: {
  targetId: string;
  zIndex?: number;
  showRing?: boolean;
}) => {
  const raw = useTourTargetRect(targetId);
  const rect = raw
    ? {
        top: raw.top - SPOTLIGHT_PADDING,
        left: raw.left - SPOTLIGHT_PADDING,
        width: raw.width + SPOTLIGHT_PADDING * 2,
        height: raw.height + SPOTLIGHT_PADDING * 2,
      }
    : null;

  const dim = {
    position: "fixed" as const,
    bgcolor: "rgba(20, 17, 24, 0.62)",
    zIndex,
  };

  if (!rect) {
    return <Box sx={{ ...dim, inset: 0 }} data-testid="OnboardingSpotlight" />;
  }

  return (
    <>
      <Box
        data-testid="OnboardingSpotlight"
        sx={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex }}
      />
      <Box sx={{ ...dim, top: 0, left: 0, right: 0, height: Math.max(rect.top, 0) }} />
      <Box sx={{ ...dim, top: rect.top + rect.height, left: 0, right: 0, bottom: 0 }} />
      <Box
        sx={{
          ...dim,
          top: rect.top,
          left: 0,
          width: Math.max(rect.left, 0),
          height: rect.height,
        }}
      />
      <Box
        sx={{
          ...dim,
          top: rect.top,
          left: rect.left + rect.width,
          right: 0,
          height: rect.height,
        }}
      />
      {showRing ? (
        <Box
          sx={{
            position: "fixed",
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: 3,
            boxShadow: (theme) =>
              `0 0 0 1.5px ${alpha(theme.palette.secondary.main, 0.7)}, 0 0 0 5px ${alpha(theme.palette.secondary.main, 0.16)}`,
            pointerEvents: "none",
            zIndex: 1400,
          }}
          data-testid="OnboardingSpotlightRing"
        />
      ) : null}
    </>
  );
};
