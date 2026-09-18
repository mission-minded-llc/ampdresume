import { SyntheticEvent, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { Project } from "@/types";
import { getRetroPalette, MONO_FONT } from "../../styles";
import { ProjectItem } from "./ProjectItem";

/**
 * An expandable project. The chevron is a text glyph so it stays crisp at any zoom,
 * and MUI rotates it on expand.
 */
export const ProjectAccordion = ({ project }: { project: Project }) => {
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
      slotProps={{ heading: { component: "span" } }}
      onChange={handleAccordionChange}
      expanded={expanded}
      sx={{
        boxShadow: "none",
        padding: 0,
        mt: 0,
        mb: 0,
        backgroundColor: "transparent",
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
          right: 8,
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box
            component="span"
            aria-hidden="true"
            sx={(theme) => ({
              fontSize: "0.7rem",
              color: getRetroPalette(theme.palette.mode).accent,
            })}
          >
            &#9660;
          </Box>
        }
        sx={{
          margin: "0 !important",
          ".MuiAccordionSummary-content": {
            margin: "0 !important",
          },
          "& .Mui-expanded": {
            margin: "0 !important",
          },
        }}
      >
        <ProjectItem project={project} />
      </AccordionSummary>
      <AccordionDetails
        sx={(theme) => {
          const retro = getRetroPalette(theme.palette.mode);

          return {
            mb: 1,
            padding: "1rem 1.5rem",
            textAlign: "left",
            fontFamily: MONO_FONT,
            fontSize: "0.95rem",
            backgroundColor: retro.surfaceAlt,
            border: `1px solid ${retro.accentAlt}`,
            [theme.breakpoints.down("sm")]: {
              padding: "1rem !important",
            },
          };
        }}
      >
        <RichTextBlock content={project?.description} />
      </AccordionDetails>
    </Accordion>
  );
};
