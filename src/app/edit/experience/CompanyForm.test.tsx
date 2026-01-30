import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CompanyForm } from "./CompanyForm";
import { expect } from "@jest/globals";
import { Company } from "@/types";
import dayjs from "dayjs";

jest.mock("@mui/x-date-pickers", () => ({
  DatePicker: ({
    value,
    onChange,
    label,
  }: {
    value: dayjs.Dayjs | null;
    onChange: (value: dayjs.Dayjs | null) => void;
    label: string;
  }) => (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value ? value.format("YYYY-MM") : ""}
        onChange={(e) => {
          const date = e.target.value ? dayjs(e.target.value) : null;
          onChange(date);
        }}
        data-testid={`date-picker-${label.toLowerCase().replace(/\s+/g, "-")}`}
      />
    </div>
  ),
}));

jest.mock("../components/DeleteWithConfirmation", () => ({
  DeleteWithConfirmation: ({
    onConfirmDelete,
    buttonLabel,
    disabled,
  }: {
    onConfirmDelete: () => void;
    buttonLabel: string;
    disabled?: boolean;
  }) => (
    <button onClick={onConfirmDelete} disabled={disabled} data-testid="delete-button">
      {buttonLabel}
    </button>
  ),
}));

jest.mock("@/lib/format", () => ({
  formatLongDate: (date: string | null) => (date ? new Date(date).toLocaleDateString() : ""),
  formatShortDate: (date: dayjs.Dayjs | null) => (date ? date.format("YYYY-MM-DD") : ""),
  timestampToDate: (timestamp: string) => new Date(timestamp),
}));

describe("CompanyForm", () => {
  const mockHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  const mockOnCancel = jest.fn();

  const mockCompany: Company = {
    id: "company-1",
    name: "Test Company",
    location: "Test Location",
    startDate: "2020-01-01",
    endDate: "2022-12-31",
    description: "Company description",
    positionCount: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering - New Company", () => {
    it("renders form fields for new company", () => {
      render(<CompanyForm handler={mockHandler} />);

      expect(screen.getByRole("textbox", { name: /Company Name/ })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /Location/ })).toBeInTheDocument();
      expect(screen.getByTestId("date-picker-date-started")).toBeInTheDocument();
      expect(screen.getByTestId("date-picker-date-ended")).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /Description/ })).toBeInTheDocument();
    });

    it("renders empty fields for new company", () => {
      render(<CompanyForm handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ }) as HTMLInputElement;
      const locationInput = screen.getByRole("textbox", { name: /Location/ }) as HTMLInputElement;
      const descriptionInput = screen.getByRole("textbox", {
        name: /Description/,
      }) as HTMLInputElement;

      expect(nameInput.value).toBe("");
      expect(locationInput.value).toBe("");
      expect(descriptionInput.value).toBe("");
    });

    it("renders Save Company button", () => {
      render(<CompanyForm handler={mockHandler} />);

      expect(screen.getByRole("button", { name: /Save Company/ })).toBeInTheDocument();
    });

    it("does not render delete button for new company", () => {
      render(<CompanyForm handler={mockHandler} />);

      expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();
    });

    it("does not render cancel button when onCancel is not provided", () => {
      render(<CompanyForm handler={mockHandler} />);

      expect(screen.queryByRole("button", { name: /Cancel/ })).not.toBeInTheDocument();
    });

    it("renders cancel button when onCancel is provided", () => {
      render(<CompanyForm handler={mockHandler} onCancel={mockOnCancel} />);

      expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument();
    });
  });

  describe("Rendering - Existing Company", () => {
    it("renders form fields with existing company data", () => {
      render(<CompanyForm company={mockCompany} handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ }) as HTMLInputElement;
      const locationInput = screen.getByRole("textbox", { name: /Location/ }) as HTMLInputElement;
      const descriptionInput = screen.getByRole("textbox", {
        name: /Description/,
      }) as HTMLInputElement;

      expect(nameInput.value).toBe("Test Company");
      expect(locationInput.value).toBe("Test Location");
      expect(descriptionInput.value).toBe("Company description");
    });

    it("renders delete button for existing company", () => {
      render(
        <CompanyForm
          company={mockCompany}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });

    it("disables delete button when company has positions", () => {
      const companyWithPositions = {
        ...mockCompany,
        positionCount: 2,
      };

      render(
        <CompanyForm
          company={companyWithPositions}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      const deleteButton = screen.getByTestId("delete-button");
      expect(deleteButton).toBeDisabled();
    });

    it("enables delete button when company has no positions", () => {
      render(
        <CompanyForm
          company={mockCompany}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      const deleteButton = screen.getByTestId("delete-button");
      expect(deleteButton).not.toBeDisabled();
    });

    it("disables delete button when company has positions array", () => {
      const companyWithPositionsArray = {
        ...mockCompany,
        positions: [{ id: "position-1", title: "Engineer" }],
        positionCount: 1,
      };

      render(
        <CompanyForm
          company={companyWithPositionsArray as Company}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      const deleteButton = screen.getByTestId("delete-button");
      expect(deleteButton).toBeDisabled();
    });
  });

  describe("Form input handling", () => {
    it("updates company name when input changes", () => {
      render(<CompanyForm handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ });
      fireEvent.change(nameInput, { target: { value: "Updated Company" } });

      expect((nameInput as HTMLInputElement).value).toBe("Updated Company");
    });

    it("updates location when input changes", () => {
      render(<CompanyForm handler={mockHandler} />);

      const locationInput = screen.getByRole("textbox", { name: /Location/ });
      fireEvent.change(locationInput, { target: { value: "New Location" } });

      expect((locationInput as HTMLInputElement).value).toBe("New Location");
    });

    it("updates description when input changes", () => {
      render(<CompanyForm handler={mockHandler} />);

      const descriptionInput = screen.getByRole("textbox", { name: /Description/ });
      fireEvent.change(descriptionInput, { target: { value: "New description" } });

      expect((descriptionInput as HTMLInputElement).value).toBe("New description");
    });

    it("updates start date when date picker changes", () => {
      render(<CompanyForm handler={mockHandler} />);

      const startDatePicker = screen.getByTestId("date-picker-date-started");
      fireEvent.change(startDatePicker, { target: { value: "2021-01" } });

      expect((startDatePicker as HTMLInputElement).value).toBe("2021-01");
    });

    it("updates end date when date picker changes", () => {
      render(<CompanyForm handler={mockHandler} />);

      const endDatePicker = screen.getByTestId("date-picker-date-ended");
      fireEvent.change(endDatePicker, { target: { value: "2023-12" } });

      expect((endDatePicker as HTMLInputElement).value).toBe("2023-12");
    });

    it("clears name validation error when name is entered", () => {
      render(<CompanyForm handler={mockHandler} />);

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      fireEvent.click(saveButton);

      expect(screen.getByText("Company name is required.")).toBeInTheDocument();

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ });
      fireEvent.change(nameInput, { target: { value: "Test Company" } });

      expect(screen.queryByText("Company name is required.")).not.toBeInTheDocument();
    });

    it("clears start date validation error when date is selected", () => {
      render(<CompanyForm handler={mockHandler} />);

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      fireEvent.click(saveButton);

      expect(screen.getByText("Please select a valid date.")).toBeInTheDocument();

      const startDatePicker = screen.getByTestId("date-picker-date-started");
      fireEvent.change(startDatePicker, { target: { value: "2020-01" } });

      expect(screen.queryByText("Please select a valid date.")).not.toBeInTheDocument();
    });
  });

  describe("Form validation", () => {
    it("disables save button when form is unchanged", () => {
      render(<CompanyForm company={mockCompany} handler={mockHandler} />);

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      expect(saveButton).toBeDisabled();
    });

    it("enables save button when form is changed", () => {
      render(<CompanyForm company={mockCompany} handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ });
      fireEvent.change(nameInput, { target: { value: "Updated Company" } });

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      expect(saveButton).not.toBeDisabled();
    });

    it("shows error when name is empty on save", () => {
      render(<CompanyForm handler={mockHandler} />);

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      fireEvent.click(saveButton);

      expect(screen.getByText("Company name is required.")).toBeInTheDocument();
      expect(mockHandler).not.toHaveBeenCalled();
    });

    it("shows error when start date is empty on save", () => {
      render(<CompanyForm handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ });
      fireEvent.change(nameInput, { target: { value: "Test Company" } });

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      fireEvent.click(saveButton);

      expect(screen.getByText("Please select a valid date.")).toBeInTheDocument();
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe("Save functionality", () => {
    it("calls handler with correct data when form is valid", () => {
      render(<CompanyForm handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ });
      fireEvent.change(nameInput, { target: { value: "New Company" } });

      const locationInput = screen.getByRole("textbox", { name: /Location/ });
      fireEvent.change(locationInput, { target: { value: "New Location" } });

      const descriptionInput = screen.getByRole("textbox", { name: /Description/ });
      fireEvent.change(descriptionInput, { target: { value: "New description" } });

      const startDatePicker = screen.getByTestId("date-picker-date-started");
      fireEvent.change(startDatePicker, { target: { value: "2020-01" } });

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      fireEvent.click(saveButton);

      expect(mockHandler).toHaveBeenCalledTimes(1);
      expect(mockHandler).toHaveBeenCalledWith({
        name: "New Company",
        location: "New Location",
        startDate: expect.stringContaining("2020"),
        endDate: expect.stringContaining(""),
        description: "New description",
      });
    });

    it("includes end date when provided", () => {
      render(<CompanyForm handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ });
      fireEvent.change(nameInput, { target: { value: "New Company" } });

      const startDatePicker = screen.getByTestId("date-picker-date-started");
      fireEvent.change(startDatePicker, { target: { value: "2020-01" } });

      const endDatePicker = screen.getByTestId("date-picker-date-ended");
      fireEvent.change(endDatePicker, { target: { value: "2022-12" } });

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      fireEvent.click(saveButton);

      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          endDate: expect.stringContaining("2022"),
        }),
      );
    });

    it("detects changes correctly for existing company", () => {
      render(<CompanyForm company={mockCompany} handler={mockHandler} />);

      const nameInput = screen.getByRole("textbox", { name: /Company Name/ });
      fireEvent.change(nameInput, { target: { value: "Updated Company" } });

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      expect(saveButton).not.toBeDisabled();

      fireEvent.click(saveButton);

      expect(mockHandler).toHaveBeenCalled();
    });

    it("detects description changes", () => {
      render(<CompanyForm company={mockCompany} handler={mockHandler} />);

      const descriptionInput = screen.getByRole("textbox", { name: /Description/ });
      fireEvent.change(descriptionInput, { target: { value: "Updated description" } });

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      expect(saveButton).not.toBeDisabled();
    });

    it("detects location changes", () => {
      render(<CompanyForm company={mockCompany} handler={mockHandler} />);

      const locationInput = screen.getByRole("textbox", { name: /Location/ });
      fireEvent.change(locationInput, { target: { value: "Updated Location" } });

      const saveButton = screen.getByRole("button", { name: /Save Company/ });
      expect(saveButton).not.toBeDisabled();
    });
  });

  describe("Delete functionality", () => {
    it("calls deleteHandler when delete button is clicked", () => {
      render(
        <CompanyForm
          company={mockCompany}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      const deleteButton = screen.getByTestId("delete-button");
      fireEvent.click(deleteButton);

      expect(mockDeleteHandler).toHaveBeenCalledTimes(1);
      expect(mockDeleteHandler).toHaveBeenCalledWith(mockCompany);
    });

    it("does not call deleteHandler when button is disabled", () => {
      const companyWithPositions = {
        ...mockCompany,
        positionCount: 2,
      };

      render(
        <CompanyForm
          company={companyWithPositions}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      const deleteButton = screen.getByTestId("delete-button");
      expect(deleteButton).toBeDisabled();

      fireEvent.click(deleteButton);

      expect(mockDeleteHandler).not.toHaveBeenCalled();
    });
  });

  describe("Cancel functionality", () => {
    it("calls onCancel when cancel button is clicked", () => {
      render(<CompanyForm handler={mockHandler} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole("button", { name: /Cancel/ });
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge cases", () => {
    it("handles company with null endDate", () => {
      const companyWithoutEndDate = {
        ...mockCompany,
        endDate: null,
      };

      render(<CompanyForm company={companyWithoutEndDate} handler={mockHandler} />);

      const endDatePicker = screen.getByTestId("date-picker-date-ended");
      expect((endDatePicker as HTMLInputElement).value).toBe("");
    });

    it("handles company with empty endDate string", () => {
      const companyWithEmptyEndDate = {
        ...mockCompany,
        endDate: "",
      };

      render(<CompanyForm company={companyWithEmptyEndDate} handler={mockHandler} />);

      const endDatePicker = screen.getByTestId("date-picker-date-ended");
      expect((endDatePicker as HTMLInputElement).value).toBe("");
    });

    it("handles company with null description", () => {
      const companyWithoutDescription = {
        ...mockCompany,
        description: null,
      };

      render(<CompanyForm company={companyWithoutDescription} handler={mockHandler} />);

      const descriptionInput = screen.getByRole("textbox", {
        name: /Description/,
      }) as HTMLInputElement;
      expect(descriptionInput.value).toBe("");
    });

    it("handles company with empty description", () => {
      const companyWithEmptyDescription = {
        ...mockCompany,
        description: "",
      };

      render(<CompanyForm company={companyWithEmptyDescription} handler={mockHandler} />);

      const descriptionInput = screen.getByRole("textbox", {
        name: /Description/,
      }) as HTMLInputElement;
      expect(descriptionInput.value).toBe("");
    });
  });
});
