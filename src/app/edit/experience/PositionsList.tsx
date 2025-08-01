import { Company } from "@ampdresume/theme";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { addPosition } from "@/graphql/addPosition";
import { getPositions } from "@/graphql/getPositions";
import { PositionGeneric } from "@/graphql/getPositionsWithProjects";

import { PositionForm } from "./PositionForm";
import { PositionItem } from "./PositionItem";



export const PositionsList = ({ company }: { company: Company }) => {
  const { data: session, status } = useSession();

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const { data: positions } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["positions", company.id],
    queryFn: async () => await getPositions(company.id),
  });

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

      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["positions", company.id] });
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
      {positions?.map((position) => (
        <PositionItem
          key={position.id}
          companyId={company.id}
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
