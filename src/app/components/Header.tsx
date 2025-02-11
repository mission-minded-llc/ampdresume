"use client";

import { Box } from "@mui/material";
import { NavPrimary } from "./NavPrimary";
import React from "react";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export const Header = () => {
  const isDesktop = useIsDesktop();

  return (
    <Box
      component="header"
      sx={(theme) => ({
        backgroundColor: "transparent",
        position: "sticky",
        zIndex: 9,
        top: 0,
        left: 0,
        width: "100vw",
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: isDesktop ? 2 : 0,
        [theme.breakpoints.down("sm")]: {
          mb: 0,
          flexDirection: "row-reverse",
        },
      })}
    >
      <NavPrimary />
      {isDesktop ? <ThemeAppearanceToggle /> : null}
    </Box>
  );
};
