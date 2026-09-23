import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { expect } from "@jest/globals";
import { ThemesDemo } from "./ThemesDemo";

const renderDemo = () =>
  render(
    <ThemeProvider theme={createTheme()}>
      <ThemesDemo />
    </ThemeProvider>,
  );

describe("ThemesDemo", () => {
  it("explains how to customize the live theme and PDF theme", () => {
    renderDemo();

    expect(screen.getByTestId("OnboardingThemesDemo")).toBeInTheDocument();
    expect(screen.getByText("Live theme")).toBeInTheDocument();
    expect(screen.getByText("PDF theme")).toBeInTheDocument();
    expect(screen.getByText(/View Resume/)).toBeInTheDocument();
    expect(screen.getByText(/The Theme picker/)).toBeInTheDocument();
    expect(screen.getByText(/View PDF/)).toBeInTheDocument();
    expect(screen.getByText(/The PDF Theme picker/)).toBeInTheDocument();
    expect(screen.getByText(/independent/)).toBeInTheDocument();
  });

  it("renders an icon for every instruction", () => {
    renderDemo();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    items.forEach((item) => {
      const icon = item.querySelector("[data-testid=icon]");
      expect(icon).toBeInTheDocument();
      expect(icon?.getAttribute("data-icon")).toMatch(/^fluent-color:/);
    });
  });
});
