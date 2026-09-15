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

describe("OnboardingAnchoredCard", () => {
  it("falls back to a fixed bottom card when there is no target", () => {
    renderCard();

    expect(screen.getByTestId("OnboardingRoot")).toBeInTheDocument();
    expect(screen.getByText("Coach copy")).toBeInTheDocument();
    expect(document.querySelector("[data-popper-placement]")).not.toBeInTheDocument();
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
