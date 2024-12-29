import { $createTextNode, $getSelection, $isRangeSelection } from "lexical";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

import { $createCustomLinkNode } from "../nodes/CustomLinkNode";
import { $isLinkNode } from "@lexical/link";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";

// Function to validate and format URL
const formatUrl = (url: string) => {
  if (!url) return "";
  if (url.match(/^https?:\/\//)) {
    return url;
  }
  if (url.match(/^www\./)) {
    return `https://${url}`;
  }
  return `https://${url}`;
};

export const LinkCustomPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => {
    if (!editor.isEditable()) return;

    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      // Check if we're in a link already
      const node = selection.getNodes().find((n) => $isLinkNode(n));

      if (node) {
        // If in a link, remove it
        editor.update(() => {
          selection.removeText();
          selection.insertText(node.getTextContent());
        });
      } else {
        // Open dialog for manual link entry
        setUrl("");
        setError("");
        setIsOpen(true);
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setUrl("");
    setError("");
  };

  const handleSubmit = () => {
    const formattedUrl = formatUrl(url);

    // Basic URL validation
    try {
      new URL(formattedUrl);
      setError("");
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const selectedText = selection.getTextContent();
      const textNode = $createTextNode(selectedText || formattedUrl);
      const linkNode = $createCustomLinkNode({ url: formattedUrl });

      linkNode.append(textNode);
      selection.insertNodes([linkNode]);
    });

    handleClose();
  };

  return (
    <>
      <IconButton aria-label="Add link" onClick={handleOpen}>
        <AddLinkIcon />
      </IconButton>

      <LinkPlugin />

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Link</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              autoFocus
              fullWidth
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              error={!!error}
              helperText={error}
              placeholder="https://example.com"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
