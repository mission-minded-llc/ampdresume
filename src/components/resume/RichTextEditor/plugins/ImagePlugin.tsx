import { $createImageNode, SerializedImageNode } from "../nodes/ImageNode";
import {
  $insertNodes,
  REDO_COMMAND,
  SerializedEditorState,
  SerializedLexicalNode,
  UNDO_COMMAND,
} from "lexical";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { CustomDialogTitle } from "@/components/DialogTitle";
import ImageIcon from "@mui/icons-material/Image";
import { MAX_USER_IMAGE_SIZE } from "@/constants";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

/**
 * Helper function to manage images in the user's S3 folder.
 *
 * @param src the S3 URL of the image to manage
 * @param action the action to perform ('delete' or 'undelete')
 */
export const manageImage = async (src: string, action: "delete" | "undelete") => {
  try {
    const response = await fetch(`/api/user-asset/${action}`, {
      method: "POST",
      body: JSON.stringify({ src }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(`Error (${response.status}): ${error}`);
    }
  } catch (error) {
    throw new Error(`${action} failed: ${(error as Error).message}`);
  }
};

export const deleteImage = (src: string) => manageImage(src, "delete");
const undeleteImage = (src: string) => manageImage(src, "undelete");

export const ImagePlugin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

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

          if (imagesRemoved.length) imagesRemoved.forEach(deleteImage);
          if (imagesAdded.length) imagesAdded.forEach(undeleteImage);
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

          if (imagesRemoved.length) imagesRemoved.forEach(deleteImage);
          if (imagesAdded.length) imagesAdded.forEach(undeleteImage);
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
    if (!file) return;
    if (file.size > MAX_USER_IMAGE_SIZE) {
      setError("File exceeds 1MB limit.");
      return;
    }
  }, [file]);

  const onAddImage = async () => {
    let src = "";
    if (url) src = url;

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/user-asset/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const { error } = await response.json();
          setError(`Error (${response.status}): ${error}`);
          return;
        }

        const { url } = await response.json();
        src = url;
      } catch (error) {
        setError(`Upload failed: ${(error as Error).message}`);
      }
    }

    editor.update(() => {
      const node = $createImageNode({ src, altText: "Image" });

      $insertNodes([node]);

      setUrl("");
      setFile(undefined);
      setIsOpen(false);
    });
  };

  return (
    <>
      <IconButton
        aria-label="Add Image"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <ImageIcon />
      </IconButton>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) setFile(file);

          e.target.files = null;
          setError("");
        }}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>Add Image</CustomDialogTitle>
        <DialogContent
          sx={{
            width: "400px",
            maxWidth: "90vw",
          }}
        >
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, zIndex: 100 }}>
            <TextField
              label="URL"
              placeholder="Add Image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Typography sx={{ color: "error.main" }} variant="body2">
              {error}
            </Typography>
            <Button
              onClick={() => {
                inputRef.current?.click();
              }}
              variant="outlined"
            >
              {file ? file.name : "Upload Image"}
            </Button>
            <Button onClick={onAddImage} disabled={!url && !file} variant="contained">
              Add Image
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
