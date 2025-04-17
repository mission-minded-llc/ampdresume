import { Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Position } from "@openresume/theme";
import { PositionForm } from "./PositionForm";
import { PositionGeneric } from "@/graphql/getPositionsWithProjects";
import { ProjectsList } from "./ProjectsList";
import React from "react";
import { deletePosition } from "@/graphql/deletePosition";
import { formatLongDate } from "@/lib/format";
import { updatePosition } from "@/graphql/updatePosition";
import { useSession } from "next-auth/react";

export const PositionItem = ({
  position,
  expanded,
  setExpanded,
}: {
  position: Position;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleExpandClick = () => {
    setExpanded(expanded === position.id ? false : position.id);
  };

  const saveMutation = useMutation({
    mutationFn: async ({
      id,
      title,
      startDate,
      endDate,
    }: {
      id: string;
      title: string;
      startDate: string;
      endDate: string;
    }) => {
      if (!session?.user?.id) return;

      await updatePosition({
        id,
        userId: session.user.id,
        title,
        startDate,
        endDate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await deletePosition({ id, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
  });

  const handleEditPosition = (positionGeneric: PositionGeneric) => {
    position.title = positionGeneric.title;
    position.startDate = positionGeneric.startDate;
    position.endDate = positionGeneric.endDate;

    saveMutation.mutate({
      id: position.id,
      title: position.title,
      startDate: position.startDate,
      endDate: position.endDate || "",
    });
  };

  const handleDeletePosition = (position: Position) => {
    if (!session?.user?.id) return;

    deleteMutation.mutate({ userId: session.user.id, id: position.id });
  };

  return (
    <Accordion
      expanded={expanded === position.id}
      sx={(theme) => ({
        mb: 2,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
      >
        <p>
          <strong>{position.title}&nbsp;-&nbsp;</strong>
          {formatLongDate(position.startDate)} to{" "}
          {position.endDate ? formatLongDate(position?.endDate) : "present"}
        </p>
      </AccordionSummary>
      <AccordionDetails>
        <PositionForm
          position={position}
          handler={handleEditPosition}
          deleteHandler={handleDeletePosition}
        />
        <Divider sx={{ mt: 4, mb: 4 }} />

        <ProjectsList position={position} expanded={expanded === position.id} />
      </AccordionDetails>
    </Accordion>
  );
};
