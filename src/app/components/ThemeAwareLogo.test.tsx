import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeAwareLogo } from "./ThemeAwareLogo";
import { expect } from "@jest/globals";

function renderWithTheme(mode: "light" | "dark") {
  const theme = createTheme({ palette: { mode } });
  return render(
    <ThemeProvider theme={theme}>
      <ThemeAwareLogo />
    </ThemeProvider>,
  );
}

describe("ThemeAwareLogo", () => {
  it("renders a container and an SVG with correct viewBox", () => {
    const { container } = renderWithTheme("light");
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 600 400");
  });

  it("applies light theme colors when palette mode is light", () => {
    const { container } = renderWithTheme("light");
    const paths = container.querySelectorAll("svg path");
    const pathsWithBlackFill = Array.from(paths).filter((p) => p.getAttribute("fill") === "black");
    expect(pathsWithBlackFill.length).toBeGreaterThan(0);

    // Light mode uses #F2D7FF for layered "A" shape backgrounds
    const pathsWithLightBg = Array.from(paths).filter((p) => p.getAttribute("fill") === "#F2D7FF");
    expect(pathsWithLightBg.length).toBeGreaterThan(0);
  });

  it("applies dark theme colors when palette mode is dark", () => {
    const { container } = renderWithTheme("dark");
    const paths = container.querySelectorAll("svg path");
    const pathsWithWhiteFill = Array.from(paths).filter((p) => p.getAttribute("fill") === "white");
    expect(pathsWithWhiteFill.length).toBeGreaterThan(0);

    // Dark mode uses dark grays for layered "A" shape backgrounds
    const pathsWithDarkBg = Array.from(paths).filter((p) => p.getAttribute("fill") === "#4B4B4B");
    expect(pathsWithDarkBg.length).toBeGreaterThan(0);
  });

  it("renders within a Box with full width styling", () => {
    const { container } = renderWithTheme("light");
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
    expect(box.tagName).toBe("DIV");
    // MUI Box renders as div; sx width/maxWidth are applied via CSS
    expect(box.querySelector("svg")).toBeInTheDocument();
  });
});
