import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { EducationField } from "./EducationField";
import { expect } from "@jest/globals";

describe("EducationField", () => {
  it("keeps edits local until blur", () => {
    const onChange = jest.fn();
    render(<EducationField label="Institution" value="Old School" onChange={onChange} />);

    const input = screen.getByLabelText("Institution");
    fireEvent.change(input, { target: { value: "New School" } });

    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("New School");

    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith("New School");
  });

  it("does not notify the parent when the value is unchanged on blur", () => {
    const onChange = jest.fn();
    render(<EducationField label="Degree" value="B.S." onChange={onChange} />);

    fireEvent.blur(screen.getByLabelText("Degree"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
