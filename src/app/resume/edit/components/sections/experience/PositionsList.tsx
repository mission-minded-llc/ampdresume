import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Company } from "@/graphql/getCompanies";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PositionForm } from "./PositionForm";
import { PositionGeneric } from "@/graphql/getPositions";
import { PositionSingle } from "@/components/resume/WorkExperience/PositionSingle";
import { ResumeContext } from "@/components/resume/ResumeContext";
import { addPosition } from "@/graphql/addPosition";
import { useSession } from "next-auth/react";

export const PositionsList = ({ company }: { company: Company }) => {
  const { positions } = useContext(ResumeContext);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      title,
      startDate,
      endDate,
      companyId,
    }: {
      title: string;
      startDate: string;
      endDate: string;
      companyId: string;
    }) => {
      if (!session?.user?.id) return;

      await addPosition({
        userId: session.user.id,
        title,
        startDate,
        endDate,
        companyId,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const handleAddPosition = (position: PositionGeneric) => {
    mutation.mutate({
      title: position.title,
      startDate: position.startDate,
      endDate: position?.endDate || "",
      companyId: company.id,
    });

    setOpenDialog(false);
  };

  const positionsInCompany = positions.filter((position) => position.company.id === company.id);

  return (
    <>
      {positionsInCompany.map((position, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`position-${index}-content`}
            id={`position-${index}-header`}
          >
            <Typography>{position.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PositionSingle position={position} showDates />
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>
          Add Position
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Position</DialogTitle>
        <DialogContent>
          <PositionForm handler={handleAddPosition} onCancel={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
