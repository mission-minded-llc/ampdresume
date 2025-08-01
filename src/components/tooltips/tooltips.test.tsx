import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import { TooltipTotalYears } from "./";

describe("TooltipTotalYears", () => {
  it("matches snapshot", () => {
    const { container } = render(<TooltipTotalYears />);
    expect(container).toMatchSnapshot();
  });
});
