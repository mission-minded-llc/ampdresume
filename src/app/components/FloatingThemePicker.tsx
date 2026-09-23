import { ReactNode } from "react";
import { Box } from "@mui/material";

/**
 * Compact owner-only control docked over a resume or PDF preview.
 * Uses a solid paper background so it stays readable on top of the page.
 */
export const FloatingThemePicker = ({ children }: { children: ReactNode }) => (
  <Box
    data-testid="owner-theme-picker"
    sx={{
      position: "fixed",
      bottom: 16,
      right: 16,
      width: 188,
      maxWidth: "calc(100vw - 32px)",
      zIndex: 1300,
      p: 1,
      borderRadius: 1.5,
      bgcolor: "background.paper",
      backgroundImage: "none",
      boxShadow: 6,
      border: 1,
      borderColor: "divider",
    }}
  >
    {children}
  </Box>
);
