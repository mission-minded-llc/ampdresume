import { memo, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ParsedResumeData } from "./types";

/**
 * The component for the user field.
 */
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
        sx={{
          "& .MuiInputBase-input": { fontSize: "1rem" },
          "& .MuiInputLabel-root": { fontSize: "1rem" },
        }}
      />
    );
  },
);
UserField.displayName = "UserField";

/**
 * The component for the user information page.
 */
export const ExtractedUser = ({
  user,
  setUser,
}: {
  user: ParsedResumeData["user"];
  setUser: React.Dispatch<React.SetStateAction<ParsedResumeData["user"] | null>>;
}) => {
  const handleFieldChange = (field: keyof typeof user) => (value: string) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  return (
    <Box sx={{ mb: { xs: 0, sm: 4 } }}>
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 1, sm: 2 },
          padding: { xs: 1, sm: 0 },
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      >
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
