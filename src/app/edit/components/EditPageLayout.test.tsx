import "@testing-library/jest-dom";

import { EditPageLayout } from "./EditPageLayout";
import React from "react";
import { render } from "@testing-library/react";

jest.mock("./EditPageNav", () => ({
  EditPageNav: jest.fn(() => <div>Mocked EditPageNav</div>),
}));

describe("EditPageLayout", () => {
  it("renders correctly with children", () => {
    const { getByText } = render(
      <EditPageLayout>
        <div>Child Component</div>
      </EditPageLayout>,
    );

    expect(getByText("Mocked EditPageNav")).toBeInTheDocument();
    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
