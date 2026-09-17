import { render, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { RichTextEditor } from "./RichTextEditor";
import { expect } from "@jest/globals";
import { createAppTheme } from "@/app/theme/createAppTheme";

describe("RichTextEditor", () => {
  it("renders without crashing", async () => {
    const editorStateRef = { current: null };
    const theme = createAppTheme("light");
    const { container } = render(
      <ThemeProvider theme={theme}>
        <RichTextEditor editorStateRef={editorStateRef} value="" name="test-editor" />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(container.querySelector("[contenteditable='true']")).toBeInTheDocument();
    });

    expect(container.querySelector("[contenteditable='true']")).toHaveStyle({
      fontSize: theme.typography.body1.fontSize,
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
