import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TablePlugin } from "./TablePlugin";
import { expect } from "@jest/globals";

const update = jest.fn((fn: () => void) => fn());

jest.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [{ update }],
}));

jest.mock("@lexical/table", () => ({
  $createTableNodeWithDimensions: jest.fn(() => ({ type: "table" })),
}));

jest.mock("@lexical/utils", () => ({
  $insertNodeToNearestRoot: jest.fn(),
}));

describe("TablePlugin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds a table after rows and columns are provided", async () => {
    render(<TablePlugin />);

    fireEvent.click(screen.getByLabelText("Add table"));
    expect(screen.getByText("Add Table")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(update).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText("Number of Rows"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("Number of Columns"), { target: { value: "3" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(update).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
