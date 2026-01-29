import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ExtractedUser } from "./ExtractedUser";
import { expect } from "@jest/globals";
import { ParsedResumeData } from "./types";

describe("ExtractedUser", () => {
  const mockUser: ParsedResumeData["user"] = {
    name: "John Doe",
    displayEmail: "john.doe@example.com",
    location: "New York, NY",
    title: "Software Engineer",
  };

  const mockSetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders correctly with all user fields", () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Display Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Location")).toBeInTheDocument();
      expect(screen.getByLabelText("Title")).toBeInTheDocument();
    });

    it("displays correct initial values", () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("New York, NY")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Software Engineer")).toBeInTheDocument();
    });

    it("renders with empty values", () => {
      const emptyUser: ParsedResumeData["user"] = {
        name: "",
        displayEmail: "",
        location: "",
        title: "",
      };

      render(<ExtractedUser user={emptyUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      expect(nameField).toHaveValue("");
    });
  });

  describe("Field editing", () => {
    it("updates name field on blur", async () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      fireEvent.change(nameField, { target: { value: "Jane Doe" } });
      fireEvent.blur(nameField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledTimes(1);
        expect(mockSetUser).toHaveBeenCalledWith({
          ...mockUser,
          name: "Jane Doe",
        });
      });
    });

    it("updates displayEmail field on blur", async () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const emailField = screen.getByLabelText("Display Email");
      fireEvent.change(emailField, { target: { value: "jane.doe@example.com" } });
      fireEvent.blur(emailField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledWith({
          ...mockUser,
          displayEmail: "jane.doe@example.com",
        });
      });
    });

    it("updates location field on blur", async () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const locationField = screen.getByLabelText("Location");
      fireEvent.change(locationField, { target: { value: "San Francisco, CA" } });
      fireEvent.blur(locationField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledWith({
          ...mockUser,
          location: "San Francisco, CA",
        });
      });
    });

    it("updates title field on blur", async () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const titleField = screen.getByLabelText("Title");
      fireEvent.change(titleField, { target: { value: "Senior Software Engineer" } });
      fireEvent.blur(titleField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledWith({
          ...mockUser,
          title: "Senior Software Engineer",
        });
      });
    });

    it("does not call setUser when value hasn't changed", () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      fireEvent.blur(nameField);

      expect(mockSetUser).not.toHaveBeenCalled();
    });

    it("handles multiple field updates", async () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      const emailField = screen.getByLabelText("Display Email");

      fireEvent.change(nameField, { target: { value: "Jane Doe" } });
      fireEvent.blur(nameField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledTimes(1);
      });

      fireEvent.change(emailField, { target: { value: "jane.doe@example.com" } });
      fireEvent.blur(emailField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Local state management", () => {
    it("updates local value immediately on change", () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name") as HTMLInputElement;
      fireEvent.change(nameField, { target: { value: "Jane Doe" } });

      expect(nameField.value).toBe("Jane Doe");
      expect(mockSetUser).not.toHaveBeenCalled();
    });

    it("initializes local value from prop value", () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name") as HTMLInputElement;
      expect(nameField.value).toBe("John Doe");
    });
  });

  describe("Field names", () => {
    it("generates correct name attributes for fields", () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      expect(nameField).toHaveAttribute("name", "name");

      const emailField = screen.getByLabelText("Display Email");
      expect(emailField).toHaveAttribute("name", "display-email");

      const locationField = screen.getByLabelText("Location");
      expect(locationField).toHaveAttribute("name", "location");

      const titleField = screen.getByLabelText("Title");
      expect(titleField).toHaveAttribute("name", "title");
    });
  });

  describe("Edge cases", () => {
    it("handles very long field values", async () => {
      const longValue = "A".repeat(1000);
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      fireEvent.change(nameField, { target: { value: longValue } });
      fireEvent.blur(nameField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledWith({
          ...mockUser,
          name: longValue,
        });
      });
    });

    it("handles special characters in field values", async () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      const specialValue = "John O'Brien-Smith & Co.";
      fireEvent.change(nameField, { target: { value: specialValue } });
      fireEvent.blur(nameField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledWith({
          ...mockUser,
          name: specialValue,
        });
      });
    });

    it("handles whitespace-only values", async () => {
      render(<ExtractedUser user={mockUser} setUser={mockSetUser} />);

      const nameField = screen.getByLabelText("Name");
      fireEvent.change(nameField, { target: { value: "   " } });
      fireEvent.blur(nameField);

      await waitFor(() => {
        expect(mockSetUser).toHaveBeenCalledWith({
          ...mockUser,
          name: "   ",
        });
      });
    });
  });
});
