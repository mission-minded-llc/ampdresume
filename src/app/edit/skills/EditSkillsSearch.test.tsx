import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { EditSkillsSearch } from "./EditSkillsSearch";
import React from "react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/getSkills", () => ({
  getSkills: jest.fn(),
}));

jest.mock("@/graphql/addSkillForUser", () => ({
  addSkillForUser: jest.fn(),
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

jest.mock("@/components/tooltips", () => ({
  TooltipTotalYears: () => <div>TooltipTotalYears</div>,
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe("EditSkillsSearch", () => {
  const mockSession = {
    user: { id: "user-id" },
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("renders correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: { skills: [] } });

    const { container, getByLabelText } = render(<EditSkillsSearch />);
    expect(getByLabelText("Search Skills to Add")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("displays loading overlay when skills are being fetched", () => {
    (useQuery as jest.Mock).mockReturnValue({ isPending: true });

    const { container, getByText } = render(<EditSkillsSearch />);
    expect(getByText("Loading skills...")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("displays error message when skills fetching fails", () => {
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, error: { message: "Error" } });

    const { container, getByText } = render(<EditSkillsSearch />);
    expect(getByText("Error loading skills: Error")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("filters and displays skills based on search term", async () => {
    const mockSkills = [
      { id: "1", name: "JavaScript", icon: "icon-js" },
      { id: "2", name: "TypeScript", icon: "icon-ts" },
    ];
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: { skills: mockSkills } });

    const { container, getByLabelText, getByText } = render(<EditSkillsSearch />);
    const searchInput = getByLabelText("Search Skills to Add");
    expect(container).toMatchSnapshot();

    fireEvent.change(searchInput, { target: { value: "Java" } });

    await waitFor(() => {
      expect(getByText("JavaScript")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    fireEvent.change(searchInput, { target: { value: "Java" } });

    await waitFor(() => {
      expect(getByText("JavaScript")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it("opens dialog when a skill is selected", async () => {
    const mockSkills = [{ id: "1", name: "JavaScript", icon: "icon-js" }];
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: { skills: mockSkills } });

    const { container, getByLabelText, getByText } = render(<EditSkillsSearch />);
    const searchInput = getByLabelText("Search Skills to Add");
    expect(container).toMatchSnapshot();

    fireEvent.change(searchInput, { target: { value: "Java" } });

    await waitFor(() => {
      expect(getByText("JavaScript")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    fireEvent.click(getByText("JavaScript"));

    expect(getByText("Enter Proficiency Level")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
