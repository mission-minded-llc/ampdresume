"use client";

import { Box, Typography } from "@mui/material";

import { ACTION_NAVIGATE } from "next/dist/client/components/router-reducer/router-reducer-types";
import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { usePathname } from "next/navigation";

export const EditNav = () => {
  const pathname = usePathname();

  const sections = [
    { title: "Skills", href: "/edit/skills" },
    { title: "Work Experience", href: "/edit/experience" },
    { title: "Education", href: "/edit/education" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        mb: 4,
        borderBottom: 1,
      }}
    >
      {sections.map((section) => (
        <Typography
          key={section.title}
          sx={(theme) => {
            const active = pathname === section.href;

            return {
              cursor: "pointer",
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              backgroundColor: ACTION_NAVIGATE ? theme.palette.action.selected : "transparent",
              px: 2,
              py: 1.5,
              borderRight: 1,
              borderBottom: active ? 4 : 0,
              borderColor: active ? theme.palette.secondary.main : "transparent",
            };
          }}
        >
          <MuiLink href={section.href}>{section.title}</MuiLink>
        </Typography>
      ))}
    </Box>
  );
};
