import { ThemeAppearance } from "@/types";

export const THEME_APPEARANCE_COOKIE_NAME = "theme-appearance";
const THEME_APPEARANCE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/**
 * Parse a stored theme appearance value, ignoring anything other than light/dark.
 */
export function parseThemeAppearance(
  value: string | undefined | null,
): ThemeAppearance | undefined {
  if (value === "light" || value === "dark") return value;
  return undefined;
}

/**
 * Persist the user's explicit light/dark preference so the next request can SSR it.
 */
export function setThemeAppearanceCookie(themeAppearance: ThemeAppearance) {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie =
    [
      `${THEME_APPEARANCE_COOKIE_NAME}=${themeAppearance}`,
      "Path=/",
      `Max-Age=${THEME_APPEARANCE_COOKIE_MAX_AGE_SECONDS}`,
      "SameSite=Lax",
    ].join("; ") + secure;
}
