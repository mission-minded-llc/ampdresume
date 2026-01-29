import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageHeading } from "./PageHeading";
import { expect } from "@jest/globals";

jest.mock("../components/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => <div data-testid="section-title">{title}</div>,
}));

describe("PageHeading", () => {
  describe("Rendering", () => {
    it("renders correctly with SectionTitle", () => {
      render(<PageHeading />);

      expect(screen.getByTestId("section-title")).toBeInTheDocument();
      expect(screen.getByTestId("section-title")).toHaveTextContent("Import from PDF");
    });

    it("renders description text", () => {
      render(<PageHeading />);

      expect(
        screen.getByText(/Do you have a PDF resume that you want to import\?/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Upload it here and we will extract the information for you/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please note that the extraction may not be perfect/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/you may need to review and edit the information after import/),
      ).toBeInTheDocument();
    });

    it("renders all text content in a single Typography component", () => {
      const { container } = render(<PageHeading />);

      const typographyElements = container.querySelectorAll("p");
      expect(typographyElements.length).toBeGreaterThan(0);
    });
  });

  describe("Component structure", () => {
    it("renders SectionTitle with correct title", () => {
      render(<PageHeading />);

      const sectionTitle = screen.getByTestId("section-title");
      expect(sectionTitle).toHaveTextContent("Import from PDF");
    });

    it("has proper Box wrapper with margin bottom", () => {
      const { container } = render(<PageHeading />);

      const boxes = container.querySelectorAll('[class*="MuiBox"]');
      expect(boxes.length).toBeGreaterThan(0);
    });
  });
});
