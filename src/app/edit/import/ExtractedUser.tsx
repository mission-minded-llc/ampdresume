import { Box, TextField, Typography } from "@mui/material";

import { useExtractedData } from "./ExtractedDataContext";

interface ExtractedUserProps {
  user: {
    name: string;
    email: string;
    location: string;
    title: string;
  };
}

export const ExtractedUser = ({ user }: ExtractedUserProps) => {
  const { updateUser } = useExtractedData();

  const handleChange =
    (field: keyof typeof user) => (event: React.ChangeEvent<HTMLInputElement>) => {
      updateUser({
        ...user,
        [field]: event.target.value,
      });
    };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Personal Information
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Name" value={user.name} onChange={handleChange("name")} fullWidth />
        <TextField label="Email" value={user.email} onChange={handleChange("email")} fullWidth />
        <TextField
          label="Location"
          value={user.location}
          onChange={handleChange("location")}
          fullWidth
        />
        <TextField label="Title" value={user.title} onChange={handleChange("title")} fullWidth />
      </Box>
    </Box>
  );
};
