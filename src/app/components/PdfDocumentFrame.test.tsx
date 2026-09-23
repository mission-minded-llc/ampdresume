import { render, screen, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import { PdfDocumentFrame } from "./PdfDocumentFrame";

jest.mock("html2pdf.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("PdfDocumentFrame", () => {
  it("renders children and enables Generate PDF after html2pdf loads", async () => {
    render(
      <PdfDocumentFrame>
        <div>Resume body</div>
      </PdfDocumentFrame>,
    );

    expect(screen.getByText("Resume body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Generate PDF" })).toBeDisabled();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Generate PDF" })).toBeEnabled();
    });
  });
});
