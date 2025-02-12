import "@testing-library/jest-dom";

import PrivacyPolicy from "./page";
import React from "react";
import { render } from "@testing-library/react";

describe("PrivacyPolicy Page", () => {
  it("matches snapshot", () => {
    const { container } = render(<PrivacyPolicy />);
    expect(container).toMatchSnapshot();
  });
});
