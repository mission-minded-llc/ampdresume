import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { EducationForm } from "./EducationForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";

describe("EducationForm", () => {
  const mockEducation = {
    id: "1",
    userId: "1",
    school: "Test University",
    degree: "Bachelor of Science",
    dateAwarded: "1737448282941",
  };

  const mockHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial values", () => {
    const { getByLabelText, getByText, getByRole } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationForm
          education={mockEducation}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />
      </LocalizationProvider>,
    );

    expect(getByLabelText("School *")).toHaveValue("Test University");
    expect(getByLabelText("Degree / Award")).toHaveValue("Bachelor of Science");
    const datePickerInput = getByRole("group", { name: /date awarded/i });
    expect(datePickerInput).toBeInTheDocument();
    expect(getByText("Delete Education")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Save Education")).toBeInTheDocument();
  });

  it("handles input changes and enables save button", () => {
    const { getByLabelText, getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationForm
          education={mockEducation}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />
      </LocalizationProvider>,
    );

    fireEvent.change(getByLabelText("School *"), { target: { value: "New University" } });
    fireEvent.change(getByLabelText("Degree / Award"), { target: { value: "Master of Science" } });

    // Test that the save button becomes enabled when form values change
    expect(getByText("Save Education")).not.toBeDisabled();
  });

  it("handles form submission", () => {
    const { getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationForm
          education={mockEducation}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />
      </LocalizationProvider>,
    );

    fireEvent.click(getByText("Save Education"));
    waitFor(() => {
      expect(mockHandler).toHaveBeenCalledWith({
        school: "Test University",
        degree: "Bachelor of Science",
        dateAwarded: "2022-01-01T00:00:00.000Z",
      });
    });
  });

  it("handles delete action", () => {
    const { getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationForm
          education={mockEducation}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />
      </LocalizationProvider>,
    );

    fireEvent.click(getByText("Delete Education"));
    waitFor(() => expect(mockDeleteHandler).toHaveBeenCalledWith(mockEducation));
  });

  it("handles cancel action", () => {
    const { getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EducationForm
          education={mockEducation}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />
      </LocalizationProvider>,
    );

    fireEvent.click(getByText("Cancel"));

    waitFor(() => expect(mockOnCancel).toHaveBeenCalled());
  });
});
