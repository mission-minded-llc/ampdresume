import "@testing-library/jest-dom";

import React from "react";
import Verify from "./page";
import { render } from "@testing-library/react";

describe("Verify Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Verify />);

    expect(getByText("Check Your Email")).toBeInTheDocument();
  });
});
