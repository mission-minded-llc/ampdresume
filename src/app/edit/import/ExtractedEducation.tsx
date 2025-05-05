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
import { Education } from "@openresume/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useState } from "react";

interface ExtractedEducationProps {
  education: Education[];
}

export const ExtractedEducation = ({ education }: ExtractedEducationProps) => {
  const [localEducation, setLocalEducation] = useState<Education[]>(education);
  const [expandedEducation, setExpandedEducation] = useState<string | false>(false);

  const handleEducationChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedEducation(isExpanded ? panel : false);
    };

  const handleDateChange = (index: number, date: string) => {
    const updatedEducation = [...localEducation];
    updatedEducation[index] = {
      ...updatedEducation[index],
      dateAwarded: date,
    };
    setLocalEducation(updatedEducation);
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducation = localEducation.filter((_, i) => i !== index);
    setLocalEducation(updatedEducation);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Education
      </Typography>
      {localEducation?.map((edu, index) => {
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
                      sx={{ mb: 1 }}
                    />
                    <TextField fullWidth label="Degree" value={edu.degree || ""} sx={{ mb: 1 }} />
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
