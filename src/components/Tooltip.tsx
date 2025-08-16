import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Tooltip as MuiTooltip } from "@mui/material";

export const Tooltip = ({ message }: { message: React.ReactNode }) => {
  return (
    <MuiTooltip title={message} placement="right">
      <IconButton size="small" sx={{ ml: 1 }}>
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </MuiTooltip>
  );
};
