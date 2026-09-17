import { expect } from "@jest/globals";
import {
  DEFAULT_PROFESSIONAL_SUMMARY_TITLE,
  getProfessionalSummaryTitle,
  hasRichTextContent,
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

describe("hasRichTextContent", () => {
  it("is false for empty or placeholder HTML", () => {
    expect(hasRichTextContent(undefined)).toBe(false);
    expect(hasRichTextContent(null)).toBe(false);
    expect(hasRichTextContent("")).toBe(false);
    expect(hasRichTextContent("   ")).toBe(false);
    expect(hasRichTextContent("<p></p>")).toBe(false);
    expect(hasRichTextContent("<p><br></p>")).toBe(false);
    expect(hasRichTextContent("<p>&nbsp;</p>")).toBe(false);
  });

  it("is true when visible text remains", () => {
    expect(hasRichTextContent("Plain summary")).toBe(true);
    expect(hasRichTextContent("<p>Hello <strong>world</strong></p>")).toBe(true);
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
