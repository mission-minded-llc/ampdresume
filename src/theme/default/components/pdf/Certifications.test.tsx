import { render, screen } from "@testing-library/react";
import { Certification } from "@/types";
import { Certifications } from "./Certifications";
import { expect } from "@jest/globals";

const mockCertifications: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    dateAwarded: "1672617600000", // Jan 2, 2023 UTC
    credentialUrl: "https://aws.amazon.com/certification/",
    credentialId: "AWS-SA-12345",
  },
  {
    id: "cert-2",
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    dateAwarded: "1672617600000", // Jan 2, 2023 UTC
  },
  {
    id: "cert-3",
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    dateAwarded: "1672617600000",
    credentialId: "CKA-67890",
  },
];

describe("Certifications PDF Component", () => {
  it("renders all certifications", () => {
    render(<Certifications certifications={mockCertifications} />);

    // Check if all certification names are rendered
    expect(screen.getByText("AWS Certified Solutions Architect")).toBeInTheDocument();
    expect(screen.getByText("Google Cloud Professional Developer")).toBeInTheDocument();
    expect(screen.getByText("Certified Kubernetes Administrator")).toBeInTheDocument();

    // Check if all issuers are rendered
    expect(screen.getByText("Amazon Web Services")).toBeInTheDocument();
    expect(screen.getByText("Google Cloud")).toBeInTheDocument();
    expect(screen.getByText("Cloud Native Computing Foundation")).toBeInTheDocument();

    // Check if dates are rendered (multiple certifications can have the same date)
    const dateElements = screen.getAllByText(/January 2023/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it("renders credential link when credentialUrl is provided", () => {
    render(<Certifications certifications={mockCertifications} />);

    const credentialLink = screen.getByText("View Credential (AWS-SA-12345)");
    expect(credentialLink).toBeInTheDocument();
    expect(credentialLink).toHaveAttribute("href", "https://aws.amazon.com/certification/");
    expect(credentialLink).toHaveAttribute("target", "_blank");
    expect(credentialLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders credential ID when provided without URL", () => {
    render(<Certifications certifications={mockCertifications} />);

    expect(screen.getByText("Credential ID: CKA-67890")).toBeInTheDocument();
  });

  it("does not render section when no certifications are provided", () => {
    const { container } = render(<Certifications certifications={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render section when certifications is null", () => {
    const { container } = render(
      <Certifications certifications={null as unknown as Certification[]} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
