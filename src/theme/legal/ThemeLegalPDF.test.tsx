import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { themeDefaultSampleData } from "../sampleData";
import { ThemeLegalPDF } from "./ThemeLegalPDF";

describe("ThemeLegalPDF", () => {
  const mockData = themeDefaultSampleData.data.resume;

  /**
   * Reports whether one section label is rendered after another.
   *
   * @param before The label that should appear first.
   * @param after The label that should appear later.
   * @returns True when `after` follows `before` in the document.
   */
  const follows = (before: HTMLElement, after: HTMLElement) =>
    (before.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_FOLLOWING) ===
    Node.DOCUMENT_POSITION_FOLLOWING;

  it("renders the black-letter docket with credentials before experience", () => {
    render(
      <ThemeLegalPDF
        user={mockData.user}
        skillsForUser={mockData.skillsForUser}
        companies={mockData.companies}
        education={mockData.education}
        certifications={mockData.certifications || []}
        featuredProjects={mockData.featuredProjects || []}
      />,
    );

    expect(screen.getByTestId("pdf-theme-legal")).toBeInTheDocument();
    expect(screen.getByText("Curriculum Vitae")).toBeInTheDocument();
    expect(screen.getByText(mockData.user.name as string)).toBeInTheDocument();
    expect(screen.getByText("Professional Summary")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("University of California, Berkeley")).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getAllByText("Dataflow Systems").length).toBeGreaterThan(0);
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getAllByText(/January 2024\s+\u2013\s+Present/).length).toBeGreaterThan(0);
    expect(screen.getByText("Skills")).toBeInTheDocument();

    expect(follows(screen.getByText("Education"), screen.getByText("Experience"))).toBe(true);
  });
});
