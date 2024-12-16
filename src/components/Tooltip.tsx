import { IconButton, Tooltip as MuiTooltip } from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const Tooltip = ({ message }: { message: string }) => {
  return (
    <MuiTooltip title={message} placement="right">
      <IconButton size="small" sx={{ ml: 1 }}>
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </MuiTooltip>
  );
};
