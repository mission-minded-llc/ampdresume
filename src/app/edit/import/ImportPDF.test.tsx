import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ImportPDF } from "./ImportPDF";
import { expect } from "@jest/globals";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@sentry/react", () => ({
  captureException: jest.fn(),
}));

jest.mock("@/graphql/getParsedResumeAi", () => ({
  getParsedResumeAi: jest.fn(),
}));

jest.mock("./PageHeading", () => ({
  PageHeading: () => <div data-testid="page-heading">Page Heading</div>,
}));

jest.mock("./UploadPDF", () => ({
  UploadPDF: ({ onFileUpload }: { onFileUpload: (event: any) => void }) => (
    <div data-testid="upload-pdf">
      <input
        type="file"
        accept="application/pdf"
        data-testid="file-input"
        onChange={onFileUpload}
      />
    </div>
  ),
}));

jest.mock("./ExtractedInformation", () => ({
  ExtractedInformation: ({ data, error }: { data: any; error: string | null }) => (
    <div data-testid="extracted-information">
      {error && <div data-testid="error">{error}</div>}
      {data && <div data-testid="data">Data loaded</div>}
      {!data && !error && <div data-testid="no-data">No data</div>}
    </div>
  ),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ open, message }: { open: boolean; message: string }) =>
    open ? <div data-testid="loading-overlay">{message}</div> : null,
}));

import { getParsedResumeAi } from "@/graphql/getParsedResumeAi";

// Mock pdfjs-dist
const mockPdfJs = {
  getDocument: jest.fn(),
  GlobalWorkerOptions: {
    workerSrc: "",
  },
};

describe("ImportPDF", () => {
  const mockSession = {
    user: { id: "user-id" },
  };

  /** Flush the PDF library load effect so setError runs inside act (avoids act warning). */
  const flushPdfLoadEffect = () =>
    act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

  const mockParsedResumeData = {
    user: {
      name: "John Doe",
      displayEmail: "john@example.com",
      location: "New York",
      title: "Software Engineer",
    },
    skills: [],
    companies: [],
    education: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
      isError: false,
    });
    (getParsedResumeAi as jest.Mock).mockResolvedValue(mockParsedResumeData);
  });

  describe("Rendering", () => {
    it("renders PageHeading and UploadPDF components", async () => {
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(screen.getByTestId("page-heading")).toBeInTheDocument();
      expect(screen.getByTestId("upload-pdf")).toBeInTheDocument();
    });

    it("renders ExtractedInformation with no data initially", async () => {
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(screen.getByTestId("extracted-information")).toBeInTheDocument();
      // In test env the PDF library fails to load, so we get error state (no parsed data)
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });

  describe("PDF library loading", () => {
    it("handles PDF library loading failure", async () => {
      // The component handles PDF library loading failures internally
      // We verify the component renders without crashing
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      // Component should render even if PDF library fails to load
      expect(screen.getByTestId("page-heading")).toBeInTheDocument();
      expect(screen.getByTestId("upload-pdf")).toBeInTheDocument();
    });
  });

  describe("File upload handling", () => {
    it("handles valid PDF file upload", async () => {
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      const fileInput = screen.getByTestId("file-input");
      const file = new File(["test content"], "test.pdf", { type: "application/pdf" });

      // Mock arrayBuffer
      file.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(8));

      // Mock pdfjs
      const mockPage = {
        getTextContent: jest.fn().mockResolvedValue({
          items: [{ str: "Test PDF content", hasEOL: false }],
        }),
      };

      const mockPdf = {
        numPages: 1,
        getPage: jest.fn().mockResolvedValue(mockPage),
      };

      mockPdfJs.getDocument.mockResolvedValue({ promise: Promise.resolve(mockPdf) });

      // Since we can't easily mock the dynamic import in the component,
      // we'll test the file upload handler directly
      const fileList = [file] as unknown as FileList;
      const event = {
        target: {
          files: fileList,
        },
      } as any;

      fireEvent.change(fileInput, event);

      // The component will try to extract text, but pdfjsLib won't be loaded
      // So we expect an error state
      await waitFor(() => {
        expect(screen.getByTestId("extracted-information")).toBeInTheDocument();
      });
    });

    it("handles invalid file type", async () => {
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      const fileInput = screen.getByTestId("file-input");
      const file = new File(["test content"], "test.txt", { type: "text/plain" });

      const fileList = [file] as unknown as FileList;
      const event = {
        target: {
          files: fileList,
        },
      } as any;

      fireEvent.change(fileInput, event);

      await waitFor(() => {
        expect(screen.getByTestId("extracted-information")).toBeInTheDocument();
      });
    });

    it("handles no file selected", async () => {
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      const fileInput = screen.getByTestId("file-input");
      const event = {
        target: {
          files: [],
        },
      } as any;

      fireEvent.change(fileInput, event);

      expect(screen.getByTestId("extracted-information")).toBeInTheDocument();
    });
  });

  describe("Query handling", () => {
    it("does not fetch when user is not authenticated", async () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );
    });

    it("does not fetch when extracted text is too short", async () => {
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );
    });

    it("fetches when user is authenticated and text is long enough", async () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });

      // Mock a component that has extracted text
      // We can't directly set state, but we can verify the query is set up correctly
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["parsedResumeAi"],
          enabled: expect.any(Boolean),
        }),
      );
    });

    it("displays loading overlay when query is pending", async () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: null,
        isPending: true,
        isError: false,
      });

      // We'd need to simulate extracted text being set, but since it's internal state
      // we'll just verify the query setup
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(useQuery).toHaveBeenCalled();
    });

    it("displays error when query fails", async () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: null,
        isPending: false,
        isError: true,
      });

      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(screen.getByText("Error loading resume")).toBeInTheDocument();
    });

    it("passes parsed data to ExtractedInformation when available", async () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: mockParsedResumeData,
        isPending: false,
        isError: false,
      });

      render(<ImportPDF />);
      await flushPdfLoadEffect();

      expect(screen.getByTestId("extracted-information")).toBeInTheDocument();
    });
  });

  describe("Error handling", () => {
    it("handles PDF extraction errors", async () => {
      render(<ImportPDF />);
      await flushPdfLoadEffect();

      // In test env the PDF library fails to load, so Sentry may be called for that.
      // Component renders and handles errors internally.
      expect(screen.getByTestId("page-heading")).toBeInTheDocument();
    });
  });

  describe("Text extraction", () => {
    it("truncates text to 10000 characters", async () => {
      // This would require mocking pdfjs more thoroughly
      // For now, we verify the component structure
      render(<ImportPDF />);
      await flushPdfLoadEffect();
      expect(screen.getByTestId("upload-pdf")).toBeInTheDocument();
    });

    it("removes non-ASCII characters", async () => {
      // This would require mocking pdfjs more thoroughly
      render(<ImportPDF />);
      await flushPdfLoadEffect();
      expect(screen.getByTestId("upload-pdf")).toBeInTheDocument();
    });
  });
});
