import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import { LoadingOverlay } from "@/components/LoadingOverlay";
import React from "react";

describe("LoadingOverlay", () => {
  test("renders with default props", () => {
    render(<LoadingOverlay open={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders with custom message", () => {
    const customMessage = "Please wait...";
    render(<LoadingOverlay open={true} message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test("is not visible when open is false", () => {
    render(<LoadingOverlay open={false} />);
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
