import { expect } from "@jest/globals";
import {
  DEFAULT_PROFESSIONAL_SUMMARY_TITLE,
  getProfessionalSummaryTitle,
  plainTextToSummaryHtml,
} from "./professionalSummary";

describe("getProfessionalSummaryTitle", () => {
  it("defaults when the title is missing, blank, or whitespace", () => {
    expect(getProfessionalSummaryTitle()).toBe(DEFAULT_PROFESSIONAL_SUMMARY_TITLE);
    expect(getProfessionalSummaryTitle(null)).toBe(DEFAULT_PROFESSIONAL_SUMMARY_TITLE);
    expect(getProfessionalSummaryTitle("")).toBe(DEFAULT_PROFESSIONAL_SUMMARY_TITLE);
    expect(getProfessionalSummaryTitle("   ")).toBe(DEFAULT_PROFESSIONAL_SUMMARY_TITLE);
  });

  it("returns a custom trimmed title", () => {
    expect(getProfessionalSummaryTitle(" About Me ")).toBe("About Me");
  });
});

describe("plainTextToSummaryHtml", () => {
  it("returns null for blank input", () => {
    expect(plainTextToSummaryHtml(undefined)).toBeNull();
    expect(plainTextToSummaryHtml(null)).toBeNull();
    expect(plainTextToSummaryHtml("")).toBeNull();
    expect(plainTextToSummaryHtml("   ")).toBeNull();
  });

  it("wraps a single paragraph and escapes HTML", () => {
    expect(plainTextToSummaryHtml(" Hello <world> & co. ")).toBe(
      "<p>Hello &lt;world&gt; &amp; co.</p>",
    );
  });

  it("splits blank-line paragraphs and preserves single line breaks", () => {
    expect(plainTextToSummaryHtml("First line\nstill first\n\nSecond")).toBe(
      "<p>First line<br>still first</p><p>Second</p>",
    );
  });
});
