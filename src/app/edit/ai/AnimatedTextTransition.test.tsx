import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { AnimatedTextTransition } from "./AnimatedTextTransition";
import { expect } from "@jest/globals";

function renderWithTheme(ui: React.ReactElement) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("AnimatedTextTransition", () => {
  it("renders initial text as words", () => {
    renderWithTheme(<AnimatedTextTransition text="hello world" />);
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  it("renders empty text without error", () => {
    const { container } = renderWithTheme(<AnimatedTextTransition text="" />);
    const box = container.querySelector('[class*="MuiBox"]') ?? container.firstChild;
    expect(box).toBeInTheDocument();
    expect(container.textContent).toBe("");
  });

  it("applies add color and bold to new word when text gains a word", () => {
    const theme = createTheme();
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <AnimatedTextTransition text="hello" />
      </ThemeProvider>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <AnimatedTextTransition text="hello world" />
      </ThemeProvider>,
    );

    const newWord = screen.getByText("world");
    expect(newWord).toBeInTheDocument();
    expect(newWord).toHaveStyle({ color: "rgb(76, 175, 80)" }); // #4caf50
    expect(newWord).toHaveStyle({ fontWeight: "600" });
  });

  it("applies move color when a word changes position", () => {
    const theme = createTheme();
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <AnimatedTextTransition text="first second" />
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={theme}>
        <AnimatedTextTransition text="second first" />
      </ThemeProvider>,
    );

    const firstWord = screen.getByText("first");
    const secondWord = screen.getByText("second");
    expect(firstWord).toHaveStyle({ color: "rgb(33, 150, 243)" }); // #2196f3 move
    expect(secondWord).toHaveStyle({ color: "rgb(33, 150, 243)" }); // both moved
  });

  it("renders unchanged words with inherit color when no change has occurred", () => {
    renderWithTheme(<AnimatedTextTransition text="unchanged text" />);
    const word = screen.getByText("unchanged");
    expect(word).toBeInTheDocument();
    // Before any prop change, status is "unchanged" -> inherit (no explicit color override from component)
    expect(word).toHaveStyle({ fontWeight: "400" });
  });
});
