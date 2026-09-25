import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { expect } from "@jest/globals";
import { VERTICAL_DEMO_GROUPS } from "@/constants/verticalDemos";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { HomePageView } from "./HomePageView";

jest.mock("@/hooks/useIsDesktop", () => ({
  useIsDesktop: jest.fn(),
}));

function renderHome(userName: string | null) {
  return render(
    <ThemeProvider theme={createTheme()}>
      <HomePageView userName={userName} />
    </ThemeProvider>,
  );
}

describe("HomePageView", () => {
  beforeEach(() => {
    (useIsDesktop as jest.Mock).mockReturnValue(false);
  });

  it("renders a visible brand heading and guest CTAs", () => {
    const { getByRole, getAllByRole, getByText, container } = renderHome(null);

    expect(getByRole("heading", { level: 1, name: "Amp'd Resume" })).toBeVisible();
    expect(getAllByRole("link", { name: "Start building free" }).length).toBeGreaterThan(0);
    expect(getByRole("heading", { name: "What is Amp'd Resume?" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Who is it for?" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Example resumes" })).toBeInTheDocument();
    expect(
      getByText(
        "Browse sample resumes by industry or literary character, then click a name to see a finished resume.",
      ),
    ).toBeInTheDocument();
    expect(getAllByRole("link", { name: "See example resumes" })[0]).toHaveAttribute(
      "href",
      "#example-resumes",
    );
    expect(getByRole("tablist", { name: "Sample resumes" })).toBeInTheDocument();
    expect(getAllByRole("tab")).toHaveLength(VERTICAL_DEMO_GROUPS.length + 1);
    expect(getByRole("tab", { name: "Literary" })).toHaveAttribute("aria-selected", "false");
    expect(getByRole("tab", { name: "Software" })).toHaveAttribute("aria-selected", "true");
    expect(getByRole("heading", { name: "Software & Technology" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Maya Chen" })).toHaveAttribute("href", "/r/maya-chen");
    expect(getByRole("link", { name: "Maya Chen" })).toHaveAttribute("target", "_self");
    expect(getByRole("link", { name: "Cole Brennan" })).toHaveAttribute("href", "/r/cole-brennan");
    expect(getByRole("link", { name: "here" })).toHaveAttribute("href", "/r/missionmike");
    expect(getByRole("link", { name: "here" })).toHaveAttribute("target", "_self");
    expect(container.querySelector('a[href="/r/michael-dinerstein"]')).not.toBeInTheDocument();
    expect(getByRole("link", { name: "theme contribution guide" })).toHaveAttribute(
      "href",
      "https://github.com/mission-minded-llc/ampdresume/blob/main/src/theme/README.md",
    );
    expect(container.querySelector("svg[viewBox='0 0 615 312']")).toBeInTheDocument();
    expect(container.querySelector("svg[viewBox='0 0 615 400']")).toBeInTheDocument();
  });

  it("welcomes a signed-in user and points them to the editor", () => {
    const { getByText, getAllByRole, queryByRole } = renderHome("Ada Lovelace");

    expect(getByText("Welcome back, Ada Lovelace!")).toBeInTheDocument();
    expect(getAllByRole("link", { name: "Edit your resume" }).length).toBeGreaterThan(0);
    expect(queryByRole("link", { name: "Start building free" })).not.toBeInTheDocument();
  });

  it("lists the selected vertical's sample resumes", () => {
    const { getByRole, queryByRole } = renderHome(null);

    fireEvent.click(getByRole("tab", { name: "Healthcare" }));

    expect(getByRole("tab", { name: "Healthcare" })).toHaveAttribute("aria-selected", "true");
    expect(getByRole("heading", { name: "Healthcare" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Elena Vasquez" })).toHaveAttribute(
      "href",
      "/r/elena-vasquez",
    );
    expect(getByRole("link", { name: "David Okello" })).toHaveAttribute("href", "/r/david-okello");
    expect(queryByRole("link", { name: "Maya Chen" })).not.toBeInTheDocument();
  });

  it("lists literary sample resumes when Literary is selected", () => {
    const { getByRole, queryByRole } = renderHome(null);

    fireEvent.click(getByRole("tab", { name: "Literary" }));

    expect(getByRole("tab", { name: "Literary" })).toHaveAttribute("aria-selected", "true");
    expect(getByRole("heading", { name: "Literary" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Sherlock Holmes" })).toHaveAttribute(
      "href",
      "/r/sherlock-holmes",
    );
    expect(getByRole("link", { name: "Alice" })).toHaveAttribute("href", "/r/alice");
    expect(getByRole("link", { name: "King Arthur" })).toHaveAttribute("href", "/r/king-arthur");
    expect(getByRole("link", { name: "Robin Hood" })).toHaveAttribute("href", "/r/robin-hood");
    expect(queryByRole("link", { name: "Portia" })).not.toBeInTheDocument();
    expect(queryByRole("link", { name: "Maya Chen" })).not.toBeInTheDocument();
  });

  it("opens sample resumes in a new tab on desktop", () => {
    (useIsDesktop as jest.Mock).mockReturnValue(true);
    const open = jest.spyOn(window, "open").mockImplementation(() => null);

    const { getByRole } = renderHome(null);
    fireEvent.click(getByRole("link", { name: "Maya Chen" }));

    expect(open).toHaveBeenCalledWith("/r/maya-chen", "_blank", "noopener,noreferrer");
    open.mockRestore();
  });

  it("keeps sample resumes in the same tab on mobile", () => {
    const open = jest.spyOn(window, "open").mockImplementation(() => null);

    const { getByRole } = renderHome(null);
    fireEvent.click(getByRole("link", { name: "Maya Chen" }));

    expect(open).not.toHaveBeenCalled();
    expect(getByRole("link", { name: "Maya Chen" })).toHaveAttribute("target", "_self");
    open.mockRestore();
  });
});
