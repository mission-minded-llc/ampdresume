import { render } from "@testing-library/react";
import { titleSuffix } from "@/constants";
import { ThemeName } from "@/types";
import Page, { generateMetadata } from "./page";
import { expect } from "@jest/globals";

// Mock the PDFView component since we don't need to test its implementation
jest.mock("../PDFView", () => ({
  PDFView: ({ themeName }: { themeName: ThemeName }) => (
    <div data-testid="pdf-view">PDF View for {themeName}</div>
  ),
}));

describe("PDF Theme Page", () => {
  const mockParams = Promise.resolve({ themeName: "default" as ThemeName });

  describe("Page component", () => {
    it("renders PDFView with correct theme name", async () => {
      const { getByTestId } = render(await Page({ params: mockParams }));
      const pdfView = getByTestId("pdf-view");
      expect(pdfView).toHaveTextContent("PDF View for default");
    });
  });

  describe("generateMetadata", () => {
    it("generates metadata from the independent PDF catalog", async () => {
      const metadata = await generateMetadata({ params: mockParams });

      expect(metadata.title).toBe(`PDF Theme: Classic ${titleSuffix}`);
      expect(metadata.description).toContain("print-optimized");
    });

    it("uses Classic PDF metadata even when nested under a web theme without its own PDF view", async () => {
      const customThemeParams = Promise.resolve({
        themeName: "davids" as ThemeName,
      });
      const metadata = await generateMetadata({ params: customThemeParams });

      expect(metadata.title).toBe(`PDF Theme: Classic ${titleSuffix}`);
    });
  });
});
