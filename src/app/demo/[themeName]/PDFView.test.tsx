import { render, screen, waitFor } from "@testing-library/react";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { PDFView } from "./PDFView";
import { expect } from "@jest/globals";

jest.mock("html2pdf.js", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    outputPdf: jest.fn(() => Promise.resolve("mock-pdf-url")),
  })),
}));

const renderPDFView = async (themeName: "default" = "default") => {
  render(<PDFView themeName={themeName} />);
  await waitFor(() => expect(screen.getByRole("button", { name: "Generate PDF" })).toBeEnabled());
};

describe("PDFView", () => {
  it("renders the component with Generate PDF button", async () => {
    await renderPDFView();
    expect(screen.getByText("Generate PDF")).toBeInTheDocument();
  });

  it("renders the default theme template", async () => {
    await renderPDFView();
    expect(screen.getByText(themeDefaultSampleData.data.resume.user.name!)).toBeInTheDocument();
    expect(
      screen.queryByText(themeDefaultSampleData.data.resume.user.displayEmail as string),
    ).not.toBeInTheDocument();
  });

  it("enables the Generate PDF button after html2pdf loads", async () => {
    await renderPDFView();
    expect(screen.getByRole("button", { name: "Generate PDF" })).toBeEnabled();
  });

  it("handles different theme names correctly", async () => {
    await renderPDFView();
    expect(screen.getByText(themeDefaultSampleData.data.resume.user.name!)).toBeInTheDocument();
  });
});
