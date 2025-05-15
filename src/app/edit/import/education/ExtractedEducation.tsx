import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Education } from "./types";
import { EducationFields } from "./EducationFields";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

export const ExtractedEducation = ({
  education,
  setEducation,
}: {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}) => {
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
      setEducation(updatedEducation);
    },
    [education, setEducation],
  );

  const handleDeleteEducation = useCallback(
    (index: number) => {
      const updatedEducation = education.filter((_, i) => i !== index);
      setEducation(updatedEducation);
    },
    [education, setEducation],
  );

  const handleFieldChange = useCallback(
    (index: number, field: string, value: string) => {
      const updatedEducation = [...education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      setEducation(updatedEducation);
    },
    [education, setEducation],
  );

  // Check for any education entries with missing dateAwarded
  const hasDateErrors = education.some((edu) => !edu.dateAwarded);

  // Expand the first education entry with a missing dateAwarded
  useEffect(() => {
    if (hasDateErrors) {
      const index = education.findIndex((edu) => !edu.dateAwarded);
      if (index !== -1) {
        setExpandedEducation(`education-${index}`);
      }
    }
  }, [education, hasDateErrors]);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Education
      </Typography>
      {education.map((edu, index) => {
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
                <strong>{edu.school || "Unnamed School"}</strong>
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
                  <span>{edu.degree ? edu.degree : ""}</span>
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
