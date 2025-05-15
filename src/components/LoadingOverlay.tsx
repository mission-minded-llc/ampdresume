import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

import React from "react";

interface LoadingOverlayProps {
  open?: boolean;
  message?: string;
  zIndex?: number;
}

export const LoadingOverlay = ({
  open = false,
  message = "Loading...",
  zIndex = 9999999999,
}: LoadingOverlayProps) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: zIndex,
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
      open={open}
      data-testid="LoadingOverlay"
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CircularProgress color="inherit" />
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            color: "white",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
