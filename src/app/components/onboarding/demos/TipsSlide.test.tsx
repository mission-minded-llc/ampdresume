import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { TipsSlide } from "./TipsSlide";

describe("TipsSlide", () => {
  it("lists resume-building tips", () => {
    render(<TipsSlide />);

    expect(screen.getByTestId("OnboardingTips")).toBeInTheDocument();
    expect(screen.getByText("Claim a clean URL")).toBeInTheDocument();
    expect(screen.getByText("Tell the story behind skills")).toBeInTheDocument();
    expect(screen.getByText("Pick a live theme")).toBeInTheDocument();
    expect(screen.getByText("Pick a PDF theme separately")).toBeInTheDocument();
    expect(screen.getByText("Replay this tour anytime")).toBeInTheDocument();
  });

  it("renders an icon for every tip", () => {
    render(<TipsSlide />);

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
    items.forEach((item) => {
      const icon = item.querySelector("[data-testid=icon]");
      expect(icon).toBeInTheDocument();
      expect(icon?.getAttribute("data-icon")).toMatch(/^fluent-color:/);
    });
  });
});
