import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Company } from "@/graphql/getCompanies";
import { PositionForm } from "./PositionForm";
import { PositionGeneric } from "@/graphql/getPositions";
import { PositionItem } from "./PositionItem";
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
    <Box sx={{ mt: 2 }}>
      {positionsInCompany.map((position) => (
        <PositionItem key={position.id} position={position} />
      ))}

      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" color="secondary" onClick={() => setOpenDialog(true)}>
          Add Position
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Position</DialogTitle>
        <DialogContent>
          <PositionForm handler={handleAddPosition} onCancel={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
