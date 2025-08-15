import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { TooltipTotalYears } from "./";

describe("TooltipTotalYears", () => {
  it("matches snapshot", () => {
    const { container } = render(<TooltipTotalYears />);
    expect(container).toMatchSnapshot();
  });
});
