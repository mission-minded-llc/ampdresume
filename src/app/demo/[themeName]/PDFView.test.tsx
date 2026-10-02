import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { themeDavidsSampleData } from "@/theme/davids/sampleData";
import { themeLegalSampleData } from "@/theme/legal/sampleData";
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

const renderPDFView = async (themeName: "default" | "davids" | "times" | "legal" = "default") => {
  render(<PDFView themeName={themeName} />);
  await waitFor(() => expect(screen.getByRole("button", { name: "Generate PDF" })).toBeEnabled());
};

describe("PDFView", () => {
  it("renders the component with Generate PDF button", async () => {
    await renderPDFView();
    expect(screen.getByText("Generate PDF")).toBeInTheDocument();
    expect(screen.getByTestId("demo-resume-tag")).toHaveTextContent("Demo");
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

  it("falls back to the Classic PDF view for web themes without a matching PDF", async () => {
    await renderPDFView("davids");
    expect(screen.getByText(themeDavidsSampleData.data.resume.user.name!)).toBeInTheDocument();
    expect(screen.getByLabelText("PDF Theme")).toHaveTextContent("Classic");
  });

  it("renders the Times PDF view when requested", async () => {
    await renderPDFView("times");
    expect(screen.getByTestId("pdf-theme-times")).toBeInTheDocument();
    expect(screen.getByText(themeDefaultSampleData.data.resume.user.name!)).toBeInTheDocument();
  });

  it("renders the Legal PDF view with the legal example", async () => {
    await renderPDFView("legal");
    expect(screen.getByTestId("pdf-theme-legal")).toBeInTheDocument();
    expect(screen.getByLabelText("PDF Theme")).toHaveTextContent("Legal");
    expect(screen.getByText("Curriculum Vitae")).toBeInTheDocument();
    expect(screen.getByText(themeLegalSampleData.data.resume.user.name!)).toBeInTheDocument();
    expect(
      screen.queryByText(themeLegalSampleData.data.resume.user.displayEmail as string),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
  });

  it("switches the print layout immediately and keeps the route's example", async () => {
    await renderPDFView("legal");

    fireEvent.mouseDown(screen.getByLabelText("PDF Theme"));
    fireEvent.click(screen.getByRole("option", { name: /^Classic$/ }));

    expect(screen.queryByTestId("pdf-theme-legal")).not.toBeInTheDocument();
    expect(screen.getByText(themeLegalSampleData.data.resume.user.name!)).toBeInTheDocument();
  });
});
