import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import React from "react";

import { Footer } from "./Footer";

jest.mock("next/navigation");

describe("Footer component", () => {
  it("matches snapshot for resume page", () => {
    (usePathname as jest.Mock).mockReturnValue("/r/john-doe"); // Resume page.

    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();

    // Expect the footer element to be in fixed position.
    const footer = container.querySelector("footer");
    expect(footer).toHaveStyle("position: fixed");
  });

  it("matches snapshot for regular page", () => {
    (usePathname as jest.Mock).mockReturnValue("/about"); // Non-resume page.

    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();

    // Expect the footer element to be in fixed position.
    const footer = container.querySelector("footer");
    expect(footer).toHaveStyle("position: relative");
  });
});
