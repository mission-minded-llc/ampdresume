import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useState } from "react";

interface DeleteWithConfirmationProps {
  onConfirmDelete: () => void;
  buttonLabel?: string;
  dialogTitle?: string;
  dialogMessage?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
}

export const DeleteWithConfirmation = ({
  onConfirmDelete,
  buttonLabel = "Delete",
  dialogTitle = "Are you sure?",
  dialogMessage = "This cannot be undone!",
  confirmLabel = "Yes, Delete",
  cancelLabel = "Cancel",
  disabled = false,
}: DeleteWithConfirmationProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    onConfirmDelete();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpenConfirm}
        sx={{ marginRight: "auto" }}
        disabled={disabled}
      >
        {buttonLabel}
      </Button>

      <Dialog open={confirmOpen} onClose={handleCloseConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleCloseConfirm} color="primary">
            {cancelLabel}
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
