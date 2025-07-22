import "@testing-library/jest-dom";

import { fireEvent, render, waitFor, act } from "@testing-library/react";

import { DeleteWithConfirmation } from "./DeleteWithConfirmation";
import React from "react";

describe("DeleteWithConfirmation", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<DeleteWithConfirmation onConfirmDelete={() => {}} />);
    expect(getByText("Delete")).toBeInTheDocument();
  });

  it("opens the confirmation dialog when the delete button is clicked", async () => {
    const { getByText, getByRole } = render(<DeleteWithConfirmation onConfirmDelete={() => {}} />);
    const deleteButton = getByText("Delete");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
      expect(getByText("Are you sure?")).toBeInTheDocument();
      expect(getByText("This cannot be undone!")).toBeInTheDocument();
    });
  });

  it("calls onConfirmDelete when the confirm button is clicked", async () => {
    const onConfirmDeleteMock = jest.fn();
    const { getByText, getByRole } = render(
      <DeleteWithConfirmation onConfirmDelete={onConfirmDeleteMock} />,
    );
    const deleteButton = getByText("Delete");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
    });

    const confirmButton = getByText("Yes, Delete");
    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(onConfirmDeleteMock).toHaveBeenCalledTimes(1);
  });

  it("closes the confirmation dialog when the cancel button is clicked", async () => {
    const { getByText, getByRole, queryByRole } = render(
      <DeleteWithConfirmation onConfirmDelete={() => {}} />,
    );
    const deleteButton = getByText("Delete");

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(getByRole("dialog")).toBeInTheDocument();
    });

    const cancelButton = getByText("Cancel");
    act(() => {
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
