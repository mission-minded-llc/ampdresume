import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";
import { fireEvent, render } from "@testing-library/react";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { ThemeAppearanceContext } from "./ThemeContext";
import { expect } from "@jest/globals";

jest.mock("next/navigation");
jest.mock("@/hooks/useIsDesktop", () => ({
  useIsDesktop: jest.fn(),
}));
jest.mock("@/hooks/useIsResumePage", () => ({
  useIsResumePage: jest.fn(),
}));

import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";

describe("ThemeAppearanceToggle", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    (useIsResumePage as jest.Mock).mockReturnValue(false);
  });

  it("toggles theme appearance when the switch is clicked from light to dark", () => {
    const setThemeAppearanceMock = jest.fn();
    const mockContext = {
      themeAppearance: "light" as "light" | "dark",
      setThemeAppearance: setThemeAppearanceMock,
    };

    const { getByRole } = render(
      <ThemeAppearanceContext.Provider value={mockContext}>
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>,
    );

    const switchButton = getByRole("switch");
    fireEvent.click(switchButton);
    expect(setThemeAppearanceMock).toHaveBeenCalledWith("dark");
  });

  it("toggles theme appearance when the switch is clicked from dark to light", () => {
    const setThemeAppearanceMock = jest.fn();
    const mockContext = {
      themeAppearance: "dark" as "light" | "dark",
      setThemeAppearance: setThemeAppearanceMock,
    };

    const { getByRole } = render(
      <ThemeAppearanceContext.Provider value={mockContext}>
        <ThemeAppearanceToggle />
      </ThemeAppearanceContext.Provider>,
    );

    const switchButton = getByRole("switch");
    fireEvent.click(switchButton);
    expect(setThemeAppearanceMock).toHaveBeenCalledWith("light");
  });
});
