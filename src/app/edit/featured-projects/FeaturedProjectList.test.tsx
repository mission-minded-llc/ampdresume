import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FeaturedProjectList } from "./FeaturedProjectList";
import { expect } from "@jest/globals";
import { FeaturedProject } from "@/types";
import { addFeaturedProject } from "@/graphql/addFeaturedProject";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/addFeaturedProject", () => ({
  addFeaturedProject: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/components/CustomDialogTitle", () => ({
  CustomDialogTitle: ({
    children,
    closeHandler,
  }: {
    children: React.ReactNode;
    closeHandler: () => void;
  }) => (
    <div data-testid="custom-dialog-title">
      <button onClick={closeHandler} data-testid="close-dialog">
        Close
      </button>
      {children}
    </div>
  ),
}));

jest.mock("./FeaturedProjectForm", () => ({
  FeaturedProjectForm: ({
    handler,
    onCancel,
  }: {
    handler: (project: unknown) => void;
    onCancel?: () => void;
  }) => (
    <div data-testid="featured-project-form">
      <button
        onClick={() =>
          handler({
            name: "New Project",
            description: "New description",
            links: [],
          })
        }
        data-testid="save-project"
      >
        Save
      </button>
      {onCancel && (
        <button onClick={onCancel} data-testid="cancel-project">
          Cancel
        </button>
      )}
    </div>
  ),
}));

jest.mock("./FeaturedProjectItem", () => ({
  FeaturedProjectItem: ({
    featuredProject,
    expanded,
    setExpanded,
  }: {
    featuredProject: FeaturedProject;
    expanded: string | false;
    setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  }) => (
    <div data-testid={`featured-project-item-${featuredProject.id}`}>
      <div>{featuredProject.name}</div>
      <button
        onClick={() => setExpanded(expanded === featuredProject.id ? false : featuredProject.id)}
        data-testid={`expand-${featuredProject.id}`}
      >
        {expanded === featuredProject.id ? "Collapse" : "Expand"}
      </button>
    </div>
  ),
}));

describe("FeaturedProjectList", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const mockFeaturedProjects: FeaturedProject[] = [
    {
      id: "fp-1",
      name: "Project 1",
      description: "Description 1",
      links: [],
      skillsForFeaturedProject: [],
    },
    {
      id: "fp-2",
      name: "Project 2",
      description: "Description 2",
      links: [],
      skillsForFeaturedProject: [],
    },
  ];

  const mutationCalls: Array<{ variables: unknown }> = [];

  beforeEach(() => {
    jest.clearAllMocks();
    mutationCalls.length = 0;
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => ({
      mutate: async (variables: unknown) => {
        mutationCalls.push({ variables });
        await mutationFn(variables);
        await onSuccess?.();
      },
      isPending: false,
    }));
  });

  describe("Rendering", () => {
    it("renders list of featured projects", () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      expect(screen.getByTestId("featured-project-item-fp-1")).toBeInTheDocument();
      expect(screen.getByTestId("featured-project-item-fp-2")).toBeInTheDocument();
      expect(screen.getByText("Project 1")).toBeInTheDocument();
      expect(screen.getByText("Project 2")).toBeInTheDocument();
    });

    it("renders Add Featured Project button when no project is expanded", () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      expect(screen.getByRole("button", { name: "Add Featured Project" })).toBeInTheDocument();
    });

    it("does not render Add Featured Project button when a project is expanded", () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      fireEvent.click(screen.getByTestId("expand-fp-1"));

      expect(screen.queryByRole("button", { name: "Add Featured Project" })).not.toBeInTheDocument();
    });
  });

  describe("Adding featured projects", () => {
    it("opens dialog when Add Featured Project button is clicked", () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      expect(screen.queryByText("Add New Featured Project")).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Add Featured Project" }));

      expect(screen.getByText("Add New Featured Project")).toBeInTheDocument();
      expect(screen.getByTestId("featured-project-form")).toBeInTheDocument();
    });

    it("closes dialog when cancel is clicked", async () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      fireEvent.click(screen.getByRole("button", { name: "Add Featured Project" }));
      expect(screen.getByText("Add New Featured Project")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("cancel-project"));

      await waitFor(() => {
        expect(screen.queryByText("Add New Featured Project")).not.toBeInTheDocument();
      });
    });

    it("closes dialog when CustomDialogTitle close is clicked", async () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      fireEvent.click(screen.getByRole("button", { name: "Add Featured Project" }));
      expect(screen.getByText("Add New Featured Project")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("close-dialog"));

      await waitFor(() => {
        expect(screen.queryByText("Add New Featured Project")).not.toBeInTheDocument();
      });
    });

    it("calls addFeaturedProject mutation when project is saved", async () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      fireEvent.click(screen.getByRole("button", { name: "Add Featured Project" }));
      fireEvent.click(screen.getByTestId("save-project"));

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].variables).toEqual({
          name: "New Project",
          description: "New description",
          links: [],
        });
        expect(addFeaturedProject).toHaveBeenCalledWith({
          userId: "user-id",
          name: "New Project",
          description: "New description",
          links: [],
        });
      });
    });

    it("closes dialog after saving project", async () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      fireEvent.click(screen.getByRole("button", { name: "Add Featured Project" }));
      fireEvent.click(screen.getByTestId("save-project"));

      await waitFor(() => {
        expect(screen.queryByText("Add New Featured Project")).not.toBeInTheDocument();
      });
    });

    it("invalidates featuredProjects query on success", async () => {
      render(<FeaturedProjectList featuredProjects={mockFeaturedProjects} />);

      fireEvent.click(screen.getByRole("button", { name: "Add Featured Project" }));
      fireEvent.click(screen.getByTestId("save-project"));

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["featuredProjects"],
        });
      });
    });
  });
});
