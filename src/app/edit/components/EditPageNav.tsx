"use client";

import { Box, Typography } from "@mui/material";

import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { usePathname } from "next/navigation";

export const EditPageNav = () => {
  const pathname = usePathname();

  const sections = [
    { title: "Profile", href: "/edit/profile" },
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
              backgroundColor: active ? theme.palette.action.selected : "transparent",
              px: 2,
              py: 1.5,
              border: 1,
              borderBottom: 4,
              borderColor: theme.palette.primary.main,
              borderBottomColor: active ? theme.palette.secondary.main : theme.palette.primary.main,
            };
          }}
        >
          <MuiLink href={section.href}>{section.title}</MuiLink>
        </Typography>
      ))}
    </Box>
  );
};
