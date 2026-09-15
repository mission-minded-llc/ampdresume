"use client";

import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const TIPS = [
  {
    icon: "fluent-color:link-16",
    title: "Claim a clean URL",
    body: "Set your profile URL name first. That's how you share ampdresume.com/r/your-name.",
  },
  {
    icon: "fluent-color:data-pie-20",
    title: "Tell the story behind skills",
    body: "Skills with a short write-up get a green outline. Reviewers can tap them on your live page.",
  },
  {
    icon: "fluent-color:data-bar-vertical-ascending-16",
    title: "Lead with outcomes in projects",
    body: "Treat each project as a bullet: what changed, for whom, and by how much.",
  },
  {
    icon: "fluent-color:re-order-dots-vertical-16",
    title: "Put the strongest work first",
    body: "Drag projects to reorder them so the first things people expand are your best examples.",
  },
  {
    icon: "fluent-color:code-16",
    title: "Feature portfolio pieces",
    body: "Use Featured Projects for work with links — GitHub, demos, or write-ups.",
  },
  {
    icon: "fluent-color:person-16",
    title: "Preview before you share",
    body: "Open View Resume to check the live page, switch themes, and download a PDF.",
  },
  {
    icon: "fluent-color:learning-app-24",
    title: "Replay this tour anytime",
    body: "Restart it from the menu (Account → Restart tutorial) or from your profile page.",
  },
];

export const TipsSlide = () => (
  <Box data-testid="OnboardingTips">
    <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
      A few habits that make Amp'd Resume work best.
    </Typography>
    <List disablePadding>
      {TIPS.map((tip) => (
        <ListItem key={tip.title} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
          <ListItemIcon sx={{ minWidth: 44, mt: 0.5 }}>
            <Icon icon={tip.icon} width={28} height={28} />
          </ListItemIcon>
          <ListItemText primary={tip.title} secondary={tip.body} />
        </ListItem>
      ))}
    </List>
  </Box>
);
