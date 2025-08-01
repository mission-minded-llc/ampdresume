import { ThemeProvider, createTheme } from "@mui/material";
import { renderHook } from "@testing-library/react";

import { useIsDesktop } from "@/hooks/useIsDesktop";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

describe("useIsDesktop", () => {
  it("should return true when the screen width is md or larger", () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === "(min-width:960px)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useIsDesktop(), { wrapper });

    expect(result.current).toBe(true);
  });

  it("should return false when the screen width is smaller than md", () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === "(min-width:960px)" ? false : true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useIsDesktop(), { wrapper });

    expect(result.current).toBe(false);
  });
});
