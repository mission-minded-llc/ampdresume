import { Box, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";

import { useExtractedData } from "./ExtractedDataContext";

interface ExtractedUserProps {
  user: {
    name: string;
    displayEmail: string;
    location: string;
    title: string;
  };
}

const UserField = memo(
  ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      if (localValue !== value) {
        onChange(localValue);
      }
    };

    return (
      <TextField
        label={label}
        name={label.toLowerCase().replace(/\s+/g, "-")}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
      />
    );
  },
);
UserField.displayName = "UserField";

export const ExtractedUser = ({ user }: ExtractedUserProps) => {
  const { updateUser } = useExtractedData();

  const handleFieldChange = (field: keyof typeof user) => (value: string) => {
    updateUser({
      ...user,
      [field]: value,
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Personal Information
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
        }}
      >
        <UserField label="Name" value={user.name} onChange={handleFieldChange("name")} />
        <UserField
          label="Display Email"
          value={user.displayEmail}
          onChange={handleFieldChange("displayEmail")}
        />
        <UserField
          label="Location"
          value={user.location}
          onChange={handleFieldChange("location")}
        />
        <UserField label="Title" value={user.title} onChange={handleFieldChange("title")} />
      </Box>
    </Box>
  );
};
