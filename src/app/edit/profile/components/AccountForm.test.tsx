import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { AccountForm } from "./AccountForm";

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

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === "/api/auth/session") {
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers(),
        redirected: false,
        url: String(url),
        json: () =>
          Promise.resolve({
            user: { id: "test-user-id", email: "test@example.com" },
          }),
        text: () =>
          Promise.resolve(
            JSON.stringify({
              user: { id: "test-user-id", email: "test@example.com" },
            })
          ),
      } as Response);
    }
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      redirected: false,
      url: String(url),
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(JSON.stringify({})),
    } as Response);
  });
});

describe("AccountForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useIsDesktop as jest.Mock).mockReturnValue(true);
  });

  it("renders correctly", async () => {
    const { container, getByLabelText } = renderWithSession(
      <AccountForm {...mockProps} />
    );

    await waitFor(() => {
      expect(getByLabelText("Full Name")).toBeInTheDocument();
      expect(getByLabelText("URL Name")).toBeInTheDocument();
      expect(getByLabelText("Display Email")).toBeInTheDocument();
      expect(getByLabelText("Title")).toBeInTheDocument();
      expect(getByLabelText("Location")).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it("handles input changes and validation", async () => {
    const { getByLabelText, getByText } = renderWithSession(
      <AccountForm {...mockProps} />
    );

    const slugInput = getByLabelText("URL Name");
    fireEvent.change(slugInput, { target: { value: "invalid slug" } });
    fireEvent.blur(slugInput);
    await waitFor(() => {
      expect(
        getByText("Slug must be alphanumeric and lowercase. Hyphens allowed.")
      ).toBeInTheDocument();
    });
  });

  it("handles form submission", async () => {
    global.fetch = jest.fn((url) => {
      if (url === "/api/auth/session") {
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          headers: new Headers(),
          redirected: false,
          url: String(url),
          json: () =>
            Promise.resolve({
              user: { id: "test-user-id", email: "test@example.com" },
            }),
          text: () =>
            Promise.resolve(
              JSON.stringify({
                user: { id: "test-user-id", email: "test@example.com" },
              })
            ),
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers(),
        redirected: false,
        url: String(url),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(JSON.stringify({})),
      } as Response);
    });

    const { getByLabelText, getByText } = renderWithSession(
      <AccountForm {...mockProps} />
    );

    fireEvent.change(getByLabelText("Full Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(getByLabelText("URL Name"), {
      target: { value: "jane-doe" },
    });
    fireEvent.change(getByLabelText("Display Email"), {
      target: { value: "jane@example.com" },
    });

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/account",
        expect.any(Object)
      );
    });
  });

  it("displays error message on form submission failure", async () => {
    global.fetch = jest.fn((url) => {
      if (url === "/api/auth/session") {
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          headers: new Headers(),
          redirected: false,
          url: String(url),
          json: () =>
            Promise.resolve({
              user: { id: "test-user-id", email: "test@example.com" },
            }),
          text: () =>
            Promise.resolve(
              JSON.stringify({
                user: { id: "test-user-id", email: "test@example.com" },
              })
            ),
        } as Response);
      }
      return Promise.resolve({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        headers: new Headers(),
        redirected: false,
        url: String(url),
        json: () => Promise.resolve({ error: "Submission failed" }),
        text: () =>
          Promise.resolve(JSON.stringify({ error: "Submission failed" })),
      } as Response);
    });

    const { getByLabelText, getByText } = renderWithSession(
      <AccountForm {...mockProps} />
    );

    fireEvent.change(getByLabelText("Full Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(getByLabelText("URL Name"), {
      target: { value: "jane-doe" },
    });
    fireEvent.change(getByLabelText("Display Email"), {
      target: { value: "jane@example.com" },
    });

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Submission failed")).toBeInTheDocument();
    });
  });

  it("displays error message on form submission failure for invalid name", async () => {
    const { getByLabelText, getByText } = renderWithSession(
      <AccountForm {...mockProps} />
    );

    fireEvent.change(getByLabelText("Full Name"), { target: { value: "   " } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("displays error message on form submission failure for invalid slug", async () => {
    const { getByLabelText, getByText } = renderWithSession(
      <AccountForm {...mockProps} />
    );

    fireEvent.change(getByLabelText("URL Name"), { target: { value: "   " } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Slug is required")).toBeInTheDocument();
    });
  });

  it("displays error message on form submission failure for invalid email", async () => {
    const { getByLabelText, getByText } = renderWithSession(
      <AccountForm {...mockProps} />
    );

    const emailInput = getByLabelText("Display Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(getByText("Invalid email address")).toBeInTheDocument();
    });
  });
});
