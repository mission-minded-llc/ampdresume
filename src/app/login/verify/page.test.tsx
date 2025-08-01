import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import Verify from "./page";

describe("Verify Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Verify />);

    expect(getByText("Check Your Email")).toBeInTheDocument();
  });
});
