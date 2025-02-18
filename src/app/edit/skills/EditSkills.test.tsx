import "@testing-library/jest-dom";

import { render, waitFor } from "@testing-library/react";

import { EditSkills } from "./EditSkills";
import React from "react";
import { Skill } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/graphql/getSkillsForUser", () => ({
  getSkillsForUser: jest.fn(),
}));

jest.mock("../components/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("./EditSkillsSearch", () => ({
  EditSkillsSearch: () => <div>EditSkillsSearch</div>,
}));

jest.mock("./SkillsExperience", () => ({
  SkillsExperience: ({ skills }: { skills: Skill[] }) => (
    <div>
      {skills.map((skill) => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  ),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe("EditSkills", () => {
  const mockSession = {
    user: { id: "user-id" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when session is loading", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: "loading" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: true });

    const { container, getByText } = render(<EditSkills />);

    waitFor(() => expect(getByText("Loading session...")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it("renders login prompt when unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: true });

    const { container, getByText } = render(<EditSkills />);

    waitFor(() => expect(getByText("Please log in.")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it("renders loading state when fetching skills", () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: true });

    const { container, getByText } = render(<EditSkills />);
    expect(getByText("Loading resume data...")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders error message when fetching skills fails", () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, error: { message: "Error" } });

    const { container, getByText } = render(<EditSkills />);
    expect(getByText("Error loading skills: Error")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders skills when fetched successfully", async () => {
    const mockSkills = [
      { id: "1", name: "Skill 1" },
      { id: "2", name: "Skill 2" },
    ];
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: mockSkills });

    const { container, getByText } = render(<EditSkills />);

    await waitFor(() => {
      expect(getByText("Add a Skill")).toBeInTheDocument();
      expect(getByText("Search for a skill to add to your profile:")).toBeInTheDocument();
      expect(getByText("EditSkillsSearch")).toBeInTheDocument();
      expect(getByText("Your Skills")).toBeInTheDocument();
      expect(getByText("Skill 1")).toBeInTheDocument();
      expect(getByText("Skill 2")).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it("renders no skills message when no skills are found", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });

    const { container, getByText } = render(<EditSkills />);

    await waitFor(() => {
      expect(getByText("No skills found.")).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });
});
