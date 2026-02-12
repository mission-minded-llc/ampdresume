import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserAssetInput } from "./UserAssetInput";
import { expect } from "@jest/globals";
import { uploadUserAsset } from "@/util/userAsset";
import { MAX_USER_IMAGE_SIZE } from "@/constants";

jest.mock("@/util/userAsset", () => ({
  uploadUserAsset: jest.fn(),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ open, message }: { open: boolean; message: string }) =>
    open ? <div data-testid="loading-overlay">{message}</div> : null,
}));

jest.mock("@/components/CustomDialogTitle", () => ({
  CustomDialogTitle: ({
    children,
    closeHandler,
  }: {
    children: React.ReactNode;
    closeHandler: () => void;
  }) => (
    <div data-testid="custom-dialog-title">
      <button onClick={closeHandler} data-testid="close-dialog">
        Close
      </button>
      {children}
    </div>
  ),
}));

describe("UserAssetInput", () => {
  const mockSetUrl = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (url = "", buttonType: "icon" | "button" = "icon") => {
    return render(<UserAssetInput url={url} setUrl={mockSetUrl} buttonType={buttonType} />);
  };

  describe("Rendering", () => {
    it("renders icon button by default", () => {
      renderComponent();

      expect(screen.getByLabelText("Add Image")).toBeInTheDocument();
    });

    it("renders button when buttonType is 'button'", () => {
      renderComponent("", "button");

      expect(screen.getByRole("button", { name: /Add Image/ })).toBeInTheDocument();
    });

    it("renders hidden file input", () => {
      const { container } = renderComponent();
      const fileInput = container.querySelector('input[type="file"]');

      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveStyle({ display: "none" });
    });
  });

  describe("Dialog interactions", () => {
    it("opens dialog when icon button is clicked", () => {
      renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      expect(screen.getByTestId("custom-dialog-title")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Add Image/ })).toBeInTheDocument();
    });

    it("opens dialog when button is clicked", () => {
      renderComponent("", "button");

      const buttons = screen.getAllByRole("button", { name: /Add Image/ });
      fireEvent.click(buttons[0]);

      expect(screen.getByTestId("custom-dialog-title")).toBeInTheDocument();
    });

    it("closes dialog when close button is clicked", async () => {
      renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      expect(screen.getByTestId("custom-dialog-title")).toBeInTheDocument();

      const closeButton = screen.getByTestId("close-dialog");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId("custom-dialog-title")).not.toBeInTheDocument();
      });
    });

    it("closes dialog when URL is already set and upload is clicked", async () => {
      (uploadUserAsset as jest.Mock).mockResolvedValue({
        status: 200,
        url: "https://example.com/image.jpg",
      });

      renderComponent("https://example.com/image.jpg");

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      // When URL is already set, clicking Add Image should just close the dialog
      const addButtons = screen.getAllByRole("button", { name: /Add Image/ });
      if (addButtons.length > 1) {
        fireEvent.click(addButtons[1]);
      } else {
        fireEvent.click(addButtons[0]);
      }

      await waitFor(() => {
        expect(screen.queryByTestId("custom-dialog-title")).not.toBeInTheDocument();
      });
    });
  });

  describe("URL input", () => {
    it("displays URL value in text field", () => {
      renderComponent("https://example.com/image.jpg");

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const urlInput = screen.getByLabelText("URL") as HTMLInputElement;
      expect(urlInput.value).toBe("https://example.com/image.jpg");
    });

    it("updates URL when text field changes", () => {
      renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const urlInput = screen.getByLabelText("URL") as HTMLInputElement;
      fireEvent.change(urlInput, { target: { value: "https://example.com/new.jpg" } });

      expect(mockSetUrl).toHaveBeenCalledWith("https://example.com/new.jpg");
    });
  });

  describe("File selection", () => {
    it("opens file picker when Select Image button is clicked", () => {
      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const selectButton = screen.getByRole("button", { name: /Select Image/ });
      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = jest.spyOn(fileInput, "click");

      fireEvent.click(selectButton);

      expect(clickSpy).toHaveBeenCalled();
    });

    it("displays selected file name", () => {
      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      expect(screen.getByRole("button", { name: /test-image.jpg/ })).toBeInTheDocument();
    });

    it("clears error when file is selected", () => {
      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      // Error should be cleared (no error message displayed)
      expect(screen.queryByText(/File exceeds/)).not.toBeInTheDocument();
    });
  });

  describe("File size validation", () => {
    it("shows error for file exceeding size limit", async () => {
      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const largeFile = new File(["x".repeat(MAX_USER_IMAGE_SIZE + 1)], "large-image.jpg", {
        type: "image/jpeg",
      });

      Object.defineProperty(fileInput, "files", {
        value: [largeFile],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [largeFile] } });

      await waitFor(() => {
        expect(screen.getByText("File exceeds 1MB limit.")).toBeInTheDocument();
      });
    });

    it("does not show error for file within size limit", async () => {
      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const smallFile = new File(["test"], "small-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [smallFile],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [smallFile] } });

      await waitFor(() => {
        expect(screen.queryByText(/File exceeds/)).not.toBeInTheDocument();
      });
    });
  });

  describe("Upload functionality", () => {
    it("uploads file when Add Image button is clicked", async () => {
      (uploadUserAsset as jest.Mock).mockResolvedValue({
        status: 200,
        url: "https://example.com/image.jpg",
      });

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(uploadUserAsset).toHaveBeenCalledWith(file);
      });
    });

    it("sets URL after successful upload", async () => {
      (uploadUserAsset as jest.Mock).mockResolvedValue({
        status: 200,
        url: "https://example.com/image.jpg",
      });

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(mockSetUrl).toHaveBeenCalledWith("https://example.com/image.jpg");
      });
    });

    it("closes dialog after successful upload", async () => {
      (uploadUserAsset as jest.Mock).mockResolvedValue({
        status: 200,
        url: "https://example.com/image.jpg",
      });

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.queryByTestId("custom-dialog-title")).not.toBeInTheDocument();
      });
    });

    it("displays error message on upload failure", async () => {
      (uploadUserAsset as jest.Mock).mockResolvedValue({ status: 400, error: "Upload failed" });

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Upload failed")).toBeInTheDocument();
      });
    });

    it("displays error message on upload exception", async () => {
      (uploadUserAsset as jest.Mock).mockRejectedValue(new Error("Network error"));

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText(/Upload failed: Network error/)).toBeInTheDocument();
      });
    });

    it("shows loading overlay during upload", async () => {
      (uploadUserAsset as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ status: 200, url: "https://example.com/image.jpg" }), 100),
          ),
      );

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
      expect(screen.getByText("Uploading Image...")).toBeInTheDocument();
    });
  });

  describe("Button states", () => {
    it("disables Add Image button when no URL or file is provided", () => {
      renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      expect(addButton).toBeDisabled();
    });

    it("enables Add Image button when URL is provided", () => {
      renderComponent("https://example.com/image.jpg");

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      expect(addButton).not.toBeDisabled();
    });

    it("enables Add Image button when file is selected", () => {
      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      expect(addButton).not.toBeDisabled();
    });

    it("disables Add Image button during upload", async () => {
      (uploadUserAsset as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ status: 200, url: "https://example.com/image.jpg" }), 100),
          ),
      );

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      expect(addButton).toBeDisabled();
    });
  });

  describe("Edge cases", () => {
    it("handles empty file selection", () => {
      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

      fireEvent.change(fileInput, { target: { files: null } });

      // Should not crash
      expect(screen.getByRole("button", { name: /Select Image/ })).toBeInTheDocument();
    });

    it("prevents multiple simultaneous uploads", async () => {
      let resolveUpload: (value: unknown) => void;
      (uploadUserAsset as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveUpload = resolve;
          }),
      );

      const { container } = renderComponent();

      const iconButton = screen.getByLabelText("Add Image");
      fireEvent.click(iconButton);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      Object.defineProperty(fileInput, "files", {
        value: [file],
        configurable: true,
      });

      fireEvent.change(fileInput, { target: { files: [file] } });

      const addButton = screen.getByRole("button", { name: /Add Image/ });
      await act(async () => {
        fireEvent.click(addButton);
        await Promise.resolve();
      });

      // Try to click again while upload is in progress
      fireEvent.click(addButton);

      expect(uploadUserAsset).toHaveBeenCalledTimes(1);

      await act(async () => {
        resolveUpload!({ status: 200, url: "https://example.com/image.jpg" });
        await Promise.resolve();
      });
    });
  });
});
