import { expect } from "@jest/globals";
import {
  anyPlacementFitsViewport,
  coachCardWidthForViewport,
  placementFitsViewport,
} from "./placement";

const drawerRect = {
  top: 0,
  left: 0,
  width: 250,
  height: 420,
  right: 250,
  bottom: 420,
};

const menuButtonRect = {
  top: 20,
  left: 16,
  width: 48,
  height: 48,
  right: 64,
  bottom: 68,
};

describe("placementFitsViewport", () => {
  it("rejects right-start beside the nav drawer on a phone", () => {
    expect(placementFitsViewport(drawerRect, "right-start", 375, 667)).toBe(false);
  });

  it("allows right-start beside the nav drawer on a wide desktop", () => {
    expect(placementFitsViewport(drawerRect, "right-start", 1280, 800)).toBe(true);
  });

  it("rejects right-start of the menu button when the card is full viewport width", () => {
    expect(placementFitsViewport(menuButtonRect, "right-start", 375, 667)).toBe(false);
  });

  it("allows right-start of the menu button on desktop", () => {
    expect(placementFitsViewport(menuButtonRect, "right-start", 1280, 800)).toBe(true);
  });

  it("rejects bottom placement when the target already fills most of the height", () => {
    expect(placementFitsViewport(drawerRect, "bottom-start", 375, 667)).toBe(false);
  });
});

describe("anyPlacementFitsViewport", () => {
  it("finds no on-screen placement for the drawer on a phone", () => {
    expect(anyPlacementFitsViewport(drawerRect, "right-start", 375, 667)).toBe(false);
  });

  it("can still place the menu card below the button on a phone", () => {
    expect(anyPlacementFitsViewport(menuButtonRect, "right-start", 375, 667)).toBe(true);
  });
});

describe("coachCardWidthForViewport", () => {
  it("uses nearly the full phone width and caps at 420 on larger screens", () => {
    expect(coachCardWidthForViewport(375)).toBe(343);
    expect(coachCardWidthForViewport(1024)).toBe(420);
  });
});
