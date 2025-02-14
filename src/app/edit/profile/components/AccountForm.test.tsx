import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { AccountForm } from "./AccountForm";
import React from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";

jest.mock("@/hooks/useIsDesktop", () => ({
  useIsDesktop: jest.fn(),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ open, message }: { open: boolean; message: string }) =>
    open ? <div>{message}</div> : null,
}));

jest.mock("./SocialsForm", () => ({
  SocialsForm: () => <div>SocialsForm</div>,
}));

describe("AccountForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useIsDesktop as jest.Mock).mockReturnValue(true);
  });

  const mockProps = {
    name: "John Doe",
    slug: "john-doe",
    displayEmail: "john@example.com",
    title: "Software Engineer",
    location: "San Francisco, CA",
    siteTitle: "John's Resume",
    siteDescription: "This is John's resume.",
    siteImage: "https://example.com/image.png",
  };

  it("renders correctly", () => {
    const { container, getByLabelText } = render(<AccountForm {...mockProps} />);

    expect(getByLabelText("Full Name")).toBeInTheDocument();
    expect(getByLabelText("URL Slug")).toBeInTheDocument();
    expect(getByLabelText("Display Email")).toBeInTheDocument();
    expect(getByLabelText("Title")).toBeInTheDocument();
    expect(getByLabelText("Location")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("handles input changes and validation", () => {
    const { getByLabelText, getByText } = render(<AccountForm {...mockProps} />);

    const nameInput = getByLabelText("Full Name");
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.blur(nameInput);
    waitFor(() => {
      expect(getByText("Name is required")).toBeInTheDocument();
    });

    const slugInput = getByLabelText("URL Slug");
    fireEvent.change(slugInput, { target: { value: "invalid slug" } });
    fireEvent.blur(slugInput);
    waitFor(() => {
      expect(
        getByText("Slug must be alphanumeric and lowercase. Hyphens allowed."),
      ).toBeInTheDocument();
    });

    const emailInput = getByLabelText("Display Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    waitFor(() => {
      fireEvent.blur(emailInput);
      expect(getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("handles form submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;

    const { getByLabelText, getByText } = render(<AccountForm {...mockProps} />);

    fireEvent.change(getByLabelText("Full Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByLabelText("URL Slug"), { target: { value: "jane-doe" } });
    fireEvent.change(getByLabelText("Display Email"), { target: { value: "jane@example.com" } });

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/account", expect.any(Object));
    });
  });

  it("displays error message on form submission failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Submission failed" }),
      }),
    ) as jest.Mock;

    const { getByLabelText, getByText } = render(<AccountForm {...mockProps} />);

    fireEvent.change(getByLabelText("Full Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByLabelText("URL Slug"), { target: { value: "jane-doe" } });
    fireEvent.change(getByLabelText("Display Email"), { target: { value: "jane@example.com" } });

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Submission failed")).toBeInTheDocument();
    });
  });
});
