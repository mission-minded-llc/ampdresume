"use client";

import { createContext, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { setThemeAppearanceCookie } from "@/lib/themeAppearanceCookie";

export type ThemeAppearance = "dark" | "light";

interface ThemeAppearanceContextValue {
  themeAppearance: ThemeAppearance;
  setThemeAppearance: React.Dispatch<SetStateAction<ThemeAppearance>>;
}

export const ThemeAppearanceContext = createContext<ThemeAppearanceContextValue>({
  themeAppearance: "light",
  setThemeAppearance: () => {},
});

export const ThemeAppearanceProvider = ({
  children,
  initialThemeAppearance,
}: {
  children?: React.ReactNode;
  initialThemeAppearance?: ThemeAppearance;
}) => {
  const [themeAppearance, setThemeAppearanceState] = useState<ThemeAppearance>(
    initialThemeAppearance ?? "light",
  );
  const themeAppearanceRef = useRef(themeAppearance);
  const hasStoredPreference = useRef(Boolean(initialThemeAppearance));

  themeAppearanceRef.current = themeAppearance;

  const setThemeAppearance = useCallback((value: SetStateAction<ThemeAppearance>) => {
    const next = typeof value === "function" ? value(themeAppearanceRef.current) : value;
    hasStoredPreference.current = true;
    setThemeAppearanceCookie(next);
    setThemeAppearanceState(next);
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = themeAppearance;
  }, [themeAppearance]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemPreference = (matches: boolean) => {
      if (hasStoredPreference.current) return;
      setThemeAppearanceState(matches ? "dark" : "light");
    };

    applySystemPreference(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      applySystemPreference(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <ThemeAppearanceContext.Provider value={{ themeAppearance, setThemeAppearance }}>
      {children}
    </ThemeAppearanceContext.Provider>
  );
};
