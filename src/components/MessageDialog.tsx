import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const MessageDialog = ({
  open = false,
  onClose = () => {},
  title = "Message",
  message = "",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm = () => {},
  variant = "alert",
}: {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  variant?: "alert" | "confirm";
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
      data-testid="MessageDialog"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {variant === "confirm" && (
          <Button onClick={onClose} color="secondary">
            {cancelText}
          </Button>
        )}
        <Button onClick={onConfirm || onClose} color="primary" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
