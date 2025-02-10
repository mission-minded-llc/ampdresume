import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import { HeadingNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RICH_TEXT_OPTIONS } from "./constants";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { render } from "@testing-library/react";

const initialConfig = {
  namespace: "TestEditor",
  theme: {},
  onError: (error: Error) => {
    throw error;
  },
  nodes: [
    HeadingNode,
    CodeNode,
    CodeHighlightNode,
    LinkNode,
    AutoLinkNode,
    ListNode,
    ListItemNode,
    TableNode,
    TableRowNode,
    TableCellNode,
  ],
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
