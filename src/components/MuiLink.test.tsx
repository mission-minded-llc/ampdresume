import { render } from "@testing-library/react";
import { MuiLink } from "@/components/MuiLink";

describe("MuiLink", () => {
  it("renders correctly with given props", () => {
    const { getByText } = render(
      <MuiLink href="https://example.com" target="_blank">
        Example
      </MuiLink>
    );
    const linkElement = getByText("Example");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://example.com");
    expect(linkElement).toHaveAttribute("target", "_blank");
  });

  it("renders with default target _self", () => {
    const { getByText } = render(
      <MuiLink href="https://example.com">Example</MuiLink>
    );
    const linkElement = getByText("Example");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("target", "_self");
  });
});
