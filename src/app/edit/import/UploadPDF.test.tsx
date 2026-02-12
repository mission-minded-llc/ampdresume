import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { UploadPDF } from "./UploadPDF";
import { expect } from "@jest/globals";

describe("UploadPDF", () => {
  const mockOnFileUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders correctly with all elements", () => {
      const { container } = render(<UploadPDF onFileUpload={mockOnFileUpload} />);

      expect(screen.getByText("Upload PDF")).toBeInTheDocument();
      expect(screen.getByText(/Please upload a PDF file/)).toBeInTheDocument();
      expect(screen.getByText(/The file size should not exceed 5MB/)).toBeInTheDocument();
      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
    });

    it("renders file input with correct accept attribute", () => {
      const { container } = render(<UploadPDF onFileUpload={mockOnFileUpload} />);

      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute("type", "file");
      expect(fileInput).toHaveAttribute("accept", "application/pdf");
    });
  });

  describe("File upload handling", () => {
    it("calls onFileUpload when file is selected", () => {
      const { container } = render(<UploadPDF onFileUpload={mockOnFileUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test content"], "test.pdf", { type: "application/pdf" });
      const fileList = {
        length: 1,
        0: file,
        item: (index: number) => (index === 0 ? file : null),
        [Symbol.iterator]: function* () {
          yield file;
        },
      } as unknown as FileList;

      fireEvent.change(fileInput, { target: { files: fileList } as any });

      expect(mockOnFileUpload).toHaveBeenCalledTimes(1);
      expect(mockOnFileUpload).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            files: fileList,
          }),
        }),
      );
    });

    it("handles multiple file selections", () => {
      const { container } = render(<UploadPDF onFileUpload={mockOnFileUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = new File(["test content 1"], "test1.pdf", { type: "application/pdf" });
      const file2 = new File(["test content 2"], "test2.pdf", { type: "application/pdf" });
      const fileList = {
        length: 2,
        0: file1,
        1: file2,
        item: (index: number) => (index === 0 ? file1 : index === 1 ? file2 : null),
        [Symbol.iterator]: function* () {
          yield file1;
          yield file2;
        },
      } as unknown as FileList;

      fireEvent.change(fileInput, { target: { files: fileList } as any });

      expect(mockOnFileUpload).toHaveBeenCalledTimes(1);
    });

    it("handles empty file selection", () => {
      const { container } = render(<UploadPDF onFileUpload={mockOnFileUpload} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const fileList = {
        length: 0,
        item: () => null,
        [Symbol.iterator]: function* () {
          // Empty iterator
        },
      } as unknown as FileList;

      fireEvent.change(fileInput, { target: { files: fileList } as any });

      expect(mockOnFileUpload).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has proper text content for screen readers", () => {
      render(<UploadPDF onFileUpload={mockOnFileUpload} />);

      expect(screen.getByText("Upload PDF")).toBeInTheDocument();
      expect(screen.getByText(/Please upload a PDF file/)).toBeInTheDocument();
    });
  });
});
