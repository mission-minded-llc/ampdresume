import "@testing-library/jest-dom";
import { useContext } from "react";
import { fireEvent, render } from "@testing-library/react";
import { ThemeAppearanceContext, ThemeAppearanceProvider } from "./ThemeContext";
import { expect } from "@jest/globals";
import { THEME_APPEARANCE_COOKIE_NAME } from "@/lib/themeAppearanceCookie";

function TestChild() {
  const { themeAppearance, setThemeAppearance } = useContext(ThemeAppearanceContext);
  return (
    <>
      <div data-testid="current-theme">{themeAppearance}</div>
      <button
        type="button"
        onClick={() => setThemeAppearance(themeAppearance === "light" ? "dark" : "light")}
      >
        toggle
      </button>
    </>
  );
}

function clearCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name) {
      document.cookie = `${name}=; Max-Age=0; Path=/`;
    }
  });
}

describe("ThemeAppearanceProvider", () => {
  let mediaQueryListeners: Array<(event: MediaQueryListEvent) => void> = [];

  beforeEach(() => {
    clearCookies();
    mediaQueryListeners = [];
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(
          (_event: string, listener: (event: MediaQueryListEvent) => void) => {
            mediaQueryListeners.push(listener);
          },
        ),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it("defaults to light theme when system is not in dark mode", () => {
    const { getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestChild />
      </ThemeAppearanceProvider>,
    );
    expect(getByTestId("current-theme")).toHaveTextContent("light");
  });

  it("defaults to dark theme when system is in dark mode", () => {
    (window.matchMedia as jest.Mock).mockReturnValueOnce({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    const { getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestChild />
      </ThemeAppearanceProvider>,
    );
    expect(getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("uses a stored cookie preference instead of the system setting", () => {
    (window.matchMedia as jest.Mock).mockReturnValueOnce({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    const { getByTestId } = render(
      <ThemeAppearanceProvider initialThemeAppearance="light">
        <TestChild />
      </ThemeAppearanceProvider>,
    );

    expect(getByTestId("current-theme")).toHaveTextContent("light");
  });

  it("persists an explicit toggle to a cookie", () => {
    const { getByRole, getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestChild />
      </ThemeAppearanceProvider>,
    );

    fireEvent.click(getByRole("button", { name: "toggle" }));

    expect(getByTestId("current-theme")).toHaveTextContent("dark");
    expect(document.cookie).toContain(`${THEME_APPEARANCE_COOKIE_NAME}=dark`);
  });

  it("does not follow system changes after the user sets a preference", () => {
    const { getByRole, getByTestId } = render(
      <ThemeAppearanceProvider>
        <TestChild />
      </ThemeAppearanceProvider>,
    );

    fireEvent.click(getByRole("button", { name: "toggle" }));
    expect(getByTestId("current-theme")).toHaveTextContent("dark");

    mediaQueryListeners.forEach((listener) => {
      listener({ matches: false } as MediaQueryListEvent);
    });

    expect(getByTestId("current-theme")).toHaveTextContent("dark");
  });
});
