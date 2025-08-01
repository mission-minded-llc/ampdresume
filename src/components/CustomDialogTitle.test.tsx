import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { CustomDialogTitle } from "./CustomDialogTitle";

describe("CustomDialogTitle", () => {
  it("renders correctly with children", () => {
    const { getByText } = render(
      <CustomDialogTitle closeHandler={() => {}}>
        <span>Dialog Title</span>
      </CustomDialogTitle>,
    );
    expect(getByText("Dialog Title")).toBeInTheDocument();
  });

  it("calls closeHandler when close button is clicked", () => {
    const handleClose = jest.fn();
    const { getByLabelText } = render(
      <CustomDialogTitle closeHandler={handleClose}>
        <span>Dialog Title</span>
      </CustomDialogTitle>,
    );
    const closeButton = getByLabelText("close");

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
