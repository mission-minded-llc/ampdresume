import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="close"
    onClick={onClick}
    sx={(theme) => ({
      color: theme.palette.grey[500],
    })}
  >
    <CloseIcon />
  </IconButton>
);
