"use client";

import React from "react";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";

export const Header = () => {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: 0,
        left: 0,
        width: "100vw",
        boxShadow: "0 0 35px rgba(0, 0, 0, 0.1)",
        mb: "2em",
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
          <Typography component={Link} href="https://openresume.org">
            OpenResume
          </Typography>
        </Box>
        <Box component="nav">
          <Box
            sx={{
              display: "flex",
              gap: "1em",
            }}
          >
            <Typography component={Link} href="/account">
              Account
            </Typography>
          </Box>
        </Box>
        <ThemeAppearanceToggle />
      </Box>
    </Box>
  );
};
