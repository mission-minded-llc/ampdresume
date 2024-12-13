import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";

import { ProjectItem } from "./ProjectItem";
import { ProjectWithSkills } from "@/graphql/getPositions";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

export const ProjectAccordion = ({
  project,
  projectSkills,
}: {
  project: ProjectWithSkills;
  projectSkills: SkillForUserWithSkill[];
}) => {
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
        padding: "0",
        backgroundColor: "transparent",
        borderTop: "2px solid transparent",
        borderBottom: "2px solid transparent",
        "&::before": {
          display: "none",
        },
        "&.Mui-expanded": {
          borderTop: "2px solid #666",
          borderBottom: "2px solid #666",
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
        expandIcon={
          <Typography
            component="span"
            sx={{
              fontSize: "2rem",
              color: "white",
              transform: expanded ? "rotate(-90deg)" : "rotate(90deg)",
              transition: "transform 0.3s",
            }}
          >
            &lt;
          </Typography>
        }
      >
        <ProjectItem project={project} projectSkills={projectSkills} />
      </AccordionSummary>
      <AccordionDetails
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.light,
          padding: "2rem",
          "@media screen and (max-width: $breakpoint_mobile)": {
            padding: "1rem !important",
          },
        })}
      >
        {project.description}
      </AccordionDetails>
    </Accordion>
  );
};
