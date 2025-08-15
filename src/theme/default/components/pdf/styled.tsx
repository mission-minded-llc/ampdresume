import React from "react";
import { Box, Typography } from "@mui/material";

export const fontSize = {
  body: 12,
  title: 16,
  subtitle: 14,
};

export const Section = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mt: 2 }}>{children}</Box>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ mb: 1, fontSize: fontSize.title, fontWeight: "bold" }}>{children}</Typography>
);

export const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold" }}>{children}</Typography>
);
