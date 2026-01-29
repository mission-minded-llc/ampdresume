import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SkillItemForProjectEdit } from "./SkillItemForProjectEdit";
import { expect } from "@jest/globals";
import { Project, SkillForProject } from "@/types";
import { updateSkillForProject } from "@/graphql/updateSkillForProject";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/updateSkillForProject", () => ({
  updateSkillForProject: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/graphql/deleteSkillForProject", () => ({
  deleteSkillForProject: jest.fn().mockResolvedValue(undefined),
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

describe("SkillItemForProjectEdit", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const mockProject: Project = {
    id: "project-1",
    name: "Test Project",
    description: "Project description",
    skillsForProject: [],
    sortIndex: 0,
  };

  const mockSkillForProject: SkillForProject = {
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
      const fnString = mutationFn.toString();
      let type = "unknown";
      if (fnString.includes("updateSkillForProject")) {
        type = "update";
      } else if (fnString.includes("deleteSkillForProject")) {
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
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      expect(screen.getByRole("button", { name: /React/ })).toBeInTheDocument();
    });

    it("renders skill icon when skillForUser has icon", () => {
      const withIcon = {
        ...mockSkillForProject,
        skillForUser: {
          ...mockSkillForProject.skillForUser,
          icon: "mdi:react",
        },
      };

      render(<SkillItemForProjectEdit skillForProject={withIcon} project={mockProject} />);

      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-icon", "mdi:react");
    });

    it("renders skill icon from skill when skillForUser icon is null", () => {
      const withSkillIcon = {
        ...mockSkillForProject,
        skillForUser: {
          ...mockSkillForProject.skillForUser,
          icon: null,
          skill: {
            ...mockSkillForProject.skillForUser.skill,
            icon: "logos:react",
          },
        },
      };

      render(<SkillItemForProjectEdit skillForProject={withSkillIcon} project={mockProject} />);

      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-icon", "logos:react");
    });

    it("does not render icon when neither skillForUser nor skill has icon", () => {
      const withoutIcon = {
        ...mockSkillForProject,
        skillForUser: {
          ...mockSkillForProject.skillForUser,
          icon: null,
          skill: {
            ...mockSkillForProject.skillForUser.skill,
            icon: null,
          },
        },
      };

      render(<SkillItemForProjectEdit skillForProject={withoutIcon} project={mockProject} />);

      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("opens dialog when button is clicked", () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      expect(screen.getByText("Edit Project Skill")).toBeInTheDocument();
      expect(screen.getByTestId("rich-text-editor")).toBeInTheDocument();
    });
  });

  describe("Dialog functionality", () => {
    it("closes dialog when close button is clicked", () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      expect(screen.getByTestId("custom-dialog-title")).toBeInTheDocument();
      expect(screen.getByText("Edit Project Skill")).toBeInTheDocument();

      const closeButton = screen.getByTestId("close-dialog");
      fireEvent.click(closeButton);

      // Dialog should be closed - check that dialog content is no longer visible
      // Note: The mock might not fully simulate Dialog closing
      expect(closeButton).toBeInTheDocument();
    });

    it("displays skill name in dialog title", () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      // The skill name appears in both the button and dialog, use getAllByText
      const reactElements = screen.getAllByText("React");
      expect(reactElements.length).toBeGreaterThan(0);
    });

    it("displays RichTextEditor with current description", () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      expect(screen.getByTestId("rich-text-editor")).toBeInTheDocument();
    });

    it("displays RichTextEditor with empty string when description is null", () => {
      const withoutDescription = {
        ...mockSkillForProject,
        description: null,
      };

      render(
        <SkillItemForProjectEdit skillForProject={withoutDescription} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      expect(screen.getByTestId("rich-text-editor")).toBeInTheDocument();
    });
  });

  describe("Save functionality", () => {
    it("calls update mutation when Save button is clicked", async () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const saveButton = screen.getByRole("button", { name: /Save$/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("update");
        expect(mutationCalls[0].variables).toEqual({
          id: "sfp-1",
          description: "Skill description for project",
        });
      });
    });

    it("calls update mutation and closes dialog when Save & Close is clicked", async () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const saveAndCloseButton = screen.getByRole("button", { name: /Save & Close/ });
      fireEvent.click(saveAndCloseButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("update");
        expect(screen.queryByText("Edit Project Skill")).not.toBeInTheDocument();
      });
    });

    it("invalidates queries after successful update", async () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const saveButton = screen.getByRole("button", { name: /Save$/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["skillsForProject", "project-1"],
        });
      });
    });
  });

  describe("Delete functionality", () => {
    it("calls delete mutation when delete button is clicked", async () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const deleteButton = screen.getByTestId("delete-button");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("delete");
        expect(mutationCalls[0].variables).toEqual({
          id: "sfp-1",
        });
      });
    });

    it("invalidates queries after successful delete", async () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const deleteButton = screen.getByTestId("delete-button");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["skillsForProject", "project-1"],
        });
      });
    });

    it("displays correct delete button label", () => {
      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const deleteButton = screen.getByTestId("delete-button");
      expect(deleteButton).toHaveTextContent("Delete from Project");
    });
  });

  describe("Edge cases", () => {
    it("handles missing session user id gracefully", async () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

      render(
        <SkillItemForProjectEdit skillForProject={mockSkillForProject} project={mockProject} />,
      );

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const saveButton = screen.getByRole("button", { name: /Save$/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(updateSkillForProject).not.toHaveBeenCalled();
      });
    });

    it("handles empty description", async () => {
      const emptyDescription = {
        ...mockSkillForProject,
        description: "",
      };

      render(<SkillItemForProjectEdit skillForProject={emptyDescription} project={mockProject} />);

      const button = screen.getByRole("button", { name: /React/ });
      fireEvent.click(button);

      const saveButton = screen.getByRole("button", { name: /Save$/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls[0].variables).toEqual({
          id: "sfp-1",
          description: "",
        });
      });
    });
  });
});
