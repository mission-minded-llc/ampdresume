import { Box, Typography } from "@mui/material";

import React from "react";

export const Section = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mt: 2, pl: 3, pr: 3 }}>{children}</Box>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ mb: 1, fontSize: 18, fontWeight: "bold" }}>{children}</Typography>
);

export const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ pt: 1, pb: 1, fontSize: 16, fontWeight: "bold" }}>{children}</Typography>
);
