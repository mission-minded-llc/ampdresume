import React from "react";
import { Box, Typography } from "@mui/material";

export const ResumeTitle = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={(theme) => ({
      margin: "40px 0 20px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        textAlign: "left",
        margin: "24px 0 12px",
      },
    })}
  >
    <Typography
      component="h2"
      variant="h5"
      sx={(theme) => ({
        fontWeight: 750,
        letterSpacing: "-0.02em",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.5rem",
        },
      })}
    >
      {children}
    </Typography>
    <Box
      sx={(theme) => ({
        width: 48,
        height: 4,
        borderRadius: 999,
        mt: 1.5,
        mx: "auto",
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down("sm")]: {
          mx: 0,
        },
      })}
    />
  </Box>
);
