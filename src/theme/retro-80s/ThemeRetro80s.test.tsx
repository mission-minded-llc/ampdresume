import { render, screen } from "@testing-library/react";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { ThemeAppearance } from "@/types";
import { generateSocialUrl } from "@/util/social";
import { themeDefaultSampleData } from "../sampleData";
import { ThemeRetro80s } from "./ThemeRetro80s";
import { expect } from "@jest/globals";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/demo/retro-80s"),
}));

describe("ThemeRetro80s", () => {
  const mockProps = {
    themeAppearance: "dark" as ThemeAppearance,
    user: themeDefaultSampleData.data.resume.user,
    socials: getDemoPlaceholderSocials(themeDefaultSampleData.data.resume.user),
    skillsForUser: themeDefaultSampleData.data.resume.skillsForUser,
    companies: themeDefaultSampleData.data.resume.companies,
    education: themeDefaultSampleData.data.resume.education || [],
    certifications: themeDefaultSampleData.data.resume.certifications || [],
    featuredProjects: themeDefaultSampleData.data.resume.featuredProjects || [],
  };

  it("renders all main sections when data is provided", () => {
    render(<ThemeRetro80s {...mockProps} />);

    const userName = mockProps.user.name;
    if (userName) {
      expect(screen.getByRole("heading", { name: new RegExp(userName, "i") })).toBeInTheDocument();
    }

    expect(screen.getByRole("heading", { name: /professional summary/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
    expect(screen.getAllByText("CSS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("JavaScript").length).toBeGreaterThan(0);

    expect(screen.getByRole("heading", { name: /work experience/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: new RegExp(mockProps.companies[0].name, "i") }),
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /education/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /certifications/i })).toBeInTheDocument();

    mockProps.socials.forEach((social) => {
      expect(
        screen.getByText("", { selector: `a[href="${generateSocialUrl(social)}"]` }),
      ).toBeInTheDocument();
    });
  });

  it("does not render optional sections when data is empty", () => {
    const propsWithEmptyData = {
      ...mockProps,
      user: { ...mockProps.user, summary: "", summaryTitle: "" },
      skillsForUser: [],
      companies: [],
      education: [],
      certifications: [],
      featuredProjects: [],
    };

    render(<ThemeRetro80s {...propsWithEmptyData} />);

    expect(
      screen.queryByRole("heading", { name: /professional summary/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /skills/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /work experience/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Dataflow Systems")).not.toBeInTheDocument();
  });

  it("renders in the light appearance without a second appearance toggle", () => {
    render(<ThemeRetro80s {...mockProps} themeAppearance="light" />);

    expect(screen.getByRole("link", { name: /view pdf/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /dark mode|light mode/i })).not.toBeInTheDocument();
  });
});
