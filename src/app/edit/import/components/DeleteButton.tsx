import { IconButton, IconButtonProps } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps extends Omit<IconButtonProps, "color"> {
  color?: "error" | "default" | "primary" | "secondary" | "info" | "success" | "warning";
}

export const DeleteButton = ({ color = "error", ...props }: DeleteButtonProps) => {
  return (
    <IconButton color={color} {...props}>
      <DeleteIcon />
    </IconButton>
  );
};
