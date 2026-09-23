import { expect } from "@jest/globals";
import {
  DEFAULT_PDF_THEME_NAME,
  getPdfThemeDefinition,
  isPdfThemeName,
  pdfThemeDefinitions,
  resolvePdfThemeName,
} from "./pdfThemes";

describe("pdfThemes", () => {
  it("registers Classic independently from web themes", () => {
    expect(pdfThemeDefinitions.default.name).toBe("Classic");
    expect(pdfThemeDefinitions.default.component).toBeDefined();
  });

  it("treats only catalog keys as PDF theme names", () => {
    expect(isPdfThemeName("default")).toBe(true);
    expect(isPdfThemeName("davids")).toBe(false);
    expect(isPdfThemeName(null)).toBe(false);
    expect(isPdfThemeName(undefined)).toBe(false);
  });

  it("falls back to Classic when the stored name is missing or unknown", () => {
    expect(resolvePdfThemeName(null)).toBe(DEFAULT_PDF_THEME_NAME);
    expect(resolvePdfThemeName("retro-80s")).toBe(DEFAULT_PDF_THEME_NAME);
    expect(resolvePdfThemeName("default")).toBe("default");
  });

  it("returns the Classic definition for unknown names", () => {
    expect(getPdfThemeDefinition("missing").name).toBe("Classic");
    expect(getPdfThemeDefinition("default")).toBe(pdfThemeDefinitions.default);
  });
});
