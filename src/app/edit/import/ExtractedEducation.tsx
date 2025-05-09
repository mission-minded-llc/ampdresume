import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useCallback, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useExtractedData } from "./ExtractedDataContext";

interface ExtractedEducationProps {
  education: {
    school: string;
    degree: string;
    dateAwarded: string;
  }[];
}

const EducationField = memo(
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
        fullWidth
        label={label}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ mb: 1 }}
      />
    );
  },
);
EducationField.displayName = "EducationField";

const EducationFields = memo(
  ({
    education,
    index,
    onFieldChange,
    onDateChange,
    onDelete,
  }: {
    education: ExtractedEducationProps["education"][0];
    index: number;
    onFieldChange: (index: number, field: string, value: string) => void;
    onDateChange: (index: number, date: string) => void;
    onDelete: (index: number) => void;
  }) => {
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
          <DatePicker
            label="Date Awarded"
            value={education.dateAwarded ? dayjs(education.dateAwarded) : null}
            onChange={(date) => onDateChange(index, date?.toISOString() || "")}
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

export const ExtractedEducation = ({ education }: ExtractedEducationProps) => {
  const { updateEducation } = useExtractedData();
  const [expandedEducation, setExpandedEducation] = useState<string | false>(false);

  const handleEducationChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedEducation(isExpanded ? panel : false);
    };

  const handleDateChange = useCallback(
    (index: number, date: string) => {
      const updatedEducation = [...education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        dateAwarded: date,
      };
      updateEducation(updatedEducation);
    },
    [education, updateEducation],
  );

  const handleDeleteEducation = useCallback(
    (index: number) => {
      const updatedEducation = education.filter((_, i) => i !== index);
      updateEducation(updatedEducation);
    },
    [education, updateEducation],
  );

  const handleFieldChange = useCallback(
    (index: number, field: string, value: string) => {
      const updatedEducation = [...education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      updateEducation(updatedEducation);
    },
    [education, updateEducation],
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Education
      </Typography>
      {education?.map((edu, index) => {
        const educationId = `education-${index}`;
        const isExpanded = expandedEducation === educationId;

        return (
          <Accordion
            key={educationId}
            expanded={isExpanded}
            onChange={handleEducationChange(educationId)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: "background.default",
                mb: isExpanded ? 2 : 0,
              }}
            >
              <Typography sx={{ display: "flex", width: "100%" }}>
                <strong>{edu.school || "Unnamed Institution"}</strong>
                <span
                  style={{
                    opacity: !isExpanded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    marginLeft: 24,
                  }}
                >
                  <span>{edu.degree || ""}</span>
                  <span style={{ marginRight: 24 }}>
                    {edu.dateAwarded ? dayjs(edu.dateAwarded).format("MMM YYYY") : ""}
                  </span>
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EducationFields
                education={edu}
                index={index}
                onFieldChange={handleFieldChange}
                onDateChange={handleDateChange}
                onDelete={handleDeleteEducation}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
