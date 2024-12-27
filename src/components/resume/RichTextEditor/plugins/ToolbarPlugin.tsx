import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { Box, Divider, IconButton, MenuItem, Select } from "@mui/material";
import { HEADINGS, LOW_PRIORIRTY, RICH_TEXT_OPTIONS, RichTextAction } from "./constants";
import { useEffect, useState } from "react";

import { $wrapNodes } from "@lexical/selection";
import { ColorPlugin } from "./ColorPlugin";
import { Icon } from "@iconify/react";
import { mergeRegister } from "@lexical/utils";
import { useKeyBindings } from "@/hooks/useKeyBindings";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [disableMap, setDisableMap] = useState<{ [id: string]: boolean }>({
    [RichTextAction.Undo]: true,
    [RichTextAction.Redo]: true,
  });
  const [selectionMap, setSelectionMap] = useState<{ [id: string]: boolean }>({});

  const updateToolbar = () => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const newSelectionMap = {
        [RichTextAction.Bold]: selection.hasFormat("bold"),
        [RichTextAction.Italics]: selection.hasFormat("italic"),
        [RichTextAction.Underline]: selection.hasFormat("underline"),
        [RichTextAction.Highlight]: selection.hasFormat("highlight"),
        [RichTextAction.Strikethrough]: selection.hasFormat("strikethrough"),
        [RichTextAction.Superscript]: selection.hasFormat("superscript"),
        [RichTextAction.Subscript]: selection.hasFormat("subscript"),
        [RichTextAction.Code]: selection.hasFormat("code"),
        // TODO: Figure this out:
        // [RichTextAction.LeftAlign]: selection.hasFormat("left"),
        // [RichTextAction.CenterAlign]: selection.hasFormat("center"),
        // [RichTextAction.RightAlign]: selection.hasFormat("right"),
        // [RichTextAction.JustifyAlign]: selection.hasFormat("justify"),
      };
      setSelectionMap(newSelectionMap);
    }
  };
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LOW_PRIORIRTY,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setDisableMap((prev) => ({ ...prev, [RichTextAction.Undo]: !payload }));
          return false;
        },
        LOW_PRIORIRTY,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setDisableMap((prev) => ({ ...prev, [RichTextAction.Redo]: !payload }));
          return false;
        },
        LOW_PRIORIRTY,
      ),
    );
  });

  const onAction = (id: RichTextAction) => {
    switch (id) {
      case RichTextAction.Bold:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        break;
      case RichTextAction.Italics:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        break;
      case RichTextAction.Underline:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        break;
      case RichTextAction.Highlight:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        break;
      case RichTextAction.Strikethrough:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        break;
      case RichTextAction.Superscript:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        break;
      case RichTextAction.Subscript:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
        break;
      case RichTextAction.Code:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        break;
      case RichTextAction.LeftAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        break;
      case RichTextAction.CenterAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        break;
      case RichTextAction.RightAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        break;
      case RichTextAction.JustifyAlign:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        break;
      case RichTextAction.Undo:
        editor.dispatchCommand(UNDO_COMMAND, undefined);
        break;
      case RichTextAction.Redo:
        editor.dispatchCommand(REDO_COMMAND, undefined);
        break;
    }
  };

  useKeyBindings({ onAction });

  const getSelectedButtonColor = (isSelected: boolean) => (isSelected ? "secondary" : "default");

  const updateHeading = (heading: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(heading));
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        margin: "0 0 8px",
      }}
    >
      <Select
        onChange={(e) => {
          updateHeading(e.target.value as HeadingTagType);
        }}
        value="h1"
      >
        {HEADINGS.map((heading) => (
          <MenuItem key={heading} value={heading}>
            {heading}
          </MenuItem>
        ))}
      </Select>
      {RICH_TEXT_OPTIONS.map(({ id, icon, label }, index) =>
        id === RichTextAction.Divider ? (
          <Divider orientation="vertical" key={`divider-${index}`} flexItem />
        ) : (
          <IconButton
            key={id}
            aria-label={label}
            onClick={() => onAction(id)}
            sx={{
              borderRadius: 0,
            }}
            disabled={disableMap[id]}
            color={getSelectedButtonColor(selectionMap[id])}
          >
            {icon ? <Icon icon={icon} width="20" height="20" /> : label}
          </IconButton>
        ),
      )}
      <ColorPlugin />
    </Box>
  );
};
