import { act, render } from "@testing-library/react";
import React from "react";

import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  it("renders without crashing", async () => {
    let result;
    const editorStateRef = { current: null };

    await act(async () => {
      result = render(
        <RichTextEditor editorStateRef={editorStateRef} value="" name="test-editor" />,
      );
    });
    expect(result!.container).toBeInTheDocument();
  });

  it("displays the placeholder text", async () => {
    const placeholderText = "Type here...";
    let result;
    const editorStateRef = { current: null };

    await act(async () => {
      result = render(
        <RichTextEditor editorStateRef={editorStateRef} value="" name="test-editor" />,
      );
    });
    expect(result!.getByText(placeholderText)).toBeInTheDocument();
  });
});
