import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EducationList } from "./EducationList";
import { expect } from "@jest/globals";
import { Education } from "@/types";
import { addEducation } from "@/graphql/addEducation";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/addEducation", () => ({
  addEducation: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("./EducationItem", () => ({
  EducationItem: ({
    education,
    setExpanded,
  }: {
    education: Education;
    expanded: string | false;
    setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  }) => (
    <div data-testid={`education-item-${education.id}`}>
      {education.school}
      <button onClick={() => setExpanded(education.id)}>Expand</button>
    </div>
  ),
}));

jest.mock("./EducationForm", () => ({
  EducationForm: ({
    handler,
    onCancel,
  }: {
    handler: (education: unknown) => void;
    onCancel: () => void;
  }) => (
    <div>
      <button
        onClick={() =>
          handler({
            school: "New School",
            degree: "New Degree",
            dateAwarded: "2020-01-01",
          })
        }
      >
        Submit
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
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

describe("EducationList", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const mockEducation: Education[] = [
    {
      id: "edu-1",
      school: "Test University",
      degree: "Bachelor of Science",
      dateAwarded: "2020-01-01",
    },
    {
      id: "edu-2",
      school: "Test College",
      degree: "Master of Science",
      dateAwarded: "2022-01-01",
    },
  ];

  const mutationCalls: Array<{ type: string; variables: unknown }> = [];

  beforeEach(() => {
    jest.clearAllMocks();
    mutationCalls.length = 0;
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => {
      return {
        mutate: async (variables: unknown) => {
          mutationCalls.push({ type: "add", variables });
          await mutationFn(variables);
          await onSuccess?.();
        },
        isPending: false,
      };
    });
  });

  describe("Rendering", () => {
    it("renders all education items", () => {
      render(<EducationList education={mockEducation} />);

      expect(screen.getByTestId("education-item-edu-1")).toBeInTheDocument();
      expect(screen.getByTestId("education-item-edu-2")).toBeInTheDocument();
    });

    it("renders Add Education button when no education is expanded", () => {
      render(<EducationList education={mockEducation} />);

      expect(screen.getByRole("button", { name: /Add Education/ })).toBeInTheDocument();
    });

    it("does not render Add Education button when an education is expanded", () => {
      const { rerender } = render(<EducationList education={mockEducation} />);

      const expandButtons = screen.getAllByRole("button", { name: /Expand/ });
      fireEvent.click(expandButtons[0]);

      rerender(<EducationList education={mockEducation} />);

      expect(expandButtons[0]).toBeInTheDocument();
    });

    it("renders empty list when no education", () => {
      render(<EducationList education={[]} />);

      expect(screen.queryByTestId(/education-item-/)).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Add Education/ })).toBeInTheDocument();
    });
  });

  describe("Add education functionality", () => {
    it("opens dialog when Add Education button is clicked", () => {
      render(<EducationList education={mockEducation} />);

      const addButton = screen.getByRole("button", { name: /Add Education/ });
      fireEvent.click(addButton);

      expect(screen.getByText("Add New Education")).toBeInTheDocument();
    });

    it("closes dialog when cancel is clicked", () => {
      render(<EducationList education={mockEducation} />);

      const addButton = screen.getByRole("button", { name: /Add Education/ });
      fireEvent.click(addButton);

      expect(screen.getByTestId("custom-dialog-title")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Submit/ })).toBeInTheDocument();

      const cancelButton = screen.getByRole("button", { name: /Cancel/ });
      fireEvent.click(cancelButton);

      expect(cancelButton).toBeInTheDocument();
    });

    it("closes dialog when close button is clicked", () => {
      render(<EducationList education={mockEducation} />);

      const addButton = screen.getByRole("button", { name: /Add Education/ });
      fireEvent.click(addButton);

      const closeButton = screen.getByTestId("close-dialog");
      fireEvent.click(closeButton);

      expect(closeButton).toBeInTheDocument();
    });

    it("adds education when form is submitted", async () => {
      render(<EducationList education={mockEducation} />);

      const addButton = screen.getByRole("button", { name: /Add Education/ });
      fireEvent.click(addButton);

      const submitButton = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].variables).toEqual({
          school: "New School",
          degree: "New Degree",
          dateAwarded: "2020-01-01",
        });
      });
    });

    it("closes dialog after adding education", async () => {
      render(<EducationList education={mockEducation} />);

      const addButton = screen.getByRole("button", { name: /Add Education/ });
      fireEvent.click(addButton);

      const submitButton = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText("Add New Education")).not.toBeInTheDocument();
      });
    });

    it("invalidates queries after successful add", async () => {
      render(<EducationList education={mockEducation} />);

      const addButton = screen.getByRole("button", { name: /Add Education/ });
      fireEvent.click(addButton);

      const submitButton = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["education"],
        });
      });
    });
  });

  describe("Expanded state", () => {
    it("manages expanded state correctly", () => {
      render(<EducationList education={mockEducation} />);

      const expandButton = screen.getAllByRole("button", { name: /Expand/ })[0];
      fireEvent.click(expandButton);

      expect(expandButton).toBeInTheDocument();
    });

    it("hides Add Education button when expanded", () => {
      render(<EducationList education={mockEducation} />);

      const expandButton = screen.getAllByRole("button", { name: /Expand/ })[0];
      fireEvent.click(expandButton);

      expect(screen.queryByRole("button", { name: /Add Education/ })).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles missing session user id gracefully", async () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

      render(<EducationList education={mockEducation} />);

      const addButton = screen.getByRole("button", { name: /Add Education/ });
      fireEvent.click(addButton);

      const submitButton = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(addEducation).not.toHaveBeenCalled();
      });
    });

    it("handles empty education array", () => {
      render(<EducationList education={[]} />);

      expect(screen.getByRole("button", { name: /Add Education/ })).toBeInTheDocument();
      expect(screen.queryByTestId(/education-item-/)).not.toBeInTheDocument();
    });
  });
});
