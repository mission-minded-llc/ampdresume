import React from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

export const LoadingOverlay = ({ open = false, message = "Loading...", zIndex = 9999 }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: zIndex,
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
      open={open}
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
