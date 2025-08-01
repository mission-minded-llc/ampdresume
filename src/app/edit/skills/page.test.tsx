import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import Page from "./page";

jest.mock("./EditSkills", () => ({
  EditSkills: () => <div>EditSkills Component</div>,
}));

describe("Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Page />);

    expect(getByText("EditSkills Component")).toBeInTheDocument();
  });
});
