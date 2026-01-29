import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCertification } from "@/graphql/updateCertification";
import { deleteCertification } from "@/graphql/deleteCertification";
import { CertificationItem } from "./CertificationItem";
import { expect } from "@jest/globals";
import { Certification } from "@/types";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/updateCertification", () => ({
  updateCertification: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/graphql/deleteCertification", () => ({
  deleteCertification: jest.fn().mockResolvedValue(undefined),
}));

describe("CertificationItem", () => {
  const mockCertification: Certification = {
    id: "cert-1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    dateAwarded: "1706745600000", // Feb 1 2024 UTC - stable across timezones
    credentialUrl: "https://example.com/verify",
    credentialId: "ABC-123",
  };

  const mockSession = {
    user: { id: "user-id" },
  };

  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  const mockSetExpanded = jest.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => {
      const mutate = jest.fn().mockImplementation(async (vars: unknown) => {
        await mutationFn(vars);
        onSuccess?.();
      });
      return { mutate, isPending: false };
    });
  });

  it("renders correctly", async () => {
    const { getByTestId } = render(
      <CertificationItem
        certification={mockCertification}
        expanded={false}
        setExpanded={mockSetExpanded}
      />,
      { wrapper },
    );

    await waitFor(() => {
      const accordion = getByTestId(`certification-accordion-${mockCertification.id}`);
      expect(accordion).toBeInTheDocument();
      expect(accordion).toHaveTextContent("AWS Certified Solutions Architect");
      expect(accordion).toHaveTextContent("Amazon Web Services");
      expect(accordion.textContent).toMatch(/\w+ \d{4}/); // "Month Year" format
    });
  });

  it("expands the accordion when summary is clicked", async () => {
    const { getByTestId } = render(
      <CertificationItem
        certification={mockCertification}
        expanded={false}
        setExpanded={mockSetExpanded}
      />,
      { wrapper },
    );

    const accordionSummary = getByTestId(`certification-accordion-${mockCertification.id}`);
    fireEvent.click(accordionSummary);

    await waitFor(() => expect(mockSetExpanded).toHaveBeenCalledWith(mockCertification.id));
  });

  it("collapses the accordion when summary is clicked again", async () => {
    const { getByTestId } = render(
      <CertificationItem
        certification={mockCertification}
        expanded={mockCertification.id}
        setExpanded={mockSetExpanded}
      />,
      { wrapper },
    );

    const accordionSummary = getByTestId(`certification-accordion-${mockCertification.id}`);
    fireEvent.click(accordionSummary);

    await waitFor(() => expect(mockSetExpanded).toHaveBeenCalledWith(false));
  });

  it("handles editing certification", async () => {
    const { getByText, getByLabelText } = render(
      <CertificationItem
        certification={mockCertification}
        expanded={mockCertification.id}
        setExpanded={mockSetExpanded}
      />,
      { wrapper },
    );

    await waitFor(() => expect(getByText("Save Certification")).toBeInTheDocument());

    fireEvent.change(getByLabelText(/Certification Name/), {
      target: { value: "AWS Certified Developer" },
    });

    expect(getByText("Save Certification")).not.toBeDisabled();

    fireEvent.click(getByText("Save Certification"));

    await waitFor(() => {
      expect(updateCertification).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockCertification.id,
          userId: mockSession.user.id,
          name: "AWS Certified Developer",
          issuer: mockCertification.issuer,
        }),
      );
    });
  });

  it("handles deleting certification", async () => {
    const { getByText } = render(
      <CertificationItem
        certification={mockCertification}
        expanded={mockCertification.id}
        setExpanded={mockSetExpanded}
      />,
      { wrapper },
    );

    fireEvent.click(getByText("Delete Certification"));
    fireEvent.click(getByText("Yes, Delete"));

    await waitFor(() => {
      expect(deleteCertification).toHaveBeenCalledWith({
        id: mockCertification.id,
        userId: mockSession.user.id,
      });
    });
  });
});
