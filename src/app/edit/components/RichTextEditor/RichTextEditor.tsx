// Thank you: https://www.youtube.com/watch?v=XI6nufqMSek

import "./editor.css";

import { css } from "@emotion/css";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkPlugin, createLinkMatcherWithRegExp } from "@lexical/react/LexicalAutoLinkPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { Box } from "@mui/material";
import { $getRoot, EditorThemeClasses, LexicalEditor } from "lexical";
import React from "react";

import { EMAIL_REGEX } from "@/util/email";
import { URL_REGEX, validateUrl } from "@/util/url";

import { ImageNode } from "./nodes/ImageNode";
import { YouTubeNode } from "./nodes/YouTubeNode";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";

export const editorTheme: EditorThemeClasses = {
  text: {
    bold: css({ fontWeight: "bold" }),
    italic: css({ fontStyle: "italic" }),
    underline: css({ textDecoration: "underline" }),
    superscript: css({ verticalAlign: "super" }),
    subscript: css({ verticalAlign: "sub" }),
  },
  table: css({ marginTop: "4px" }),
  tableCell: css({ border: "1px solid #bbb", paddingLeft: "6px", minWidth: "100px" }),
  tableCellHeader: css({}),
  link: "editorLink",
};

export const supportedEditorNodes = [
  HeadingNode,
  ImageNode,
  YouTubeNode,
  LinkNode,
  AutoLinkNode,
  ListNode,
  ListItemNode,
  TableNode,
  TableRowNode,
  TableCellNode,
];

interface RichTextEditorProps {
  value: string;
  editorStateRef: React.MutableRefObject<string | null>;
  placeholder?: string;
  name: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(function RichTextEditor({
  value,
  editorStateRef,
  placeholder = "Type here...",
  name,
}) {
  const initialConfig = {
    namespace: name,
    theme: editorTheme,
    onError: () => {},
    nodes: [...supportedEditorNodes],
    editorState: (editor: LexicalEditor) => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      nodes.forEach((node) => root.append(node));
    },
  };

  const MATCHERS = [
    createLinkMatcherWithRegExp(URL_REGEX, (text) => {
      return text;
    }),
    createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
      return `mailto:${text}`;
    }),
  ];

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
                  top: 23,
                  left: 10,
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
                  height: 500,
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
          <ListPlugin />
          {/**
           * Thank you:
           * https://javascript.plainenglish.io/lexical-how-to-use-link-plugins-d9a7734977a0
           */}
          <LinkPlugin validateUrl={validateUrl} />
          <AutoLinkPlugin matchers={MATCHERS} />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              editor.read(() => {
                editorStateRef.current = $generateHtmlFromNodes(editor);
              });
            }}
          />
        </Box>
      </LexicalComposer>
    </Box>
  );
});

RichTextEditor.displayName = "RichTextEditor";
