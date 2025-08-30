import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import React from "react";
import { render } from "@testing-library/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SocialsForm } from "./SocialsForm";
import { expect } from "@jest/globals";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/addSocial", () => ({
  addSocial: jest.fn(),
}));

jest.mock("@/graphql/updateSocial", () => ({
  updateSocial: jest.fn(),
}));

jest.mock("@/graphql/deleteSocial", () => ({
  deleteSocial: jest.fn(),
}));

jest.mock("@/components/CustomDialogTitle", () => ({
  CustomDialogTitle: ({
    children,
    closeHandler,
  }: {
    children: React.ReactNode;
    closeHandler: () => void;
  }) => (
    <div>
      <button onClick={closeHandler}>Close</button>
      {children}
    </div>
  ),
}));

jest.mock("@/components/Tooltip", () => ({
  Tooltip: ({ message }: { message: React.ReactNode }) => <div>{message}</div>,
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock("@/components/MuiLink", () => ({
  MuiLink: ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>,
}));

describe("SocialsForm", () => {
  const mockSession = {
    user: { id: "user-id" },
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("renders correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });

    const { container, getByLabelText, getByText } = render(<SocialsForm />);

    expect(getByLabelText("Social URL")).toBeInTheDocument();
    expect(getByText("Add Social")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("displays loading overlay when socials are being fetched", () => {
    (useQuery as jest.Mock).mockReturnValue({ isPending: true });

    const { getByText } = render(<SocialsForm />);
    expect(getByText("Loading resume data...")).toBeInTheDocument();
  });

  it("displays error message when socials fetching fails", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      error: { message: "Error" },
    });

    const { getByText } = render(<SocialsForm />);
    expect(getByText("Error loading socials: Error")).toBeInTheDocument();
  });
});
