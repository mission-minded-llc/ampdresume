import { Box, TextField } from "@mui/material";

import { DeleteButton } from "./DeleteButton";

interface ProjectItemProps {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  sx?: Record<string, unknown>;
}

export const ProjectItem = ({ value, onChange, onDelete, sx }: ProjectItemProps) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", ...sx }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          boxShadow: "none",
          bgcolor: "background.default",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            borderBottom: "1px solid #e0e0e0",
          },
        }}
      />
      <DeleteButton onClick={onDelete} size="small" sx={{ mt: 1 }} />
    </Box>
  );
};
