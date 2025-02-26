import "@testing-library/jest-dom";

import React from "react";
import { TooltipTotalYears } from "./";
import { render } from "@testing-library/react";

describe("TooltipTotalYears", () => {
  it("matches snapshot", () => {
    const { container } = render(<TooltipTotalYears />);
    expect(container).toMatchSnapshot();
  });
});
