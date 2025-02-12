import "@testing-library/jest-dom";

import React from "react";
import SignInPage from "./page";
import { render } from "@testing-library/react";

jest.mock("./SignIn", () => ({
  SignIn: jest.fn(() => <div>Mocked SignIn Component</div>),
}));

describe("SignInPage", () => {
  it("renders the SignIn component", () => {
    const { getByText } = render(<SignInPage />);
    expect(getByText("Mocked SignIn Component")).toBeInTheDocument();
  });
});
