import "@testing-library/jest-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { CertificationForm } from "./CertificationForm";
import { expect } from "@jest/globals";
import { Certification } from "@/types";

describe("CertificationForm", () => {
  const mockCertification: Certification = {
    id: "cert-1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    dateAwarded: "1704067200000", // Jan 2024
    credentialUrl: "https://example.com/verify",
    credentialId: "ABC-123",
  };

  const mockHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  const mockOnCancel = jest.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Add mode (no certification)", () => {
    it("renders with empty initial values", () => {
      const { getByLabelText, getByText, queryByText } = render(
        <CertificationForm handler={mockHandler} onCancel={mockOnCancel} />,
        { wrapper },
      );

      expect(getByLabelText(/Certification Name/)).toHaveValue("");
      expect(getByLabelText(/Issuing Organization/)).toHaveValue("");
      expect(getByLabelText(/Credential URL \(optional\)/)).toHaveValue("");
      expect(getByLabelText(/Credential ID \(optional\)/)).toHaveValue("");
      expect(getByText("Save Certification")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(queryByText("Delete Certification")).not.toBeInTheDocument();
    });

    it("disables Save button when required fields are empty", () => {
      const { getByText } = render(
        <CertificationForm handler={mockHandler} onCancel={mockOnCancel} />,
        { wrapper },
      );

      expect(getByText("Save Certification")).toBeDisabled();
    });

    it("calls onCancel when Cancel is clicked", () => {
      const { getByText } = render(
        <CertificationForm handler={mockHandler} onCancel={mockOnCancel} />,
        { wrapper },
      );

      fireEvent.click(getByText("Cancel"));
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edit mode (with certification)", () => {
    it("renders correctly with initial values", () => {
      const { getByLabelText, getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />,
        { wrapper },
      );

      expect(getByLabelText(/Certification Name/)).toHaveValue("AWS Certified Solutions Architect");
      expect(getByLabelText(/Issuing Organization/)).toHaveValue("Amazon Web Services");
      expect(getByLabelText(/Credential URL \(optional\)/)).toHaveValue(
        "https://example.com/verify",
      );
      expect(getByLabelText(/Credential ID \(optional\)/)).toHaveValue("ABC-123");
      expect(getByText("Delete Certification")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Save Certification")).toBeInTheDocument();
    });

    it("disables Save button when form is unchanged", () => {
      const { getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />,
        { wrapper },
      );

      expect(getByText("Save Certification")).toBeDisabled();
    });

    it("enables Save button when form values change", () => {
      const { getByLabelText, getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />,
        { wrapper },
      );

      fireEvent.change(getByLabelText(/Certification Name/), {
        target: { value: "AWS Certified Developer" },
      });

      expect(getByText("Save Certification")).not.toBeDisabled();
    });

    it("calls handler with form values when Save is clicked", async () => {
      const { getByLabelText, getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />,
        { wrapper },
      );

      fireEvent.change(getByLabelText(/Certification Name/), {
        target: { value: "Updated Certification Name" },
      });
      fireEvent.click(getByText("Save Certification"));

      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            name: "Updated Certification Name",
            issuer: mockCertification.issuer,
            credentialUrl: mockCertification.credentialUrl,
            credentialId: mockCertification.credentialId,
          }),
        );
      });
    });

    it("calls deleteHandler when Delete is confirmed", async () => {
      const { getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />,
        { wrapper },
      );

      fireEvent.click(getByText("Delete Certification"));
      fireEvent.click(getByText("Yes, Delete"));

      await waitFor(() => {
        expect(mockDeleteHandler).toHaveBeenCalledWith(mockCertification);
      });
    });

    it("handles cancel action", () => {
      const { getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
          onCancel={mockOnCancel}
        />,
        { wrapper },
      );

      fireEvent.click(getByText("Cancel"));
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("does not render Delete or Cancel when deleteHandler and onCancel are null", () => {
      const { queryByText } = render(
        <CertificationForm certification={mockCertification} handler={mockHandler} />,
        { wrapper },
      );

      expect(queryByText("Delete Certification")).not.toBeInTheDocument();
      expect(queryByText("Cancel")).not.toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("disables Save when name is only whitespace", () => {
      const { getByLabelText, getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
        { wrapper },
      );

      fireEvent.change(getByLabelText(/Certification Name/), {
        target: { value: "   " },
      });
      expect(getByText("Save Certification")).toBeDisabled();
    });

    it("disables Save when issuer is only whitespace", () => {
      const { getByLabelText, getByText } = render(
        <CertificationForm
          certification={mockCertification}
          handler={mockHandler}
          deleteHandler={mockDeleteHandler}
        />,
        { wrapper },
      );

      fireEvent.change(getByLabelText(/Issuing Organization/), {
        target: { value: "   " },
      });
      // Name and issuer are still filled from initial, but we cleared issuer to spaces
      // So issuer is "   " which is trimmed empty -> disabled
      expect(getByText("Save Certification")).toBeDisabled();
    });
  });
});
