import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ColorPicker } from "./ColorPicker";
import { expect } from "@jest/globals";

jest.mock("react-color", () => ({
  SketchPicker: ({ onChangeComplete }: { onChangeComplete: (color: { hex: string }) => void }) => (
    <button type="button" onClick={() => onChangeComplete({ hex: "#ff0000" })}>
      pick red
    </button>
  ),
}));

describe("ColorPicker", () => {
  it("toggles the picker and reports the selected color", () => {
    const onChange = jest.fn();
    render(<ColorPicker color="#000000" onChange={onChange} icon={<span>swatch</span>} />);

    expect(screen.queryByText("pick red")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Change Color" }));
    expect(screen.getByText("pick red")).toBeInTheDocument();

    fireEvent.click(screen.getByText("pick red"));
    expect(onChange).toHaveBeenCalledWith("#ff0000");

    fireEvent.click(screen.getByRole("button", { name: "Change Color" }));
    expect(screen.queryByText("pick red")).not.toBeInTheDocument();
  });
});
