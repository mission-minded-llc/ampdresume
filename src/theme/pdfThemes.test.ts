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

  it("registers Times independently from web themes", () => {
    expect(pdfThemeDefinitions.times.name).toBe("Times");
    expect(pdfThemeDefinitions.times.component).toBeDefined();
  });

  it("registers Legal independently from web themes", () => {
    expect(pdfThemeDefinitions.legal.name).toBe("Legal");
    expect(pdfThemeDefinitions.legal.component).toBeDefined();
  });

  it("treats only catalog keys as PDF theme names", () => {
    expect(isPdfThemeName("default")).toBe(true);
    expect(isPdfThemeName("times")).toBe(true);
    expect(isPdfThemeName("legal")).toBe(true);
    expect(isPdfThemeName("davids")).toBe(false);
    expect(isPdfThemeName(null)).toBe(false);
    expect(isPdfThemeName(undefined)).toBe(false);
  });

  it("falls back to Classic when the stored name is missing or unknown", () => {
    expect(resolvePdfThemeName(null)).toBe(DEFAULT_PDF_THEME_NAME);
    expect(resolvePdfThemeName("retro-80s")).toBe(DEFAULT_PDF_THEME_NAME);
    expect(resolvePdfThemeName("default")).toBe("default");
    expect(resolvePdfThemeName("times")).toBe("times");
    expect(resolvePdfThemeName("legal")).toBe("legal");
  });

  it("returns the Classic definition for unknown names", () => {
    expect(getPdfThemeDefinition("missing").name).toBe("Classic");
    expect(getPdfThemeDefinition("default")).toBe(pdfThemeDefinitions.default);
    expect(getPdfThemeDefinition("times")).toBe(pdfThemeDefinitions.times);
    expect(getPdfThemeDefinition("legal")).toBe(pdfThemeDefinitions.legal);
  });
});
