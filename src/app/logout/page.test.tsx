import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { signOut } from "next-auth/react";
import React from "react";

import LogoutPage from "./page";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("LogoutPage", () => {
  it("renders correctly", () => {
    const { getByText } = render(<LogoutPage />);

    expect(getByText("Logging out...")).toBeInTheDocument();
    expect(getByText("You will be redirected shortly.")).toBeInTheDocument();
  });

  it("calls signOut on page load", () => {
    render(<LogoutPage />);
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
  });
});
