import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelectionStyleValueForProperty, $patchStyleText } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from "lexical";
import { useEffect, useState } from "react";

import { ColorPicker } from "../ColorPicker";


import { LOW_PRIORIRTY } from "./constants";


export const ColorPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [{ color, bgColor }, setColors] = useState({ color: "#000", bgColor: "#fff" });

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const color = $getSelectionStyleValueForProperty(selection, "color", "#000");
      const bgColor = $getSelectionStyleValueForProperty(selection, "background", "#fff");
      setColors({ color, bgColor });
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
    );
  }, [editor]);

  const updateColor = ({
    property,
    color,
  }: {
    property: "background" | "color";
    color: string;
  }) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) $patchStyleText(selection, { [property]: color });
    });
  };

  return (
    <>
      <ColorPicker
        color={color}
        onChange={(color) => {
          updateColor({ property: "color", color });
        }}
        icon={<TypeSpecimenIcon />}
      />
      <ColorPicker
        color={bgColor}
        onChange={(color) => {
          updateColor({ property: "background", color });
        }}
        icon={<FormatColorFillIcon />}
      />
    </>
  );
};
