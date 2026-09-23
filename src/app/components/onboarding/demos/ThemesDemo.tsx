"use client";

import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";

const THEME_STEPS = [
  {
    icon: "fluent-color:paint-brush-16",
    title: "Live theme",
    body: "Claim a profile URL, then open View Resume. The Theme picker in the bottom-right corner previews looks; Save keeps it for visitors.",
  },
  {
    icon: "fluent-color:document-16",
    title: "PDF theme",
    body: "Open View PDF from your live resume. The PDF Theme picker is independent — choose a print-friendly layout without changing the public page.",
  },
];

/**
 * Explains how owners set the public web theme and the separate PDF theme.
 */
export const ThemesDemo = () => (
  <Box data-testid="OnboardingThemesDemo">
    <List disablePadding>
      {THEME_STEPS.map((step) => (
        <ListItem key={step.title} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
          <ListItemIcon sx={{ minWidth: 44, mt: 0.5, color: "inherit" }}>
            <Icon icon={step.icon} width={28} height={28} aria-hidden />
          </ListItemIcon>
          <ListItemText primary={step.title} secondary={step.body} />
        </ListItem>
      ))}
    </List>
  </Box>
);
