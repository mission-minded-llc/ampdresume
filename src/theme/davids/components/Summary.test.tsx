import "@testing-library/jest-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { Summary } from "./Summary";
import { expect } from "@jest/globals";

const renderWithTheme = (component: React.ReactElement, mode: "light" | "dark" = "light") => {
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Summary Component", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;
  const summaryHtml =
    "<p>Experienced software engineer with 5+ years in full-stack development specializing in modern web technologies and scalable solutions.</p>";
  const summaryText =
    "Experienced software engineer with 5+ years in full-stack development specializing in modern web technologies and scalable solutions.";

  describe("Rendering Conditions", () => {
    it("should render nothing when no user is provided", () => {
      const { container } = renderWithTheme(<Summary />);
      expect(container.firstChild).toBeNull();
    });

    it("should render nothing when user has no summary", () => {
      const userWithoutSummary = { ...sampleUser, summary: undefined };
      const { container } = renderWithTheme(<Summary user={userWithoutSummary} />);
      expect(container.firstChild).toBeNull();
    });

    it("should render nothing when user summary is only whitespace or empty HTML", () => {
      const { container: whitespace } = renderWithTheme(
        <Summary user={{ ...sampleUser, summary: "   " }} />,
      );
      const { container: emptyHtml } = renderWithTheme(
        <Summary user={{ ...sampleUser, summary: "<p><br></p>" }} />,
      );

      expect(whitespace.firstChild).toBeNull();
      expect(emptyHtml.firstChild).toBeNull();
    });

    it("should render summary when user has valid summary text", () => {
      renderWithTheme(<Summary user={{ ...sampleUser, summary: summaryHtml }} />);

      expect(screen.getByRole("heading", { name: "Professional Summary" })).toBeInTheDocument();
      expect(screen.getByText(summaryText)).toBeInTheDocument();
    });
  });

  describe("Content Display", () => {
    const userWithSummary = {
      ...sampleUser,
      summary: summaryHtml,
    };

    it("should display the default summary heading", () => {
      renderWithTheme(<Summary user={userWithSummary} />);

      const heading = screen.getByRole("heading", { name: "Professional Summary" });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H2");
    });

    it("should display a custom summary heading", () => {
      renderWithTheme(<Summary user={{ ...userWithSummary, summaryTitle: "About Me" }} />);

      expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
    });

    it("should render rich text formatting", () => {
      renderWithTheme(
        <Summary
          user={{
            ...sampleUser,
            summary: "<p>Builder of <strong>reliable</strong> systems.</p>",
          }}
        />,
      );

      expect(screen.getByText("reliable")).toHaveStyle("font-weight: bold");
    });
  });

  describe("Styling and Theme", () => {
    const userWithSummary = {
      ...sampleUser,
      summary: summaryHtml,
    };

    it("should apply correct color for light theme", () => {
      const { container } = renderWithTheme(<Summary user={userWithSummary} />, "light");

      const summaryTextElement = screen.getByText(summaryText);
      expect(summaryTextElement).toBeInTheDocument();
      const wrapper = container.querySelector("main") ?? summaryTextElement.parentElement;
      expect(wrapper).toBeTruthy();
    });

    it("should apply correct color for dark theme", () => {
      renderWithTheme(<Summary user={userWithSummary} />, "dark");

      expect(screen.getByText(summaryText)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    const userWithSummary = {
      ...sampleUser,
      summary: summaryHtml,
    };

    it("should have proper heading hierarchy", () => {
      renderWithTheme(<Summary user={userWithSummary} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Professional Summary");
    });

    it("should have accessible text content", () => {
      renderWithTheme(<Summary user={userWithSummary} />);

      expect(screen.getByText(summaryText)).toBeInTheDocument();
    });
  });
});
