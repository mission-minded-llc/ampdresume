import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { expect } from "@jest/globals";
import { OnboardingCoachActions } from "./OnboardingCoachCard";
import { ONBOARDING_STEPS, OnboardingStepId } from "./steps";

const renderActions = (stepId: OnboardingStepId) => {
  const step = ONBOARDING_STEPS.find((item) => item.id === stepId)!;
  return render(
    <ThemeProvider theme={createTheme()}>
      <OnboardingCoachActions
        step={step}
        onPrimary={jest.fn()}
        onSkipTour={jest.fn()}
        showBack={false}
      />
    </ThemeProvider>,
  );
};

describe("OnboardingCoachActions", () => {
  it("styles the Done button green with a checkmark", () => {
    renderActions("tips");

    const done = screen.getByTestId("OnboardingNext");
    expect(done).toHaveTextContent("Done");
    expect(done).toHaveClass("MuiButton-colorSuccess");
    expect(done.querySelector("[data-icon]")?.getAttribute("data-icon")).toBe(
      "fluent-color:checkmark-circle-20",
    );
  });

  it("keeps other primary actions orange without a checkmark", () => {
    renderActions("welcome");

    const next = screen.getByTestId("OnboardingNext");
    expect(next).toHaveClass("MuiButton-colorSecondary");
    expect(next.querySelector("[data-icon]")).not.toBeInTheDocument();
  });
});
