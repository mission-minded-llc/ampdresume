import { fireEvent, render, screen } from "@testing-library/react";

import { Tooltip } from "@/components/Tooltip";

describe("Tooltip component", () => {
  it("renders the tooltip message on hover", async () => {
    render(<Tooltip message="Test message" />);

    // Verify the icon button is rendered
    const iconButton = screen.getByRole("button");
    expect(iconButton).toBeInTheDocument();

    // Hover over the icon button to display the tooltip
    fireEvent.mouseOver(iconButton);

    // Verify the tooltip message is displayed
    const tooltipMessage = await screen.findByText("Test message");
    expect(tooltipMessage).toBeInTheDocument();
  });
});
