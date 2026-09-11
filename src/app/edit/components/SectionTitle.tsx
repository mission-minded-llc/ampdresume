import { Box, Typography } from "@mui/material";

export const SectionTitle = ({ title }: { title: string }) => (
  <Box sx={{ mb: 4, mt: 1 }}>
    <Typography variant="h5" component="h1" sx={{ fontWeight: 750, letterSpacing: "-0.02em" }}>
      {title}
    </Typography>
    <Box
      sx={{
        mt: 1.5,
        width: 56,
        height: 5,
        borderRadius: 999,
        background: "linear-gradient(90deg, #AE00FF, #FF8C28)",
      }}
    />
  </Box>
);
