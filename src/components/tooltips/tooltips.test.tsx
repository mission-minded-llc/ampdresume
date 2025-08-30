import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TooltipTotalYears } from "./";
import { expect } from "@jest/globals";

describe("TooltipTotalYears", () => {
  it("matches snapshot", () => {
    const { container } = render(<TooltipTotalYears />);
    expect(container).toMatchSnapshot();
  });
});
