// Thank you: https://www.youtube.com/watch?v=XI6nufqMSek

import "./editor.css";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import React, { useMemo } from "react";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { Box } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { CustomOnChangePlugin } from "./plugins/CustomOnChangePlugin";
import { EditorThemeClasses } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ImageNode } from "./nodes/ImageNode";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { YouTubeNode } from "./nodes/YouTubeNode";
import { css } from "@emotion/css";

const theme: EditorThemeClasses = {
  text: {
    bold: css({ fontWeight: "bold" }),
    italic: css({ fontStyle: "italic" }),
    underline: css({ textDecoration: "underline" }),
    strikethrough: css({ textDecoration: "line-through" }),
    underlineStrikethrough: css({ textDecoration: "underline line-through" }),
    highlight: css({ backgroundColor: "#ff0" }),
    superscript: css({ verticalAlign: "super" }),
    subscript: css({ verticalAlign: "sub" }),
    code: css({ fontFamily: "monospace", padding: 4 }),
  },
  table: css({ marginTop: "4px" }),
  tableCell: css({ border: "1px solid #bbb", paddingLeft: "6px", minWidth: "100px" }),
  tableCellHeader: css({}),
  code: "editorCode",
  codeHighlight: {
    atrule: "editorTokenAttr",
    attr: "editorTokenAttr",
    boolean: "editorTokenProperty",
    builtin: "editorTokenSelector",
    cdata: "editorTokenComment",
    char: "editorTokenSelector",
    class: "editorTokenFunction", // class constructor
    comment: "editorTokenComment", // comment
    constant: "editorTokenProperty",
    deleted: "editorTokenProperty",
    doctype: "editorTokenComment",
    entity: "editorTokenOperator",
    function: "editorTokenFunction", // es5 function
    important: "editorTokenVariable",
    inserted: "editorTokenSelector",
    keyword: "editorTokenAttr", // variable keyword like const/let
    namespace: "editorTokenVariable",
    number: "editorTokenProperty", // number values
    operator: "editorTokenOperator", // operator like +/*-
    prolog: "editorTokenComment",
    property: "editorTokenProperty",
    punctuation: "editorTokenPunctuation", // brackets of array, object
    regex: "editorTokenVariable",
    selector: "editorTokenSelector",
    string: "editorTokenSelector", // string values
    symbol: "editorTokenProperty",
    tag: "editorTokenProperty",
    url: "editorTokenOperator",
    variable: "editorTokenVariable",
  },
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(function RichTextEditor({
  value,
  onChange,
  placeholder = "Type here...",
  name,
}) {
  const initialConfig = useMemo(
    () => ({
      namespace: name,
      theme,
      onError: () => {},
      nodes: [
        HeadingNode,
        ImageNode,
        YouTubeNode,
        CodeNode,
        CodeHighlightNode,
        ListNode,
        ListItemNode,
        TableNode,
        TableRowNode,
        TableCellNode,
      ],
    }),
    [name],
  );

  return (
    <Box>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <Box className={css({ position: "relative" })}>
          <RichTextPlugin
            placeholder={
              <Box
                className={css({
                  position: "absolute",
                  color: "#888",
                  top: 8,
                  left: 8,
                  fontSize: 14,
                })}
              >
                {placeholder}
              </Box>
            }
            contentEditable={
              <ContentEditable
                className={css({
                  position: "relative",
                  height: 240,
                  fontSize: 14,
                  padding: 8,
                  outline: "none",
                  overflow: "auto",
                  border: "1px solid black",
                  borderRadius: 4,
                  "&:focus": {
                    outline: "none",
                    border: "1px solid #000",
                  },
                })}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <CustomOnChangePlugin value={value} onChange={onChange} />
          <ListPlugin />
        </Box>
      </LexicalComposer>
    </Box>
  );
});

RichTextEditor.displayName = "RichTextEditor";
