import "@testing-library/jest-dom";
import { Certification } from "@/types";
import { useSession } from "next-auth/react";
import { render, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { EditCertifications } from "./EditCertifications";
import { expect } from "@jest/globals";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/graphql/getCertifications", () => ({
  getCertifications: jest.fn(),
}));

jest.mock("../components/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("./CertificationList", () => ({
  CertificationList: ({ certifications }: { certifications: Certification[] }) => (
    <div>
      {certifications.map((cert) => (
        <div key={cert.id}>{cert.name}</div>
      ))}
    </div>
  ),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock("@/components/MuiLink", () => ({
  MuiLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("EditCertifications", () => {
  const mockSession = {
    user: { id: "user-id" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when session is loading", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });

    const { getByText } = render(<EditCertifications />);
    expect(getByText("Loading session...")).toBeInTheDocument();
  });

  it("renders login prompt when unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });

    const { getByText } = render(<EditCertifications />);

    waitFor(() => expect(getByText("Please log in.")).toBeInTheDocument());
  });

  it("renders loading state when fetching certifications data", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({ isPending: true });

    const { getByText } = render(<EditCertifications />);
    expect(getByText("Loading resume data...")).toBeInTheDocument();
  });

  it("renders error message when fetching certifications data fails", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      error: { message: "Error" },
    });

    const { getByText } = render(<EditCertifications />);
    expect(getByText("Error loading certifications: Error")).toBeInTheDocument();
  });

  it("renders certification list when data is fetched successfully", async () => {
    const mockCertifications: Certification[] = [
      {
        id: "1",
        name: "AWS Certified",
        issuer: "Amazon",
        dateAwarded: "2024-01-01",
      },
      {
        id: "2",
        name: "React Professional",
        issuer: "Meta",
        dateAwarded: "2023-06-01",
      },
    ];
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: mockCertifications,
    });

    const { getByText } = render(<EditCertifications />);

    await waitFor(() => {
      expect(getByText("Your Certifications")).toBeInTheDocument();
      expect(getByText("AWS Certified")).toBeInTheDocument();
      expect(getByText("React Professional")).toBeInTheDocument();
    });
  });

  it("renders intro text about certifications", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      data: [],
    });

    const { getByText } = render(<EditCertifications />);

    await waitFor(() => {
      expect(
        getByText(/Certifications demonstrate your professional qualifications/),
      ).toBeInTheDocument();
    });
  });
});
