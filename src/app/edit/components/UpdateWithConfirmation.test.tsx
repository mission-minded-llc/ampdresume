import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";

import React from "react";
import { UpdateWithConfirmation } from "./UpdateWithConfirmation";

describe("UpdateWithConfirmation", () => {
  it("renders correctly with default props", async () => {
    const { getByText } = render(<UpdateWithConfirmation onConfirmUpdate={() => {}} />);
    await waitFor(() => {
      expect(getByText("Update")).toBeInTheDocument();
    });
  });

  it("opens the confirmation dialog when the update button is clicked", async () => {
    const { getByText, getByRole } = render(<UpdateWithConfirmation onConfirmUpdate={() => {}} />);
    const updateButton = getByText("Update");

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
      expect(getByText("Confirm Update")).toBeInTheDocument();
      expect(getByText("Are you sure you want to update?")).toBeInTheDocument();
    });
  });

  it("calls onConfirmUpdate when the confirm button is clicked", async () => {
    const onConfirmUpdateMock = jest.fn();
    const { getByText, getByRole } = render(
      <UpdateWithConfirmation onConfirmUpdate={onConfirmUpdateMock} />,
    );
    const updateButton = getByText("Update");

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
    });

    const confirmButton = getByText("Yes, Update");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(onConfirmUpdateMock).toHaveBeenCalledTimes(1);
    });
  });

  it("closes the confirmation dialog when the cancel button is clicked", async () => {
    const { getByText, getByRole, queryByRole } = render(
      <UpdateWithConfirmation onConfirmUpdate={() => {}} />,
    );
    const updateButton = getByText("Update");

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
    });

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
