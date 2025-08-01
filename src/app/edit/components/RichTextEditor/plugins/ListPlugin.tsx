import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { IconButton } from "@mui/material";

interface ListPluginProps {
  blockType: string;
}

export const ListPlugin = ({ blockType }: ListPluginProps) => {
  const [editor] = useLexicalComposerContext();

  const getSelectedButtonColor = (isSelected: boolean) => (isSelected ? "secondary" : "default");

  return (
    <>
      <IconButton
        aria-label="Add unordered list"
        onClick={() => {
          editor.update(() => {
            if (blockType === "ul") {
              editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            } else {
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            }
          });
        }}
        color={getSelectedButtonColor(blockType === "ul")}
      >
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton
        aria-label="Add ordered list"
        onClick={() => {
          editor.update(() => {
            if (blockType === "ol") {
              editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            } else {
              editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            }
          });
        }}
        color={getSelectedButtonColor(blockType === "ol")}
      >
        <FormatListNumberedIcon />
      </IconButton>
    </>
  );
};
