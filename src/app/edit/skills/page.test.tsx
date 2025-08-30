import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "./page";
import { expect } from "@jest/globals";

jest.mock("./EditSkills", () => ({
  EditSkills: () => <div>EditSkills Component</div>,
}));

describe("Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Page />);

    expect(getByText("EditSkills Component")).toBeInTheDocument();
  });
});
