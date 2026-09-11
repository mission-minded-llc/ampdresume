import { Box, Typography, useTheme } from "@mui/material";
import { User } from "@/types";
import { DavidsSectionTitle } from "./DavidsSectionTitle";

interface SummaryProps {
  user?: User;
}

export const Summary = ({ user }: SummaryProps) => {
  const theme = useTheme();

  if (!user?.summary || !user.summary.trim()) {
    return null;
  }

  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 0 } }}>
      <DavidsSectionTitle>Summary</DavidsSectionTitle>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.mode === "dark" ? "#94a3b8" : "#6b7280",
          lineHeight: 1.7,
          textAlign: "justify",
          maxWidth: "800px",
          margin: "0 auto",
          fontSize: "1rem",
        }}
      >
        {user.summary.length > 2500 ? `${user.summary.substring(0, 2500)}` : user.summary}
      </Typography>
    </Box>
  );
};
