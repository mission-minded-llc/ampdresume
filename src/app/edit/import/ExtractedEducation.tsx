import { Box, TextField, Typography } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { Education } from "@openresume/theme";
import dayjs from "dayjs";
import { useState } from "react";

interface ExtractedEducationProps {
  education: Education[];
}

export const ExtractedEducation = ({ education }: ExtractedEducationProps) => {
  const [localEducation, setLocalEducation] = useState<Education[]>(education);

  const handleDateChange = (index: number, date: string) => {
    const updatedEducation = [...localEducation];
    updatedEducation[index] = {
      ...updatedEducation[index],
      dateAwarded: date,
    };
    setLocalEducation(updatedEducation);
    // Note: You might want to add a mutation here to update the backend
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Education
      </Typography>
      {localEducation?.map((edu, index) => (
        <Box
          key={index}
          sx={{
            mb: 3,
            p: 2,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <TextField fullWidth label="Institution" value={edu.school || ""} sx={{ mb: 1 }} />
          <TextField fullWidth label="Degree" value={edu.degree || ""} sx={{ mb: 1 }} />
          <DatePicker
            label="Date Awarded"
            value={edu.dateAwarded ? dayjs(edu.dateAwarded) : null}
            onChange={(date) => handleDateChange(index, date?.toISOString() || "")}
          />
        </Box>
      ))}
    </Box>
  );
};
