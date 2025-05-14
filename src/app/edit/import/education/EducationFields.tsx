import { Box, IconButton } from "@mui/material";
import { memo, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { EducationDateField } from "./EducationDateField";
import { EducationField } from "./EducationField";
import { EducationFieldsProps } from "./types";

export const EducationFields = memo(
  ({ education, index, onFieldChange, onDateChange, onDelete }: EducationFieldsProps) => {
    const [dateError, setDateError] = useState(false);

    useEffect(() => {
      setDateError(!education.dateAwarded);
    }, [education.dateAwarded]);

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <EducationField
              label="Institution"
              value={education.school || ""}
              onChange={(value) => onFieldChange(index, "school", value)}
            />
            <EducationField
              label="Degree"
              value={education.degree || ""}
              onChange={(value) => onFieldChange(index, "degree", value)}
            />
          </Box>
          <EducationDateField
            value={education.dateAwarded}
            onChange={(date) => onDateChange(index, date)}
            hasError={dateError}
          />
        </Box>
        <IconButton onClick={() => onDelete(index)} size="small" color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  },
);

EducationFields.displayName = "EducationFields";
