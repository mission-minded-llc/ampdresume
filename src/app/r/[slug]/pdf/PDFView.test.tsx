import { render, screen, waitFor } from "@testing-library/react";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { PDFView } from "./PDFView";
import { expect } from "@jest/globals";

jest.mock("html2pdf.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const resume = themeDefaultSampleData.data.resume;

describe("public PDFView", () => {
  it("renders the generate button and default theme content", async () => {
    render(
      <PDFView
        user={resume.user}
        skillsForUser={resume.skillsForUser}
        companies={resume.companies}
        education={resume.education}
        certifications={resume.certifications || []}
        featuredProjects={resume.featuredProjects || []}
      />,
    );

    expect(screen.getByText("Generate PDF")).toBeInTheDocument();
    expect(screen.getByText(resume.user.name!)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Generate PDF" })).toBeEnabled();
    });
  });
});
