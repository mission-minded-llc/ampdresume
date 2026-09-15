"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Popper } from "@mui/material";
import { OnboardingPlacement } from "./steps";
import { TourRect, useSettledTourTargetRect } from "./tourTarget";

const FALLBACK_SX = {
  position: "fixed" as const,
  zIndex: 1500,
  left: "50%",
  bottom: { xs: 16, sm: 24 },
  transform: "translateX(-50%)",
  pointerEvents: "auto" as const,
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
 * bounce with the nav drawer. Falls back to the bottom of the viewport when
 * there is no target.
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
  const anchorEl = useMemo(() => (rect ? toAnchorEl(rect) : null), [rect]);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setTimedOut(false);
    if (!targetId) return;

    const timer = window.setTimeout(() => setTimedOut(true), MISSING_TARGET_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [targetId]);

  if (targetId && !anchorEl && !timedOut) {
    return null;
  }

  if (!anchorEl) {
    return (
      <Box data-testid="OnboardingRoot" sx={FALLBACK_SX}>
        {children}
      </Box>
    );
  }

  return (
    <Popper
      open
      anchorEl={anchorEl}
      placement={placement}
      strategy="fixed"
      modifiers={[
        { name: "offset", options: { offset: [0, 16] } },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["bottom-start", "top-start", "left-start", "bottom"],
          },
        },
        { name: "preventOverflow", options: { padding: 16 } },
      ]}
      sx={{ zIndex: 1500, pointerEvents: "auto" }}
    >
      <Box data-testid="OnboardingRoot">{children}</Box>
    </Popper>
  );
};
