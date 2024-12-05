"use client";

import React from "react";

import { BottomNavigation, Box, Typography } from "@mui/material";
import Link from "next/link";
import { getBaseUrl } from "@/util/url";
import { usePathname } from "next/navigation";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { MuiLink } from "../MuiLink";

export const Footer = () => {
  const baseUrl = getBaseUrl();
  const pathname = usePathname();

  return (
    <BottomNavigation
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
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
          Create your free interactive resume at <MuiLink href={baseUrl}>openresume.org</MuiLink>
        </Box>
        {pathname.startsWith("/r/") ? <ThemeAppearanceToggle /> : null}
      </Box>
    </BottomNavigation>
  );
};
