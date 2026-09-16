import { afterEach, describe, expect, it } from "@jest/globals";
import {
  parseThemeAppearance,
  setThemeAppearanceCookie,
  THEME_APPEARANCE_COOKIE_NAME,
} from "./themeAppearanceCookie";

function clearCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name) {
      document.cookie = `${name}=; Max-Age=0; Path=/`;
    }
  });
}

describe("themeAppearanceCookie", () => {
  afterEach(() => {
    clearCookies();
  });

  describe("parseThemeAppearance", () => {
    it("returns light or dark values", () => {
      expect(parseThemeAppearance("light")).toBe("light");
      expect(parseThemeAppearance("dark")).toBe("dark");
    });

    it("ignores missing or invalid values", () => {
      expect(parseThemeAppearance(undefined)).toBeUndefined();
      expect(parseThemeAppearance(null)).toBeUndefined();
      expect(parseThemeAppearance("")).toBeUndefined();
      expect(parseThemeAppearance("system")).toBeUndefined();
    });
  });

  describe("setThemeAppearanceCookie", () => {
    it("writes the theme appearance cookie", () => {
      setThemeAppearanceCookie("dark");

      expect(document.cookie).toContain(`${THEME_APPEARANCE_COOKIE_NAME}=dark`);
    });

    it("overwrites a previous theme appearance cookie", () => {
      setThemeAppearanceCookie("dark");
      setThemeAppearanceCookie("light");

      expect(document.cookie).toContain(`${THEME_APPEARANCE_COOKIE_NAME}=light`);
      expect(document.cookie).not.toContain(`${THEME_APPEARANCE_COOKIE_NAME}=dark`);
    });
  });
});
