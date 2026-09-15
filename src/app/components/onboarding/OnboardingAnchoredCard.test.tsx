import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { expect } from "@jest/globals";
import { OnboardingAnchoredCard } from "./OnboardingAnchoredCard";

const mockRect = {
  width: 48,
  height: 48,
  top: 20,
  left: 16,
  bottom: 68,
  right: 64,
  x: 16,
  y: 20,
  toJSON: () => {},
};

const renderCard = (targetId?: string) =>
  render(
    <ThemeProvider theme={createTheme()}>
      <OnboardingAnchoredCard targetId={targetId} placement="right-start">
        <div>Coach copy</div>
      </OnboardingAnchoredCard>
    </ThemeProvider>,
  );

const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: width });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    writable: true,
    value: height,
  });
};

describe("OnboardingAnchoredCard", () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    setViewport(originalInnerWidth, originalInnerHeight);
  });

  it("falls back to a fixed bottom card when there is no target", () => {
    renderCard();

    expect(screen.getByTestId("OnboardingRoot")).toBeInTheDocument();
    expect(screen.getByTestId("OnboardingRoot")).toHaveAttribute(
      "data-placement",
      "viewport-bottom",
    );
    expect(screen.getByText("Coach copy")).toBeInTheDocument();
    expect(document.querySelector("[data-popper-placement]")).not.toBeInTheDocument();
  });

  it("pins to the viewport bottom when right-start cannot fit beside a drawer-sized target", async () => {
    setViewport(375, 667);

    const target = document.createElement("div");
    target.setAttribute("data-tour-id", "edit-resume-section");
    Object.defineProperty(target, "getBoundingClientRect", {
      value: () => ({
        width: 250,
        height: 420,
        top: 0,
        left: 0,
        bottom: 420,
        right: 250,
        x: 0,
        y: 0,
        toJSON: () => {},
      }),
    });
    document.body.appendChild(target);

    try {
      render(
        <ThemeProvider theme={createTheme()}>
          <OnboardingAnchoredCard targetId="edit-resume-section" placement="right-start">
            <div>Coach copy</div>
          </OnboardingAnchoredCard>
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText("Coach copy")).toBeInTheDocument();
      });
      expect(screen.getByTestId("OnboardingRoot")).toHaveAttribute(
        "data-placement",
        "viewport-bottom",
      );
      expect(document.querySelector("[data-popper-placement]")).not.toBeInTheDocument();
    } finally {
      target.remove();
    }
  });

  it("hides the card until the target has settled", async () => {
    const target = document.createElement("button");
    target.setAttribute("data-tour-id", "nav-menu-button");
    Object.defineProperty(target, "getBoundingClientRect", { value: () => mockRect });
    document.body.appendChild(target);

    try {
      renderCard("nav-menu-button");

      expect(screen.queryByText("Coach copy")).not.toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByText("Coach copy")).toBeInTheDocument();
      });
      expect(document.querySelector("[data-popper-placement]")).toBeInTheDocument();
    } finally {
      target.remove();
    }
  });
});
