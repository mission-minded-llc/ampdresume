import { fireEvent, render, screen } from "@testing-library/react";

import { MessageDialog } from "@/components/MessageDialog";
import React from "react";

describe("MessageDialog", () => {
  it("renders with default props", () => {
    render(<MessageDialog open={true} />);
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("renders with custom title and message", () => {
    render(<MessageDialog open={true} title="Custom Title" message="Custom Message" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Message")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    const onClose = jest.fn();
    render(<MessageDialog open={true} variant="confirm" onClose={onClose} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = jest.fn();
    render(<MessageDialog open={true} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText("OK"));
    expect(onConfirm).toHaveBeenCalled();
  });

  // it("calls onClose when confirm button is clicked if onConfirm is not provided", () => {
  //   const onClose = jest.fn();
  //   render(<MessageDialog open={true} onClose={onClose} />);
  //   fireEvent.click(screen.getByText("OK"));
  //   expect(onClose).toHaveBeenCalled();
  // });
});
