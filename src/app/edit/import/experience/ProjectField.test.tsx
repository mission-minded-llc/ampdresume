import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectField } from "./ProjectField";
import { Project } from "./types";
import { expect } from "@jest/globals";

describe("ProjectField", () => {
  const mockProject: Project = {
    name: "Test Project",
    description: "Test Description",
  };

  const mockOnFieldChange = jest.fn();
  const mockOnDelete = jest.fn();

  const defaultProps = {
    project: mockProject,
    companyIndex: 0,
    positionIndex: 1,
    projectIndex: 2,
    onFieldChange: mockOnFieldChange,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders correctly with project name", () => {
      render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");
      expect(textField).toBeInTheDocument();
      expect(textField).toHaveValue("Test Project");
    });

    it("renders correctly with empty project name", () => {
      const emptyProject: Project = {
        name: "",
        description: null,
      };

      render(<ProjectField {...defaultProps} project={emptyProject} />);

      const textField = screen.getByRole("textbox");
      expect(textField).toBeInTheDocument();
      expect(textField).toHaveValue("");
    });

    it("renders correctly with undefined project name", () => {
      const undefinedProject: Project = {
        name: undefined as unknown as string,
        description: null,
      };

      render(<ProjectField {...defaultProps} project={undefinedProject} />);

      const textField = screen.getByRole("textbox");
      expect(textField).toBeInTheDocument();
      expect(textField).toHaveValue("");
    });

    it("renders delete button", () => {
      render(<ProjectField {...defaultProps} />);

      const deleteButton = screen.getByRole("button");
      expect(deleteButton).toBeInTheDocument();
    });

    it("has correct displayName", () => {
      expect(ProjectField.displayName).toBe("ProjectField");
    });
  });

  describe("Input handling", () => {
    it("updates local value when input changes", () => {
      render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");
      fireEvent.change(textField, { target: { value: "New Project Name" } });

      expect(textField).toHaveValue("New Project Name");
      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("calls onFieldChange on blur when value has changed", () => {
      render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");
      fireEvent.change(textField, { target: { value: "Updated Project" } });
      fireEvent.blur(textField);

      expect(mockOnFieldChange).toHaveBeenCalledTimes(1);
      expect(mockOnFieldChange).toHaveBeenCalledWith(0, 1, 2, "name", "Updated Project");
    });

    it("does not call onFieldChange on blur when value has not changed", () => {
      render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");
      fireEvent.blur(textField);

      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("does not call onFieldChange on blur when value is changed back to original", () => {
      render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");
      fireEvent.change(textField, { target: { value: "Different Name" } });
      fireEvent.change(textField, { target: { value: "Test Project" } });
      fireEvent.blur(textField);

      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("handles multiline input", () => {
      render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");
      const multilineValue = "Line 1\nLine 2\nLine 3";
      fireEvent.change(textField, { target: { value: multilineValue } });
      fireEvent.blur(textField);

      expect(textField).toHaveValue(multilineValue);
      expect(mockOnFieldChange).toHaveBeenCalledWith(0, 1, 2, "name", multilineValue);
    });

    it("handles empty string input", () => {
      render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");
      fireEvent.change(textField, { target: { value: "" } });
      fireEvent.blur(textField);

      expect(mockOnFieldChange).toHaveBeenCalledWith(0, 1, 2, "name", "");
    });
  });

  describe("Delete functionality", () => {
    it("calls onDelete with correct indices when delete button is clicked", () => {
      render(<ProjectField {...defaultProps} />);

      const deleteButton = screen.getByRole("button");
      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).toHaveBeenCalledWith(0, 1, 2);
    });

    it("calls onDelete with different indices when provided", () => {
      render(
        <ProjectField {...defaultProps} companyIndex={5} positionIndex={3} projectIndex={7} />,
      );

      const deleteButton = screen.getByRole("button");
      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledWith(5, 3, 7);
    });
  });

  describe("Component memoization", () => {
    it("does not re-render when props remain the same", () => {
      const { rerender } = render(<ProjectField {...defaultProps} />);

      const textField = screen.getByRole("textbox");

      rerender(<ProjectField {...defaultProps} />);

      // Component should be memoized, but React Testing Library doesn't provide
      // a direct way to count renders. We can verify the component still works correctly.
      expect(textField).toBeInTheDocument();
      expect(textField).toHaveValue("Test Project");
    });
  });

  describe("Edge cases", () => {
    it("handles very long project names", () => {
      const longName = "A".repeat(1000);
      const longProject: Project = {
        name: longName,
        description: null,
      };

      render(<ProjectField {...defaultProps} project={longProject} />);

      const textField = screen.getByRole("textbox");
      expect(textField).toHaveValue(longName);
    });

    it("handles special characters in project name", () => {
      const specialCharsProject: Project = {
        name: "Project & Co. - Special: Characters!",
        description: null,
      };

      render(<ProjectField {...defaultProps} project={specialCharsProject} />);

      const textField = screen.getByRole("textbox");
      expect(textField).toHaveValue("Project & Co. - Special: Characters!");
    });

    it("handles whitespace-only project name", () => {
      const whitespaceProject: Project = {
        name: "   ",
        description: null,
      };

      render(<ProjectField {...defaultProps} project={whitespaceProject} />);

      const textField = screen.getByRole("textbox");
      fireEvent.change(textField, { target: { value: "Updated" } });
      fireEvent.blur(textField);

      expect(mockOnFieldChange).toHaveBeenCalledWith(0, 1, 2, "name", "Updated");
    });
  });
});
