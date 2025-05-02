import { Box, TextField, Typography } from "@mui/material";

interface ExtractedUserProps {
  user: {
    name: string;
    email: string;
    location: string;
    title: string;
  } | null;
}

export const ExtractedUser = ({ user }: ExtractedUserProps) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Basic Info
      </Typography>
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          "&:hover": {
            bgcolor: "action.hover",
          },
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <TextField fullWidth label="Display Email" value={user?.email || ""} sx={{ mb: 2 }} />
        <TextField fullWidth label="Location" value={user?.location || ""} sx={{ mb: 2 }} />
      </Box>
    </Box>
  );
};
