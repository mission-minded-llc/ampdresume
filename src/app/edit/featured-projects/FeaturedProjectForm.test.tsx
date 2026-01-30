import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { FeaturedProjectForm } from "./FeaturedProjectForm";
import { expect } from "@jest/globals";
import { FeaturedProject } from "@/types";

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

describe("FeaturedProjectForm", () => {
  const mockHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  const mockOnCancel = jest.fn();

  const mockFeaturedProject: FeaturedProject = {
    id: "fp-1",
    name: "Test Project",
    description: "Test description",
    links: [
      { label: "GitHub", url: "https://github.com/test" },
      { label: "Demo", url: "https://demo.com" },
    ],
    skillsForFeaturedProject: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Add mode (no featuredProject)", () => {
    it("renders with empty name, description, and no links", () => {
      render(<FeaturedProjectForm handler={mockHandler} />);

      expect(screen.getByLabelText(/Project Name/)).toHaveValue("");
      expect(screen.getByTestId("rich-text-editor")).toBeInTheDocument();
      expect(screen.getByText("Links")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("e.g., GitHub")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("https://...")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Add Link" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save Featured Project" })).toBeInTheDocument();
    });

    it("does not render delete button or cancel when not provided", () => {
      render(<FeaturedProjectForm handler={mockHandler} />);

      expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
    });

    it("disables Save when name is empty", () => {
      render(<FeaturedProjectForm handler={mockHandler} />);

      expect(screen.getByRole("button", { name: "Save Featured Project" })).toBeDisabled();
    });

    it("enables Save when name is entered and calls handler on save", () => {
      render(<FeaturedProjectForm handler={mockHandler} />);

      fireEvent.change(screen.getByLabelText(/Project Name/), {
        target: { value: "My New Project" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Save Featured Project" }));

      expect(mockHandler).toHaveBeenCalledTimes(1);
      expect(mockHandler).toHaveBeenCalledWith({
        name: "My New Project",
        description: null,
        links: [],
      });
    });

    it("renders cancel button and calls onCancel when provided", () => {
      render(<FeaturedProjectForm handler={mockHandler} onCancel={mockOnCancel} />);

      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("adds a link when label and URL are provided", () => {
      render(<FeaturedProjectForm handler={mockHandler} />);

      fireEvent.change(screen.getByLabelText(/Link Label/), {
        target: { value: "GitHub" },
      });
      fireEvent.change(screen.getByLabelText(/Link URL/), {
        target: { value: "https://github.com/me" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add Link" }));

      expect(screen.getByText("GitHub")).toBeInTheDocument();
      expect(screen.getByText(/https:\/\/github\.com\/me/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Link Label/)).toHaveValue("");
      expect(screen.getByLabelText(/Link URL/)).toHaveValue("");
    });

    it("does not add link when label or URL is empty", () => {
      render(<FeaturedProjectForm handler={mockHandler} />);

      fireEvent.change(screen.getByLabelText(/Link Label/), { target: { value: "GitHub" } });
      fireEvent.click(screen.getByRole("button", { name: "Add Link" }));

      expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
    });

    it("calls handler with links when save after adding links", () => {
      render(<FeaturedProjectForm handler={mockHandler} />);

      fireEvent.change(screen.getByLabelText(/Project Name/), {
        target: { value: "Project" },
      });
      fireEvent.change(screen.getByLabelText(/Link Label/), {
        target: { value: "GitHub" },
      });
      fireEvent.change(screen.getByLabelText(/Link URL/), {
        target: { value: "https://github.com/x" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Add Link" }));
      fireEvent.click(screen.getByRole("button", { name: "Save Featured Project" }));

      expect(mockHandler).toHaveBeenCalledWith({
        name: "Project",
        description: null,
        links: [{ label: "GitHub", url: "https://github.com/x" }],
      });
    });
  });

  describe("Edit mode (with featuredProject)", () => {
    it("renders with featured project data", () => {
      render(
        <FeaturedProjectForm
          featuredProject={mockFeaturedProject}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      expect(screen.getByLabelText(/Project Name/)).toHaveValue("Test Project");
      expect(screen.getByText("GitHub")).toBeInTheDocument();
      expect(screen.getByText(/https:\/\/github\.com\/test/)).toBeInTheDocument();
      expect(screen.getByText("Demo")).toBeInTheDocument();
      expect(screen.getByText(/https:\/\/demo\.com/)).toBeInTheDocument();
    });

    it("renders delete button when deleteHandler provided", () => {
      render(
        <FeaturedProjectForm
          featuredProject={mockFeaturedProject}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      expect(screen.getByTestId("delete-button")).toHaveTextContent("Delete Featured Project");
    });

    it("disables Save when no changes made", () => {
      render(
        <FeaturedProjectForm
          featuredProject={mockFeaturedProject}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      expect(screen.getByRole("button", { name: "Save Featured Project" })).toBeDisabled();
    });

    it("enables Save when name is changed and calls handler", () => {
      render(
        <FeaturedProjectForm
          featuredProject={mockFeaturedProject}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      fireEvent.change(screen.getByLabelText(/Project Name/), {
        target: { value: "Updated Project Name" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Save Featured Project" }));

      expect(mockHandler).toHaveBeenCalledWith({
        name: "Updated Project Name",
        description: "Test description",
        links: mockFeaturedProject.links,
      });
    });

    it("calls deleteHandler when delete button is clicked", () => {
      render(
        <FeaturedProjectForm
          featuredProject={mockFeaturedProject}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      fireEvent.click(screen.getByTestId("delete-button"));

      expect(mockDeleteHandler).toHaveBeenCalledTimes(1);
      expect(mockDeleteHandler).toHaveBeenCalledWith(mockFeaturedProject);
    });

    it("removes a link when Remove is clicked", () => {
      render(
        <FeaturedProjectForm
          featuredProject={mockFeaturedProject}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      const removeButtons = screen.getAllByRole("button", { name: "Remove" });
      fireEvent.click(removeButtons[0]);

      expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
      expect(screen.getByText("Demo")).toBeInTheDocument();
    });

    it("enables Save when link is removed", () => {
      render(
        <FeaturedProjectForm
          featuredProject={mockFeaturedProject}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
      );

      fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);

      expect(screen.getByRole("button", { name: "Save Featured Project" })).not.toBeDisabled();
      fireEvent.click(screen.getByRole("button", { name: "Save Featured Project" }));

      expect(mockHandler).toHaveBeenCalledWith({
        name: "Test Project",
        description: "Test description",
        links: [{ label: "Demo", url: "https://demo.com" }],
      });
    });
  });
});
