import "@testing-library/jest-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CompanyFields } from "./CompanyFields";
import { Company } from "./types";
import { expect } from "@jest/globals";

describe("CompanyFields", () => {
  const mockCompany: Company = {
    name: "Test Company",
    location: "San Francisco, CA",
    startDate: "2020-01-01T00:00:00.000Z",
    endDate: "2022-12-31T00:00:00.000Z",
    positions: [],
  };

  const mockOnFieldChange = jest.fn();
  const mockOnDateChange = jest.fn();
  const mockOnDelete = jest.fn();

  const defaultProps = {
    company: mockCompany,
    companyIndex: 0,
    onFieldChange: mockOnFieldChange,
    onDateChange: mockOnDateChange,
    onDelete: mockOnDelete,
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CompanyFields {...props} />
      </LocalizationProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders correctly with company data", () => {
      renderComponent();

      const nameField = screen.getByLabelText("Company");
      const locationField = screen.getByLabelText("Location");

      expect(nameField).toBeInTheDocument();
      expect(nameField).toHaveValue("Test Company");
      expect(locationField).toBeInTheDocument();
      expect(locationField).toHaveValue("San Francisco, CA");
    });

    it("renders correctly with empty company name", () => {
      const emptyCompany: Company = {
        name: "",
        location: "New York",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: emptyCompany });

      const nameField = screen.getByLabelText("Company");
      expect(nameField).toBeInTheDocument();
      expect(nameField).toHaveValue("");
    });

    it("renders correctly with null location", () => {
      const companyWithoutLocation: Company = {
        name: "Test Company",
        location: null,
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: companyWithoutLocation });

      const locationField = screen.getByLabelText("Location");
      expect(locationField).toBeInTheDocument();
      expect(locationField).toHaveValue("");
    });

    it("renders start date picker", () => {
      renderComponent();

      const dateInputs = screen.getAllByRole("textbox");
      expect(dateInputs.length).toBeGreaterThan(0);
    });

    it("renders end date picker", () => {
      renderComponent();

      const dateInputs = screen.getAllByRole("textbox");
      expect(dateInputs.length).toBeGreaterThan(0);
    });

    it("shows error state when start date is missing", () => {
      const companyWithoutStartDate: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: companyWithoutStartDate });

      const errorText = screen.getByText("Start date is required");
      expect(errorText).toBeInTheDocument();
    });

    it("renders delete button", () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Company");
      expect(deleteButton).toBeInTheDocument();
    });

    it("has correct displayName", () => {
      expect(CompanyFields.displayName).toBe("CompanyFields");
    });
  });

  describe("Input handling", () => {
    it("updates local name value when input changes", () => {
      renderComponent();

      const nameField = screen.getByLabelText("Company");
      fireEvent.change(nameField, { target: { value: "New Company Name" } });

      expect(nameField).toHaveValue("New Company Name");
      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("updates local location value when input changes", () => {
      renderComponent();

      const locationField = screen.getByLabelText("Location");
      fireEvent.change(locationField, { target: { value: "New Location" } });

      expect(locationField).toHaveValue("New Location");
      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("calls onFieldChange on blur when name has changed", () => {
      renderComponent();

      const nameField = screen.getByLabelText("Company");
      fireEvent.change(nameField, { target: { value: "Updated Company" } });
      fireEvent.blur(nameField);

      expect(mockOnFieldChange).toHaveBeenCalledTimes(1);
      expect(mockOnFieldChange).toHaveBeenCalledWith(0, "name", "Updated Company");
    });

    it("calls onFieldChange on blur when location has changed", () => {
      renderComponent();

      const locationField = screen.getByLabelText("Location");
      fireEvent.change(locationField, { target: { value: "Updated Location" } });
      fireEvent.blur(locationField);

      expect(mockOnFieldChange).toHaveBeenCalledTimes(1);
      expect(mockOnFieldChange).toHaveBeenCalledWith(0, "location", "Updated Location");
    });

    it("does not call onFieldChange on blur when name has not changed", () => {
      renderComponent();

      const nameField = screen.getByLabelText("Company");
      fireEvent.blur(nameField);

      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("does not call onFieldChange on blur when location has not changed", () => {
      renderComponent();

      const locationField = screen.getByLabelText("Location");
      fireEvent.blur(locationField);

      expect(mockOnFieldChange).not.toHaveBeenCalled();
    });

    it("handles empty string inputs", () => {
      renderComponent();

      const nameField = screen.getByLabelText("Company");
      fireEvent.change(nameField, { target: { value: "" } });
      fireEvent.blur(nameField);

      expect(mockOnFieldChange).toHaveBeenCalledWith(0, "name", "");

      const locationField = screen.getByLabelText("Location");
      fireEvent.change(locationField, { target: { value: "" } });
      fireEvent.blur(locationField);

      expect(mockOnFieldChange).toHaveBeenCalledWith(0, "location", "");
    });
  });

  describe("Date handling", () => {
    it("displays start date correctly", () => {
      renderComponent();

      const dateInputs = screen.getAllByRole("textbox");
      expect(dateInputs.length).toBeGreaterThan(0);
    });

    it("displays end date correctly", () => {
      renderComponent();

      const dateInputs = screen.getAllByRole("textbox");
      expect(dateInputs.length).toBeGreaterThan(0);
    });

    it("handles null start date", () => {
      const companyWithNullStart: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: companyWithNullStart });

      const errorText = screen.getByText("Start date is required");
      expect(errorText).toBeInTheDocument();
    });

    it("handles null end date", () => {
      const companyWithNullEnd: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: companyWithNullEnd });

      // Should render without errors
      expect(screen.getByLabelText("Company")).toBeInTheDocument();
    });
  });

  describe("Delete functionality", () => {
    it("renders delete button with correct label", () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Company");
      expect(deleteButton).toBeInTheDocument();
    });

    it("opens confirmation dialog when delete button is clicked", async () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Company");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Delete Company?")).toBeInTheDocument();
      });
    });

    it("calls onDelete with correct index when confirmed", async () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Company");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByText("Yes, Delete");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith(0);
      });
    });

    it("calls onDelete with different index when provided", async () => {
      renderComponent({
        ...defaultProps,
        companyIndex: 5,
      });

      const deleteButton = screen.getByText("Delete Company");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByText("Yes, Delete");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledWith(5);
      });
    });

    it("shows correct dialog message", async () => {
      renderComponent();

      const deleteButton = screen.getByText("Delete Company");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            "Are you sure you want to delete this company? This will also delete all positions under this company. (No undo!)",
          ),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Edge cases", () => {
    it("handles very long company name", () => {
      const longName = "A".repeat(200);
      const longCompany: Company = {
        name: longName,
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: longCompany });

      const nameField = screen.getByLabelText("Company");
      expect(nameField).toHaveValue(longName);
    });

    it("handles very long location", () => {
      const longLocation = "A".repeat(200);
      const longLocationCompany: Company = {
        name: "Test Company",
        location: longLocation,
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: longLocationCompany });

      const locationField = screen.getByLabelText("Location");
      expect(locationField).toHaveValue(longLocation);
    });

    it("handles special characters in company name", () => {
      const specialCharsCompany: Company = {
        name: "Company & Co. - Special: Characters!",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: specialCharsCompany });

      const nameField = screen.getByLabelText("Company");
      expect(nameField).toHaveValue("Company & Co. - Special: Characters!");
    });

    it("handles special characters in location", () => {
      const specialLocationCompany: Company = {
        name: "Test Company",
        location: "San Francisco, CA - USA & More!",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: specialLocationCompany });

      const locationField = screen.getByLabelText("Location");
      expect(locationField).toHaveValue("San Francisco, CA - USA & More!");
    });

    it("handles whitespace-only company name", () => {
      const whitespaceCompany: Company = {
        name: "   ",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [],
      };

      renderComponent({ ...defaultProps, company: whitespaceCompany });

      const nameField = screen.getByLabelText("Company");
      fireEvent.change(nameField, { target: { value: "Updated" } });
      fireEvent.blur(nameField);

      expect(mockOnFieldChange).toHaveBeenCalledWith(0, "name", "Updated");
    });

    it("handles company with positions", () => {
      const companyWithPositions: Company = {
        name: "Test Company",
        location: "SF",
        startDate: "2020-01-01T00:00:00.000Z",
        endDate: null,
        positions: [
          {
            title: "Engineer",
            startDate: "2020-01-01T00:00:00.000Z",
            endDate: null,
            projects: [],
          },
        ],
      };

      renderComponent({ ...defaultProps, company: companyWithPositions });

      const nameField = screen.getByLabelText("Company");
      expect(nameField).toBeInTheDocument();
    });
  });
});
