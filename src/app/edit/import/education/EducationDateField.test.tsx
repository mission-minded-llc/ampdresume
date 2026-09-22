import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { EducationDateField } from "./EducationDateField";
import { expect } from "@jest/globals";

jest.mock("@mui/x-date-pickers", () => ({
  DatePicker: ({
    label,
    value,
    onChange,
    slotProps,
  }: {
    label: string;
    value: { format?: (fmt: string) => string } | null;
    onChange: (value: string) => void;
    slotProps?: { textField?: { error?: boolean; helperText?: string } };
  }) => (
    <div>
      <label htmlFor="date-awarded">{label}</label>
      <input
        id="date-awarded"
        value={value ? "2020-05" : ""}
        onChange={(event) => onChange(event.target.value)}
      />
      {slotProps?.textField?.error ? <span>{slotProps.textField.helperText}</span> : null}
    </div>
  ),
}));

jest.mock("@/lib/dateUtils", () => ({
  validateAndConvertDate: (date: string) => `converted:${date}`,
}));

describe("EducationDateField", () => {
  it("converts the selected date and shows a required error", () => {
    const onChange = jest.fn();
    render(<EducationDateField value="" onChange={onChange} hasError />);

    expect(screen.getByText("Date awarded is required")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Date Awarded"), { target: { value: "2021-06" } });
    expect(onChange).toHaveBeenCalledWith("converted:2021-06");
  });

  it("renders without an error when a date is present", () => {
    render(<EducationDateField value="2020-05-01" onChange={jest.fn()} hasError={false} />);

    expect(screen.queryByText("Date awarded is required")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Date Awarded")).toHaveValue("2020-05");
  });
});
