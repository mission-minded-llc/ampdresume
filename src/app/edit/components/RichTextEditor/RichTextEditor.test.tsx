import { render, waitFor } from "@testing-library/react";
import { RichTextEditor } from "./RichTextEditor";
import { expect } from "@jest/globals";

describe("RichTextEditor", () => {
  it("renders without crashing", async () => {
    const editorStateRef = { current: null };
    const { container } = render(
      <RichTextEditor editorStateRef={editorStateRef} value="" name="test-editor" />,
    );

    await waitFor(() => {
      expect(container.querySelector("[contenteditable='true']")).toBeInTheDocument();
    });
  });

  it("displays the placeholder text", async () => {
    const placeholderText = "Type here...";
    const editorStateRef = { current: null };
    const { getByText } = render(
      <RichTextEditor editorStateRef={editorStateRef} value="" name="test-editor" />,
    );

    await waitFor(() => {
      expect(getByText(placeholderText)).toBeInTheDocument();
    });
  });
});
