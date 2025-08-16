import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Button, Dialog, DialogContent, IconButton, TextField } from "@mui/material";
import { $insertNodes } from "lexical";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { $createYouTubeNode } from "../nodes/YouTubeNode";

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
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          Embed YouTube Video
        </CustomDialogTitle>
        <DialogContent>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              zIndex: 100,
            }}
          >
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
