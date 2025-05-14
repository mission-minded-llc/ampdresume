import { Box, TextField } from "@mui/material";
import { memo, useState } from "react";

import { Project } from "./types";

interface ProjectFieldProps {
  project: Project;
  companyIndex: number;
  positionIndex: number;
  projectIndex: number;
  onFieldChange: (
    companyIndex: number,
    positionIndex: number,
    projectIndex: number,
    field: string,
    value: string,
  ) => void;
}

export const ProjectField = memo(
  ({ project, companyIndex, positionIndex, projectIndex, onFieldChange }: ProjectFieldProps) => {
    const [localValue, setLocalValue] = useState(project.name || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      if (localValue !== project.name) {
        onFieldChange(companyIndex, positionIndex, projectIndex, "name", localValue);
      }
    };

    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
        <TextField
          fullWidth
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
          sx={{
            boxShadow: "none",
            bgcolor: "background.default",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              borderBottom: "1px solid #e0e0e0",
            },
          }}
        />
      </Box>
    );
  },
);

ProjectField.displayName = "ProjectField";
