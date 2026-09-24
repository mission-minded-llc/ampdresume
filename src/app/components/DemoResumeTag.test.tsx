import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { appBrand } from "@/app/theme/createAppTheme";
import { DemoResumeChip, DemoResumeTag } from "./DemoResumeTag";

describe("DemoResumeTag", () => {
  it("renders a Demo chip", () => {
    render(<DemoResumeTag />);

    expect(screen.getByTestId("demo-resume-tag")).toHaveTextContent("Demo");
    expect(screen.getByLabelText("Demo resume")).toBeInTheDocument();
  });
});

describe("DemoResumeChip", () => {
  it("renders a Demo chip", () => {
    render(<DemoResumeChip />);

    expect(screen.getByTestId("demo-resume-tag")).toHaveTextContent("Demo");
    expect(screen.getByTestId("demo-resume-tag")).toHaveStyle({
      backgroundColor: appBrand.orange,
    });
  });
});
