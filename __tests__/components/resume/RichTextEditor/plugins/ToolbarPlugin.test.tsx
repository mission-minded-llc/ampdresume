import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RICH_TEXT_OPTIONS } from "@/components/resume/RichTextEditor/plugins/constants";
import { ToolbarPlugin } from "@/components/resume/RichTextEditor/plugins/ToolbarPlugin";
import { render } from "@testing-library/react";

const initialConfig = {
  namespace: "TestEditor",
  theme: {},
  onError: (error: Error) => {
    throw error;
  },
};

describe("ToolbarPlugin", () => {
  it("should render toolbar buttons", () => {
    const { getByLabelText } = render(
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
      </LexicalComposer>,
    );

    RICH_TEXT_OPTIONS.forEach((option) => {
      if (!option?.label) return;

      expect(getByLabelText(option.label)).toBeInTheDocument();
    });
  });
});
