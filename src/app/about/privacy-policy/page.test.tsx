import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import PrivacyPolicy from "./page";
import { expect } from "@jest/globals";

describe("PrivacyPolicy Page", () => {
  it("matches snapshot", () => {
    const { container } = render(<PrivacyPolicy />);
    expect(container).toMatchSnapshot();
  });
});
