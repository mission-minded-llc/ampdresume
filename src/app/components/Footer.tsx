"use client";

import { BottomNavigation, Box } from "@mui/material";

import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { getBaseUrl } from "@/util/url";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { useIsResumePage } from "@/hooks/useIsResumePage";

export const Footer = () => {
  const baseUrl = getBaseUrl();
  const isDesktop = useIsDesktop();
  const isLoggedIn = useIsLoggedIn();
  const isResumePage = useIsResumePage();

  return (
    <BottomNavigation
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        position: isResumePage ? "fixed" : "relative",
        marginTop: "auto",
        zIndex: 2,
        bottom: 0,
        left: 0,
        width: "100%",
        boxShadow: "0 0 35px rgba(0, 0, 0, 0.1)",
      })}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.35em",
          }}
        >
          {isDesktop && !isLoggedIn ? "Create your free interactive resume at " : null}
          <MuiLink href={baseUrl}>openresume.org</MuiLink>
        </Box>
        {isResumePage ? <ThemeAppearanceToggle /> : null}
      </Box>
    </BottomNavigation>
  );
};
