"use client";

import React, { useContext } from "react";

import { BottomNavigation, Box } from "@mui/material";
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
          <Icon
            icon="devicon:github"
            fontSize={23}
            color="light"
            style={{ filter: themeAppearance === "dark" ? "invert(1)" : "" }}
          />
          <Link href="https://github.com/missionmike/interactive-resume" target="_blank">
            <span>/missionmike/interactive-resume</span>
          </Link>
        </Box>
        <ThemeAppearanceToggle />
      </Box>
    </BottomNavigation>
  );
};
