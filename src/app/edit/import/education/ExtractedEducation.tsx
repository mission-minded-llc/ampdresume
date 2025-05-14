import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { EducationFields } from "./EducationFields";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExtractedEducationProps } from "./types";
import dayjs from "dayjs";
import { useExtractedData } from "../ExtractedDataContext";

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

  // Check for any education entries with missing dateAwarded
  const hasDateErrors = education.some((edu) => !edu.dateAwarded);

  // Expand the first accordion with an error if there are any errors
  useEffect(() => {
    if (hasDateErrors) {
      const firstErrorIndex = education.findIndex((edu) => !edu.dateAwarded);
      if (firstErrorIndex !== -1) {
        setExpandedEducation(`education-${firstErrorIndex}`);
      }
    }
  }, [hasDateErrors, education]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Education
      </Typography>
      {education?.map((edu, index) => {
        const educationId = `education-${index}`;
        const isExpanded = expandedEducation === educationId;
        const hasError = !edu.dateAwarded;

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
                borderLeft: hasError ? "4px solid #d32f2f" : "none",
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
                  <span style={{ marginRight: 24, color: hasError ? "#d32f2f" : "inherit" }}>
                    {edu.dateAwarded ? dayjs(edu.dateAwarded).format("MMM YYYY") : "Required"}
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
