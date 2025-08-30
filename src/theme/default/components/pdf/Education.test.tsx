import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { formatLongDate } from "@/lib/format";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { Education } from "./Education";
import { expect } from "@jest/globals";

describe("Education", () => {
  const sampleEducation = themeDefaultSampleData.data.resume.education;

  it("renders education section title", () => {
    render(<Education education={sampleEducation} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  it("groups education by school", () => {
    render(<Education education={sampleEducation} />);

    // Get unique schools from sample data
    const uniqueSchools = [...new Set(sampleEducation.map((edu) => edu.school))];

    // Should show all schools
    uniqueSchools.forEach((school) => {
      expect(screen.getByText(school)).toBeInTheDocument();
    });

    // Should show all degrees
    sampleEducation.forEach((edu) => {
      expect(screen.getByText(new RegExp(edu.degree))).toBeInTheDocument();
    });
  });

  it("formats dates correctly", () => {
    render(<Education education={sampleEducation} />);

    // Check if dates are formatted correctly
    sampleEducation.forEach((edu) => {
      const formattedDate = formatLongDate(edu.dateAwarded);
      expect(screen.getByText(new RegExp(formattedDate))).toBeInTheDocument();
    });
  });

  it("handles empty education array", () => {
    const { container } = render(<Education education={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles education entry without school", () => {
    const educationWithoutSchool = [
      {
        ...sampleEducation[0],
        school: "",
      },
    ];

    const { container } = render(<Education education={educationWithoutSchool} />);
    expect(container.firstChild).toBeNull();
    expect(
      screen.queryByText(new RegExp(educationWithoutSchool[0].degree)),
    ).not.toBeInTheDocument();
  });
});
