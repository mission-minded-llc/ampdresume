import "@testing-library/jest-dom";
import React from "react";
import { usePathname } from "next/navigation";
import { fireEvent, render } from "@testing-library/react";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { ThemeAppearanceContext } from "./ThemeContext";

jest.mock("next/navigation");

describe("ThemeAppearanceToggle", () => {
  it("toggles theme appearance when the switch is clicked from light to dark", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    const setThemeAppearanceMock = jest.fn();
    const mockContext = {
      themeAppearance: "light" as "light" | "dark",
      setThemeAppearance: setThemeAppearanceMock,
    };

    const { getByRole } = render(
      <ThemeAppearanceContext.Provider value={mockContext}>
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>
    );

    const switchButton = getByRole("checkbox");
    fireEvent.click(switchButton);
    expect(setThemeAppearanceMock).toHaveBeenCalledWith("dark");
  });

  it("toggles theme appearance when the switch is clicked from dark to light", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    const setThemeAppearanceMock = jest.fn();
    const mockContext = {
      themeAppearance: "dark" as "light" | "dark",
      setThemeAppearance: setThemeAppearanceMock,
    };

    const { getByRole } = render(
      <ThemeAppearanceContext.Provider value={mockContext}>
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>
    );

    const switchButton = getByRole("checkbox");
    fireEvent.click(switchButton);
    expect(setThemeAppearanceMock).toHaveBeenCalledWith("light");
  });
});
