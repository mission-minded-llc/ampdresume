"use client";

import { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { AccordionSummaryContent } from "@/app/edit/components/AccordionSummaryContent";
import { RichTextEditor } from "@/app/edit/components/RichTextEditor/RichTextEditor";
import { CompanyForm } from "@/app/edit/experience/CompanyForm";
import { PositionForm } from "@/app/edit/experience/PositionForm";
import { formatLongDate } from "@/lib/format";
import { DEMO_COMPANY, DEMO_PROJECT_HTML } from "../demoData";
import { DemoModeContext } from "../DemoModeContext";

/**
 * Work-experience editors with sample company, role, and project copy.
 * Saves are no-ops so the tour never writes to the user's resume.
 */
export const ExperienceDemo = ({ autoPlay = true }: { autoPlay?: boolean }) => {
  const [expanded, setExpanded] = useState(autoPlay);
  const editorStateRef = useRef<string | null>(DEMO_PROJECT_HTML);
  const company = DEMO_COMPANY;
  const position = company.positions?.[0];

  useEffect(() => {
    if (!autoPlay) return;
    setExpanded(true);
  }, [autoPlay]);

  return (
    <DemoModeContext.Provider value={true}>
      <Box data-testid="OnboardingExperienceDemo">
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          This is the real work-experience editor with sample data. Explore the fields — changes
          stay in the tutorial.
        </Typography>
        <Accordion expanded={expanded} onChange={(_, next) => setExpanded(next)} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: expanded ? "none" : "flex", width: "90%" }}>
              <AccordionSummaryContent
                primary={company.name}
                secondary={company.location}
                dateRange={`${formatLongDate(company.startDate)} to present`}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <CompanyForm company={company} handler={() => {}} />
            {position ? (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                  Role
                </Typography>
                <PositionForm position={position} handler={() => {}} />
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 700 }}>
                  Project write-up
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                  {position.projects?.[0]?.name}
                </Typography>
                <RichTextEditor
                  name="onboarding-project"
                  editorStateRef={editorStateRef}
                  value={DEMO_PROJECT_HTML}
                  placeholder="Describe the work..."
                />
              </Box>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </Box>
    </DemoModeContext.Provider>
  );
};
