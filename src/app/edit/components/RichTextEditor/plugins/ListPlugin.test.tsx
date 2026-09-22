import { fireEvent, render, screen } from "@testing-library/react";
import { ListPlugin } from "./ListPlugin";
import { expect } from "@jest/globals";

const update = jest.fn((fn: () => void) => fn());
const dispatchCommand = jest.fn();

jest.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [{ update, dispatchCommand }],
}));

describe("ListPlugin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("inserts unordered and ordered lists", () => {
    render(<ListPlugin blockType="paragraph" />);

    fireEvent.click(screen.getByLabelText("Add unordered list"));
    fireEvent.click(screen.getByLabelText("Add ordered list"));

    expect(dispatchCommand).toHaveBeenCalledTimes(2);
  });

  it("removes an active unordered or ordered list", () => {
    const { rerender } = render(<ListPlugin blockType="ul" />);
    fireEvent.click(screen.getByLabelText("Add unordered list"));

    rerender(<ListPlugin blockType="ol" />);
    fireEvent.click(screen.getByLabelText("Add ordered list"));

    expect(dispatchCommand).toHaveBeenCalledTimes(2);
  });
});
