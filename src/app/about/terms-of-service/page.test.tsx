import "@testing-library/jest-dom";

import React from "react";
import TermsOfService from "./page";
import { render } from "@testing-library/react";

describe("TermsOfService Page", () => {
  it("matches snapshot", () => {
    const { container } = render(<TermsOfService />);
    expect(container).toMatchSnapshot();
  });
});
