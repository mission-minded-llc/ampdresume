"use client";

import { BottomNavigation, Box, Typography } from "@mui/material";

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
        height: "auto",
        overflow: "auto",
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
          flexDirection: isDesktop ? "row" : "column",
          padding: "0.5em",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            pl: 2,
            gap: "0.35em",
          }}
        >
          {isDesktop && !isLoggedIn ? "Create your free interactive resume at " : null}
          <MuiLink href={baseUrl}>openresume.org</MuiLink>
          {isResumePage ? <ThemeAppearanceToggle /> : null}
        </Box>
        <Box>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            <MuiLink href="/about/privacy-policy">Privacy Policy</MuiLink> |{" "}
            <MuiLink href="/about/terms-of-service">Terms of Service</MuiLink>
            {isDesktop ? (
              <> | &copy; {new Date().getFullYear()} OpenResume. All rights reserved.</>
            ) : null}
          </Typography>
        </Box>
      </Box>
    </BottomNavigation>
  );
};
