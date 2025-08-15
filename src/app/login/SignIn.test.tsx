import "@testing-library/jest-dom";
import { signIn } from "next-auth/react";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as Sentry from "@sentry/react";
import { SignIn } from "./SignIn";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("@sentry/react", () => ({
  captureException: jest.fn(),
}));

describe("SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<SignIn />);
    expect(getByText("Email Address")).toBeInTheDocument();
    expect(getByText("Sign in with Email")).toBeInTheDocument();
    expect(getByText("Google")).toBeInTheDocument();
    expect(getByText("LinkedIn")).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({});

    const { getByText, getByLabelText } = render(<SignIn />);
    const emailInput = getByLabelText("Email Address *");
    const submitButton = getByText("Sign in with Email");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("email", {
        email: "test@example.com",
        callbackUrl: "/edit/profile",
      });
    });
  });

  it("displays error message on form submission failure", async () => {
    (signIn as jest.Mock).mockRejectedValueOnce(new Error("Sign in failed"));

    const { getByLabelText, getByText, findByText } = render(<SignIn />);
    const emailInput = getByLabelText("Email Address *");
    const submitButton = getByText("Sign in with Email");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await findByText("An error occurred. Please try again later.");

    expect(Sentry.captureException).toHaveBeenCalledWith(
      new Error("Sign in failed")
    );
  });

  it("handles social sign-in with Google", async () => {
    const { getByText } = render(<SignIn />);
    const btn = getByText("Google");

    fireEvent.click(btn);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/edit/profile",
      });
    });
  });

  it("handles social sign-in with LinkedIn", async () => {
    const { getByText } = render(<SignIn />);
    const btn = getByText("LinkedIn");

    fireEvent.click(btn);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("linkedin", {
        callbackUrl: "/edit/profile",
      });
    });
  });
});
