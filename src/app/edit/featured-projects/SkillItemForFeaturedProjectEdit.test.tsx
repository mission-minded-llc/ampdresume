import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SkillItemForFeaturedProjectEdit } from "./SkillItemForFeaturedProjectEdit";
import { expect } from "@jest/globals";
import { FeaturedProject, SkillForFeaturedProject } from "@/types";
import { updateSkillForFeaturedProject } from "@/graphql/updateSkillForFeaturedProject";
import { deleteSkillForFeaturedProject } from "@/graphql/deleteSkillForFeaturedProject";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/updateSkillForFeaturedProject", () => ({
  updateSkillForFeaturedProject: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/graphql/deleteSkillForFeaturedProject", () => ({
  deleteSkillForFeaturedProject: jest.fn().mockResolvedValue(undefined),
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

jest.mock("../components/RichTextEditor/RichTextEditor", () => ({
  RichTextEditor: ({
    editorStateRef,
    value,
  }: {
    editorStateRef: React.RefObject<string | null>;
    value: string;
  }) => {
    (editorStateRef as React.MutableRefObject<string | null>).current = value;
    return <div data-testid="rich-text-editor">RichTextEditor</div>;
  },
}));

jest.mock("../components/DeleteWithConfirmation", () => ({
  DeleteWithConfirmation: ({
    onConfirmDelete,
    buttonLabel,
  }: {
    onConfirmDelete: () => void;
    buttonLabel: string;
  }) => (
    <button onClick={onConfirmDelete} data-testid="delete-button">
      {buttonLabel}
    </button>
  ),
}));

jest.mock("@iconify/react", () => ({
  Icon: ({ icon }: { icon: string }) => <div data-testid="icon" data-icon={icon} />,
}));

describe("SkillItemForFeaturedProjectEdit", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const mockFeaturedProject: FeaturedProject = {
    id: "fp-1",
    name: "Test Project",
    description: "Description",
    links: [],
    skillsForFeaturedProject: [],
  };

  const mockSkillForFeaturedProject: SkillForFeaturedProject = {
    id: "sfp-1",
    description: "Skill description for project",
    skillForUser: {
      id: "sfu-1",
      userId: "user-id",
      skill: { id: "skill-1", name: "React", icon: "logos:react" },
      icon: null,
    },
  };

  const mutationCalls: Array<{ type: string; variables: unknown }> = [];

  beforeEach(() => {
    jest.clearAllMocks();
    mutationCalls.length = 0;
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => {
      // Determine mutation type based on the function signature
      const fnString = mutationFn.toString();
      let type = "unknown";
      if (fnString.includes("updateSkillForFeaturedProject")) {
        type = "update";
      } else if (fnString.includes("deleteSkillForFeaturedProject")) {
        type = "delete";
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
    it("renders skill name as button", () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      expect(screen.getByRole("button", { name: /React/ })).toBeInTheDocument();
    });

    it("renders skill icon when skillForUser has icon", () => {
      const withIcon = {
        ...mockSkillForFeaturedProject,
        skillForUser: {
          ...mockSkillForFeaturedProject.skillForUser,
          icon: "mdi:react",
        },
      };

      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={withIcon}
          featuredProject={mockFeaturedProject}
        />,
      );

      expect(screen.getByTestId("icon")).toHaveAttribute("data-icon", "mdi:react");
    });

    it("renders skill icon from skill when skillForUser icon is null", () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      expect(screen.getByTestId("icon")).toHaveAttribute("data-icon", "logos:react");
    });

    it("opens dialog when button is clicked", () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      expect(screen.queryByText("Edit Featured Project Skill")).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: /React/ }));

      expect(screen.getByText("Edit Featured Project Skill")).toBeInTheDocument();
      expect(screen.getByTestId("rich-text-editor")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save & Close" })).toBeInTheDocument();
      expect(screen.getByTestId("delete-button")).toHaveTextContent("Delete from Featured Project");
    });
  });

  describe("Dialog actions", () => {
    it("calls update mutation when Save is clicked", async () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: /React/ }));
      
      // Wait for dialog to be fully rendered
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole("button", { name: "Save" }));

      await waitFor(() => {
        const updateCall = mutationCalls.find((call) => call.type === "update");
        expect(updateCall).toBeDefined();
        expect(updateCall?.variables).toEqual({
          id: "sfp-1",
          description: "Skill description for project",
        });
        expect(updateSkillForFeaturedProject).toHaveBeenCalledWith({
          id: "sfp-1",
          userId: "user-id",
          description: "Skill description for project",
        });
      });
    });

    it("calls update mutation and closes dialog when Save & Close is clicked", async () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: /React/ }));
      
      await waitFor(() => {
        expect(screen.getByText("Edit Featured Project Skill")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Save & Close" })).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole("button", { name: "Save & Close" }));

      await waitFor(() => {
        const updateCall = mutationCalls.find((call) => call.type === "update");
        expect(updateCall).toBeDefined();
        expect(screen.queryByText("Edit Featured Project Skill")).not.toBeInTheDocument();
      });
    });

    it("calls delete mutation when Delete from Featured Project is clicked", async () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: /React/ }));
      fireEvent.click(screen.getByTestId("delete-button"));

      await waitFor(() => {
        const deleteCall = mutationCalls.find((call) => call.type === "delete");
        expect(deleteCall).toBeDefined();
        expect(deleteCall?.variables).toEqual({ id: "sfp-1" });
        expect(deleteSkillForFeaturedProject).toHaveBeenCalledWith({
          id: "sfp-1",
          userId: "user-id",
        });
      });
    });

    it("closes dialog when CustomDialogTitle close is clicked", async () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: /React/ }));
      expect(screen.getByText("Edit Featured Project Skill")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("close-dialog"));

      await waitFor(() => {
        expect(screen.queryByText("Edit Featured Project Skill")).not.toBeInTheDocument();
      });
    });
  });

  describe("Invalidate queries on success", () => {
    it("invalidates skillsForFeaturedProject and featuredProjects on update success", async () => {
      render(
        <SkillItemForFeaturedProjectEdit
          skillForFeaturedProject={mockSkillForFeaturedProject}
          featuredProject={mockFeaturedProject}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: /React/ }));
      fireEvent.click(screen.getByRole("button", { name: "Save" }));

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["skillsForFeaturedProject", "fp-1"],
        });
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["featuredProjects"],
        });
      });
    });
  });
});
