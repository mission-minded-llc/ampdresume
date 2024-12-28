import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";

import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";
import ImageIcon from "@mui/icons-material/Image";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const ImagePlugin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string>();
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [editor] = useLexicalComposerContext();

  const onAddImage = () => {
    let src = "";
    if (url) src = url;
    if (file) src = URL.createObjectURL(file);

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
        }}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Add Image</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setIsOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          X
        </IconButton>
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
