import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Verify from "./page";
import { expect } from "@jest/globals";

describe("Verify Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Verify />);

    expect(getByText("Check Your Email")).toBeInTheDocument();
  });
});
