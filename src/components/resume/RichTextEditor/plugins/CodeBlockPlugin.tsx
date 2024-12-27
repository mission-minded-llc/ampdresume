import {
  $createCodeNode,
  $isCodeNode,
  getCodeLanguages,
  registerCodeHighlighting,
} from "@lexical/code";
import { $getNodeByKey, $getSelection, $isRangeSelection } from "lexical";
import { Box, IconButton, MenuItem, Select } from "@mui/material";

import { $wrapNodes } from "@lexical/selection";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface CodeBlockPluginProps {
  codeLanguage: string;
  blockType: string;
  selectedElementKey: string;
}

// Skip because these are duplicate acronyms. The fully-spelled-out version is
// already included in the list of languages.
const languagesToSkip = ["js", "md", "objc", "py", "txt", "ts"];
const availableLanguages = getCodeLanguages();
const languages = availableLanguages.filter((language) => !languagesToSkip.includes(language));

export const CodeBlockPlugin = ({
  codeLanguage,
  blockType,
  selectedElementKey,
}: CodeBlockPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    registerCodeHighlighting(editor);
  }, [editor]);

  const onAddCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createCodeNode());
      }
    });
  };

  const updateLanguage = (language: string) => {
    editor.update(() => {
      if (!selectedElementKey) return;

      const node = $getNodeByKey(selectedElementKey);

      if ($isCodeNode(node)) {
        node.setLanguage(language);
      }
    });
  };

  const displayLanguage = (language: string) => {
    const uppercaseLanguages = ["c", "css", "html", "rss", "sql", "ssml", "svg", "xml"];
    if (uppercaseLanguages.includes(language)) {
      return language.toUpperCase();
    }

    const languageMap: {
      [key: string]: string;
    } = {
      atom: "Atom",
      clike: "CLike",
      cpp: "C++",
      java: "Java",
      javascript: "JavaScript",
      markdown: "Markdown",
      markup: "Markup",
      mathml: "MathML",
      objectivec: "Objective-C",
      plain: "Plain",
      plaintext: "PlainText",
      powershell: "PowerShell",
      python: "Python",
      rust: "Rust",
      swift: "Swift",
      text: "Text",
      typescript: "TypeScript",
    };

    if (languageMap?.[language]) {
      return languageMap[language];
    }

    // Otherwise, capitalize first letter only.
    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton aria-label="Add code block" onClick={onAddCodeBlock}>
        <IntegrationInstructionsIcon />
      </IconButton>
      {blockType ? (
        <Select onChange={(e) => updateLanguage(e.target.value)} value={codeLanguage}>
          {languages.map((language) => (
            <MenuItem key={language} value={language} selected={language === codeLanguage}>
              {displayLanguage(language)}
            </MenuItem>
          ))}
        </Select>
      ) : null}
    </Box>
  );
};
