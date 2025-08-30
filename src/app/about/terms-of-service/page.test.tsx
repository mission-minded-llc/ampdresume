import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TermsOfService from "./page";
import { expect } from "@jest/globals";

describe("TermsOfService Page", () => {
  it("matches snapshot", () => {
    const { container } = render(<TermsOfService />);
    expect(container).toMatchSnapshot();
  });
});
