import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Verify from "./page";

describe("Verify Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Verify />);

    expect(getByText("Check Your Email")).toBeInTheDocument();
  });
});
