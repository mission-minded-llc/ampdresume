import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import SignInPage from "./page";

jest.mock("./SignIn", () => ({
  SignIn: jest.fn(() => <div>Mocked SignIn Component</div>),
}));

describe("SignInPage", () => {
  it("renders the SignIn component", () => {
    const { getByText } = render(<SignInPage />);
    expect(getByText("Mocked SignIn Component")).toBeInTheDocument();
  });
});
