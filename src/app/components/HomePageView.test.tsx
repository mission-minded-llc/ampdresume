import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { expect } from "@jest/globals";
import { HomePageView } from "./HomePageView";

function renderHome(userName: string | null) {
  return render(
    <ThemeProvider theme={createTheme()}>
      <HomePageView userName={userName} />
    </ThemeProvider>,
  );
}

describe("HomePageView", () => {
  it("renders a visible brand heading and guest CTAs", () => {
    const { getByRole, getAllByRole } = renderHome(null);

    expect(getByRole("heading", { level: 1, name: "Amp'd Resume" })).toBeVisible();
    expect(getAllByRole("link", { name: "Start building free" }).length).toBeGreaterThan(0);
    expect(getByRole("heading", { name: "What is Amp'd Resume?" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Who is it for?" })).toBeInTheDocument();
  });

  it("welcomes a signed-in user and points them to the editor", () => {
    const { getByText, getAllByRole, queryByRole } = renderHome("Ada Lovelace");

    expect(getByText("Welcome back, Ada Lovelace!")).toBeInTheDocument();
    expect(getAllByRole("link", { name: "Edit your resume" }).length).toBeGreaterThan(0);
    expect(queryByRole("link", { name: "Start building free" })).not.toBeInTheDocument();
  });
});
