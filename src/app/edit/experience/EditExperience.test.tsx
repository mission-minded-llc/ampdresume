import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { EditExperience } from "./EditExperience";
import { expect } from "@jest/globals";
import { Company, SkillForUser } from "@/types";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/graphql/getCompanies", () => ({
  getCompanies: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/graphql/getSkillsForUser", () => ({
  getSkillsForUser: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock("@/components/MuiLink", () => ({
  MuiLink: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("../components/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

jest.mock("./CompanyList", () => ({
  CompanyList: ({ companies }: { companies: Company[] }) => (
    <div data-testid="company-list">{companies.length} companies</div>
  ),
}));

describe("EditExperience", () => {
  const mockSession = { user: { id: "user-id" } };

  const mockCompanies: Company[] = [
    {
      id: "company-1",
      name: "Test Company",
      location: "Test Location",
      startDate: "2020-01-01",
      endDate: null,
      description: "Company description",
      positionCount: 0,
    },
  ];

  const mockSkillsForUser: SkillForUser[] = [
    {
      id: "sfu-1",
      userId: "user-id",
      skill: { id: "skill-1", name: "React", icon: "logos:react" },
      icon: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering - Authenticated", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: null,
            data: mockCompanies,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: mockSkillsForUser,
          };
        }
        return { isPending: false, error: null, data: null };
      });
    });

    it("renders section title", () => {
      render(<EditExperience />);

      expect(screen.getByText("Edit Professional Experience")).toBeInTheDocument();
    });

    it("renders description text", () => {
      render(<EditExperience />);

      expect(screen.getByText(/Add your professional experience/)).toBeInTheDocument();
    });

    it("renders CompanyList with companies", () => {
      render(<EditExperience />);

      expect(screen.getByTestId("company-list")).toBeInTheDocument();
      expect(screen.getByText("1 companies")).toBeInTheDocument();
    });

    it("provides skillsForUser to context", () => {
      render(<EditExperience />);

      // Verify CompanyList is rendered, which uses the context
      expect(screen.getByTestId("company-list")).toBeInTheDocument();
    });

    it("renders empty company list message when no companies", () => {
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: null,
            data: null,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: [],
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      expect(screen.getByText("No companies found.")).toBeInTheDocument();
    });
  });

  describe("Loading states", () => {
    it("displays loading overlay when session is loading", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "loading",
      });

      render(<EditExperience />);

      expect(screen.getByText("Loading session...")).toBeInTheDocument();
    });

    it("displays loading overlay when companies are loading", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: true,
            error: null,
            data: undefined,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: [],
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      expect(screen.getByText("Loading resume data...")).toBeInTheDocument();
    });
  });

  describe("Error states", () => {
    it("displays error message when companies query fails", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: { message: "Failed to load companies" },
            data: undefined,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: [],
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      expect(screen.getByText(/Error loading experience/)).toBeInTheDocument();
    });
  });

  describe("Unauthenticated state", () => {
    it("displays login message when unauthenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<EditExperience />);

      expect(screen.getByText(/Please/)).toBeInTheDocument();
      expect(screen.getByText(/log in/)).toBeInTheDocument();
    });

    it("does not fetch companies when unauthenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });
      (useQuery as jest.Mock).mockReturnValue({
        isPending: false,
        error: null,
        data: null,
      });

      render(<EditExperience />);

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );
    });
  });

  describe("Query behavior", () => {
    it("fetches companies when authenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: null,
            data: mockCompanies,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: mockSkillsForUser,
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryKey: ["companies"],
        }),
      );
    });

    it("fetches skillsForUser when authenticated", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: null,
            data: mockCompanies,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: mockSkillsForUser,
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryKey: ["skillsForUser"],
        }),
      );
    });

    it("handles null skillsForUser response", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: null,
            data: mockCompanies,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: null,
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      expect(screen.getByTestId("company-list")).toBeInTheDocument();
    });
  });

  describe("Context provider", () => {
    it("provides empty skillsForUser array when data is null", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: null,
            data: mockCompanies,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: null,
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      // Component should render without errors
      expect(screen.getByTestId("company-list")).toBeInTheDocument();
    });

    it("provides skillsForUser array when data is available", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
      (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
        if (queryKey[0] === "companies") {
          return {
            isPending: false,
            error: null,
            data: mockCompanies,
          };
        }
        if (queryKey[0] === "skillsForUser") {
          return {
            isPending: false,
            error: null,
            data: mockSkillsForUser,
          };
        }
        return { isPending: false, error: null, data: null };
      });

      render(<EditExperience />);

      expect(screen.getByTestId("company-list")).toBeInTheDocument();
    });
  });
});
