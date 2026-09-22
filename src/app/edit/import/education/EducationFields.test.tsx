import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { EducationFields } from "./EducationFields";
import { expect } from "@jest/globals";

jest.mock("./EducationDateField", () => ({
  EducationDateField: ({
    value,
    onChange,
    hasError,
  }: {
    value: string;
    onChange: (date: string) => void;
    hasError: boolean;
  }) => (
    <div>
      <button type="button" onClick={() => onChange("2021-01-01")}>
        Set date
      </button>
      {hasError ? <span>Date awarded is required</span> : <span>Date: {value}</span>}
    </div>
  ),
}));

describe("EducationFields", () => {
  const education = {
    school: "Test University",
    degree: "B.S.",
    dateAwarded: "2020-05-01",
  };

  it("updates school, degree, and date fields", () => {
    const onFieldChange = jest.fn();
    const onDateChange = jest.fn();
    render(
      <EducationFields
        education={education}
        index={1}
        onFieldChange={onFieldChange}
        onDateChange={onDateChange}
        onDelete={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText("Institution"), { target: { value: "New U" } });
    fireEvent.blur(screen.getByLabelText("Institution"));
    expect(onFieldChange).toHaveBeenCalledWith(1, "school", "New U");

    fireEvent.change(screen.getByLabelText("Degree"), { target: { value: "M.S." } });
    fireEvent.blur(screen.getByLabelText("Degree"));
    expect(onFieldChange).toHaveBeenCalledWith(1, "degree", "M.S.");

    fireEvent.click(screen.getByRole("button", { name: "Set date" }));
    expect(onDateChange).toHaveBeenCalledWith(1, "2021-01-01");
  });

  it("shows a date error when dateAwarded is missing and can delete the row", () => {
    const onDelete = jest.fn();
    render(
      <EducationFields
        education={{ ...education, dateAwarded: "" }}
        index={0}
        onFieldChange={jest.fn()}
        onDateChange={jest.fn()}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText("Date awarded is required")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Delete Education" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes, Delete" }));
    expect(onDelete).toHaveBeenCalledWith(0);
  });
});
