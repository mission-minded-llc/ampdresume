import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import PrivacyPolicy from "./page";

describe("PrivacyPolicy Page", () => {
  it("matches snapshot", () => {
    const { container } = render(<PrivacyPolicy />);
    expect(container).toMatchSnapshot();
  });
});
