import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";
import { useEffect, useState } from "react";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface CustomOnChangePluginProps {
  value: string;
  onChange: (value: string) => void;
}

export const CustomOnChangePlugin = ({ value, onChange }: CustomOnChangePluginProps) => {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!value || !isFirstRender) return;

    setIsFirstRender(false);
    editor.update(() => {
      const currentHtml = $generateHtmlFromNodes(editor);

      if (currentHtml !== value) {
        $getRoot().clear();
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        $insertNodes(nodes);
      }
    });
  }, [editor, value, isFirstRender]);

  useEffect(() => {
    setIsFirstRender(true);
  }, [value]);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onChange($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};
