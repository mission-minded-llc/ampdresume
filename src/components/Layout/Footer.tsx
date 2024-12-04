"use client";

import React, { useContext } from "react";

import { BottomNavigation, Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ThemeAppearanceContext } from "@/context/ThemeContext";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";

export const Footer = () => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

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
          Create your free resume at{" "}
          <Typography component={Link} href="https://openresume.org">
            openresume.org
          </Typography>
        </Box>
        <ThemeAppearanceToggle />
      </Box>
    </BottomNavigation>
  );
};
