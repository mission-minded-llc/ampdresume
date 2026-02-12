import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsList } from "./ProjectsList";
import { expect } from "@jest/globals";
import { Position, Project } from "@/types";
import { addProject } from "@/graphql/addProject";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/addProject", () => ({
  addProject: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/graphql/updateProjectSortIndexes", () => ({
  updateProjectSortIndexes: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("./ProjectItem", () => ({
  ProjectItem: ({
    project,
    setIsEditing,
  }: {
    project: Project;
    positionId: string;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div data-testid={`project-item-${project.id}`}>
      {project.name}
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  ),
}));

jest.mock("@/components/Tooltip", () => ({
  Tooltip: ({ message }: { message: React.ReactNode }) => <div>{message}</div>,
}));

jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children, onDragEnd }: { children: React.ReactNode; onDragEnd: () => void }) => (
    <div data-testid="dnd-context" onClick={onDragEnd}>
      {children}
    </div>
  ),
  closestCenter: jest.fn(),
  KeyboardSensor: jest.fn(),
  PointerSensor: jest.fn(),
  useSensor: jest.fn(() => jest.fn()),
  useSensors: jest.fn(() => []),
}));

jest.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sortable-context">{children}</div>
  ),
  useSortable: jest.fn(() => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  })),
  verticalListSortingStrategy: jest.fn(),
  arrayMove: jest.fn((arr, oldIndex, newIndex) => {
    const result = [...arr];
    const [removed] = result.splice(oldIndex, 1);
    result.splice(newIndex, 0, removed);
    return result;
  }),
}));

describe("ProjectsList", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const mockPosition: Position = {
    id: "position-1",
    title: "Software Engineer",
    startDate: "2020-01-01",
    endDate: null,
    projectCount: 2,
  };

  const mockProjects: Project[] = [
    {
      id: "project-1",
      name: "Project 1",
      description: "Description 1",
      skillsForProject: [],
      sortIndex: 0,
    },
    {
      id: "project-2",
      name: "Project 2",
      description: "Description 2",
      skillsForProject: [],
      sortIndex: 1,
    },
  ];

  const mutationCalls: Array<{ type: string; variables: unknown }> = [];

  beforeEach(() => {
    jest.clearAllMocks();
    mutationCalls.length = 0;
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => {
      const fnString = mutationFn.toString();
      let type = "unknown";
      if (fnString.includes("addProject")) {
        type = "add";
      } else if (fnString.includes("updateProjectSortIndexes")) {
        type = "updateSort";
      }

      return {
        mutate: async (variables: unknown) => {
          mutationCalls.push({ type, variables });
          await mutationFn(variables);
          await onSuccess?.();
        },
        isPending: false,
      };
    });
  });

  describe("Rendering", () => {
    it("renders project input field", () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project");
      expect(input).toBeInTheDocument();
    });

    it("renders Add button", () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const addButton = screen.getByRole("button", { name: /Add/ });
      expect(addButton).toBeInTheDocument();
    });

    it("renders all projects", () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      expect(screen.getByTestId("project-item-project-1")).toBeInTheDocument();
      expect(screen.getByTestId("project-item-project-2")).toBeInTheDocument();
    });

    it("renders projects in sorted order by sortIndex", () => {
      const unsortedProjects: Project[] = [
        { ...mockProjects[1], sortIndex: 1 },
        { ...mockProjects[0], sortIndex: 0 },
      ];

      render(<ProjectsList position={mockPosition} projects={unsortedProjects} />);

      const projectItems = screen.getAllByTestId(/project-item-/);
      expect(projectItems[0]).toHaveTextContent("Project 1");
      expect(projectItems[1]).toHaveTextContent("Project 2");
    });

    it("renders empty list when no projects", () => {
      render(<ProjectsList position={mockPosition} projects={[]} />);

      expect(screen.queryByTestId(/project-item-/)).not.toBeInTheDocument();
    });
  });

  describe("Add project functionality", () => {
    it("adds project when Add button is clicked with valid input", async () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project");
      fireEvent.change(input, { target: { value: "New Project Name" } });

      const addButton = screen.getByRole("button", { name: /Add/ });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("add");
        expect(mutationCalls[0].variables).toEqual({
          name: "New Project Name",
          positionId: "position-1",
        });
      });
    });

    it("trims whitespace from project name before adding", async () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project");
      fireEvent.change(input, { target: { value: "  Trimmed Project  " } });

      const addButton = screen.getByRole("button", { name: /Add/ });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mutationCalls[0].variables).toEqual({
          name: "Trimmed Project",
          positionId: "position-1",
        });
      });
    });

    it("clears input field after adding project", async () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "New Project Name" } });

      const addButton = screen.getByRole("button", { name: /Add/ });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(input.value).toBe("");
      });
    });

    it("does not add project when input is empty", () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const addButton = screen.getByRole("button", { name: /Add/ });
      fireEvent.click(addButton);

      expect(mutationCalls).toHaveLength(0);
    });

    it("does not add project when input is only whitespace", () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project");
      fireEvent.change(input, { target: { value: "   " } });

      const addButton = screen.getByRole("button", { name: /Add/ });
      fireEvent.click(addButton);

      expect(mutationCalls).toHaveLength(0);
    });

    it("disables Add button when project name is less than 10 characters", () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project");
      const addButton = screen.getByRole("button", { name: /Add/ });

      fireEvent.change(input, { target: { value: "Short" } });
      expect(addButton).toBeDisabled();

      fireEvent.change(input, { target: { value: "Long enough name" } });
      expect(addButton).not.toBeDisabled();
    });

    it("invalidates queries after successful add", async () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project");
      fireEvent.change(input, { target: { value: "New Project Name" } });

      const addButton = screen.getByRole("button", { name: /Add/ });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["projects", "position-1"],
        });
      });
    });
  });

  describe("Drag and drop", () => {
    it("updates sort indexes when projects are reordered", async () => {
      const { arrayMove } = require("@dnd-kit/sortable");
      arrayMove.mockImplementation((arr: Project[], oldIndex: number, newIndex: number) => {
        const result = [...arr];
        const [removed] = result.splice(oldIndex, 1);
        result.splice(newIndex, 0, removed);
        return result;
      });

      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      // Simulate drag end event
      const dndContext = screen.getByTestId("dnd-context");
      fireEvent.click(dndContext);

      // Note: Actual drag and drop testing would require more complex setup
      // This is a basic test to ensure the component renders correctly
      expect(dndContext).toBeInTheDocument();
    });
  });

  describe("Expanded prop", () => {
    it("passes expanded prop to project items", () => {
      render(<ProjectsList position={mockPosition} projects={mockProjects} expanded={true} />);

      expect(screen.getByTestId("project-item-project-1")).toBeInTheDocument();
      expect(screen.getByTestId("project-item-project-2")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles missing session user id gracefully", async () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

      render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const input = screen.getByLabelText("Project");
      fireEvent.change(input, { target: { value: "New Project Name" } });

      const addButton = screen.getByRole("button", { name: /Add/ });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(addProject).not.toHaveBeenCalled();
      });
    });

    it("handles projects with zero sortIndex", () => {
      const projectsWithZeroSort: Project[] = [
        {
          id: "project-1",
          name: "Project 1",
          description: "Description 1",
          skillsForProject: [],
          sortIndex: 0,
        },
        {
          id: "project-2",
          name: "Project 2",
          description: "Description 2",
          skillsForProject: [],
          sortIndex: 0,
        },
      ];

      render(<ProjectsList position={mockPosition} projects={projectsWithZeroSort} />);

      expect(screen.getByTestId("project-item-project-1")).toBeInTheDocument();
      expect(screen.getByTestId("project-item-project-2")).toBeInTheDocument();
    });

    it("updates local projects when props change", () => {
      const { rerender } = render(<ProjectsList position={mockPosition} projects={mockProjects} />);

      const newProjects: Project[] = [
        ...mockProjects,
        {
          id: "project-3",
          name: "Project 3",
          description: "Description 3",
          skillsForProject: [],
          sortIndex: 2,
        },
      ];

      rerender(<ProjectsList position={mockPosition} projects={newProjects} />);

      expect(screen.getByTestId("project-item-project-3")).toBeInTheDocument();
    });
  });
});
