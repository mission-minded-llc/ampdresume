import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { AccountForm } from "./AccountForm";
import React from "react";
import { SessionProvider } from "next-auth/react";
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

jest.mock("@/graphql/deleteUser", () => ({
  deleteUser: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => ({
    data: {
      user: {
        id: "test-user-id",
        email: "test@example.com",
      },
    },
    status: "authenticated",
  }),
  signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

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

const renderWithSession = (component: React.ReactElement) => {
  return render(<SessionProvider>{component}</SessionProvider>);
};

describe("AccountForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useIsDesktop as jest.Mock).mockReturnValue(true);
  });

  it("renders correctly", () => {
    const { container, getByLabelText } = renderWithSession(<AccountForm {...mockProps} />);

    expect(getByLabelText("Full Name")).toBeInTheDocument();
    expect(getByLabelText("URL Name")).toBeInTheDocument();
    expect(getByLabelText("Display Email")).toBeInTheDocument();
    expect(getByLabelText("Title")).toBeInTheDocument();
    expect(getByLabelText("Location")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("handles input changes and validation", async () => {
    const { getByLabelText, getByText } = renderWithSession(<AccountForm {...mockProps} />);

    const slugInput = getByLabelText("URL Name");
    fireEvent.change(slugInput, { target: { value: "invalid slug" } });
    fireEvent.blur(slugInput);
    await waitFor(() => {
      expect(
        getByText("Slug must be alphanumeric and lowercase. Hyphens allowed."),
      ).toBeInTheDocument();
    });
  });

  it("handles form submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;

    const { getByLabelText, getByText } = renderWithSession(<AccountForm {...mockProps} />);

    fireEvent.change(getByLabelText("Full Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByLabelText("URL Name"), { target: { value: "jane-doe" } });
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

    const { getByLabelText, getByText } = renderWithSession(<AccountForm {...mockProps} />);

    fireEvent.change(getByLabelText("Full Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByLabelText("URL Name"), { target: { value: "jane-doe" } });
    fireEvent.change(getByLabelText("Display Email"), { target: { value: "jane@example.com" } });

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Submission failed")).toBeInTheDocument();
    });
  });

  it("displays error message on form submission failure for invalid name", async () => {
    const { getByLabelText, getByText } = renderWithSession(<AccountForm {...mockProps} />);

    fireEvent.change(getByLabelText("Full Name"), { target: { value: "   " } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("displays error message on form submission failure for invalid slug", async () => {
    const { getByLabelText, getByText } = renderWithSession(<AccountForm {...mockProps} />);

    fireEvent.change(getByLabelText("URL Name"), { target: { value: "   " } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Slug is required")).toBeInTheDocument();
    });
  });

  it("displays error message on form submission failure for invalid email", async () => {
    const { getByLabelText, getByText } = renderWithSession(<AccountForm {...mockProps} />);

    const emailInput = getByLabelText("Display Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Invalid email address")).toBeInTheDocument();
    });
  });
});
