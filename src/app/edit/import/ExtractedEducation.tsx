import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useExtractedData } from "./ExtractedDataContext";
import { useState } from "react";

interface ExtractedEducationProps {
  education: {
    school: string;
    degree: string;
    dateAwarded: string;
  }[];
}

export const ExtractedEducation = ({ education }: ExtractedEducationProps) => {
  const { updateEducation } = useExtractedData();
  const [expandedEducation, setExpandedEducation] = useState<string | false>(false);

  const handleEducationChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedEducation(isExpanded ? panel : false);
    };

  const handleDateChange = (index: number, date: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      dateAwarded: date,
    };
    updateEducation(updatedEducation);
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    updateEducation(updatedEducation);
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    updateEducation(updatedEducation);
  };

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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1, mr: 2 }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Institution"
                      value={edu.school || ""}
                      onChange={(e) => handleFieldChange(index, "school", e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Degree"
                      value={edu.degree || ""}
                      onChange={(e) => handleFieldChange(index, "degree", e.target.value)}
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <DatePicker
                    label="Date Awarded"
                    value={edu.dateAwarded ? dayjs(edu.dateAwarded) : null}
                    onChange={(date) => handleDateChange(index, date?.toISOString() || "")}
                  />
                </Box>
                <IconButton onClick={() => handleDeleteEducation(index)} size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
