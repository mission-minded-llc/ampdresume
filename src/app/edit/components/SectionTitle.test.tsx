import "@testing-library/jest-dom";

import React from "react";
import { SectionTitle } from "./SectionTitle";
import { render } from "@testing-library/react";

describe("SectionTitle", () => {
  it("renders correctly with the provided title", () => {
    const { getByText, container } = render(<SectionTitle title="Test Title" />);
    expect(container).toMatchSnapshot();

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Title").tagName).toBe("H1");
  });
});
