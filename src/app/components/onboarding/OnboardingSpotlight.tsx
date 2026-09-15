"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const SPOTLIGHT_PADDING = 10;

type SpotlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const readTargetRect = (targetId: string): SpotlightRect | null => {
  const el = document.querySelector(`[data-tour-id="${targetId}"]`);
  if (!el) return null;

  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;

  return {
    top: rect.top - SPOTLIGHT_PADDING,
    left: rect.left - SPOTLIGHT_PADDING,
    width: rect.width + SPOTLIGHT_PADDING * 2,
    height: rect.height + SPOTLIGHT_PADDING * 2,
  };
};

/**
 * Dims the page and rings the element with `data-tour-id={targetId}`.
 * Four blocking panes catch clicks outside the hole.
 */
export const OnboardingSpotlight = ({
  targetId,
  zIndex = 1300,
}: {
  targetId: string;
  zIndex?: number;
}) => {
  const [rect, setRect] = useState<SpotlightRect | null>(null);

  useEffect(() => {
    const update = () => setRect(readTargetRect(targetId));
    update();

    const interval = window.setInterval(update, 120);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [targetId]);

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
      <Box
        sx={{
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: 2,
          boxShadow: (theme) => `0 0 0 3px ${theme.palette.secondary.main}`,
          pointerEvents: "none",
          zIndex: 1400,
        }}
        data-testid="OnboardingSpotlightRing"
      />
    </>
  );
};
