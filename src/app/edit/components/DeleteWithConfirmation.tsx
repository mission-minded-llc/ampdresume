import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
} from "@mui/material";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Tooltip } from "@/components/Tooltip";

interface DeleteWithConfirmationProps {
  onConfirmDelete: () => void;
  buttonLabel?: string;
  tooltip?: string | React.ReactNode;
  dialogTitle?: string;
  dialogMessage?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
  enableDelete?: boolean;
  showCheckboxes?: boolean;
  checkboxItems?: string[];
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
  enableDelete = true,
  showCheckboxes = false,
  checkboxItems = [],
}: DeleteWithConfirmationProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checkboxItems.length).fill(false)
  );

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => {
    setConfirmOpen(false);
    setCheckedItems(new Array(checkboxItems.length).fill(false));
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    setConfirmOpen(false);
    onConfirmDelete();
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const allCheckboxesChecked = checkedItems.every((checked) => checked);
  const isConfirmEnabled =
    enableDelete && (!showCheckboxes || allCheckboxesChecked);

  // Reset checkboxes when dialog opens
  useEffect(() => {
    if (confirmOpen) {
      setCheckedItems(new Array(checkboxItems.length).fill(false));
    }
  }, [confirmOpen, checkboxItems.length]);

  return (
    <>
      {isDeleting ? <LoadingOverlay message="Deleting..." /> : null}
      <Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenConfirm}
          sx={{ marginRight: "auto", width: { xs: "100%", sm: "auto" } }}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
        {tooltip ? <Tooltip message={tooltip} /> : null}
      </Box>

      <Dialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        maxWidth="xs"
        fullWidth
      >
        <CustomDialogTitle closeHandler={handleCloseConfirm}>
          {dialogTitle}
        </CustomDialogTitle>
        <DialogContent>
          {showCheckboxes && checkboxItems.length > 0 ? (
            <Box>
              <DialogContentText sx={{ mb: 2 }}>
                {dialogMessage}
              </DialogContentText>
              {checkboxItems.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={checkedItems[index]}
                      onChange={() => handleCheckboxChange(index)}
                      color="secondary"
                    />
                  }
                  label={item}
                  sx={{ display: "block", mb: 1 }}
                />
              ))}
            </Box>
          ) : (
            <DialogContentText>{dialogMessage}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleCloseConfirm} color="primary">
            {cancelLabel}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            autoFocus
            disabled={!isConfirmEnabled}
          >
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
