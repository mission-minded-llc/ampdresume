"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export type TourRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
};

/** Time the target must stay still before the coach card appears. */
export const TARGET_SETTLE_MS = 200;

export const queryTourElement = (targetId: string) =>
  document.querySelector(`[data-tour-id="${targetId}"]`);

export const readTourRect = (targetId: string): TourRect | null => {
  const el = queryTourElement(targetId);
  if (!el) return null;

  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    right: rect.right,
    bottom: rect.bottom,
  };
};

export const rectsEqual = (a: TourRect | null, b: TourRect | null) => {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
};

/**
 * Tracks the viewport rect of `[data-tour-id={targetId}]` as the layout moves.
 */
export const useTourTargetRect = (targetId: string | undefined) => {
  const [rect, setRect] = useState<TourRect | null>(null);

  useLayoutEffect(() => {
    if (!targetId) {
      setRect(null);
      return;
    }

    const update = () => {
      const next = readTourRect(targetId);
      setRect((prev) => (rectsEqual(prev, next) ? prev : next));
    };

    update();
    queryTourElement(targetId)?.scrollIntoView?.({ block: "nearest", inline: "nearest" });

    const interval = window.setInterval(update, 120);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [targetId]);

  return rect;
};

/**
 * Like `useTourTargetRect`, but only returns a rect after it has stopped moving.
 * Used so the coach card does not track the nav drawer while it is opening.
 */
export const useSettledTourTargetRect = (targetId: string | undefined) => {
  const liveRect = useTourTargetRect(targetId);
  const [settledRect, setSettledRect] = useState<TourRect | null>(null);

  useEffect(() => {
    setSettledRect(null);
  }, [targetId]);

  useEffect(() => {
    if (!targetId || !liveRect) return;

    const timer = window.setTimeout(() => setSettledRect(liveRect), TARGET_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [targetId, liveRect]);

  return settledRect;
};
