// Thank you: https://www.youtube.com/watch?v=XI6nufqMSek

import "./editor.css";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, EditorThemeClasses, LexicalEditor } from "lexical";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { AutoLinkPlugin, createLinkMatcherWithRegExp } from "@lexical/react/LexicalAutoLinkPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { URL_REGEX, validateUrl } from "@/util/url";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { Box } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EMAIL_REGEX } from "@/util/email";
import { HeadingNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ImageNode } from "./nodes/ImageNode";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import React from "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { YouTubeNode } from "./nodes/YouTubeNode";
import { css } from "@emotion/css";

export const editorTheme: EditorThemeClasses = {
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
  link: "editorLink",
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

export const supportedEditorNodes = [
  HeadingNode,
  ImageNode,
  YouTubeNode,
  CodeNode,
  CodeHighlightNode,
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
