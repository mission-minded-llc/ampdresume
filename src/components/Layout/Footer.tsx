"use client";

import React from "react";

import { BottomNavigation, Box } from "@mui/material";
import { getBaseUrl } from "@/util/url";
import { usePathname } from "next/navigation";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { MuiLink } from "../MuiLink";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";

export const Footer = () => {
  const baseUrl = getBaseUrl();
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const isLoggedIn = useIsLoggedIn();

  const isResumePage = pathname.startsWith("/r/");
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";

  if (isHomePage || isLoginPage) return null;

  return (
    <BottomNavigation
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        position: isResumePage ? "fixed" : "relative",
        zIndex: 2,
        bottom: 0,
        left: 0,
        width: isResumePage ? "100vw" : "auto",
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
          {isDesktop && !isLoggedIn ? `Create your free interactive resume at ` : null}
          <MuiLink href={baseUrl}>openresume.org</MuiLink>
        </Box>
        {isResumePage ? <ThemeAppearanceToggle /> : null}
      </Box>
    </BottomNavigation>
  );
};
