import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Education } from "@ampdresume/theme";
import { EducationForm } from "./EducationForm";
import { EducationGeneric } from "@/graphql/getEducation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { deleteEducation } from "@/graphql/deleteEducation";
import { formatLongDate } from "@/lib/format";
import { updateEducation } from "@/graphql/updateEducation";
import { useSession } from "next-auth/react";
import { AccordionSummaryContent } from "../components/AccordionSummaryContent";

export const EducationItem = ({
  education,
  expanded,
  setExpanded,
}: {
  education: Education;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleExpandClick = () => {
    setExpanded(expanded === education.id ? false : education.id);
  };

  const saveMutation = useMutation({
    mutationFn: async ({
      id,
      school,
      degree,
      dateAwarded,
    }: {
      id: string;
      school: string;
      degree: string;
      dateAwarded: string;
    }) => {
      if (!session?.user?.id) return;

      await updateEducation({
        id,
        userId: session.user.id,
        school,
        degree,
        dateAwarded,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["education"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await deleteEducation({ id, userId });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["education"] }),
  });

  const handleEditEducation = (educationGeneric: EducationGeneric) => {
    education.school = educationGeneric.school;
    education.degree = educationGeneric.degree;
    education.dateAwarded = educationGeneric.dateAwarded;

    saveMutation.mutate({
      id: education.id,
      school: education.school,
      degree: education.degree,
      dateAwarded: education.dateAwarded,
    });
  };

  const handleDeleteEducation = (education: Education) => {
    if (!session?.user?.id) return;

    deleteMutation.mutate({ userId: session.user.id, id: education.id });
  };

  return (
    <Accordion expanded={expanded === education.id} sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
        sx={(theme) => ({
          cursor: "pointer",
          pt: 1,
          pb: 1,
          "&:hover": { backgroundColor: theme.palette.primary.light },
        })}
        data-testid={`education-accordion-${education.id}`}
      >
        <div style={{ width: "90%", display: expanded === education.id ? "none" : "flex" }}>
          <AccordionSummaryContent
            primary={education.school}
            secondary={education.degree}
            dateRange={formatLongDate(education.dateAwarded)}
          />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <EducationForm
          education={education}
          handler={handleEditEducation}
          deleteHandler={handleDeleteEducation}
        />
      </AccordionDetails>
    </Accordion>
  );
};
