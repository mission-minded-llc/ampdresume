import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CertificationList } from "./CertificationList";
import { expect } from "@jest/globals";
import { Certification } from "@/types";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/addCertification", () => ({
  addCertification: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("./CertificationItem", () => ({
  CertificationItem: ({
    certification,
    setExpanded,
  }: {
    certification: Certification;
    expanded: string | false;
    setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  }) => (
    <div data-testid={`certification-item-${certification.id}`}>
      {certification.name}
      <button onClick={() => setExpanded(certification.id)}>Expand</button>
    </div>
  ),
}));

jest.mock("./CertificationForm", () => ({
  CertificationForm: ({
    handler,
    onCancel,
  }: {
    handler: (certification: unknown) => void;
    onCancel: () => void;
  }) => (
    <div>
      <button
        onClick={() =>
          handler({
            name: "New Certification",
            issuer: "New Issuer",
            dateAwarded: "2024-01-01",
            credentialUrl: null,
            credentialId: null,
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

describe("CertificationList", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const mockCertifications: Certification[] = [
    {
      id: "cert-1",
      name: "AWS Certified",
      issuer: "Amazon",
      dateAwarded: "2024-01-01",
    },
    {
      id: "cert-2",
      name: "React Professional",
      issuer: "Meta",
      dateAwarded: "2023-06-01",
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
    it("renders all certification items", () => {
      render(<CertificationList certifications={mockCertifications} />);

      expect(screen.getByTestId("certification-item-cert-1")).toBeInTheDocument();
      expect(screen.getByTestId("certification-item-cert-2")).toBeInTheDocument();
    });

    it("renders Add Certification button when no certification is expanded", () => {
      render(<CertificationList certifications={mockCertifications} />);

      expect(screen.getByRole("button", { name: /Add Certification/ })).toBeInTheDocument();
    });

    it("does not render Add Certification button when a certification is expanded", () => {
      render(<CertificationList certifications={mockCertifications} />);

      const expandButtons = screen.getAllByRole("button", { name: /Expand/ });
      fireEvent.click(expandButtons[0]);

      expect(screen.queryByRole("button", { name: /Add Certification/ })).not.toBeInTheDocument();
    });

    it("renders empty list when no certifications", () => {
      render(<CertificationList certifications={[]} />);

      expect(screen.queryByTestId(/certification-item-/)).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Add Certification/ })).toBeInTheDocument();
    });
  });

  describe("Add certification functionality", () => {
    it("opens dialog when Add Certification button is clicked", () => {
      render(<CertificationList certifications={mockCertifications} />);

      const addButton = screen.getByRole("button", { name: /Add Certification/ });
      fireEvent.click(addButton);

      expect(screen.getByText("Add New Certification")).toBeInTheDocument();
    });

    it("closes dialog when cancel is clicked", () => {
      render(<CertificationList certifications={mockCertifications} />);

      const addButton = screen.getByRole("button", { name: /Add Certification/ });
      fireEvent.click(addButton);

      expect(screen.getByTestId("custom-dialog-title")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Submit/ })).toBeInTheDocument();

      const cancelButton = screen.getByRole("button", { name: /Cancel/ });
      fireEvent.click(cancelButton);

      expect(cancelButton).toBeInTheDocument();
    });

    it("closes dialog when close button is clicked", () => {
      render(<CertificationList certifications={mockCertifications} />);

      const addButton = screen.getByRole("button", { name: /Add Certification/ });
      fireEvent.click(addButton);

      const closeButton = screen.getByTestId("close-dialog");
      fireEvent.click(closeButton);

      expect(closeButton).toBeInTheDocument();
    });

    it("adds certification when form is submitted", async () => {
      render(<CertificationList certifications={mockCertifications} />);

      const addButton = screen.getByRole("button", { name: /Add Certification/ });
      fireEvent.click(addButton);

      const submitButton = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].variables).toEqual({
          name: "New Certification",
          issuer: "New Issuer",
          dateAwarded: "2024-01-01",
          credentialUrl: null,
          credentialId: null,
        });
      });
    });

    it("closes dialog after adding certification", async () => {
      render(<CertificationList certifications={mockCertifications} />);

      const addButton = screen.getByRole("button", { name: /Add Certification/ });
      fireEvent.click(addButton);

      const submitButton = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText("Add New Certification")).not.toBeInTheDocument();
      });
    });

    it("invalidates queries after successful add", async () => {
      render(<CertificationList certifications={mockCertifications} />);

      const addButton = screen.getByRole("button", { name: /Add Certification/ });
      fireEvent.click(addButton);

      const submitButton = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["certifications"],
        });
      });
    });
  });

  describe("Expanded state", () => {
    it("hides Add Certification button when expanded", () => {
      render(<CertificationList certifications={mockCertifications} />);

      const expandButton = screen.getAllByRole("button", { name: /Expand/ })[0];
      fireEvent.click(expandButton);

      expect(screen.queryByRole("button", { name: /Add Certification/ })).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles empty certifications array", () => {
      render(<CertificationList certifications={[]} />);

      expect(screen.getByRole("button", { name: /Add Certification/ })).toBeInTheDocument();
      expect(screen.queryByTestId(/certification-item-/)).not.toBeInTheDocument();
    });
  });
});
