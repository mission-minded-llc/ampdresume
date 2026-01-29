import "@testing-library/jest-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PositionFields } from "./PositionFields";
import { Position } from "./types";
import { expect } from "@jest/globals";

describe("PositionFields", () => {
  const mockPosition: Position = {
    title: "Software Engineer",
    startDate: "2020-01-01T00:00:00.000Z",
    endDate: "2022-12-31T00:00:00.000Z",
    projects: [],
  };

  const mockOnFieldChange = jest.fn();
  const mockOnDateChange = jest.fn();
  const mockOnDelete = jest.fn();

  const defaultProps = {
    position: mockPosition,
    companyIndex: 0,
    positionIndex: 1,
    onFieldChange: mockOnFieldChange,
    onDateChange: mockOnDateChange,
    onDelete: mockOnDelete,
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PositionFields {...props} />
      </LocalizationProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders correctly with position data", () => {
      renderComponent();

      const titleField = screen.getByLabelText("Position");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("Software Engineer");
    });

    it("renders correctly with empty title", () => {
      const emptyPosition: Position = {
        title: "",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        projects: [],
      };

      renderComponent({ ...defaultProps, position: emptyPosition });

      const titleField = screen.getByLabelText("Position");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("");
    });

    it("renders start date picker", () => {
      renderComponent();

      const startDateInputs = screen.getAllByRole("textbox");
      // DatePicker creates textbox inputs
      expect(startDateInputs.length).toBeGreaterThan(0);
    });

    it("renders end date picker", () => {
      renderComponent();

      const dateInputs = screen.getAllByRole("textbox");
      expect(dateInputs.length).toBeGreaterThan(0);
    });

    it("shows error state when start date is missing", () => {
      const positionWithoutStartDate: Position = {
        title: "Engineer",
        startDate: "",
        endDate: null,
        projects: [],
      };

      renderComponent({ ...defaultProps, position: positionWithoutStartDate });

      // Check for error helper text
      const errorText = screen.getByText("Start date is required");
      expect(errorText).toBeInTheDocument();
    });

    it("renders delete button", () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Position");
      expect(deleteButton).toBeInTheDocument();
    });

    it("has correct displayName", () => {
      expect(PositionFields.displayName).toBe("PositionFields");
    });
  });

  describe("Input handling", () => {
    it("updates local title value when input changes", () => {
      renderComponent();

      const titleField = screen.getByLabelText("Position");
      fireEvent.change(titleField, { target: { value: "Senior Engineer" } });

      expect(titleField).toHaveValue("Senior Engineer");
      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("calls onFieldChange on blur when title has changed", () => {
      renderComponent();

      const titleField = screen.getByLabelText("Position");
      fireEvent.change(titleField, { target: { value: "Updated Title" } });
      fireEvent.blur(titleField);

      expect(mockOnFieldChange).toHaveBeenCalledTimes(1);
      expect(mockOnFieldChange).toHaveBeenCalledWith(0, 1, "title", "Updated Title");
    });

    it("does not call onFieldChange on blur when title has not changed", () => {
      renderComponent();

      const titleField = screen.getByLabelText("Position");
      fireEvent.blur(titleField);

      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("does not call onFieldChange when value is changed back to original", () => {
      renderComponent();

      const titleField = screen.getByLabelText("Position");
      fireEvent.change(titleField, { target: { value: "Different Title" } });
      fireEvent.change(titleField, { target: { value: "Software Engineer" } });
      fireEvent.blur(titleField);

      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("handles empty string input", () => {
      renderComponent();

      const titleField = screen.getByLabelText("Position");
      fireEvent.change(titleField, { target: { value: "" } });
      fireEvent.blur(titleField);

      expect(mockOnFieldChange).toHaveBeenCalledWith(0, 1, "title", "");
    });
  });

  describe("Date handling", () => {
    it("displays start date correctly", () => {
      renderComponent();

      const dateInputs = screen.getAllByRole("textbox");
      // DatePicker inputs should be present
      expect(dateInputs.length).toBeGreaterThan(0);
    });

    it("displays end date correctly", () => {
      renderComponent();

      const dateInputs = screen.getAllByRole("textbox");
      expect(dateInputs.length).toBeGreaterThan(0);
    });

    it("handles null start date", () => {
      const positionWithNullStart: Position = {
        title: "Engineer",
        startDate: "",
        endDate: null,
        projects: [],
      };

      renderComponent({ ...defaultProps, position: positionWithNullStart });

      const errorText = screen.getByText("Start date is required");
      expect(errorText).toBeInTheDocument();
    });

    it("handles null end date", () => {
      const positionWithNullEnd: Position = {
        title: "Engineer",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        projects: [],
      };

      renderComponent({ ...defaultProps, position: positionWithNullEnd });

      // Should render without errors
      expect(screen.getByLabelText("Position")).toBeInTheDocument();
    });
  });

  describe("Delete functionality", () => {
    it("renders delete button with correct label", () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Position");
      expect(deleteButton).toBeInTheDocument();
    });

    it("opens confirmation dialog when delete button is clicked", async () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Position");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Delete Position?")).toBeInTheDocument();
      });
    });

    it("calls onDelete with correct indices when confirmed", async () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Position");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByText("Yes, Delete");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith(0, 1);
      });
    });

    it("calls onDelete with different indices when provided", async () => {
      renderComponent({
        ...defaultProps,
        companyIndex: 5,
        positionIndex: 3,
      });

      const deleteButton = screen.getByText("Delete Position");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByText("Yes, Delete");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledWith(5, 3);
      });
    });
  });

  describe("Edge cases", () => {
    it("handles very long position title", () => {
      const longTitle = "A".repeat(200);
      const longPosition: Position = {
        title: longTitle,
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        projects: [],
      };

      renderComponent({ ...defaultProps, position: longPosition });

      const titleField = screen.getByLabelText("Position");
      expect(titleField).toHaveValue(longTitle);
    });

    it("handles special characters in position title", () => {
      const specialCharsPosition: Position = {
        title: "Engineer & Developer - Special: Characters!",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        projects: [],
      };

      renderComponent({ ...defaultProps, position: specialCharsPosition });

      const titleField = screen.getByLabelText("Position");
      expect(titleField).toHaveValue("Engineer & Developer - Special: Characters!");
    });

    it("handles whitespace-only position title", () => {
      const whitespacePosition: Position = {
        title: "   ",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        projects: [],
      };

      renderComponent({ ...defaultProps, position: whitespacePosition });

      const titleField = screen.getByLabelText("Position");
      fireEvent.change(titleField, { target: { value: "Updated" } });
      fireEvent.blur(titleField);

      expect(mockOnFieldChange).toHaveBeenCalledWith(0, 1, "title", "Updated");
    });

    it("handles position with projects", () => {
      const positionWithProjects: Position = {
        title: "Engineer",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        projects: [
          { name: "Project 1", description: null },
          { name: "Project 2", description: null },
        ],
      };

      renderComponent({ ...defaultProps, position: positionWithProjects });

      const titleField = screen.getByLabelText("Position");
      expect(titleField).toBeInTheDocument();
    });
  });
});
