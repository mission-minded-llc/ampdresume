"use client";

import React from "react";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { NavPrimary } from "./NavPrimary";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";

export const Header = () => {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  // Hide this header on the resume page.
  if (pathname.startsWith("/r/")) return null;

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
