import { render, screen } from "@testing-library/react";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { ThemeAppearance } from "@/types";
import { generateSocialUrl } from "@/util/social";
import { themeDefaultSampleData } from "../sampleData";
import { ThemeLegal } from "./ThemeLegal";
import { expect } from "@jest/globals";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/demo/legal"),
}));

describe("ThemeLegal", () => {
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

  /**
   * Reports whether one section heading is rendered after another.
   *
   * @param before The heading that should appear first.
   * @param after The heading that should appear later.
   * @returns True when `after` follows `before` in the document.
   */
  const follows = (before: HTMLElement, after: HTMLElement) =>
    (before.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_FOLLOWING) ===
    Node.DOCUMENT_POSITION_FOLLOWING;

  it("renders the letterhead and lists credentials before experience", () => {
    render(<ThemeLegal {...mockProps} />);

    expect(screen.getByTestId("theme-legal")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: mockProps.user.name as string }),
    ).toBeInTheDocument();
    expect(screen.getByText("Curriculum Vitae")).toBeInTheDocument();

    const summary = screen.getByRole("heading", { name: /professional summary/i });
    const education = screen.getByRole("heading", { name: /^education$/i });
    const certifications = screen.getByRole("heading", { name: /^certifications$/i });
    const experience = screen.getByRole("heading", { name: /^experience$/i });
    const skills = screen.getByRole("heading", { name: /^skills$/i });

    expect(follows(summary, education)).toBe(true);
    expect(follows(education, certifications)).toBe(true);
    expect(follows(certifications, experience)).toBe(true);
    expect(follows(experience, skills)).toBe(true);

    expect(screen.getByText("University of California, Berkeley")).toBeInTheDocument();
    expect(screen.getAllByText(mockProps.companies[0].name).length).toBeGreaterThan(0);
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getAllByText(/Present/).length).toBeGreaterThan(0);

    mockProps.socials.forEach((social) => {
      expect(
        screen.getByText("", { selector: `a[href="${generateSocialUrl(social)}"]` }),
      ).toBeInTheDocument();
    });
  });

  it("does not render optional sections when data is empty", () => {
    render(
      <ThemeLegal
        {...mockProps}
        user={{ ...mockProps.user, summary: "", summaryTitle: "" }}
        skillsForUser={[]}
        companies={[]}
        education={[]}
        certifications={[]}
        featuredProjects={[]}
      />,
    );

    expect(
      screen.queryByRole("heading", { name: /professional summary/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^education$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^certifications$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^experience$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^skills$/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Dataflow Systems")).not.toBeInTheDocument();
  });

  it("renders in the light appearance without a second appearance toggle", () => {
    render(<ThemeLegal {...mockProps} themeAppearance="light" />);

    expect(screen.getByRole("link", { name: /view pdf/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /dark mode|light mode/i })).not.toBeInTheDocument();
  });
});
