import { Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import { Position, PositionGeneric, PositionWithProjects } from "@/graphql/getPositions";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PositionForm } from "./PositionForm";
import { ProjectsList } from "./ProjectsList";
import { deletePosition } from "@/graphql/deletePosition";
import { formatDate } from "@/lib/format";
import { updatePosition } from "@/graphql/updatePosition";
import { useSession } from "next-auth/react";

export const PositionItem = ({ position }: { position: PositionWithProjects }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
        companyId: position.company.id,
        title,
        startDate,
        endDate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await deletePosition({ id, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
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
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
      >
        <p>
          <strong>{position.title}&nbsp;-&nbsp;</strong>
          {formatDate(position.startDate)} to{" "}
          {position.endDate ? formatDate(position?.endDate?.toString()) : "present"}
        </p>
      </AccordionSummary>
      <AccordionDetails>
        <PositionForm
          position={position}
          handler={handleEditPosition}
          deleteHandler={handleDeletePosition}
        />
        <Divider sx={{ mt: 4, mb: 4 }} />

        <ProjectsList position={position} />
      </AccordionDetails>
    </Accordion>
  );
};
