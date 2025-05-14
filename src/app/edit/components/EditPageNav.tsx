"use client";

import { Box, Typography } from "@mui/material";

import { MuiLink } from "@/components/MuiLink";
import React from "react";
import { usePathname } from "next/navigation";

export const EditPageNav = () => {
  const pathname = usePathname();

  const sections = [
    { title: "Profile", href: "/edit/profile" },
    { title: "Import", href: "/edit/import" },
    { title: "Skills", href: "/edit/skills" },
    { title: "Work Experience", href: "/edit/experience" },
    { title: "Education", href: "/edit/education" },
    { title: "AI Assist", href: "/edit/ai" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 4,
        borderBottom: 1,
      }}
    >
      {sections.map((section) => (
        <MuiLink href={section.href} key={section.title}>
          <Typography
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
                py: { xs: 1, sm: 1.5 },
                border: 1,
                borderBottom: { xs: 0, sm: 4 },
                borderColor: theme.palette.primary.main,
                borderBottomColor: active
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                textAlign: "center",
              };
            }}
          >
            {section.title}
          </Typography>
        </MuiLink>
      ))}
    </Box>
  );
};
