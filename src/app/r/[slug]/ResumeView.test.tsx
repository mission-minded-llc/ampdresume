import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Session } from "next-auth";
import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { updateUser } from "@/graphql/updateUser";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { getEnvironmentName } from "@/util/url";
import { ResumeView } from "./ResumeView";
import { expect } from "@jest/globals";
import * as Sentry from "@sentry/react";

jest.mock("@/graphql/updateUser", () => ({
  updateUser: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/util/url", () => ({
  getEnvironmentName: jest.fn(() => "development"),
}));

jest.mock("@sentry/react", () => ({
  captureException: jest.fn(),
}));

jest.mock("@/theme", () => {
  const MockTheme = ({
    themeAppearance,
    user,
    socials,
  }: {
    themeAppearance: string;
    user: { name?: string | null };
    socials: Array<{ platform: string; ref: string }>;
  }) => (
    <div data-testid="rendered-theme">
      <span data-testid="theme-appearance">{themeAppearance}</span>
      <span data-testid="user-name">{user.name}</span>
      <span data-testid="socials">
        {socials.map((social) => `${social.platform}:${social.ref}`).join(",")}
      </span>
    </div>
  );

  return {
    themeDefinitions: {
      default: {
        name: "Classic",
        published: true,
        webComponent: MockTheme,
        iconifyIcon: "fluent-emoji-flat:high-voltage",
        authors: [],
      },
      davids: {
        name: "David's Theme",
        published: true,
        webComponent: MockTheme,
        iconifyIcon: "fluent-emoji-flat:memo",
        authors: [],
      },
      "retro-80s": {
        name: "Retro 80s",
        published: false,
        webComponent: undefined,
        iconifyIcon: "fluent-emoji-flat:joystick",
        authors: [],
      },
    },
  };
});

const resume = themeDefaultSampleData.data.resume;
const user = {
  ...resume.user,
  isDemo: false,
  webThemeName: "default" as const,
  pdfThemeName: "default",
};

const ownerSession = {
  user: { id: user.id, slug: "taylor" },
  expires: "2099-01-01",
} as Session;

const renderView = ({
  session = null,
  slug = "taylor",
}: {
  session?: Session | null;
  slug?: string;
} = {}) =>
  render(
    <ThemeAppearanceContext.Provider
      value={{ themeAppearance: "light", setThemeAppearance: jest.fn() }}
    >
      <ResumeView
        session={session}
        slug={slug}
        user={user}
        socials={resume.socials}
        skillsForUser={resume.skillsForUser}
        companies={resume.companies}
        education={resume.education}
        certifications={resume.certifications || []}
        featuredProjects={resume.featuredProjects || []}
      />
    </ThemeAppearanceContext.Provider>,
  );

describe("public ResumeView", () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    document.cookie = "theme-preview=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    (getEnvironmentName as jest.Mock).mockReturnValue("development");
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it("scrolls to the top when the resume view mounts", () => {
    renderView();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });

  it("renders the selected theme without a preview control for visitors", () => {
    renderView();

    expect(screen.getByTestId("resume-theme-default")).toBeInTheDocument();
    expect(screen.getByTestId("rendered-theme")).toBeInTheDocument();
    expect(screen.getByTestId("user-name")).toHaveTextContent(user.name || "");
    expect(screen.queryByLabelText("Theme")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("PDF Theme")).not.toBeInTheDocument();
    expect(screen.queryByTestId("demo-resume-tag")).not.toBeInTheDocument();
  });

  it("loads dummy placeholder socials when the resume is a demo", () => {
    const storedSocials = [
      {
        id: "stored",
        userId: user.id,
        platform: "github",
        ref: "maya-chen",
        sortIndex: 0,
      },
    ];
    const demoUser = { ...user, isDemo: true };
    const placeholders = getDemoPlaceholderSocials(demoUser);

    render(
      <ThemeAppearanceContext.Provider
        value={{ themeAppearance: "light", setThemeAppearance: jest.fn() }}
      >
        <ResumeView
          session={null}
          slug="maya-chen"
          user={demoUser}
          socials={storedSocials}
          skillsForUser={resume.skillsForUser}
          companies={resume.companies}
          education={resume.education}
          certifications={resume.certifications || []}
          featuredProjects={resume.featuredProjects || []}
        />
      </ThemeAppearanceContext.Provider>,
    );

    expect(screen.getByTestId("socials")).toHaveTextContent(
      placeholders.map((social) => `${social.platform}:${social.ref}`).join(","),
    );
    expect(screen.queryByText(/maya-chen/)).not.toBeInTheDocument();
  });

  it("shows the theme picker for the resume owner and saves a theme", async () => {
    renderView({ session: ownerSession });

    fireEvent.mouseDown(screen.getByLabelText("Theme"));
    fireEvent.click(screen.getByRole("option", { name: /David's Theme/ }));
    expect(screen.getByTestId("resume-theme-davids")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        userId: user.id,
        webThemeName: "davids",
      });
    });
  });

  it("does not show a PDF theme picker on the web resume", () => {
    renderView({ session: ownerSession });

    expect(screen.getByLabelText("Theme")).toBeInTheDocument();
    expect(screen.queryByLabelText("PDF Theme")).not.toBeInTheDocument();
  });

  it("captures save errors with Sentry", async () => {
    (updateUser as jest.Mock).mockRejectedValueOnce(new Error("save failed"));
    renderView({ session: ownerSession });

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(Sentry.captureException).toHaveBeenCalled();
    });
    expect(screen.getByRole("button", { name: "Save" })).not.toBeDisabled();
  });

  it("disables save when the session has no user id", () => {
    renderView({
      session: { user: { slug: "taylor" }, expires: "2099-01-01" } as Session,
    });

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(updateUser).not.toHaveBeenCalled();
  });

  it("hides unpublished themes in production unless previewing", () => {
    (getEnvironmentName as jest.Mock).mockReturnValue("production");
    renderView({ session: ownerSession });

    fireEvent.mouseDown(screen.getByLabelText("Theme"));
    expect(screen.getByRole("option", { name: /Classic/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Retro 80s/ })).not.toBeInTheDocument();
  });

  it("shows the picker when a theme-preview cookie is present", async () => {
    document.cookie = "theme-preview=1";

    renderView();

    expect(await screen.findByLabelText("Theme")).toBeInTheDocument();
  });

  it("falls back to the default theme when the selected theme has no web component", () => {
    renderView({ session: ownerSession });

    fireEvent.mouseDown(screen.getByLabelText("Theme"));
    fireEvent.click(screen.getByRole("option", { name: /Retro 80s/ }));

    expect(screen.getByTestId("resume-theme-retro-80s")).toBeInTheDocument();
    expect(screen.getByTestId("rendered-theme")).toBeInTheDocument();
  });
});
