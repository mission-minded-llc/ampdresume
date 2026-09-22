import { expect } from "@jest/globals";
import { resolveHtml2PdfExport } from "./loadHtml2Pdf";

describe("resolveHtml2PdfExport", () => {
  const html2pdf = jest.fn();

  it("returns a function export as-is", () => {
    expect(resolveHtml2PdfExport(html2pdf)).toBe(html2pdf);
  });

  it("unwraps a default export", () => {
    expect(resolveHtml2PdfExport({ default: html2pdf })).toBe(html2pdf);
  });

  it("unwraps a Jest/CJS double default export", () => {
    expect(resolveHtml2PdfExport({ __esModule: true, default: { default: html2pdf } })).toBe(
      html2pdf,
    );
  });

  it("throws when the export is not a function", () => {
    expect(() => resolveHtml2PdfExport({ default: {} })).toThrow(
      "html2pdf.js did not export a function",
    );
  });
});
