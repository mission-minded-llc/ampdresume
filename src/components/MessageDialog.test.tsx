import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MessageDialog } from "@/components/MessageDialog";
import { expect } from "@jest/globals";

describe("MessageDialog", () => {
  it("renders with default props", async () => {
    render(<MessageDialog open={true} />);
    await waitFor(() => {
      expect(screen.getByText("Message")).toBeInTheDocument();
      expect(screen.getByText("OK")).toBeInTheDocument();
    });
  });

  it("renders with custom title and message", async () => {
    render(<MessageDialog open={true} title="Custom Title" message="Custom Message" />);
    await waitFor(() => {
      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.getByText("Custom Message")).toBeInTheDocument();
    });
  });

  it("calls onClose when cancel button is clicked", async () => {
    const onClose = jest.fn();
    render(<MessageDialog open={true} variant="confirm" onClose={onClose} />);
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirm = jest.fn();
    render(<MessageDialog open={true} onConfirm={onConfirm} />);

    fireEvent.click(screen.getByText("OK"));
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });
});
