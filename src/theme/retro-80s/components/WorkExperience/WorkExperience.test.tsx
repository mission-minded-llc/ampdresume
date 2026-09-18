import { render, screen } from "@testing-library/react";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { Company } from "@/types";
import { WorkExperience } from "./WorkExperience";
import { expect } from "@jest/globals";

jest.mock("./PositionsList", () => ({
  PositionsList: ({ company }: { company: Company }) => (
    <div data-testid={`positions-list-${company.id}`}>
      {company.positions?.map((position) => (
        <div key={position.id}>{position.title}</div>
      ))}
    </div>
  ),
}));

describe("WorkExperience", () => {
  const companies = themeDefaultSampleData.data.resume.companies;

  it("renders each company as a numbered stage", () => {
    render(<WorkExperience companies={companies} />);

    expect(screen.getByRole("heading", { name: "Work Experience" })).toBeInTheDocument();

    expect(screen.getByText("Stage 01")).toBeInTheDocument();
    expect(
      screen.getByText(`Stage ${String(companies.length).padStart(2, "0")}`),
    ).toBeInTheDocument();

    companies.forEach((company) => {
      expect(screen.getByRole("heading", { name: company.name })).toBeInTheDocument();
      expect(screen.getByTestId(`positions-list-${company.id}`)).toBeInTheDocument();
    });
  });

  it("renders locations and date ranges", () => {
    render(<WorkExperience companies={companies} />);

    expect(screen.getByText(/San Francisco, CA/)).toBeInTheDocument();
    expect(screen.getByText(/January 2024 to Present/)).toBeInTheDocument();
    expect(screen.getByText(/January 2023 to January 2024/)).toBeInTheDocument();
  });

  it("renders the section title with no companies", () => {
    render(<WorkExperience companies={[]} />);

    expect(screen.getByRole("heading", { name: "Work Experience" })).toBeInTheDocument();
    expect(screen.queryByText("Stage 01")).not.toBeInTheDocument();
  });
});
