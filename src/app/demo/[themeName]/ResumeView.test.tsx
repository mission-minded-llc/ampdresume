import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { themeLegalSampleData } from "@/theme/legal/sampleData";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { ResumeView } from "./ResumeView";
import { expect } from "@jest/globals";

jest.mock("@/theme", () => {
  const themeProps = ({
    testId,
    user,
    socials,
    skillsForUser,
    companies,
    education,
  }: {
    testId: string;
    user: { name?: string | null };
    socials: unknown[];
    skillsForUser: unknown[];
    companies: unknown[];
    education: unknown[];
  }) => (
    <div data-testid={testId}>
      <div data-testid="user-name">{user.name}</div>
      <div data-testid="socials-count">{socials.length}</div>
      <div data-testid="skills-count">{skillsForUser.length}</div>
      <div data-testid="companies-count">{companies.length}</div>
      <div data-testid="education-count">{education.length}</div>
    </div>
  );

  const ThemeDefault = (props: {
    user: { name?: string | null };
    socials: unknown[];
    skillsForUser: unknown[];
    companies: unknown[];
    education: unknown[];
  }) => themeProps({ testId: "theme-default", ...props });

  const ThemeLegal = (props: {
    user: { name?: string | null };
    socials: unknown[];
    skillsForUser: unknown[];
    companies: unknown[];
    education: unknown[];
  }) => themeProps({ testId: "theme-legal", ...props });

  const entry = (name: string, webComponent: typeof ThemeDefault) => ({
    name,
    published: true,
    webComponent,
    iconifyIcon: "fluent-emoji-flat:high-voltage",
    authors: [],
  });

  return {
    ThemeDefault,
    themeDefinitions: {
      default: entry("Classic", ThemeDefault),
      davids: entry("David's Theme", ThemeDefault),
      "retro-80s": entry("Retro 80s", ThemeDefault),
      legal: entry("Legal", ThemeLegal),
    },
  };
});

describe("ResumeView", () => {
  const mockThemeAppearance = "light";

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  const renderComponent = (themeName: "default" | "legal" | "davids" = "default") => {
    return render(
      <ThemeAppearanceContext.Provider
        value={{
          themeAppearance: mockThemeAppearance,
          setThemeAppearance: jest.fn(),
        }}
      >
        <ResumeView themeName={themeName} />
      </ThemeAppearanceContext.Provider>,
    );
  };

  it("should render ThemeDefault component with correct props", () => {
    renderComponent();

    expect(screen.getByTestId("theme-default")).toBeInTheDocument();
    expect(screen.getByLabelText("Theme")).toHaveTextContent("Classic");
    expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
    expect(screen.getByTestId("user-name")).toHaveTextContent(
      themeDefaultSampleData.data.resume.user.name || "",
    );
    expect(screen.getByTestId("socials-count")).toHaveTextContent(
      String(getDemoPlaceholderSocials(themeDefaultSampleData.data.resume.user).length),
    );
    expect(screen.getByTestId("skills-count")).toHaveTextContent(
      String(themeDefaultSampleData.data.resume.skillsForUser.length),
    );
    expect(screen.getByTestId("companies-count")).toHaveTextContent(
      String(themeDefaultSampleData.data.resume.companies.length),
    );
    expect(screen.getByTestId("education-count")).toHaveTextContent(
      String(themeDefaultSampleData.data.resume.education.length),
    );
  });

  it("renders the legal example in the Legal theme by default", () => {
    renderComponent("legal");

    expect(screen.getByTestId("theme-legal")).toBeInTheDocument();
    expect(screen.getByLabelText("Theme")).toHaveTextContent("Legal");
    expect(screen.getByTestId("user-name")).toHaveTextContent("Danielle Okoye");
    expect(screen.getByTestId("education-count")).toHaveTextContent(
      String(themeLegalSampleData.data.resume.education.length),
    );
  });

  it("switches the layout immediately and keeps the route's example", () => {
    renderComponent("legal");

    fireEvent.mouseDown(screen.getByLabelText("Theme"));
    fireEvent.click(screen.getByRole("option", { name: /Classic/ }));

    expect(screen.getByTestId("theme-default")).toBeInTheDocument();
    expect(screen.getByTestId("user-name")).toHaveTextContent("Danielle Okoye");
    expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
  });

  it("should render ThemeDefault component for unknown theme name", () => {
    const themeName = "unknown" as "default";
    renderComponent(themeName);

    expect(screen.getByTestId("theme-default")).toBeInTheDocument();
  });
});
