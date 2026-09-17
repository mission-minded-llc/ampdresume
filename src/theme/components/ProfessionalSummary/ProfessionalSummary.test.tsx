import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { ProfessionalSummary } from "./ProfessionalSummary";

const sampleUser = themeDefaultSampleData.data.resume.user;

describe("ProfessionalSummary", () => {
  it("renders nothing when the summary is empty", () => {
    const { container } = render(
      <ProfessionalSummary user={{ ...sampleUser, summary: "", summaryTitle: "About Me" }} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders the default title and rich text summary", () => {
    render(
      <ProfessionalSummary
        user={{
          ...sampleUser,
          summary: "<p>Shipped production web apps across the stack.</p>",
          summaryTitle: null,
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "Professional Summary" })).toBeInTheDocument();
    expect(screen.getByText("Shipped production web apps across the stack.")).toBeInTheDocument();
  });

  it("renders a custom section title", () => {
    render(
      <ProfessionalSummary
        user={{
          ...sampleUser,
          summary: "<p>Builder of reliable systems.</p>",
          summaryTitle: "About Me",
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
  });
});
