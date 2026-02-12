import "@testing-library/jest-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { act, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QRGenerator } from "./QRGenerator";
import { User } from "@/types";
import { expect } from "@jest/globals";
import QRCode from "qrcode";

// Mock QRCode module
jest.mock("qrcode", () => ({
  toDataURL: jest.fn(),
}));

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement, mode: "light" | "dark" = "light") => {
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Helper function to create mock User
const createMockUser = (overrides?: Partial<User>): User => ({
  id: "user-1",
  name: "John Doe",
  displayEmail: "john@example.com",
  location: "San Francisco, CA",
  title: "Software Engineer",
  summary: "Test summary",
  ...overrides,
});

describe("QRGenerator Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render section heading when QR code is loading", async () => {
      (QRCode.toDataURL as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => setTimeout(() => resolve("data:image/png;base64,test"), 100)),
      );

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      expect(screen.getByText("Share Your Resume")).toBeInTheDocument();

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 150));
      });
    });

    it("should render QR code image when generation succeeds", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        const img = screen.getByAltText("QR Code to share resume");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", mockDataURL);
      });
    });

    it("should render download button when QR code is generated", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Download QR Code")).toBeInTheDocument();
      });
    });

    it("should render instruction text when QR code is generated", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Scan with your phone to view this resume")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error message when QR code generation fails", async () => {
      (QRCode.toDataURL as jest.Mock).mockRejectedValue(new Error("Generation failed"));

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Failed to generate QR code")).toBeInTheDocument();
      });
    });

    it("should not render QR code image when error occurs", async () => {
      (QRCode.toDataURL as jest.Mock).mockRejectedValue(new Error("Generation failed"));

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Failed to generate QR code")).toBeInTheDocument();
      });

      expect(screen.queryByAltText("QR Code to share resume")).not.toBeInTheDocument();
      expect(screen.queryByText("Download QR Code")).not.toBeInTheDocument();
    });
  });

  describe("QR Code Generation", () => {
    it("should call QRCode.toDataURL with correct parameters for light theme", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const url = "https://example.com/resume";
      renderWithTheme(<QRGenerator url={url} />, "light");
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledWith(url, {
          width: 150,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
          errorCorrectionLevel: "M",
        });
      });
    });

    it("should call QRCode.toDataURL with correct parameters for dark theme", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const url = "https://example.com/resume";
      renderWithTheme(<QRGenerator url={url} />, "dark");
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledWith(url, {
          width: 150,
          margin: 2,
          color: {
            dark: "#f8fafc",
            light: "#000000",
          },
          errorCorrectionLevel: "M",
        });
      });
    });

    it("should regenerate QR code when URL changes", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const { rerender } = renderWithTheme(<QRGenerator url="https://example.com/resume1" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledTimes(1);
      });

      const theme = createTheme({ palette: { mode: "light" } });
      rerender(
        <ThemeProvider theme={theme}>
          <QRGenerator url="https://example.com/resume2" />
        </ThemeProvider>,
      );
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledTimes(2);
      });
    });

    it("should regenerate QR code when theme mode changes", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const { rerender } = renderWithTheme(
        <QRGenerator url="https://example.com/resume" />,
        "light",
      );
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledTimes(1);
      });

      const darkTheme = createTheme({ palette: { mode: "dark" } });
      rerender(
        <ThemeProvider theme={darkTheme}>
          <QRGenerator url="https://example.com/resume" />
        </ThemeProvider>,
      );
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledTimes(2);
      });
    });

    it("should not generate QR code when URL is empty", async () => {
      renderWithTheme(<QRGenerator url="" />);

      // Wait a bit to ensure no async call is made
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(QRCode.toDataURL).not.toHaveBeenCalled();
    });
  });

  describe("Download Functionality", () => {
    it("should download QR code with user name when user is provided", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const user = createMockUser({ name: "Jane Smith" });
      const mockClick = jest.fn();
      const mockLink = {
        href: "",
        download: "",
        click: mockClick,
      };

      renderWithTheme(<QRGenerator url="https://example.com/resume" user={user} />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Download QR Code")).toBeInTheDocument();
      });

      const createElementSpy = jest
        .spyOn(document, "createElement")
        .mockReturnValue(mockLink as any);
      const appendChildSpy = jest
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => mockLink as any);
      const removeChildSpy = jest
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => mockLink as any);

      const downloadButton = screen.getByText("Download QR Code");
      fireEvent.click(downloadButton);

      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(mockLink.href).toBe(mockDataURL);
      expect(mockLink.download).toBe("Jane Smith-resume.png");
      expect(mockClick).toHaveBeenCalled();

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });

    it("should download QR code with default filename when user is not provided", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const mockClick = jest.fn();
      const mockLink = {
        href: "",
        download: "",
        click: mockClick,
      };

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Download QR Code")).toBeInTheDocument();
      });

      const createElementSpy = jest
        .spyOn(document, "createElement")
        .mockReturnValue(mockLink as any);
      const appendChildSpy = jest
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => mockLink as any);
      const removeChildSpy = jest
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => mockLink as any);

      const downloadButton = screen.getByText("Download QR Code");
      fireEvent.click(downloadButton);

      // Component uses `${user?.name || "resume"}-resume.png`, so when user is not provided, it becomes "resume-resume.png"
      expect(mockLink.download).toBe("resume-resume.png");
      expect(mockClick).toHaveBeenCalled();

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });

    it("should download QR code with default filename when user name is null", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const user = createMockUser({ name: null });
      const mockClick = jest.fn();
      const mockLink = {
        href: "",
        download: "",
        click: mockClick,
      };

      renderWithTheme(<QRGenerator url="https://example.com/resume" user={user} />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Download QR Code")).toBeInTheDocument();
      });

      const createElementSpy = jest
        .spyOn(document, "createElement")
        .mockReturnValue(mockLink as any);
      const appendChildSpy = jest
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => mockLink as any);
      const removeChildSpy = jest
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => mockLink as any);

      const downloadButton = screen.getByText("Download QR Code");
      fireEvent.click(downloadButton);

      // Component uses `${user?.name || "resume"}-resume.png`, so when user.name is null, it becomes "resume-resume.png"
      expect(mockLink.download).toBe("resume-resume.png");

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });

    it("should append and remove link element from document body", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const mockClick = jest.fn();
      const mockLink = {
        href: "",
        download: "",
        click: mockClick,
      };

      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Download QR Code")).toBeInTheDocument();
      });

      const createElementSpy = jest
        .spyOn(document, "createElement")
        .mockReturnValue(mockLink as any);
      const appendChildSpy = jest
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => mockLink as any);
      const removeChildSpy = jest
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => mockLink as any);

      const downloadButton = screen.getByText("Download QR Code");
      fireEvent.click(downloadButton);

      expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
      expect(removeChildSpy).toHaveBeenCalledWith(mockLink);

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });

    it("should not download when QR code is not generated", async () => {
      (QRCode.toDataURL as jest.Mock).mockImplementation(
        () => new Promise(() => {}),
      );
      renderWithTheme(<QRGenerator url="https://example.com/resume" />);
      await act(async () => {
        await Promise.resolve();
      });

      // Button shouldn't be visible while QR is still loading
      expect(screen.queryByText("Download QR Code")).not.toBeInTheDocument();
    });
  });

  describe("Theme Support", () => {
    it("should render correctly in light theme", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const { container } = renderWithTheme(
        <QRGenerator url="https://example.com/resume" />,
        "light",
      );
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Share Your Resume")).toBeInTheDocument();
      });

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render correctly in dark theme", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const { container } = renderWithTheme(
        <QRGenerator url="https://example.com/resume" />,
        "dark",
      );
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Share Your Resume")).toBeInTheDocument();
      });

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty URL gracefully", async () => {
      renderWithTheme(<QRGenerator url="" />);

      // Wait to ensure no async operations occur
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(QRCode.toDataURL).not.toHaveBeenCalled();
      expect(screen.getByText("Share Your Resume")).toBeInTheDocument();
    });

    it("should handle very long URLs", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const longUrl = "https://example.com/resume?" + "a".repeat(1000);
      renderWithTheme(<QRGenerator url={longUrl} />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledWith(longUrl, expect.any(Object));
      });
    });

    it("should handle special characters in URL", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const specialUrl = "https://example.com/resume?name=John%20Doe&id=123";
      renderWithTheme(<QRGenerator url={specialUrl} />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(QRCode.toDataURL).toHaveBeenCalledWith(specialUrl, expect.any(Object));
      });
    });

    it("should handle special characters in user name for download filename", async () => {
      const mockDataURL = "data:image/png;base64,mockQRCodeData";
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockDataURL);

      const user = createMockUser({ name: "John O'Brien-Smith" });
      const mockClick = jest.fn();
      const mockLink = {
        href: "",
        download: "",
        click: mockClick,
      };

      renderWithTheme(<QRGenerator url="https://example.com/resume" user={user} />);
      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText("Download QR Code")).toBeInTheDocument();
      });

      const createElementSpy = jest
        .spyOn(document, "createElement")
        .mockReturnValue(mockLink as any);
      const appendChildSpy = jest
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => mockLink as any);
      const removeChildSpy = jest
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => mockLink as any);

      const downloadButton = screen.getByText("Download QR Code");
      fireEvent.click(downloadButton);

      expect(mockLink.download).toBe("John O'Brien-Smith-resume.png");

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });
  });
});
