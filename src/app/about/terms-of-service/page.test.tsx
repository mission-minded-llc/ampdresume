import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import TermsOfService from "./page";

describe("TermsOfService Page", () => {
  it("matches snapshot", () => {
    const { container } = render(<TermsOfService />);
    expect(container).toMatchSnapshot();
  });
});
