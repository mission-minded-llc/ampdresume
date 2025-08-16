import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";

describe("LoadingOverlay", () => {
  test("renders with default props", () => {
    render(<LoadingOverlay open={true} />);
    expect(screen.getByText("Loading...")).toBeVisible();
  });

  test("renders with custom message", () => {
    const customMessage = "Please wait...";
    render(<LoadingOverlay open={true} message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeVisible();
  });

  test("is not visible when open is false", () => {
    render(<LoadingOverlay open={false} />);
    expect(screen.queryByText("Loading...")).not.toBeVisible();
  });
});
