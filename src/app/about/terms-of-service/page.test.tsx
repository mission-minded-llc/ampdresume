import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import TermsOfService from "./page";

describe("TermsOfService Page", () => {
  it("matches snapshot", () => {
    const { container } = render(<TermsOfService />);
    expect(container).toMatchSnapshot();
  });
});
