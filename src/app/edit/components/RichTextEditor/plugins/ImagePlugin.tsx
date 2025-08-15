import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import {
  $insertNodes,
  REDO_COMMAND,
  SerializedEditorState,
  SerializedLexicalNode,
  UNDO_COMMAND,
} from "lexical";
import { UserAssetInput } from "@/app/edit/components/UserAssetInput";
import { deleteUserAsset, undeleteUserAsset } from "@/util/userAsset";
import { $createImageNode, SerializedImageNode } from "../nodes/ImageNode";

export const ImagePlugin = () => {
  const [url, setUrl] = useState("");
  const [editor] = useLexicalComposerContext();

  // Add an editor event listener for the UNDO_COMMAND and REDO_COMMAND commands,
  // to handle image removal/re-addition when undoing/redoing.
  useEffect(() => {
    const findRemovedImages = (
      beforeState: SerializedEditorState<SerializedLexicalNode>,
      afterState: SerializedEditorState<SerializedLexicalNode>,
    ) => {
      const beforeImages = findImagesInState(beforeState);
      const afterImages = findImagesInState(afterState);

      return beforeImages.filter((img) => !afterImages.includes(img));
    };

    const findAddedImages = (
      beforeState: SerializedEditorState<SerializedLexicalNode>,
      afterState: SerializedEditorState<SerializedLexicalNode>,
    ) => {
      const beforeImages = findImagesInState(beforeState);
      const afterImages = findImagesInState(afterState);
      return afterImages.filter((img) => !beforeImages.includes(img));
    };

    const findImagesInState = (state: SerializedEditorState<SerializedLexicalNode>) => {
      const images: string[] = [];

      const traverse = (node: SerializedLexicalNode & { children?: SerializedLexicalNode[] }) => {
        if (node.type === "image" && (node as SerializedImageNode).src) {
          images.push((node as SerializedImageNode).src);
        }
        if (node.children) {
          node.children.forEach(traverse);
        }
      };
      traverse(state.root);

      return images;
    };

    // Store the previous state before undo/redo.
    let prevEditorState = editor.getEditorState();

    const unregisterUndo = editor.registerCommand(
      UNDO_COMMAND,
      () => {
        const beforeState = prevEditorState.toJSON();

        // Hacky, but ensures the command is processed before capturing the updated state.
        setTimeout(() => {
          const afterState = editor.getEditorState().toJSON();
          const imagesRemoved = findRemovedImages(beforeState, afterState);
          const imagesAdded = findAddedImages(beforeState, afterState);

          if (imagesRemoved.length) imagesRemoved.forEach(deleteUserAsset);
          if (imagesAdded.length) imagesAdded.forEach(undeleteUserAsset);
        }, 0);

        return false; // Don't prevent default undo behavior
      },
      1,
    );

    const unregisterRedo = editor.registerCommand(
      REDO_COMMAND,
      () => {
        const beforeState = prevEditorState.toJSON();

        // Let the redo command proceed
        setTimeout(() => {
          const afterState = editor.getEditorState().toJSON();
          const imagesRemoved = findRemovedImages(beforeState, afterState);
          const imagesAdded = findAddedImages(beforeState, afterState);

          if (imagesRemoved.length) imagesRemoved.forEach(deleteUserAsset);
          if (imagesAdded.length) imagesAdded.forEach(undeleteUserAsset);
        }, 0);

        return false; // Don't prevent default redo behavior
      },
      1,
    );

    // Update the previous state whenever the editor changes
    const unregisterUpdate = editor.registerUpdateListener(({ editorState }) => {
      prevEditorState = editorState;
    });

    return () => {
      unregisterUndo();
      unregisterRedo();
      unregisterUpdate();
    };
  }, [editor]);

  useEffect(() => {
    if (!url) return;

    editor.update(() => {
      const node = $createImageNode({ src: url, altText: "Image" });
      $insertNodes([node]);

      setUrl("");
    });
  }, [url, setUrl, editor]);

  return <UserAssetInput url={url} setUrl={setUrl} />;
};
