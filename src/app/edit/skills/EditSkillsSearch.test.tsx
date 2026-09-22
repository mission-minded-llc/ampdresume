import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditSkillsSearch } from "./EditSkillsSearch";
import { expect } from "@jest/globals";

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
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("renders correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: { skills: [] },
    });

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
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      error: { message: "Error" },
    });

    const { container, getByText } = render(<EditSkillsSearch />);
    expect(getByText("Error loading skills: Error")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("filters and displays skills based on search term", async () => {
    const mockSkills = [
      { id: "1", name: "JavaScript", icon: "icon-js" },
      { id: "2", name: "TypeScript", icon: "icon-ts" },
    ];
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: { skills: mockSkills },
    });

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
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: { skills: mockSkills },
    });

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

  it("uses demo catalog data without fetching", async () => {
    const onDemoAdd = jest.fn();
    const { getByLabelText, getByText } = render(
      <EditSkillsSearch
        demoSkills={[{ id: "1", name: "React", icon: "icon-react" }]}
        demoSearchTerm="Re"
        onDemoAdd={onDemoAdd}
      />,
    );

    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ enabled: false }));
    expect(getByLabelText("Search Skills to Add")).toHaveValue("Re");
    expect(getByText("React")).toBeInTheDocument();

    fireEvent.click(getByText("React"));
    fireEvent.click(getByText("Add Skill"));

    expect(onDemoAdd).toHaveBeenCalledWith(
      { id: "1", name: "React", icon: "icon-react" },
      expect.any(Number),
      0,
    );
  });

  it("clears the search term when Escape is pressed", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: { skills: [{ id: "1", name: "JavaScript", icon: "icon-js" }] },
    });

    const { getByLabelText, queryByText } = render(<EditSkillsSearch />);
    fireEvent.change(getByLabelText("Search Skills to Add"), { target: { value: "Java" } });
    expect(queryByText("JavaScript")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(getByLabelText("Search Skills to Add")).toHaveValue("");
  });

  it("shows an empty-state row and can open the new-skill dialog", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: { skills: [] },
    });
    (useMutation as jest.Mock).mockReturnValue({ mutate: jest.fn() });

    const { getByLabelText, getByText } = render(<EditSkillsSearch />);
    fireEvent.change(getByLabelText("Search Skills to Add"), { target: { value: "Zig" } });

    expect(getByText("No matching skills found")).toBeInTheDocument();
    fireEvent.click(getByText("Add a new skill: Zig"));
    expect(getByText("Add a New Skill")).toBeInTheDocument();
  });

  it("adds an existing skill through the mutation and toggles auto-calculate", async () => {
    const mutate = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: { skills: [{ id: "1", name: "JavaScript", icon: "icon-js" }] },
    });
    (useMutation as jest.Mock).mockReturnValue({ mutate });

    const { getByLabelText, getByText } = render(<EditSkillsSearch />);
    fireEvent.change(getByLabelText("Search Skills to Add"), { target: { value: "Java" } });
    fireEvent.click(getByText("JavaScript"));

    fireEvent.click(getByLabelText(/Auto-calculate/));
    fireEvent.change(getByLabelText("Total Years"), { target: { value: "4" } });
    fireEvent.click(getByText("Add Skill"));

    expect(mutate).toHaveBeenCalledWith({
      skillId: "1",
      yearStarted: expect.any(Number),
      totalYears: 4,
    });
  });
});
