import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { themeDefaultSampleData } from "../sampleData";
import { ThemeTimesPDF } from "./ThemeTimesPDF";

describe("ThemeTimesPDF", () => {
  const mockData = themeDefaultSampleData.data.resume;

  it("renders the Times layout with sample data", () => {
    render(
      <ThemeTimesPDF
        user={mockData.user}
        skillsForUser={mockData.skillsForUser}
        companies={mockData.companies}
        education={mockData.education}
        certifications={mockData.certifications || []}
        featuredProjects={mockData.featuredProjects || []}
      />,
    );

    expect(screen.getByTestId("pdf-theme-times")).toBeInTheDocument();

    if (mockData.user.name) {
      expect(screen.getByText(mockData.user.name)).toBeInTheDocument();
    }

    if (mockData.user.title) {
      expect(screen.getByText(mockData.user.title)).toBeInTheDocument();
    }

    expect(screen.getByText("Professional Summary")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Work Experience")).toBeInTheDocument();

    mockData.companies.forEach((company) => {
      expect(screen.getByText(company.name)).toBeInTheDocument();
    });

    mockData.education.forEach((edu) => {
      expect(screen.getByText(edu.school)).toBeInTheDocument();
    });
  });
});
