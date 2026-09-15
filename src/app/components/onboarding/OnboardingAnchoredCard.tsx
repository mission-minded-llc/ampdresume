"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Popper } from "@mui/material";
import { anyPlacementFitsViewport } from "./placement";
import { OnboardingPlacement } from "./steps";
import { TourRect, useSettledTourTargetRect } from "./tourTarget";

const FALLBACK_SX = {
  position: "fixed" as const,
  zIndex: 1500,
  left: "50%",
  bottom: { xs: "max(16px, env(safe-area-inset-bottom))", sm: 24 },
  transform: "translateX(-50%)",
  maxWidth: "calc(100vw - 32px)",
  pointerEvents: "auto" as const,
};

const readViewportSize = () =>
  typeof window === "undefined"
    ? { width: 1024, height: 768 }
    : { width: window.innerWidth, height: window.innerHeight };

const useViewportSize = () => {
  const [size, setSize] = useState(readViewportSize);

  useEffect(() => {
    const update = () => setSize(readViewportSize());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
};

const MISSING_TARGET_FALLBACK_MS = 2000;

const toAnchorEl = (rect: TourRect) => ({
  getBoundingClientRect: () => ({
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    x: rect.left,
    y: rect.top,
    toJSON: () => {},
  }),
});

/**
 * Places the onboarding coach card next to `[data-tour-id={targetId}]`
 * after that target has finished moving. Hidden until then so it does not
 * bounce with the nav drawer. Pins to the bottom of the viewport when there
 * is no target, or when the preferred placement would overflow (typical on
 * phones when the nav drawer is open).
 */
export const OnboardingAnchoredCard = ({
  targetId,
  placement = "right-start",
  children,
}: {
  targetId?: string;
  placement?: OnboardingPlacement;
  children: React.ReactNode;
}) => {
  const rect = useSettledTourTargetRect(targetId);
  const viewport = useViewportSize();
  const anchorEl = useMemo(() => (rect ? toAnchorEl(rect) : null), [rect]);
  const [timedOut, setTimedOut] = useState(false);
  const fitsOnScreen = Boolean(
    rect && anyPlacementFitsViewport(rect, placement, viewport.width, viewport.height),
  );

  useEffect(() => {
    setTimedOut(false);
    if (!targetId) return;

    const timer = window.setTimeout(() => setTimedOut(true), MISSING_TARGET_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [targetId]);

  if (targetId && !anchorEl && !timedOut) {
    return null;
  }

  if (!anchorEl || !fitsOnScreen) {
    return (
      <Box data-testid="OnboardingRoot" data-placement="viewport-bottom" sx={FALLBACK_SX}>
        {children}
      </Box>
    );
  }

  return (
    <Popper
      open
      anchorEl={anchorEl}
      placement={placement}
      popperOptions={{ strategy: "fixed" }}
      modifiers={[
        { name: "offset", options: { offset: [0, 16] } },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["bottom-start", "top-start", "left-start", "bottom"],
          },
        },
        {
          name: "preventOverflow",
          options: { padding: 16, altAxis: true, tether: false },
        },
      ]}
      sx={{ zIndex: 1500, pointerEvents: "auto" }}
    >
      <Box data-testid="OnboardingRoot" data-placement={placement}>
        {children}
      </Box>
    </Popper>
  );
};
