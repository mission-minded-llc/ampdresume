import { expect } from "@jest/globals";
import { hasRichTextContent } from "./richText";

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
