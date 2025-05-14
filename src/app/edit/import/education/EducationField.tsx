import { memo, useState } from "react";

import { EducationFieldProps } from "./types";
import { TextField } from "@mui/material";

export const EducationField = memo(({ label, value, onChange }: EducationFieldProps) => {
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
      fullWidth
      label={label}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      sx={{ mb: 1 }}
    />
  );
});

EducationField.displayName = "EducationField";
