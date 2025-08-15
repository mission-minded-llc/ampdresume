import { memo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DeleteWithConfirmation } from "@/app/edit/components/DeleteWithConfirmation";
import { EducationDateField } from "./EducationDateField";
import { EducationField } from "./EducationField";
import { Education } from "./types";

export const EducationFields = memo(
  ({
    education,
    index,
    onFieldChange,
    onDateChange,
    onDelete,
  }: {
    education: Education;
    index: number;
    onFieldChange: (index: number, field: string, value: string) => void;
    onDateChange: (index: number, date: string) => void;
    onDelete: (index: number) => void;
  }) => {
    const [dateError, setDateError] = useState(false);

    useEffect(() => {
      setDateError(!education.dateAwarded);
    }, [education.dateAwarded]);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ mr: { xs: 0, sm: 2 }, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 2,
            }}
          >
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
          <DeleteWithConfirmation
            onConfirmDelete={() => onDelete(index)}
            buttonLabel="Delete Education"
            dialogTitle="Delete Education?"
            dialogMessage="Are you sure you want to delete this education? (No undo!)"
          />
        </Box>
      </Box>
    );
  },
);

EducationFields.displayName = "EducationFields";
