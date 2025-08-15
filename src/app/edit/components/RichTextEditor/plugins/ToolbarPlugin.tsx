import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $isHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $wrapNodes } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { useEffect, useState } from "react";
import { Box, Divider, IconButton, MenuItem, Select } from "@mui/material";
import { Icon } from "@iconify/react";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_HIGH,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  KEY_BACKSPACE_COMMAND,
  LexicalNode,
  RangeSelection,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { deleteUserAsset } from "@/util/userAsset";
import { ImageNode } from "../nodes/ImageNode";
import { YouTubeNode } from "../nodes/YouTubeNode";
import { useKeyBindings } from "../useKeyBindings";
import { ColorPlugin } from "./ColorPlugin";
import { HEADINGS, LOW_PRIORIRTY, RICH_TEXT_OPTIONS, RichTextAction } from "./constants";
import { ImagePlugin } from "./ImagePlugin";
import { ListPlugin } from "./ListPlugin";
import { TablePlugin } from "./TablePlugin";
import YoutubePlugin from "./YouTubePlugin";

const $isCustomImageNode = (node: LexicalNode): boolean => node instanceof ImageNode;

const $isCustomNode = (node: LexicalNode): boolean =>
  node instanceof YouTubeNode || $isCustomImageNode(node);

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [disableMap, setDisableMap] = useState<{ [id: string]: boolean }>({
    [RichTextAction.Undo]: true,
    [RichTextAction.Redo]: true,
  });
  const [selectionMap, setSelectionMap] = useState<{ [id: string]: boolean }>({});
  const [blockType, setBlockType] = useState("paragraph");

  const updateToolbarSelectionText = (selection: RangeSelection) => {
    const newSelectionMap = {
      [RichTextAction.Bold]: selection.hasFormat("bold"),
      [RichTextAction.Italics]: selection.hasFormat("italic"),
      [RichTextAction.Underline]: selection.hasFormat("underline"),
      [RichTextAction.Superscript]: selection.hasFormat("superscript"),
      [RichTextAction.Subscript]: selection.hasFormat("subscript"),
      // [RichTextAction.LeftAlign]: selection.hasFormat("left"),
      // [RichTextAction.CenterAlign]: selection.hasFormat("center"),
      // [RichTextAction.RightAlign]: selection.hasFormat("right"),
      // [RichTextAction.JustifyAlign]: selection.hasFormat("justify"),
    };
    setSelectionMap(newSelectionMap);
  };

  const updateToolbarSelectionList = (selection: RangeSelection) => {
    const anchorNode = selection.anchor.getNode();
    const element =
      anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow();
    const elementKey = element.getKey();
    const elementDOM = editor.getElementByKey(elementKey);

    if (!elementDOM) return;

    if ($isListNode(element)) {
      const parentList = $getNearestNodeOfType(anchorNode, ListNode);
      const type = parentList ? parentList.getTag() : element.getTag();
      setBlockType(type);
    } else {
      const type = $isHeadingNode(element) ? element.getTag() : element.getType();
      setBlockType(type);
    }
  };

  const updateToolbar = () => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) return;

    updateToolbarSelectionText(selection);
    updateToolbarSelectionList(selection);
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
          setDisableMap((prev) => ({
            ...prev,
            [RichTextAction.Undo]: !payload,
          }));
          return false;
        },
        LOW_PRIORIRTY,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setDisableMap((prev) => ({
            ...prev,
            [RichTextAction.Redo]: !payload,
          }));
          return false;
        },
        LOW_PRIORIRTY,
      ),

      // Handles deleting custom nodes.
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = selection.getNodes()[0];
            if (node && $isCustomNode(node)) {
              if ($isCustomImageNode(node)) {
                const src = (node as ImageNode).getSrc();
                deleteUserAsset(src);
              }

              const parent = node.getParent();
              if (parent) {
                parent.remove();
                return true;
              }
            }
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH,
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
      case RichTextAction.Superscript:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        break;
      case RichTextAction.Subscript:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
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

  const selectedHeadingValue =
    blockType === "paragraph" ? "h1" : HEADINGS.includes(blockType) ? blockType : "h1";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 1,
        margin: "0 0 8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 0.3 },
          width: "100%",
          alignItems: "center",
        }}
      >
        <Select
          onChange={(e) => {
            updateHeading(e.target.value as HeadingTagType);
          }}
          value={selectedHeadingValue}
          sx={{ p: 0 }}
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
                padding: { xs: 0.5, sm: 1 },
              }}
              disabled={disableMap[id]}
              color={getSelectedButtonColor(selectionMap[id])}
            >
              {icon ? <Icon icon={icon} width="20" height="20" /> : label}
            </IconButton>
          ),
        )}
        <ColorPlugin />
        <ListPlugin blockType={blockType} />
        <TablePlugin />
        <ImagePlugin />
        <YoutubePlugin />
      </Box>
    </Box>
  );
};
