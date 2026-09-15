import { OnboardingPlacement } from "./steps";
import { TourRect } from "./tourTarget";

export const VIEWPORT_PADDING = 16;
export const PLACEMENT_GAP = 16;
export const COACH_CARD_WIDTH_SM = 420;
export const SM_BREAKPOINT_PX = 600;
/** Conservative height used to decide if top/bottom Popper placement would overflow. */
export const ESTIMATED_COACH_CARD_HEIGHT = 240;

export const coachCardWidthForViewport = (viewportWidth: number) =>
  Math.min(
    viewportWidth < SM_BREAKPOINT_PX ? viewportWidth - VIEWPORT_PADDING * 2 : COACH_CARD_WIDTH_SM,
    viewportWidth - VIEWPORT_PADDING * 2,
  );

const FALLBACK_PLACEMENTS: OnboardingPlacement[] = [
  "bottom-start",
  "top-start",
  "left-start",
  "bottom",
  "right",
];

/**
 * Whether the coach card can sit in `placement` relative to `rect` without
 * leaving the viewport. Used to pin the card to the bottom of the screen on
 * narrow viewports (e.g. step 3 next to the open nav drawer).
 */
export const placementFitsViewport = (
  rect: TourRect,
  placement: OnboardingPlacement,
  viewportWidth: number,
  viewportHeight: number,
): boolean => {
  const width = coachCardWidthForViewport(viewportWidth);
  const height = ESTIMATED_COACH_CARD_HEIGHT;
  const gutter = PLACEMENT_GAP + VIEWPORT_PADDING;

  if (placement.startsWith("right")) {
    return rect.right + gutter + width <= viewportWidth;
  }
  if (placement.startsWith("left")) {
    return rect.left - gutter - width >= 0;
  }
  if (placement.startsWith("bottom")) {
    return rect.bottom + gutter + height <= viewportHeight;
  }
  if (placement.startsWith("top")) {
    return rect.top - gutter - height >= 0;
  }

  return true;
};

/** True if the preferred placement or a Popper flip target can stay on screen. */
export const anyPlacementFitsViewport = (
  rect: TourRect,
  preferred: OnboardingPlacement,
  viewportWidth: number,
  viewportHeight: number,
) => {
  const candidates = [
    preferred,
    ...FALLBACK_PLACEMENTS.filter((placement) => placement !== preferred),
  ];

  return candidates.some((placement) =>
    placementFitsViewport(rect, placement, viewportWidth, viewportHeight),
  );
};
