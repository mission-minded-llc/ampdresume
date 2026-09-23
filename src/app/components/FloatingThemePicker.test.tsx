import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { expect } from "@jest/globals";
import { FloatingThemePicker } from "./FloatingThemePicker";

describe("FloatingThemePicker", () => {
  it("renders children on a solid paper background", () => {
    const theme = createTheme({
      palette: { background: { paper: "rgb(248, 249, 250)" } },
    });

    render(
      <ThemeProvider theme={theme}>
        <FloatingThemePicker>Dock</FloatingThemePicker>
      </ThemeProvider>,
    );

    const picker = screen.getByTestId("owner-theme-picker");
    expect(picker).toHaveTextContent("Dock");
    expect(picker).toHaveStyle({ backgroundColor: "rgb(248, 249, 250)" });
  });
});
