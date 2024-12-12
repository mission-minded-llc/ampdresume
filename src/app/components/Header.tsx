"use client";

import React from "react";
import { Box } from "@mui/material";
import { NavPrimary } from "./NavPrimary";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsResumePage } from "@/hooks/useIsResumePage";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";

export const Header = () => {
  const isDesktop = useIsDesktop();
  const isResumePage = useIsResumePage();

  // Hide this header on the resume page.
  if (isResumePage) return null;

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "transparent",
        position: "sticky",
        zIndex: 9,
        top: 0,
        left: 0,
        width: "100vw",
        mb: "2em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: isDesktop ? 2 : 0,
      }}
    >
      <NavPrimary />
      {isDesktop ? <ThemeAppearanceToggle /> : null}
    </Box>
  );
};
