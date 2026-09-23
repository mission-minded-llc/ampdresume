import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { expect } from "@jest/globals";
import { OnboardingTour } from "./OnboardingTour";
import { NavPrimaryProvider } from "./NavPrimaryContext";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/edit/profile",
}));

jest.mock("./demos/SkillsDemo", () => ({
  SkillsDemo: () => <div>Skills demo</div>,
}));

jest.mock("./demos/ExperienceDemo", () => ({
  ExperienceDemo: () => <div>Experience demo</div>,
}));

jest.mock("./demos/ThemesDemo", () => ({
  ThemesDemo: () => <div>Themes demo</div>,
}));

const mountTourTarget = (id: string) => {
  const target = document.createElement("div");
  target.setAttribute("data-tour-id", id);
  Object.defineProperty(target, "getBoundingClientRect", {
    value: () => ({
      width: 48,
      height: 48,
      top: 16,
      left: 16,
      bottom: 64,
      right: 64,
      x: 16,
      y: 16,
      toJSON: () => {},
    }),
  });
  document.body.appendChild(target);
  return target;
};

const renderTour = (onComplete = jest.fn(), didImport = false) =>
  render(
    <ThemeProvider theme={createTheme()}>
      <NavPrimaryProvider>
        <OnboardingTour didImport={didImport} onComplete={onComplete} />
      </NavPrimaryProvider>
    </ThemeProvider>,
  );

describe("OnboardingTour", () => {
  const targets: HTMLElement[] = [];

  beforeEach(() => {
    mockPush.mockReset();
    targets.push(
      mountTourTarget("nav-menu-button"),
      mountTourTarget("edit-resume-section"),
      mountTourTarget("import-pdf"),
    );
  });

  afterEach(() => {
    targets.splice(0).forEach((target) => target.remove());
  });

  it("renders the welcome step", () => {
    renderTour();

    expect(screen.getByTestId("OnboardingRoot")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Amp'd Resume")).toBeInTheDocument();
    expect(screen.getByTestId("OnboardingSkip")).toHaveTextContent("Skip tutorial");
    expect(screen.getByTestId("OnboardingNext")).toHaveTextContent("Start tour");
  });

  it("does not wrap the welcome bubble in a parent dialog paper", () => {
    renderTour();

    expect(document.querySelector(".MuiDialog-paper")).not.toBeInTheDocument();
    expect(screen.getByTestId("OnboardingCoachCard")).toBeInTheDocument();
  });

  it("skips the tutorial from welcome", () => {
    const onComplete = jest.fn();
    renderTour(onComplete);

    fireEvent.click(screen.getByTestId("OnboardingSkip"));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("advances from welcome to the menu spotlight", async () => {
    renderTour();

    fireEvent.click(screen.getByTestId("OnboardingNext"));

    await waitFor(() => {
      expect(screen.getByText("Your main menu")).toBeInTheDocument();
    });
    expect(screen.getByTestId("OnboardingSpotlight")).toBeInTheDocument();
  });

  it("pins the skills demo instructions to the top of the dialog", async () => {
    renderTour();

    fireEvent.click(screen.getByTestId("OnboardingNext"));
    await waitFor(() => expect(screen.getByText("Your main menu")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("OnboardingNext"));
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Edit Resume" })).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByTestId("OnboardingNext"));

    expect(screen.getByText("Skills demo")).toBeInTheDocument();
    expect(screen.getByTestId("OnboardingDemoHeader")).toBeInTheDocument();
    expect(screen.getByTestId("OnboardingDemoHeader")).toContainElement(
      screen.getByTestId("OnboardingCoachCard"),
    );
    expect(screen.getByTestId("OnboardingDemoHeader")).not.toContainElement(
      screen.getByTestId("OnboardingNext"),
    );
    expect(screen.getByTestId("OnboardingDemoFooter")).toContainElement(
      screen.getByTestId("OnboardingNext"),
    );
    expect(screen.getByTestId("OnboardingDemoFooter")).toContainElement(
      screen.getByTestId("OnboardingBack"),
    );
  });

  it("shows theme and PDF theme instructions after the experience demo", async () => {
    renderTour();

    fireEvent.click(screen.getByTestId("OnboardingNext"));
    await waitFor(() => expect(screen.getByText("Your main menu")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("OnboardingNext"));
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Edit Resume" })).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByTestId("OnboardingNext"));
    await waitFor(() => expect(screen.getByText("Skills demo")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("OnboardingNext"));
    await waitFor(() => expect(screen.getByText("Experience demo")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("OnboardingNext"));

    expect(screen.getByText("Themes demo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Theme and PDF theme" })).toBeInTheDocument();
  });

  it("places the coach card next to the spotlighted element", async () => {
    renderTour();
    fireEvent.click(screen.getByTestId("OnboardingNext"));

    await waitFor(() => {
      expect(screen.getByText("Your main menu")).toBeInTheDocument();
    });
    expect(document.querySelector("[data-popper-placement]")).toBeInTheDocument();
  });

  it("hides the coach until the menu target has settled", async () => {
    renderTour();
    fireEvent.click(screen.getByTestId("OnboardingNext"));

    expect(screen.queryByText("Your main menu")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Your main menu")).toBeInTheDocument();
    });
  });
});
