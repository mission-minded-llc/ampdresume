import { Typography } from "@mui/material";
import React from "react";

/**
 * The `CodeInline` component is used to render inline code snippets.
 */
export const CodeInline = ({ children }: { children: React.ReactNode }) => (
  <Typography
    component="code"
    sx={(theme) => ({
      padding: "0.2rem",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "4px",
      fontFamily: "monospace",
      overflowX: "auto",
    })}
  >
    {children}
  </Typography>
);
