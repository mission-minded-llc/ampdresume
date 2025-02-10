import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { SyntheticEvent, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProjectItem } from "./ProjectItem";
import { ProjectWithSkills } from "@/graphql/getPositionsWithSkillsForProjects";
import { RichTextBlock } from "../RichTextBlock";

export const ProjectAccordion = ({ project }: { project: ProjectWithSkills }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (event: SyntheticEvent, isExpanded: boolean) => {
    const target = event.target as HTMLElement;
    const isButtonClick = target.closest(".MuiButton-root");
    const isDialogClick = target.closest(".MuiDialog-root");

    if (isButtonClick || isDialogClick) {
      setExpanded(true); // Ensure the accordion remains open.
      return;
    }

    setExpanded(isExpanded);
  };

  return (
    <Accordion
      slotProps={{ heading: { component: "h5" } }}
      onChange={handleAccordionChange}
      expanded={expanded}
      sx={{
        boxShadow: "none",
        padding: 0,
        mt: 0,
        mb: 0,
        backgroundColor: "transparent",
        borderTop: "2px solid transparent",
        borderBottom: "2px solid transparent",
        "&::before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: 0,
        },
        "& div.MuiButtonBase-root": {
          padding: 0,
        },
        "& .MuiAccordionSummary-expandIconWrapper": {
          position: "absolute",
          right: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          margin: "0 !important",
          "& .Mui-expanded": {
            margin: "0 !important",
          },
          ".MuiAccordionSummary-content": {
            margin: "0 !important",
          },
        }}
      >
        <ProjectItem project={project} />
      </AccordionSummary>
      <AccordionDetails
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.light,
          padding: "0.2rem 1rem",
          mt: 0,
          "@media screen and (max-width: $breakpoint_mobile)": {
            padding: "1rem !important",
          },
          textAlign: "left",
        })}
      >
        <RichTextBlock content={project?.description} />
      </AccordionDetails>
    </Accordion>
  );
};
