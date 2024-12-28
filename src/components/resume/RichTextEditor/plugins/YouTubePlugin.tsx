import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { $createYouTubeNode } from "../nodes/YouTubeNode";
import { $insertNodes } from "lexical";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function YoutubePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");

  const [editor] = useLexicalComposerContext();

  const extractYouTubeId = (url: string) => {
    const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

    return match && match?.[2]?.length === 11 ? match?.[2] : null;
  };

  const onEmbed = () => {
    if (!url) return;

    const id = extractYouTubeId(url);
    if (!id) return;

    editor.update(() => {
      const node = $createYouTubeNode({ id });
      $insertNodes([node]);
    });

    setURL("");
    setIsOpen(false);
  };

  const isValidYouTubeURL = (url: string) => {
    return !!extractYouTubeId(url);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Embed YouTube Video</DialogTitle>
        <DialogContent>
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
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, zIndex: 100 }}>
            <TextField
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="Add Youtube URL"
            />
            <Button variant="contained" onClick={onEmbed} disabled={!isValidYouTubeURL(url)}>
              Embed
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <IconButton onClick={() => setIsOpen(true)}>
        <YouTubeIcon />
      </IconButton>
    </>
  );
}
