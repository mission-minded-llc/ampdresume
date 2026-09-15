import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import {
  readTourRect,
  rectsEqual,
  useSettledTourTargetRect,
  useTourTargetRect,
} from "./tourTarget";

const mockRect = {
  width: 40,
  height: 40,
  top: 12,
  left: 16,
  bottom: 52,
  right: 56,
  x: 16,
  y: 12,
  toJSON: () => {},
};

describe("tourTarget", () => {
  afterEach(() => {
    document.querySelectorAll("[data-tour-id]").forEach((el) => el.remove());
  });

  it("reads the viewport rect for a tour target", () => {
    const target = document.createElement("div");
    target.setAttribute("data-tour-id", "nav-menu-button");
    Object.defineProperty(target, "getBoundingClientRect", { value: () => mockRect });
    document.body.appendChild(target);

    expect(readTourRect("nav-menu-button")).toEqual({
      top: 12,
      left: 16,
      width: 40,
      height: 40,
      right: 56,
      bottom: 52,
    });
  });

  it("returns null when the target is missing or has no size", () => {
    expect(readTourRect("missing")).toBeNull();

    const target = document.createElement("div");
    target.setAttribute("data-tour-id", "empty");
    Object.defineProperty(target, "getBoundingClientRect", {
      value: () => ({ ...mockRect, width: 0, height: 0, right: 16, bottom: 12 }),
    });
    document.body.appendChild(target);

    expect(readTourRect("empty")).toBeNull();
  });

  it("compares rects by position and size", () => {
    const rect = { top: 1, left: 2, width: 3, height: 4, right: 5, bottom: 5 };
    expect(rectsEqual(rect, { ...rect })).toBe(true);
    expect(rectsEqual(rect, { ...rect, top: 9 })).toBe(false);
    expect(rectsEqual(null, null)).toBe(true);
    expect(rectsEqual(rect, null)).toBe(false);
  });

  it("tracks the target rect from a hook", () => {
    const target = document.createElement("div");
    target.setAttribute("data-tour-id", "import-pdf");
    Object.defineProperty(target, "getBoundingClientRect", { value: () => mockRect });
    document.body.appendChild(target);

    const { result } = renderHook(() => useTourTargetRect("import-pdf"));

    expect(result.current).toEqual({
      top: 12,
      left: 16,
      width: 40,
      height: 40,
      right: 56,
      bottom: 52,
    });
  });

  it("does not settle the rect until the target has stopped moving", async () => {
    const target = document.createElement("div");
    target.setAttribute("data-tour-id", "import-pdf");
    Object.defineProperty(target, "getBoundingClientRect", { value: () => mockRect });
    document.body.appendChild(target);

    const { result } = renderHook(() => useSettledTourTargetRect("import-pdf"));

    expect(result.current).toBeNull();
    await waitFor(() => {
      expect(result.current).toEqual({
        top: 12,
        left: 16,
        width: 40,
        height: 40,
        right: 56,
        bottom: 52,
      });
    });
  });
});
