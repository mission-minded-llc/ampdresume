import "@testing-library/jest-dom";

import { render, waitFor } from "@testing-library/react";

import { EditEducation } from "./EditEducation";
import { Education } from "@openresume/theme";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/graphql/getEducation", () => ({
  getEducation: jest.fn(),
}));

jest.mock("../components/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("./EducationList", () => ({
  EducationList: ({ education }: { education: Education[] }) => (
    <div>
      {education.map((edu) => (
        <div key={edu.id}>{edu.school}</div>
      ))}
    </div>
  ),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock("@/components/MuiLink", () => ({
  MuiLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("EditEducation", () => {
  const mockSession = {
    user: { id: "user-id" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when session is loading", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: "loading" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });

    const { getByText } = render(<EditEducation />);
    expect(getByText("Loading session...")).toBeInTheDocument();
  });

  it("renders login prompt when unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });

    const { getByText } = render(<EditEducation />);

    waitFor(() => expect(getByText("Please log in.")).toBeInTheDocument());
  });

  it("renders loading state when fetching education data", () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: true });

    const { getByText } = render(<EditEducation />);
    expect(getByText("Loading resume data...")).toBeInTheDocument();
  });

  it("renders error message when fetching education data fails", () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, error: { message: "Error" } });

    const { getByText } = render(<EditEducation />);
    expect(getByText("Error loading education: Error")).toBeInTheDocument();
  });

  it("renders education list when data is fetched successfully", async () => {
    const mockEducation = [
      { id: "1", school: "University A" },
      { id: "2", school: "University B" },
    ];
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: mockEducation });

    const { getByText } = render(<EditEducation />);

    await waitFor(() => {
      expect(getByText("Your Education")).toBeInTheDocument();
      expect(getByText("University A")).toBeInTheDocument();
      expect(getByText("University B")).toBeInTheDocument();
    });
  });

  it("renders no education message when no education data is found", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });

    const { getByText } = render(<EditEducation />);

    await waitFor(() => {
      expect(getByText("No education found.")).toBeInTheDocument();
    });
  });
});
