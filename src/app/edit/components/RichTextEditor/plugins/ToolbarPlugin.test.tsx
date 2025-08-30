import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { render } from "@testing-library/react";
import { RICH_TEXT_OPTIONS } from "./constants";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { expect } from "@jest/globals";

const initialConfig = {
  namespace: "TestEditor",
  theme: {},
  onError: (error: Error) => {
    throw error;
  },
  nodes: [
    HeadingNode,
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
