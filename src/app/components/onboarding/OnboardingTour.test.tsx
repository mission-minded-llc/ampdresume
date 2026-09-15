import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
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

const renderTour = (onComplete = jest.fn(), didImport = false) =>
  render(
    <ThemeProvider theme={createTheme()}>
      <NavPrimaryProvider>
        <OnboardingTour didImport={didImport} onComplete={onComplete} />
      </NavPrimaryProvider>
    </ThemeProvider>,
  );

describe("OnboardingTour", () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it("renders the welcome step", () => {
    renderTour();

    expect(screen.getByTestId("OnboardingRoot")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Amp'd Resume")).toBeInTheDocument();
    expect(screen.getByTestId("OnboardingSkip")).toHaveTextContent("Skip tutorial");
    expect(screen.getByTestId("OnboardingNext")).toHaveTextContent("Start tour");
  });

  it("skips the tutorial from welcome", () => {
    const onComplete = jest.fn();
    renderTour(onComplete);

    fireEvent.click(screen.getByTestId("OnboardingSkip"));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("advances from welcome to the menu spotlight", () => {
    renderTour();

    fireEvent.click(screen.getByTestId("OnboardingNext"));

    expect(screen.getByText("Your main menu")).toBeInTheDocument();
    expect(screen.getByTestId("OnboardingSpotlight")).toBeInTheDocument();
  });
});
