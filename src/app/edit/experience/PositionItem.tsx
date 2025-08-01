import { Position } from "@ampdresume/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";

import { deletePosition } from "@/graphql/deletePosition";
import { PositionGeneric } from "@/graphql/getPositionsWithProjects";
import { getProjects } from "@/graphql/getProjects";
import { updatePosition } from "@/graphql/updatePosition";
import { formatLongDate } from "@/lib/format";

import { AccordionSummaryContent } from "../components/AccordionSummaryContent";

import { PositionForm } from "./PositionForm";
import { ProjectsList } from "./ProjectsList";

export const PositionItem = ({
  position,
  companyId,
  expanded,
  setExpanded,
}: {
  position: Position;
  companyId: string;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const positionRef = useRef<HTMLDivElement>(null);
  const { status, data: session } = useSession();
  const queryClient = useQueryClient();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const handleExpandClick = () => {
    const isExpanding = expanded !== position.id;
    setExpanded(isExpanding ? position.id : false);

    if (isExpanding) {
      positionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const { data: projects } = useQuery({
    enabled: isAuthenticatedUser && expanded === position.id,
    queryKey: ["projects", position.id],
    queryFn: async () => await getProjects(position.id),
  });

  const saveMutation = useMutation({
    mutationFn: async ({
      id,
      companyId,
      title,
      startDate,
      endDate,
    }: {
      id: string;
      companyId: string;
      title: string;
      startDate: string;
      endDate: string;
    }) => {
      if (!session?.user?.id) return;

      await updatePosition({
        id,
        companyId,
        userId: session.user.id,
        title,
        startDate,
        endDate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions", companyId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await deletePosition({ id, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["positions", companyId] });
    },
  });

  const handleEditPosition = (positionGeneric: PositionGeneric) => {
    position.title = positionGeneric.title;
    position.startDate = positionGeneric.startDate;
    position.endDate = positionGeneric.endDate;

    saveMutation.mutate({
      id: position.id,
      companyId,
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
      ref={positionRef}
      slotProps={{ transition: { unmountOnExit: true, timeout: 200 } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleExpandClick}
      >
        <Box sx={{ display: expanded === position.id ? "none" : "flex", width: "90%" }}>
          <AccordionSummaryContent
            primary={position.title}
            dateRange={`${formatLongDate(position.startDate)} to ${position.endDate ? formatLongDate(position.endDate) : "present"}`}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <PositionForm
          position={position}
          handler={handleEditPosition}
          deleteHandler={handleDeletePosition}
        />
        <Divider sx={{ mt: 4, mb: 4 }} />

        <ProjectsList
          projects={projects ?? []}
          position={position}
          expanded={expanded === position.id}
        />
      </AccordionDetails>
    </Accordion>
  );
};
