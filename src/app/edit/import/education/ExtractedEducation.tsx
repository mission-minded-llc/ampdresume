import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Education } from "./types";
import { EducationFields } from "./EducationFields";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { AccordionSummaryContent } from "../../components/AccordionSummaryContent";

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
              data-testid={`education-accordion-${index}`}
            >
              <AccordionSummaryContent
                primary={edu.school || "Unnamed School"}
                secondary={edu.degree || undefined}
                dateRange={edu.dateAwarded ? dayjs(edu.dateAwarded).format("MMM YYYY") : ""}
              />
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
