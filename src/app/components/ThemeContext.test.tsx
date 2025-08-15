import "@testing-library/jest-dom";
import React, { useContext } from "react";
import { render } from "@testing-library/react";
import {
  ThemeAppearanceContext,
  ThemeAppearanceProvider,
} from "./ThemeContext";

function TestChild() {
  const { themeAppearance } = useContext(ThemeAppearanceContext);
  return <div data-testid="current-theme">{themeAppearance}</div>;
}

describe("ThemeAppearanceProvider", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it("defaults to light theme when system is not in dark mode", () => {
    const { getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestChild />
      </ThemeAppearanceProvider>
    );
    expect(getByTestId("current-theme")).toHaveTextContent("light");
  });

  it("defaults to dark theme when system is in dark mode", () => {
    // Remock window.matchMedia to return dark mode
    (window.matchMedia as jest.Mock).mockReturnValueOnce({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    const { getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestChild />
      </ThemeAppearanceProvider>
    );
    expect(getByTestId("current-theme")).toHaveTextContent("dark");
  });
});
