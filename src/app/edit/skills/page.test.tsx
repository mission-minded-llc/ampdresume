import "@testing-library/jest-dom";

import Page from "./page";
import React from "react";
import { render } from "@testing-library/react";

jest.mock("../components/EditPageLayout", () => ({
  EditPageLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("./EditSkills", () => ({
  EditSkills: () => <div>EditSkills Component</div>,
}));

describe("Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Page />);

    expect(getByText("EditSkills Component")).toBeInTheDocument();
  });
});
