import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { CustomDialogTitle } from "@/components/DialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Tooltip } from "@/components/Tooltip";
import { useState } from "react";

interface DeleteWithConfirmationProps {
  onConfirmDelete: () => void;
  buttonLabel?: string;
  tooltip?: string;
  dialogTitle?: string;
  dialogMessage?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
}

export const DeleteWithConfirmation = ({
  onConfirmDelete,
  buttonLabel = "Delete",
  tooltip = "",
  dialogTitle = "Are you sure?",
  dialogMessage = "This cannot be undone!",
  confirmLabel = "Yes, Delete",
  cancelLabel = "Cancel",
  disabled = false,
}: DeleteWithConfirmationProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    setConfirmOpen(false);
    onConfirmDelete();
  };

  return (
    <>
      {isDeleting ? <LoadingOverlay message="Deleting..." /> : null}
      <Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenConfirm}
          sx={{ marginRight: "auto" }}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
        {tooltip.length > 0 ? <Tooltip message={tooltip} /> : null}
      </Box>

      <Dialog open={confirmOpen} onClose={handleCloseConfirm} maxWidth="xs" fullWidth>
        <CustomDialogTitle closeHandler={handleCloseConfirm}>{dialogTitle}</CustomDialogTitle>
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
