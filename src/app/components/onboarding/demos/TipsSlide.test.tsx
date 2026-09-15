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
    expect(screen.getByText("Replay this tour anytime")).toBeInTheDocument();
  });
});
