import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import html2pdf from "html2pdf.js";
import { paginatePdfContent } from "@/lib/paginatePdfContent";
import { PdfDocumentFrame } from "./PdfDocumentFrame";

jest.mock("html2pdf.js", () => {
  const outputPdf = jest.fn().mockResolvedValue("blob:pdf");
  const set = jest.fn().mockReturnValue({ outputPdf });
  const from = jest.fn().mockReturnValue({ set });
  const create = jest.fn(() => ({ from, set, outputPdf }));
  return {
    __esModule: true,
    default: Object.assign(create, { outputPdf, set, from }),
  };
});

jest.mock("@/lib/paginatePdfContent", () => {
  const actual = jest.requireActual("@/lib/paginatePdfContent");
  return {
    ...actual,
    paginatePdfContent: jest.fn(),
  };
});

type Html2PdfMock = jest.Mock & {
  outputPdf: jest.Mock;
  set: jest.Mock;
  from: jest.Mock;
};

const html2pdfMock = html2pdf as unknown as Html2PdfMock;

describe("PdfDocumentFrame", () => {
  const originalOpen = window.open;

  beforeEach(() => {
    jest.clearAllMocks();
    html2pdfMock.outputPdf.mockResolvedValue("blob:pdf");
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = originalOpen;
  });

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

  it("paginates the cloned resume before slicing pages", async () => {
    render(
      <PdfDocumentFrame>
        <div data-pdf-unit="">Resume body</div>
      </PdfDocumentFrame>,
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Generate PDF" })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole("button", { name: "Generate PDF" }));

    await waitFor(() => {
      expect(html2pdfMock.outputPdf).toHaveBeenCalledWith("bloburl");
    });

    const options = html2pdfMock.set.mock.calls[0][0] as {
      pagebreak: { mode: string[] };
      html2canvas: { onclone: (doc: Document, element?: HTMLElement) => void };
    };
    expect(options.pagebreak).toEqual({ mode: [] });

    const clonedRoot = document.createElement("div");
    options.html2canvas.onclone(document, clonedRoot);
    expect(paginatePdfContent as jest.Mock).toHaveBeenCalledWith(clonedRoot);
    expect(window.open).toHaveBeenCalledWith("blob:pdf", "_blank");
  });
});
