import { Box, TextField } from "@mui/material";
import { memo, useState } from "react";

import { Project } from "./types";

/**
 * The component for the project field.
 *
 * @param project - The project to display.
 * @param companyIndex - The index of the company.
 * @param positionIndex - The index of the position.
 * @param projectIndex - The index of the project.
 * @param onFieldChange - The function to call when the value changes.
 */
export const ProjectField = memo(
  ({
    project,
    companyIndex,
    positionIndex,
    projectIndex,
    onFieldChange,
  }: {
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
  }) => {
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
