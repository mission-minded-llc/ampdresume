import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { EditFeaturedProjects } from "./EditFeaturedProjects";
import { expect } from "@jest/globals";
import { FeaturedProject, SkillForUser } from "@/types";
import { getFeaturedProjects } from "@/graphql/getFeaturedProjects";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/graphql/getFeaturedProjects", () => ({
  getFeaturedProjects: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/graphql/getSkillsForUser", () => ({
  getSkillsForUser: jest.fn().mockResolvedValue([]),
}));

jest.mock("../components/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => (
    <div data-testid="section-title">{title}</div>
  ),
}));

jest.mock("./FeaturedProjectList", () => ({
  FeaturedProjectList: ({ featuredProjects }: { featuredProjects: FeaturedProject[] }) => (
    <div data-testid="featured-project-list">
      Projects: {featuredProjects.length}
    </div>
  ),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message }: { message: string }) => (
    <div data-testid="loading-overlay">{message}</div>
  ),
}));

jest.mock("@/components/MuiLink", () => ({
  MuiLink: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("EditFeaturedProjects", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockFeaturedProjects: FeaturedProject[] = [
    {
      id: "fp-1",
      name: "Project 1",
      description: "Description 1",
      links: [],
      skillsForFeaturedProject: [],
    },
  ];
  const mockSkillsForUser: SkillForUser[] = [
    {
      id: "sfu-1",
      userId: "user-id",
      skill: { id: "skill-1", name: "React", icon: null },
      icon: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Session states", () => {
    it("shows loading overlay when session is loading", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "loading",
      });
      (useQuery as jest.Mock).mockReturnValue({ isPending: false });

      render(<EditFeaturedProjects />);

      expect(screen.getByTestId("loading-overlay")).toHaveTextContent("Loading session...");
    });

    it("shows login link when unauthenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });
      (useQuery as jest.Mock).mockReturnValue({ isPending: false });

      render(<EditFeaturedProjects />);

      expect(screen.getByText(/Please/)).toBeInTheDocument();
      expect(screen.getByText("log in.")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/login");
    });
  });

  describe("Data loading states", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
    });

    it("shows loading overlay when data is pending", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({ isPending: true, error: null, data: undefined })
        .mockReturnValueOnce({ isPending: false, error: null, data: [] });

      render(<EditFeaturedProjects />);

      expect(screen.getByTestId("loading-overlay")).toHaveTextContent("Loading resume data...");
    });

    it("shows error message when featured projects query fails", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({
          isPending: false,
          error: { message: "Failed to fetch projects" },
          data: undefined,
        })
        .mockReturnValueOnce({ isPending: false, error: null, data: [] });

      render(<EditFeaturedProjects />);

      expect(screen.getByText("Error loading featured projects: Failed to fetch projects")).toBeInTheDocument();
    });
  });

  describe("Successful rendering", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
    });

    it("renders section title and description", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockFeaturedProjects,
        })
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockSkillsForUser,
        });

      render(<EditFeaturedProjects />);

      expect(screen.getByTestId("section-title")).toHaveTextContent("Your Featured Projects");
      expect(
        screen.getByText(
          /Featured projects are standalone projects you want to highlight on your resume/,
        ),
      ).toBeInTheDocument();
    });

    it("renders FeaturedProjectList with featured projects", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockFeaturedProjects,
        })
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockSkillsForUser,
        });

      render(<EditFeaturedProjects />);

      expect(screen.getByTestId("featured-project-list")).toHaveTextContent("Projects: 1");
    });

    it("renders FeaturedProjectList with empty array when no projects", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: [],
        })
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockSkillsForUser,
        });

      render(<EditFeaturedProjects />);

      expect(screen.getByTestId("featured-project-list")).toHaveTextContent("Projects: 0");
    });

    it("provides skillsForUser context to FeaturedProjectList", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockFeaturedProjects,
        })
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockSkillsForUser,
        });

      render(<EditFeaturedProjects />);

      // Verify the component renders successfully with context
      expect(screen.getByTestId("featured-project-list")).toBeInTheDocument();
    });

    it("fetches featured projects when authenticated", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockFeaturedProjects,
        })
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockSkillsForUser,
        });

      render(<EditFeaturedProjects />);

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["featuredProjects"],
          enabled: true,
        }),
      );
    });

    it("fetches skillsForUser when authenticated", () => {
      (useQuery as jest.Mock)
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockFeaturedProjects,
        })
        .mockReturnValueOnce({
          isPending: false,
          error: null,
          data: mockSkillsForUser,
        });

      render(<EditFeaturedProjects />);

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["skillsForUser"],
          enabled: true,
        }),
      );
    });

    it("does not fetch data when not authenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });
      (useQuery as jest.Mock).mockReturnValue({ isPending: false });

      render(<EditFeaturedProjects />);

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );
    });
  });
});
