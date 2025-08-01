import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Tooltip } from "@/components/Tooltip";

interface UpdateWithConfirmationProps {
  onConfirmUpdate: () => void;
  buttonLabel?: string;
  tooltip?: string | React.ReactNode;
  dialogTitle?: string;
  dialogMessage?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
}

export const UpdateWithConfirmation = ({
  onConfirmUpdate,
  buttonLabel = "Update",
  tooltip = "",
  dialogTitle = "Confirm Update",
  dialogMessage = "Are you sure you want to update?",
  confirmLabel = "Yes, Update",
  cancelLabel = "Cancel",
  disabled = false,
}: UpdateWithConfirmationProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleConfirmUpdate = () => {
    setIsUpdating(true);
    setConfirmOpen(false);
    onConfirmUpdate();
  };

  return (
    <>
      {isUpdating ? <LoadingOverlay message="Updating..." /> : null}
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenConfirm}
          sx={{ marginRight: "auto" }}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
        {tooltip ? <Tooltip message={tooltip} /> : null}
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
          <Button onClick={handleConfirmUpdate} color="primary" variant="contained" autoFocus>
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
