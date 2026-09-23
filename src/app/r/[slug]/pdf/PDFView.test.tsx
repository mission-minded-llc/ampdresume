import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Session } from "next-auth";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { updateUser } from "@/graphql/updateUser";
import { getEnvironmentName } from "@/util/url";
import { PDFView } from "./PDFView";
import { expect } from "@jest/globals";
import * as Sentry from "@sentry/react";

jest.mock("html2pdf.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/graphql/updateUser", () => ({
  updateUser: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/util/url", () => ({
  getEnvironmentName: jest.fn(() => "development"),
}));

jest.mock("@sentry/react", () => ({
  captureException: jest.fn(),
}));

const resume = themeDefaultSampleData.data.resume;

const ownerSession = {
  user: { id: resume.user.id, slug: "taylor" },
  expires: "2099-01-01",
} as Session;

const renderPDFView = ({
  session = null,
  slug = "taylor",
  pdfThemeName = "default",
}: {
  session?: Session | null;
  slug?: string;
  pdfThemeName?: string | null;
} = {}) =>
  render(
    <PDFView
      user={resume.user}
      skillsForUser={resume.skillsForUser}
      companies={resume.companies}
      education={resume.education}
      certifications={resume.certifications || []}
      featuredProjects={resume.featuredProjects || []}
      pdfThemeName={pdfThemeName}
      session={session}
      slug={slug}
    />,
  );

describe("public PDFView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = "theme-preview=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    (getEnvironmentName as jest.Mock).mockReturnValue("development");
  });

  it("renders the generate button and default theme content for visitors", async () => {
    renderPDFView();

    expect(screen.getByText("Generate PDF")).toBeInTheDocument();
    expect(screen.getByText(resume.user.name!)).toBeInTheDocument();
    expect(screen.queryByLabelText("PDF Theme")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Generate PDF" })).toBeEnabled();
    });
  });

  it("falls back to Classic when the stored PDF theme is unknown", () => {
    renderPDFView({ pdfThemeName: "retro-80s" });

    expect(screen.getByText(resume.user.name!)).toBeInTheDocument();
  });

  it("shows the PDF theme picker for the resume owner and saves independently of the web theme", async () => {
    renderPDFView({ session: ownerSession });

    expect(screen.getByLabelText("PDF Theme")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        userId: resume.user.id,
        pdfThemeName: "default",
      });
    });
  });

  it("captures save errors with Sentry", async () => {
    (updateUser as jest.Mock).mockRejectedValueOnce(new Error("save failed"));
    renderPDFView({ session: ownerSession });

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(Sentry.captureException).toHaveBeenCalled();
    });
    expect(screen.getByRole("button", { name: "Save" })).not.toBeDisabled();
  });

  it("disables save when the session has no user id", () => {
    renderPDFView({
      session: { user: { slug: "taylor" }, expires: "2099-01-01" } as Session,
    });

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(updateUser).not.toHaveBeenCalled();
  });

  it("hides the picker from a signed-in visitor who does not own the resume", () => {
    renderPDFView({
      session: { user: { id: "other-user", slug: "other" }, expires: "2099-01-01" } as Session,
    });

    expect(screen.queryByLabelText("PDF Theme")).not.toBeInTheDocument();
  });

  it("shows the picker when a theme-preview cookie is present", async () => {
    document.cookie = "theme-preview=1";

    renderPDFView();

    expect(await screen.findByLabelText("PDF Theme")).toBeInTheDocument();
  });
});
