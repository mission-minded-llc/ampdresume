import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import ImageIcon from "@mui/icons-material/Image";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MAX_USER_IMAGE_SIZE } from "@/constants";
import { uploadUserAsset } from "@/util/userAsset";

export const UserAssetInput = ({
  url,
  setUrl,
  buttonType = "icon",
}: {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  buttonType?: "icon" | "button";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    if (file.size > MAX_USER_IMAGE_SIZE) {
      setError("File exceeds 1MB limit.");
      return;
    }
  }, [file]);

  const handleUpload = async () => {
    if (isUploading) return;

    if (url) {
      setIsOpen(false);
      return;
    }

    setIsUploading(true);

    if (file) {
      try {
        const result = await uploadUserAsset(file);

        if (result.error) {
          setError(result.error);
          setIsUploading(false);
          return;
        }

        setUrl(result?.url || "");

        setIsUploading(false);
        setFile(undefined);
        setIsOpen(false);
      } catch (error) {
        setError(`Upload failed: ${(error as Error).message}`);
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <LoadingOverlay open={isUploading} message="Uploading Image..." />
      {buttonType === "icon" ? (
        <IconButton
          aria-label="Add Image"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <ImageIcon />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          startIcon={<ImageIcon />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Image
        </Button>
      )}
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
              {file ? file.name : "Select Image"}
            </Button>
            <Button
              onClick={handleUpload}
              disabled={(!url && !file) || isUploading}
              variant="contained"
            >
              Add Image
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
