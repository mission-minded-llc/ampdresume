import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { CloseButton } from "./CloseButton";

describe("CloseButton", () => {
  it("renders correctly", () => {
    const { getByLabelText } = render(<CloseButton onClick={() => {}} />);
    expect(getByLabelText("close")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(<CloseButton onClick={handleClick} />);
    const button = getByLabelText("close");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
