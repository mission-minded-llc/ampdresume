import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Company } from "@openresume/theme";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { PositionForm } from "./PositionForm";
import { PositionGeneric } from "@/graphql/getPositionsWithProjects";
import { PositionItem } from "./PositionItem";
import { addPosition } from "@/graphql/addPosition";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const PositionsList = ({ company }: { company: Company }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

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

      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
  });

  const handleAddPosition = (position: PositionGeneric) => {
    mutation.mutate({
      title: position.title,
      startDate: position.startDate,
      endDate: position?.endDate || "",
      companyId: company.id,
    });

    setIsOpen(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {company?.positions?.map((position) => (
        <PositionItem
          key={position.id}
          position={position}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}

      {expanded === false ? (
        <>
          <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" color="secondary" onClick={() => setIsOpen(true)}>
              Add New Position
            </Button>
          </Box>

          <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
            <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
              Add Position
            </CustomDialogTitle>
            <DialogContent>
              <PositionForm handler={handleAddPosition} onCancel={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </Box>
  );
};
