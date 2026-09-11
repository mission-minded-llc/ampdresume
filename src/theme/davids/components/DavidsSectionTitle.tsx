import { Box, Typography } from "@mui/material";

/**
 * Centered section heading. Distinct from Classic's accent pill.
 */
export const DavidsSectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 1.5,
        mb: 2.5,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 750, letterSpacing: "-0.02em" }}>
        {children}
      </Typography>
    </Box>
  );
};
